const express = require('express');
const router = express.Router();
const { AuthenticateUser, restrictTo } = require('../Middleware/Authentication');

const { handleMyProfile, handleDisplayProfile, handleAddProject, handleUpdateProject, handleDeleteProject, addExp, updateExp, deleteExp, handleUpdateEdu } = require('../Controllers/UserStuController')

//router:POST:/profile/myprofile:=>Fetch my profile => Must login as Student
router.route('/profile/myprofile').get(AuthenticateUser, handleMyProfile);

//router:POST:/profile/myprofile:=>Display profile of user => Must login as Student or Department Admin or Admin
router.route('/profile/display/:id').get(AuthenticateUser, restrictTo(["TPO_Admin", "TPO_Dept_Admin", "Student"]), handleDisplayProfile);

//add project
router.route('/profile/project').post(AuthenticateUser, restrictTo(["Student"]), handleAddProject)
//Handle Projects
router.route('/profile/project/:id')
    .put(AuthenticateUser, restrictTo(["Student"]), handleUpdateProject)
    .delete(AuthenticateUser, restrictTo(["Student"]), handleDeleteProject);

//Add experience
router.route('/profile/experience').post(AuthenticateUser, restrictTo(["Student"]), addExp);

//Handle experience
router.route('/profile/experience/:id')
    .put(AuthenticateUser, restrictTo(["Student"]), updateExp)
    .delete(AuthenticateUser, restrictTo(["Student"]), deleteExp);

//Handle Education
router.route('/profile/education/:id')
    .put(AuthenticateUser, restrictTo(["Student"]), handleUpdateEdu);
module.exports = router;