const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { generateTocken } = require('../Services/AuthServices');
const { AuthenticateUser, restrictTo } = require('../Middleware/Authentication');
const { body, validationResult } = require('express-validator');
const User_stu = require('../Models/User_stu');
const TPO_Admin = require('../Models/User_TPO_Admin');
const TPO_Dept_Admin = require('../Models/User_TPO_Dept_Admin');
const Reg_req = require('../Models/Reg_req');
const Education=require('../Models/Education');

//router:POST:/RegisterStu:=>Register new student => No login require (Public URL)
router.post('/RegisterStu', async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.send({ errors: error.array() });
        }
        const { name, reg_no, password, dob, dept, year, email, mob_no } = req.body;
        let stu = await User_stu.findOne({ reg_no: req.body.reg_no });
        // console.log(reg_no);
        if (stu) {
            return res.status(401).send({ msg: "User with the specified registration number already exists" });
        }
        stu = await Reg_req.findOne({ reg_no: req.body.reg_no });
        if (stu) {
            return res.status(401).send({ msg: "The request for specified user is already sent to the respective department authority. Account will be created after permitting the respective authority" });
        }
        // var salt = bcrypt.genSaltSync(10);
        bcrypt.hash(req.body.password, 10, async function (err, hash) {
            if (!err) {
                const user_stu = await Reg_req.create({
                    name,
                    reg_no,
                    password: hash,
                    dob,
                    dept,
                    year,
                    email,
                    mob_no
                });
                return res.send({ msg: "Request for registration is sent to mentioned department authority. Account will be created on authorization by the authority" });
            }
            else {
                console.log(err);
                return res.status(500).send({ msg: "Internal Server error" });
            }
        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ msg: "Internal Server error" });
    }
})

//router:POST:/RegisterDeptAdmin => Register Department Admin => Must login as Admin
router.post('/RegisterDeptAdmin', AuthenticateUser, restrictTo(["TPO_Admin"]), async (req, res) => {
    try {
        console.log(req.body);
        const { name, email, dept, password } = req.body;
        const dept_Admin = await TPO_Dept_Admin.findOne({ email:email });
        // console.log(dept_Admin);
        if (dept_Admin) {
            return res.send({ msg: "email already registered" });
        }
        bcrypt.hash(password, 10, async function (err, hash) {
            if (!err) {
                await TPO_Dept_Admin.create({
                    name,
                    email,
                    dept,
                    password: hash
                })
                return res.send({ msg: "TPO department admin registered Successfully" });
            }
            else {
                console.log(err);
                return res.status(500).send({ msg: "Internal Server error" });
            }
        });
    } catch (error) {
        return res.status(500).send({ msg: "Internal Server Error" });
    }
})

//router:POST:/login:=> User Login => No login require (Public URL)
router.post('/login', async (req, res) => {
    try {
        const { role } = req.body;
        if (role == "Student") {
            const { reg_no, password } = req.body;
            const stu = await User_stu.findOne({ reg_no });
            // console.log(stu);
            if (!stu) {
                return res.status(404).send({ msg: "User Student not found" });
            }
            bcrypt.compare(password, stu.password, function (err, result) {
                if (result) {
                    const authTocken = generateTocken(stu);
                    return res.send({ tocken: authTocken,user:stu.name, msg: "Login Successful" })
                } else {
                    return res.status(401).send({ msg: "Invalid credentials" });
                }
            });
        } else if (role == "TPO_Admin") {
            const { email, password } = req.body;
            let TPO = await TPO_Admin.findOne({ email: email });
            if (!TPO) {
                return res.status(401).send({ msg: "Invalid credntials" });
            }
            bcrypt.compare(password, TPO.password, function (err, result) {
                if (result) {
                    const authTocken = generateTocken(TPO);
                    return res.send({ tocken: authTocken,user:TPO.name, msg: "Login successful" });
                }
                else {
                    return res.status(401).send({ msg: "Invalid credentials" });
                }
            });
        } else if (role == "TPO_Dept_Admin") {
            const { email, password } = req.body;
            let TPO = await TPO_Dept_Admin.findOne({ email: email });
            if (!TPO) {
                return res.status(401).send({ msg: "Invalid credntials" });
            }
            bcrypt.compare(password, TPO.password, function (err, result) {
                if (result) {
                    const authTocken = generateTocken(TPO);
                    return res.send({ tocken: authTocken,user:TPO.name, msg: "Login successful" });
                }
                else {
                    return res.status(401).send({ msg: "Invalid credentials" });
                }
            });
        }else{
            return res.send({msg:"Invalid Credentials"})
        }
    } catch (error) {
        res.status(500).send({ msg: "Internal Sever Error" });
    }
})

