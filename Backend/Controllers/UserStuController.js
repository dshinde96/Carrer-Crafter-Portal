const Reg_req=require('../Models/PendingReq');
const User_stu=require('../Models/User_stu');
const { body, validationResult } = require('express-validator');
const Project=require('../Models/Project');
const Education=require('../Models/Education');
const Experience=require('../Models/Experience');

const handleMyProfile=async (req, res) => {
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

}

const handleDisplayProfile=async (req, res) => {
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

}

const handleAddProject=async (req, res) => {
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
}

const handleUpdateProject=async (req, res) => {
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


}

const handleDeleteProject=async (req, res) => {
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

}

const handleAddEdu=async (req, res) => {
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

}

const updateEdu= async (req, res) => {
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

}

const deleteEdu=async (req, res) => {
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

}

const addExp=async (req, res) => {
    try {
        const { position, org, start_year, end_year } = req.body;
        const exp = await Experience({ user: req.user.id, position, org, start_year, end_year }).save();
        return res.send({ Experience: exp, msg: "Experience saved successfully" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ msg: "Internal Server error" });
    }

}

const updateExp=async (req, res) => {
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

}

const deleteExp=async (req, res) => {
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

}
module.exports={handleMyProfile,handleDisplayProfile,handleAddProject,handleUpdateProject,handleDeleteProject,handleAddEdu,updateEdu,deleteEdu,addExp,updateExp,deleteExp};