const express = require('express');
const router = express.Router();
const { AuthenticateUser, restrictTo } = require('../Middleware/Authentication');

const { handleGetAllDrive, handleDisplayDrive, handleNewDrive, handleApplyToDrive, handleGetSelectedStu, handleDriveStudent, handleAddEligibleStu, handleAddSelectedStu, handleRejectStu } = require('../Controllers/DriveController');

//router:POST:/getAllDrive=>Fetch All Drives => Must login as Student or Department Admin or Admin
router.route('/getAllDrive').get(AuthenticateUser, handleGetAllDrive);

//router:POST:/displatDrive/:id=>Display the information of the drive => Must login as Student or Department Admin or Admin
router.route('/dsiplay/:id').get(AuthenticateUser, handleDisplayDrive)

//router:POST:/newDrive=>Create a new Drive => Must login as Admin
router.route('/newDrive').post(AuthenticateUser, restrictTo(["TPO_Admin"]), handleNewDrive)

//router:POST:/Apply/:id=>Apply to existing Drive => Must login as Student
router.route('/Apply/:id').post(AuthenticateUser, restrictTo(["Student"]), handleApplyToDrive);

//router:POST:/getSelectedStu/:id=>Get the result of the particular Drive => Must login as Admin or Department Admin or Studnet
router.route('/getSelectedStu/:id').get(AuthenticateUser, handleGetSelectedStu)

//router:POST:/getStudents=>Fetch All the Student of the drive->Interested,Eligible,Selected => Must login as Admin
router.route('/getStudent/:cat/:id').get(AuthenticateUser, restrictTo(["TPO_Admin"]), handleDriveStudent)

//router:POST:/addEligibleStu/:id=>Accept the pplication of a student for the particular drive => Must login as Admin
router.route('/addEligibleStu/:id').post(AuthenticateUser, restrictTo(["TPO_Admin"]), handleAddEligibleStu);

//router:POST:/addSelectedStu/:id=>Mark the student as placed in particular drive => Must login as Admin
router.route('/addSelectedStu/:id').post(AuthenticateUser, restrictTo(["TPO_Admin"]), handleAddSelectedStu);

//router:POST:/rejectStu/:id=>Reject the application of the particular student for the particular drive => Must login as Admin
router.route('/rejectStu/:id').post(AuthenticateUser, restrictTo(["TPO_Admin"]), handleRejectStu);

module.exports = router;