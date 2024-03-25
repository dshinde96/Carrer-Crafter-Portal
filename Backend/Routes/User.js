const express = require('express');
const router = express.Router();
const { AuthenticateUser, restrictTo } = require('../Middleware/Authentication');
const { body, validationResult } = require('express-validator');



const {handleRegisterStu,handleRegisterAdmin,handleLogin,handleRegistrationReq,handleReqAcept,handleReqReject,handleGetAllStu,handleUpdatePersonalDet,handleSendVerificationOTP,handleVerifyOTP}=require('../Controllers/UserController');

router.post('/SendVerificationOTP',body('email', "Enter a valid Email").isEmail(),handleSendVerificationOTP);

router.post('/VerifyOTP',body('otp', "Enter a valid Email").notEmpty(),handleVerifyOTP);
//router:POST:/RegisterStu:=>Register new student => No login require (Public URL)
router.post('/RegisterStu', handleRegisterStu);

//router:POST:/RegisterTPOAdmin => Register TPO Admin
router.post('/RegisterAdmin', handleRegisterAdmin);

//router:POST:/RegisterDeptAdmin => Register Department Admin => Must login as Admin
router.post('/RegisterDeptAdmin', AuthenticateUser, restrictTo(["TPO_Admin"]), handleRegisterAdmin);

//router:POST:/login:=> User Login => No login require (Public URL)
router.post('/login', handleLogin);

//router:POST:/registration_req:=> Fetch Registration requests of Students => Must login as Admin or department Admin
router.get('/registration_req', AuthenticateUser,restrictTo(["TPO_Admin","TPO_Dept_Admin"]), handleRegistrationReq);

//router:POST:/req_accept/:id:=> Accept Request of the user to register => Must login as department Admin
router.post('/req_accept/:id', AuthenticateUser,restrictTo(["TPO_Dept_Admin"]), handleReqAcept);

//router:POST:/req_reject/:id:=> Reject Request of the user to register => Must login as department Admin
router.post('/req_reject/:id', AuthenticateUser,restrictTo(["TPO_Dept_Admin"]), handleReqReject);

//router:POST:/getAllStudents:=> Fetch All Students Registered => Must login as department Admin or Admin
router.get('/getAllStudents', AuthenticateUser,restrictTo(["TPO_Admin","TPO_Dept_Admin"]), handleGetAllStu);

//router:POST:/updatePersonalDetails:=>Update personal details 
router.post('/UpdatePersonalDetails',AuthenticateUser,handleUpdatePersonalDet);


module.exports = router;