//router:POST:/registration_req:=> Fetch Registration requests of Students => Must login as Admin or department Admin
router.get('/registration_req', AuthenticateUser,restrictTo(["TPO_Admin","TPO_Dept_Admin"]), async (req, res) => {
    
    try {
        if(req.user.role==="TPO_Admin"){
            console.log("TPO_Admin");
            const reg_req = await Reg_req.find({}).select("-password");
            console.log(reg_req);
            return res.send({ reg_req, msg: "Registration requests fetched successfull" });
        }
        else{
            const reg_req = await Reg_req.find({ dept: req.user.dept }).select("-password");
            return res.send({ reg_req, msg: "Registration requests fetched successfull" });
        }

    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ msg: "Internal Server error" });
    }
})

//router:POST:/req_accept/:id:=> Accept Request of the user to register => Must login as department Admin
router.post('/req_accept/:id', AuthenticateUser,restrictTo(["TPO_Dept_Admin"]), async (req, res) => {
    try {
        const reg_req = await Reg_req.findById(req.params.id);
        // console.log(reg_req);
        if (!reg_req) {
            return res.status(404).send({ msg: "User with the specified ID does not exist" });
        }
        if (req.user.dept !== reg_req.dept) {
            return res.status(401).send({ msg: "Access denied" });
        }

        await User_stu.create({
            name: reg_req.name,
            reg_no: reg_req.reg_no,
            password: reg_req.password,
            dob: reg_req.dob,
            dept: reg_req.dept,
            year: reg_req.year,
            email: reg_req.email,
            mob_no: reg_req.mob_no,
            placed:false
        });
        const stu=await User_stu.findOne({reg_no:reg_req.reg_no});
        await Education.create({
            user:stu._id,
            title:"10th",
            percentage:0
        })
        await Education.create({
            user:stu._id,
            title:"12th/Diploma",
            percentage:0
        })
        await Education.create({
            user:stu._id,
            title:"Btech",
            percentage:0
        })
        await Reg_req.findByIdAndDelete(req.params.id);
        return res.send({ msg: "Student registered Successfully" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ msg: "Internal Server error" });
    }

})

//router:POST:/req_reject/:id:=> Reject Request of the user to register => Must login as department Admin
router.post('/req_reject/:id', AuthenticateUser,restrictTo(["TPO_Dept_Admin"]), async (req, res) => {
    try {
        const reg_req = await Reg_req.findById(req.params.id);
        if (!reg_req) {
            return res.status(404).send({ msg: "User with the specified ID does not exist" });
        }
        if (req.user.dept !== reg_req.dept) {
            return res.status(401).send({ msg: "Access denied" });
        }

        await Reg_req.findByIdAndDelete(req.params.id);
        return res.send({ msg: "Request Deleted" });

    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ msg: "Internal Server error" });
    }

})

//router:POST:/getAllStudents:=> Fetch All Students Registered => Must login as department Admin or Admin
router.get('/getAllStudents', AuthenticateUser,restrictTo(["TPO_Admin","TPO_Dept_Admin"]), async (req, res) => {
    try {
        if(req.user.role==="TPO_Admin"){
            const AllStu = await User_stu.find({}).select("-password");
            return res.send({ Students: AllStu, msg: "Students Of the department fetched successfully" });
        }
        else{
            const AllStu = await User_stu.find({ dept: req.user.dept }).select("-password");
        return res.send({ Students: AllStu, msg: "Students Of the department fetched successfully" });
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ msg: "Internal Server error" });
    }
})

module.exports = router;