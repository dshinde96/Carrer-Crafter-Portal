const express=require('express');
const router=express.Router();
const Reg_req=require('../Models/Reg_req');
const User_stu=require('../Models/User_stu');
const { body, validationResult } = require('express-validator');
const { AuthenticateUser, restrictTo } = require('../Middleware/Authentication');
const Project=require('../Models/Project');
const Education=require('../Models/Education');
const Experience=require('../Models/Experience');

//router:POST:/profile/myprofile:=>Fetch my profile => Must login as Student
router.get('/profile/myprofile', AuthenticateUser, async (req, res) => {
    try {
        const student = await User_stu.findById(req.user.id).select("-password");
        // console.log((student));
        if (!student) {
            return res.status(404).send({ msg: "Not found" });
        }
        const projects = await Project.find({ user: req.user.id });
        const education = await Education.find({ user: req.user.id });
        const experience = await Experience.find({ user: req.user.id });
        return res.send({ student, education, projects, experience, msg: "Profile fetched successfully" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ msg: "Internal Server error" });
    }

});

//router:POST:/profile/myprofile:=>Display profile of user => Must login as Student or Department Admin or Admin
router.get('/profile/display/:id', AuthenticateUser,restrictTo(["TPO_Admin","TPO_Dept_Admin","Student"]), async (req, res) => {
    try {
        const student = await User_stu.findById(req.params.id).select("-password");
        // console.log((student));
        if (!student) {
            return res.status(404).send({ msg: "Not found" });
        }
        const projects = await Project.find({ user: req.params.id });
        const education = await Education.find({ user: req.params.id});
        const experience = await Experience.find({ user: req.params.id });
        return res.send({ student, education, projects, experience, msg: "Profile fetched successfully" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ msg: "Internal Server error" });
    }

});

//router:POST:/profile/addproject:=>Add new Project => Must login as Student
router.post('/profile/addproject', AuthenticateUser,restrictTo(["Student"]), async (req, res) => {
    try {
        const { title, description, start_date, end_date } = req.body;
        const project = new Project({ user: req.user.id, title, description, start_date, end_date });
        console.log(req.user.id);
        const saveproject = await project.save();
        return res.send({ Project: project, msg: "Project added successfully" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ msg: "Internal Server error" });
    }
});

//router:POST:/profile/updateproject/:id:=>Update Existing Project => Must login as Student
router.post('/profile/updateproject/:id',  AuthenticateUser,restrictTo(["Student"]), async (req, res) => {
    try {
        var project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).send({ msg: "Requested project not found" });
        }
        if (project.user.toString() !== req.user.id) {
            return res.status(401).send({ msg: "Access Denied" });
        }
        const newproject = project;
        if (req.body.title) { newproject.title = req.body.title };
        if (req.body.description) { newproject.description = req.body.description }
        if (req.body.start_date) { newproject.start_date = req.body.start_date }
        if (req.body.end_date) { newproject.end_date = req.body.end_date };

        project = await Project.findByIdAndUpdate(req.params.id, { $set: newproject });

        return res.send({ newproject, msg: "Project updated successfully" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ msg: "Internal Server error" });
    }


})

//router:POST:/profile/deleteproject/:id:=>delete Existing Project => Must login as Student
router.delete('/profile/deleteproject/:id', AuthenticateUser,restrictTo(["Student"]), async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).send({ msg: "Project with specified id not found" });
        }
        if (project.user.toString() !== req.user.id) {
            return res.status(401).send({ msg: "Access denied" });
        }
        await Project.findByIdAndDelete(req.params.id);
        return res.send({ project, msg: "Project deleted successfully" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ msg: "Internal Server error" });
    }

})

//router:POST:/profile/addeducation=>Add education details => Must login as Student
router.post('/profile/addeducation', AuthenticateUser,restrictTo(["Student"]), async (req, res) => {
    try {
        const { title, school, start_year, end_year, percentage } = req.body;
        const education = await Education.findOne({ title: title, user: req.user.id });
        if (education) {
            return res.send({ msg: "Title for the education is already filled...Please update it if you want to do some changes" })
        }
        const edu = await Education({ user: req.user.id, title, school, start_year, end_year, percentage }).save()
        return res.send({ education: edu, msg: "education saved successfully" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ msg: "Internal Server error" });
    }

})

