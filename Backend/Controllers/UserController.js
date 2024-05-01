const User_stu = require('../Models/User_stu');
const TPO_Admin = require('../Models/TPO_Admin');
const PendingReq = require('../Models/PendingReq');
const Education = require('../Models/Education');
const { generateTocken } = require('../Services/AuthServices');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const Project = require('../Models/Project');
const Experience = require('../Models/Experience');
const nodemailer = require('nodemailer');
const { SendMail } = require('../Services/MailSender');
const OTP = require('../Models/OTP')

const handleSendVerificationOTP = async (req, res) => {
    try {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(401).json({ msg: "Please Enter a Valid Email address." });
        }
        const { email } = req.body;
        // console.log(email);
        const Student = await User_stu.findOne({ email });
        // console.log(Student);
        if (Student) {
            return res.status(401).json({ msg: "Provided email is already registered" });
        }

        const checkOTP = await OTP.findOne({ email });
        if (checkOTP) {
            return res.status(401).json({ msg: "OTP already sent to mentioned email" });
        }
        const otp = await OTP.create({
            email,
            otp: Math.floor(1 + (Math.random() * 10000))
        });

        const Subject = `OTP Generated Successfully!`;
        const content = `
                <p>Dear user, your OTP for email verification is ${otp.otp}</p>
                `;
        await SendMail([email], Subject, content);
        res.json({ msg: "OTP Has Been Sent To Provided Email Address" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ msg: "Internal Server Error" });
    }

}

const handleVerifyOTP = async (req, res) => {
    try {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(401).json({ msg: "OTP field cannot be empty." });
        }
        const { email, otp } = req.body;
        // console.log(otp);
        const otpDB = await OTP.findOne({ email });
        // console.log(otpDB.otp);
        if (!otpDB) {
            return res.status(401).json({ msg: "Regenrate the OTP" });
        }
        if (otpDB.otp.toString() === otp)
            return res.json({ msg: "Email verified!", Verfied: true });
        else
            return res.status(401).json({ msg: "Wrong OTP", Verfied: false });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
}

const handleRegisterStu = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.send({ errors: error.array() });
        }
        const { name, reg_no, password, dob, dept, year, email, mob_no } = req.body;
        let stu = await User_stu.findOne({ reg_no: req.body.reg_no });
        console.log(stu);
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
                    Reqtype: "RegisterNewStu"
                });

                const Subject = `Registration request generated Successfully`;
                const content = `
                <p>Dear user, we have recived your registration request. Account will be created on further approval by your department admi</p>
                `;
                await SendMail([user_stu.email], Subject, content);

                return res.json({ msg: "Request for registration is sent to mentioned department authority. Account will be created on authorization by the authority" });
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

const handleRegisterAdmin = async (req, res) => {
    try {
        const { role } = req.body;
        if (role == "TPO_Admin") {
            const tpo_admin = await TPO_Admin.find({ role: "TPO_Admin" });
            if (tpo_admin.length != 0) {
                return res.send({ msg: "Only one admin is permitted" });
            }
            const { name, email, mob_no, password } = req.body;
            var salt = bcrypt.genSaltSync(10);
            var secPass = bcrypt.hashSync(password, salt);
            await TPO_Admin.create({
                name,
                email,
                mob_no,
                role: "TPO_Admin",
                dept: "GCEK",
                password: secPass
            });
            res.send({ msg: "Admin registered successfully" });
        }
        else {
            const { name, email, mob_no, password, dept } = req.body;
            const dept_Admin = await TPO_Admin.find({ dept: dept });
            // console.log();
            // console.log(dept_Admin);
            if (dept_Admin.length > 0) {
                return res.send({ msg: "Admin Already registered for the provided department" });
            }
            bcrypt.hash(password, 10, async function (err, hash) {
                if (!err) {
                    await TPO_Admin.create({
                        name,
                        email,
                        dept,
                        mob_no,
                        role: "TPO_Dept_Admin",
                        password: hash
                    })
                    return res.send({ msg: "TPO department admin registered Successfully" });
                }
                else {
                    console.log(err);
                    return res.status(500).send({ msg: "Internal Server error" });
                }
            });
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ msg: "Internal Server Error" });
    }
}

