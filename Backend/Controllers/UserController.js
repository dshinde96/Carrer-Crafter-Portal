const User_stu = require('../Models/User_stu');
const TPO_Admin = require('../Models/User_TPO_Admin');
const TPO_Dept_Admin = require('../Models/User_TPO_Dept_Admin');
const PendingReq = require('../Models/PendingReq');
const Education=require('../Models/Education');
const { generateTocken } = require('../Services/AuthServices');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const handleRegisterStu= async (req, res) => {
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
        stu = await PendingReq.findOne({ reg_no: req.body.reg_no });
        if (stu) {
            return res.status(401).send({ msg: "The request for specified user is already sent to the respective department authority. Account will be created after permitting the respective authority" });
        }
        // var salt = bcrypt.genSaltSync(10);
        bcrypt.hash(req.body.password, 10, async function (err, hash) {
            if (!err) {
                const user_stu = await PendingReq.create({
                    name,
                    reg_no,
                    password: hash,
                    dob,
                    dept,
                    year,
                    email,
                    mob_no,
                    Reqtype:"RegisterNewStu"
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
}

const handleRegisterAdmin=async (req, res) => {
    const Tpo_adm = await TPO_Admin.find({});
    // console.log(Tpo_adm.length);
    if (Tpo_adm.length != 0) {
        return res.send({ msg: "Only one admin is permitted" });
    }
    const {name,email,mob_no,password}=req.body;
    var salt = bcrypt.genSaltSync(10);
    var secPass = bcrypt.hashSync(password, salt);
    await TPO_Admin.create({
        name,
        email,
        mob_no,
        password:secPass
    });
    res.send({ msg: "Admin registered successfully" });
}

const handleRegisterDeptAdmin=async (req, res) => {
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
}

const handleLogin=async (req, res) => {
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
}

const handleRegistrationReq=async (req, res) => {
    
    try {
        if(req.user.role==="TPO_Admin"){
            console.log("TPO_Admin");
            let request = await PendingReq.find({}).populate({path: 'OriginalStu', select: '-password -CompanyName -applicationHistory -placed'}).select("-password");
            // console.log(request);
            return res.send({ request, msg: "Registration requests fetched successfull" });
        }
        else{
            const request = await PendingReq.find({ dept: req.user.dept }).populate({path: 'OriginalStu', select: '-password -CompanyName -applicationHistory -placed'}).select("-password");
            return res.send({ request, msg: "Registration requests fetched successfull" });
        }

    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ msg: "Internal Server error" });
    }
}

const handleReqAcept=async (req, res) => {
    try {
        let request = await PendingReq.findById(req.params.id).populate('OriginalStu');
        if (!request) {
            return res.status(404).send({ msg: "Request Not Found" });
        }
        if (req.user.dept !== request.dept) {
            return res.status(401).send({ msg: "Access denied" });
        }
        if(request.Reqtype=='RegisterNewStu'){
            await User_stu.create({
                name: request.name,
                reg_no: request.reg_no,
                password: request.password,
                dob: request.dob,
                dept: request.dept,
                year: request.year,
                email: request.email,
                mob_no: request.mob_no,
                placed:false
            });
            let stu=await User_stu.findOne({reg_no:request.reg_no});
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
            await PendingReq.findByIdAndDelete(req.params.id);
            return res.send({ msg: "Student registered Successfully" });
        }
        else{
                let {OriginalStu}=request;
                console.log(OriginalStu);
                OriginalStu.name=request.name;
                OriginalStu.mob_no=request.mob_no;
                OriginalStu.year=request.year;
                OriginalStu.dept=request.dept;
                const UpdatedStu=await OriginalStu.save();
                if(UpdatedStu){
                    await PendingReq.findByIdAndDelete(request._id);
                    return res.json({msg:"Profile Updated Successfully"});
                }
                else{
                    return res.status(500).json({msg:"Internal Server Error"});
                }

        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ msg: "Internal Server error" });
    }

}

const handleReqReject=async (req, res) => {
    try {
        const request = await PendingReq.findById(req.params.id);
        // console.log(request);
        if (!request) {
            return res.status(404).send({ msg: "Request Not Found" });
        }
        if (req.user.dept !== request.dept) {
            return res.status(401).send({ msg: "Access denied" });
        }

        await PendingReq.findByIdAndDelete(req.params.id);
        return res.send({ msg: "Request Rejected" });

    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ msg: "Internal Server error" });
    }

}

const handleGetAllStu=async (req, res) => {
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
}

const handleUpdatePersonalDet=async(req,res)=>{
    try {
        if(req.user.role=="Student"){
            const {newStu}=req.body;
            const pendingReq=await PendingReq.findOne({reg_no:req.user.reg_no});
            if(pendingReq)
            {
                pendingReq.name=newStu.name;
                pendingReq.mob_no=newStu.mob_no;
                pendingReq.year=newStu.year;
                pendingReq.dept=newStu.dept;
                await PendingReq.findByIdAndUpdate(pendingReq._id,{$set:pendingReq});
                return res.json({msg:"Request for update personal details is sent to your department admin"});
            }
            let student=await User_stu.findById(req.user.id).select('-CompanyName -placed -applicationHistory -_id -__v');
            if (!student) {
                return res.status(404).send({ msg: "Not found" });
            }
            student={...student.toObject(),Reqtype:"UpdatePersonalDet",OriginalStu:req.user.id};
            student.name=newStu.name;
            student.mob_no=newStu.mob_no;
            student.year=newStu.year;
            student.dept=newStu.dept;

            await PendingReq.create(student);
            return res.json({msg:"Request for update personal details is sent to your department admin"});
            
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ msg: "Internal Server error" });
    }
}
module.exports={handleRegisterStu,handleRegisterAdmin,handleRegisterDeptAdmin,handleLogin,handleRegistrationReq,handleReqAcept,handleReqReject,handleGetAllStu,handleUpdatePersonalDet};