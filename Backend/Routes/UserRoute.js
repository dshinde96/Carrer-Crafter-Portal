const express = require('express');
const router = express.Router();
const { AuthenticateUser, restrictTo } = require('../Middleware/Authentication');
const { body, validationResult } = require('express-validator');

const {handleRegisterStu,handleRegisterAdmin,handleLogin,handleRegistrationReq,handleReqAcept,handleReqReject,handleGetAllStu,handleUpdatePersonalDet,handleSendVerificationOTP,handleVerifyOTP}=require('../Controllers/UserController');

router.route('/SendVerificationOTP').post(body('email', "Enter a valid Email").isEmail(),handleSendVerificationOTP);

router.route('/VerifyOTP').post(body('otp', "Enter a valid Email").notEmpty(),handleVerifyOTP);

//router:POST:/RegisterStu:=>Register new student => No login require (Public URL)
router.route('/RegisterStu').post( handleRegisterStu);

//router:POST:/RegisterTPOAdmin => Register TPO Admin
router.route('/RegisterAdmin').post( handleRegisterAdmin);

//router:POST:/RegisterDeptAdmin => Register Department Admin => Must login as Admin
router.route('/RegisterDeptAdmin').post(AuthenticateUser, restrictTo(["TPO_Admin"]), handleRegisterAdmin);

//router:POST:/login:=> User Login => No login require (Public URL)
router.route('/login').post( handleLogin);

//router:POST:/registration_req:=> Fetch Registration requests of Students => Must login as Admin or department Admin
router.route('/registration_req').get( AuthenticateUser,restrictTo(["TPO_Admin","TPO_Dept_Admin"]), handleRegistrationReq);

//router:/registration_req/:id => handle registration requests of student, must loged in as TPO_DEPT_ADMIN
router.route('/registration_req/:id')
    .post( AuthenticateUser,restrictTo(["TPO_Dept_Admin"]), handleReqAcept)
    .delete(AuthenticateUser,restrictTo(["TPO_Dept_Admin"]), handleReqReject);

//router:POST:/getAllStudents:=> Fetch All Students Registered => Must login as department Admin or Admin
router.route('/getAllStudents').get( AuthenticateUser,restrictTo(["TPO_Admin","TPO_Dept_Admin"]), handleGetAllStu);

//router:POST:/updatePersonalDetails:=>Update personal details 
router.route('/UpdatePersonalDetails').post(AuthenticateUser,handleUpdatePersonalDet);

module.exports = router;