const handleRegisterDeptAdmin = async (req, res) => {
    try {
        console.log(req.body);
        const { name, email, dept, password } = req.body;
        const dept_Admin = await TPO_Dept_Admin.findOne({ email: email });
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

const handleLogin = async (req, res) => {
    try {
        const { role } = req.body;
        if (role == "Student") {
            console.log(req.body);
            const { reg_no, password } = req.body;
            const stu = await User_stu.findOne({ reg_no });
            // console.log(stu);
            if (!stu) {
                return res.status(404).send({ msg: "User Student not found" });
            }
            bcrypt.compare(password, stu.password, function (err, result) {
                if (result) {
                    const authTocken = generateTocken(stu);
                    return res.send({ tocken: authTocken, user: stu.name, role: "Student", msg: "Login Successful" })
                } else {
                    return res.status(401).send({ msg: "Invalid credentials" });
                }
            });
        }
        else if (role == "Admin") {
            const { email, password } = req.body;
            let TPO = await TPO_Admin.findOne({ email: email });
            if (!TPO) {
                return res.status(401).send({ msg: "Invalid credntials" });
            }
            bcrypt.compare(password, TPO.password, function (err, result) {
                if (result) {
                    const authTocken = generateTocken(TPO);
                    return res.send({ tocken: authTocken, user: TPO.name, role: TPO.role, msg: "Login successful" });
                }
                else {
                    return res.status(401).send({ msg: "Invalid credentials" });
                }
            });
        }
        else
            return res.status(401).json({ msg: "Invalid request" });
    } catch (error) {
        res.status(500).send({ msg: "Internal Sever Error" });
    }
}

const handleRegistrationReq = async (req, res) => {

    try {
        if (req.user.role === "TPO_Admin") {
            console.log("TPO_Admin");
            let request = await PendingReq.find({}).populate({ path: 'OriginalStu', select: '-password -CompanyName -applicationHistory -placed' }).select("-password");
            // console.log(request);
            return res.send({ request, msg: "Registration requests fetched successfull" });
        }
        else {
            const request = await PendingReq.find({ dept: req.user.dept }).populate({ path: 'OriginalStu', select: '-password -CompanyName -applicationHistory -placed' }).select("-password");
            return res.send({ request, msg: "Registration requests fetched successfull" });
        }

    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ msg: "Internal Server error" });
    }
}

const handleReqAcept = async (req, res) => {
    try {
        let request = await PendingReq.findById(req.params.id).populate('OriginalStu');
        if (!request) {
            return res.status(404).send({ msg: "Request Not Found" });
        }
        if (req.user.dept !== request.dept) {
            return res.status(401).send({ msg: "Access denied" });
        }
        if (request.Reqtype == 'RegisterNewStu') {

            const Student = await User_stu.create({
                name: request.name,
                reg_no: request.reg_no,
                password: request.password,
                dob: request.dob,
                dept: request.dept,
                year: request.year,
                email: request.email,
                mob_no: request.mob_no,
                Education: null,
                Experience: null,
                Project: null,
                placed: false
            });
            const project = await Project.create({
                User: Student._id
            });
            const education = await Education.create({
                User: Student._id,
                Array: [
                    {
                        title: "10th",
                        percentage: 0
                    },
                    {
                        title: "12th",
                        percentage: 0
                    },
                    {
                        title: "Btect",
                        percentage: 0
                    },
                ]
            });
            const experience = await Experience.create({
                User: Student._id
            });
            Student.Project = project._id;
            Student.Experience = experience._id;
            Student.Education = education._id;
            await Student.save();
            await PendingReq.findByIdAndDelete(req.params.id);

            const Subject = `Registration Confirmation`;
            const content = `
                <p>Dear user, This is to inform you that your registration is confirmed by your department admin. Now you can login to your account.</p>
                `;
            await SendMail([Student.email], Subject, content);

            return res.send({ msg: "Student registered Successfully" });
        }
        else {
            let { OriginalStu } = request;
            console.log(OriginalStu);
            OriginalStu.name = request.name;
            OriginalStu.mob_no = request.mob_no;
            OriginalStu.year = request.year;
            OriginalStu.dept = request.dept;
            const UpdatedStu = await OriginalStu.save();
            if (UpdatedStu) {
                await PendingReq.findByIdAndDelete(request._id);
                const Subject = `Request Rejected`;
                const content = `
                <p>"Dear user, This is to inform you that your request about update the profile is accepted by department admin. You can confirm changes in your profile."</p>
                <h4 style="display:inline-block;">Remrk:</h4>
                <spam>${Remark}</spam>
                `;
                await SendMail([OriginalStu.email], Subject, content);
                return res.json({ msg: "Profile Updated Successfully" });
            }
            else {
                return res.status(500).json({ msg: "Internal Server Error" });
            }

        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ msg: "Internal Server error" });
    }

}