//router:POST:/profile/updateeducation/:id:=>Update Existing Education Details => Must login as Student
router.post('/profile/updateeducation/:id', AuthenticateUser,restrictTo(["Student"]), async (req, res) => {
    try {
        const { title, school, start_year, end_year, percentage } = req.body;
        const education = await Education.findById(req.params.id);
        if (!education) {
            return res.status(404).send({ msg: "education not found" });
        }
        if (education.user.toString() !== req.user.id) {
            return res.status(401).send({ msg: "Access denied" });
        }
        var newedu = education;
        if (title) { newedu.title = title };
        if (school) { newedu.school = school };
        if (start_year) { newedu.start_year = start_year };
        if (end_year) { newedu.end_year = end_year };
        if (percentage) { newedu.percentage = percentage };
        await Education.findByIdAndUpdate(req.params.id, { $set: newedu });
        return res.send({ edu: newedu, msg: "Education updated successfully" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ msg: "Internal Server error" });
    }

})

//router:POST:/profile/deleteeducation/:id:=>delete Existing educationdetails => Must login as Student
router.delete('/profile/deleteeducation/:id', AuthenticateUser,restrictTo(["Student"]), async (req, res) => {
    try {
        const education = await Education.findById(req.params.id);
        if (!education) {
            return res.status(404).send({ msg: "education not found" });
        }
        if (education.user.toString() !== req.user.id) {
            return res.status(401).send({ msg: "Access denied" });
        }
        await Education.findByIdAndDelete(req.params.id);
        return res.send({ edu: education, msg: "Education deleted successfully" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ msg: "Internal Server error" });
    }

})

//router:POST:/profile/addexp => Add experience/Position of responsibility => Must login as Student
router.post('/profile/addexp', AuthenticateUser,restrictTo(["Student"]), async (req, res) => {
    try {
        const { position, org, start_year, end_year } = req.body;
        const exp = await Experience({ user: req.user.id, position, org, start_year, end_year }).save();
        return res.send({ Experience: exp, msg: "Experience saved successfully" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ msg: "Internal Server error" });
    }

})

//router:POST:/profile/updateexp/:id:=>Update Existing Experience => Must login as Student
router.post('/profile/updateexp/:id', AuthenticateUser,restrictTo(["Student"]), async (req, res) => {
    try {
        const { position, org, start_year, end_year } = req.body;
        const experience = await Experience.findById(req.params.id);
        if (!experience) {
            return res.status(404).send({ msg: "education not found" });
        }
        if (experience.user.toString() !== req.user.id) {
            return res.status(401).send({ msg: "Access denied" });
        }
        var newexp = experience;
        if (position) { newexp.position = position };
        if (org) { newexp.org = org };
        if (start_year) { newexp.start_year = start_year };
        if (end_year) { newexp.end_year = end_year };
        await Experience.findByIdAndUpdate(req.params.id, { $set: newexp });
        return res.send({ edu: newexp, msg: "Education updated successfully" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ msg: "Internal Server error" });
    }

})

//router:POST:/profile/deleteexp/:id:=>Delete Existing Experience => Must login as Student
router.delete('/profile/deleteexp/:id', AuthenticateUser,restrictTo(["Student"]), async (req, res) => {
    try {
        const experience = await Experience.findById(req.params.id);
        if (!experience) {
            return res.status(404).send({ msg: "education not found" });
        }
        if (experience.user.toString() !== req.user.id) {
            return res.status(401).send({ msg: "Access denied" });
        }
        await Experience.findByIdAndDelete(req.params.id);
        return res.send({ experience: experience, msg: "Experience deleted successfully" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ msg: "Internal Server error" });
    }

})

module.exports=router;