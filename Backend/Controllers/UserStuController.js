const Reg_req = require('../Models/PendingReq');
const User_stu = require('../Models/User_stu');
const { body, validationResult } = require('express-validator');
// const Project = require('../Models/Project');
const Education = require('../Models/Education');
const Experience = require('../Models/Experience');

const handleMyProfile = async (req, res) => {
    try {
        const student = await User_stu.findById(req.user.id)
        .populate({ path: "Education", select: "Array" })
        .populate({ path: "Experience", select: "Array" })
        .populate({ path: "Project", select: "Array" })
        .select("-password -reg_no -role -dob");
        if (!student) {
            return res.status(404).send({ msg: "Not found" });
        }
        return res.send({ student, msg: "Profile fetched successfully" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ msg: "Internal Server error" });
    }

}

const handleDisplayProfile = async (req, res) => {
    try {
        const student = await User_stu.findById(req.params.id)
        .populate({ path: "Education", select: "Array" })
        .populate({ path: "Experience", select: "Array" })
        .populate({ path: "Project", select: "Array" })
        .select("-password");
        if (!student) {
            return res.status(404).send({ msg: "Not found" });
        }
        return res.send({ student, msg: "Profile fetched successfully" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ msg: "Internal Server error" });
    }

}

const handleAddProject = async (req, res) => {
    try {
        const { title, description, start_date, end_date } = req.body;
        const {Project:Projects} = await User_stu.findById(req.user.id)
        .populate({ path: "Project"})
        .select("-password");
        const project={title, description, start_date, end_date}
        Projects.Array.push(project);
        Projects.save();
        return res.send({project, msg: "Project added successfully" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ msg: "Internal Server error" });
    }
}

const handleUpdateProject = async (req, res) => {
    try {
        // var project = await Project.findById(req.params.id);
        const {Project:Projects} = await User_stu.findById(req.user.id)
        .populate({ path: "Project"});
        const project=Projects.Array.find((project)=>project._id==req.params.id);
        if (!project) {
            return res.status(404).send({ msg: "Project with specified id not found" });
        }
        if (Projects.User.toString() !== req.user.id) {
            return res.status(401).send({ msg: "Access Denied" });
        }
        const newproject = project;
        if (req.body.title) { newproject.title = req.body.title };
        if (req.body.description) { newproject.description = req.body.description }
        if (req.body.start_date) { newproject.start_date = req.body.start_date }
        if (req.body.end_date) { newproject.end_date = req.body.end_date };

        Projects.Array.map((project)=>{
            if(project._id==req.params.id)
            return newproject;
            else
            return project;
        })

        Projects.save();

        return res.send({ newproject, msg: "Project updated successfully" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ msg: "Internal Server error" });
    }


}

const handleDeleteProject = async (req, res) => {
    try {
        const {Project:Projects} = await User_stu.findById(req.user.id)
        .populate({ path: "Project"});
        const project=Projects.Array.find((project)=>project._id==req.params.id);
        // console.log(project);
        if (Projects.User.toString() !== req.user.id) {
            return res.status(401).send({ msg: "Access Denied" });
        }
        if (!project) {
            return res.status(404).send({ msg: "Project with specified id not found" });
        }
        Projects.Array = Projects.Array.filter(project => project._id.toString() !== req.params.id);
        await Projects.save();
        return res.send({ project, msg: "Project deleted successfully" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ msg: "Internal Server error" });
    }

}

const handleAddEdu = async (req, res) => {
    try {
        const { title, school, start_year, end_year, percentage } = req.body;
        const {Education} = await User_stu.findById(req.params.id)
        .populate({ path: "Education"});
        const education={title, school, start_year, end_year, percentage};
        Education.Array.push(education);
        await Education.save();
        return res.send({ education: edu, msg: "education saved successfully" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ msg: "Internal Server error" });
    }

}

const deleteEdu = async (req, res) => {
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

const handleUpdateEdu = async (req, res) => {
    try {
        const { title, school, start_year, end_year, percentage } = req.body;
        const {Education} = await User_stu.findById(req.user.id)
        .populate({ path: "Education"});
        const education = Education.Array.find(education=>education._id==req.params.id);
        if (!education) {
            return res.status(404).send({ msg: "education not found" });
        }
        if (Education.User.toString() !== req.user.id) {
            return res.status(401).send({ msg: "Access denied" });
        }
        var newedu = education;
        if (title) { newedu.title = title };
        if (school) { newedu.school = school };
        if (start_year) { newedu.start_year = start_year };
        if (end_year) { newedu.end_year = end_year };
        if (percentage) { newedu.percentage = percentage };
        Education.Array.map((education)=>{
            if(education._id===req.params.id)
            return newedu;
            else
            return education;
        })
        Education.save();
        return res.send({ edu: newedu, msg: "Education updated successfully" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ msg: "Internal Server error" });
    }

}
const addExp = async (req, res) => {
    try {
        const { position, org, start_year, end_year } = req.body;
        const {Experience} = await User_stu.findById(req.user.id)
        .populate({ path: "Experience"});
        const experience={ position, org, start_year, end_year };
        Experience.Array.push(experience);
        await Experience.save();
        return res.send({ experience, msg: "Experience saved successfully" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ msg: "Internal Server error" });
    }

}

const updateExp = async (req, res) => {
    try {
        const { position, org, start_year, end_year } = req.body;
        const {Experience} = await User_stu.findById(req.user.id)
        .populate({ path: "Experience"});
        const experience=Experience.Array.find(exp=>exp._id.toString()==req.params.id);
        if (!experience) {
            return res.status(404).send({ msg: "education not found" });
        }
        if (Experience.User.toString() !== req.user.id) {
            return res.status(401).send({ msg: "Access denied" });
        }
        var newexp = experience;
        if (position) { newexp.position = position };
        if (org) { newexp.org = org };
        if (start_year) { newexp.start_year = start_year };
        if (end_year) { newexp.end_year = end_year };
        Experience.Array.map((exp)=>{
            if(exp._id.toString()==req.params.id)
            return newexp;
            else
            return exp;
        })
        await Experience.save();
        return res.send({ edu: newexp, msg: "Education updated successfully" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ msg: "Internal Server error" });
    }

}

const deleteExp = async (req, res) => {
    try {
        const {Experience} = await User_stu.findById(req.user.id)
        .populate({ path: "Experience"});
        const experience=Experience.Array.find(exp=>exp._id.toString()==req.params.id);
        if (!experience) {
            return res.status(404).send({ msg: "education not found" });
        }
        if (Experience.User.toString() !== req.user.id) {
            return res.status(401).send({ msg: "Access denied" });
        }
        Experience.Array=Experience.Array.filter((exp)=>exp._id.toString()!=req.params.id);
        await Experience.save();
        return res.send({ experience: experience, msg: "Experience deleted successfully" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ msg: "Internal Server error" });
    }

}
module.exports = { handleMyProfile, handleDisplayProfile, handleAddProject, handleUpdateProject, handleDeleteProject,handleUpdateEdu, addExp, updateExp, deleteExp };