const handleReqReject = async (req, res) => {
    try {
        const request = await PendingReq.findById(req.params.id);
        const { Remark } = req.body;
        // console.log(Remark);
        if (!request) {
            return res.status(404).send({ msg: "Request Not Found" });
        }
        if (req.user.dept !== request.dept) {
            return res.status(401).send({ msg: "Access denied" });
        }
        const Subject = `Request Rejected`;
        const content = `
        <p>Your request for ${request.Reqtype == 'RegisterNewStu' ? "New Account registration" : "Update profile"} is rejected by your department admin</p>
        <spam>Remark: ${Remark}</spam>
        `;
        await SendMail([request.email], Subject, content);
        await PendingReq.findByIdAndDelete(req.params.id);
        return res.send({ msg: "Request Rejected" });

    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ msg: "Internal Server error" });
    }

}

const handleGetAllStu = async (req, res) => {
    try {
        if (req.user.role === "TPO_Admin") {
            const AllStu = await User_stu.find({}).select("-password");
            return res.send({ Students: AllStu, msg: "Students Of the department fetched successfully" });
        }
        else {
            const AllStu = await User_stu.find({ dept: req.user.dept }).select("-password");
            return res.send({ Students: AllStu, msg: "Students Of the department fetched successfully" });
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ msg: "Internal Server error" });
    }
}

const handleUpdatePersonalDet = async (req, res) => {
    try {
        if (req.user.role == "Student") {
            const { UpdatedInfo } = req.body;
            // console.log(UpdatedInfo);
            const pendingReq = await PendingReq.findOne({ reg_no: req.user.reg_no });
            if (pendingReq) {
                pendingReq.name = UpdatedInfo.name;
                pendingReq.mob_no = UpdatedInfo.mob_no;
                pendingReq.year = UpdatedInfo.year;
                pendingReq.dept = UpdatedInfo.dept;
                await PendingReq.findByIdAndUpdate(pendingReq._id, { $set: pendingReq });
                const Subject = `Request Generated Successfully`;
                const content = `
                    <p>"Dear user, This is to inform you that your request to update your personal details is generated Successful. Request will be approved on further Confirmation by your department admin"</p>
                    `;
                await SendMail([pendingReq.email], Subject, content);
                return res.json({ msg: "Request for update personal details is sent to your department admin" });
            }
            let student = await User_stu.findById(req.user.id).select('-CompanyName -placed -applicationHistory -_id -__v');
            if (!student) {
                return res.status(404).send({ msg: "Not found" });
            }
            student = { ...student.toObject(), Reqtype: "UpdatePersonalDet", OriginalStu: req.user.id };
            student.name = UpdatedInfo.name;
            student.mob_no = UpdatedInfo.mob_no;
            student.year = UpdatedInfo.year;
            student.dept = UpdatedInfo.dept;

            await PendingReq.create(student);
            const Subject = `Request Generated Successfully`;
            const content = `
                <p>"Dear user, This is to inform you that your request to update your personla details is generated Successful. Request will be approved on further Confirmation by your department admin"</p>
                `;
            await SendMail([student.email], Subject, content);
            return res.json({ msg: "Request for update personal details is sent to your department admin" });

        }
        else
            return res.json({ msg: "Updatedetails is functional for student only. Work in progress for other roles" })
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ msg: "Internal Server error" });
    }
}
module.exports = { handleRegisterStu, handleRegisterAdmin,handleRegisterDeptAdmin, handleLogin, handleRegistrationReq, handleReqAcept, handleReqReject, handleGetAllStu, handleUpdatePersonalDet, handleSendVerificationOTP, handleVerifyOTP };