const Drives = require('../Models/Drive');
const User_stu = require('../Models/User_stu');
const Education = require('../Models/Education');
const Applications = require('../Models/Applications');
const { SendMail } = require('../Services/MailSender');

const handleGetAllDrive = async (req, res) => {
    try {
        let drives = await Drives.find({}).select("-InterestedStu -EligibleStu -SelectedStu");
        drives.reverse();
        return res.send({ drives, msg: "All drives fetched successfully" });
    } catch (error) {
        return res.status(500).send({ msg: "Internal server error" });
    }
}

const handleDisplayDrive = async (req, res) => {
    try {
        const drive = await Drives.findById(req.params.id).select("-InterestedStu -EligibleStu -SelectedStu -createdAt -updatedAt");
        if (!drive) {
            return res.status(404).send({ msg: "Drive with specified id not found" })
        }
        return res.send({ drive, msg: "Drives fetched Suucessfully" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ msg: "Internal Server error" });
    }
}

const handleNewDrive = async (req, res) => {
    try {
        const { CompanyName, JobTitle, JobDescription, Package, ExpectedOpening, EligibilityCriteria, EligibleDepartMents, EligibleYears, Questions } = req.body;
        const newdrive = await Drives.create({
            CompanyName, JobTitle, JobDescription, Package, ExpectedOpening, EligibilityCriteria, EligibleDepartMents, EligibleYears, Questions
        });
        const Users = await User_stu.find({}).select("email");
        const emails = [];
        Users.map((user) => {
            emails.push(user.email);
        })
        // console.log(emails);
        const Subject = `${CompanyName}- New Drive Alert!`;
        const content = `
        <h3>Login to your account to see more details and apply to the drive.</h3>
        <table style="border:1px solid black; border-collapse: collapse; padding:2px">
            <tr>
                <th style="border:1px solid black; border-collapse: collapse; padding:2px;">CompanyName</th>
                <td style="border:1px solid black; border-collapse: collapse; padding:2px;">${CompanyName}</td>
            </tr>
            <tr>
                <th style="border:1px solid black; border-collapse: collapse; padding:2px;">JobTitle</th>
                <td style="border:1px solid black; border-collapse: collapse; padding:2px;">${JobTitle}</td>
            </tr>
            <tr>
                <th style="border:1px solid black; border-collapse: collapse; padding:2px;">JobDescription</th>
                <td style="border:1px solid black; border-collapse: collapse; padding:2px;">${JobDescription}</td>
            </tr>
            <tr>
                <th style="border:1px solid black; border-collapse: collapse; padding:2px;">Package</th>
                <td style="border:1px solid black; border-collapse: collapse; padding:2px;">${Package}</td>
            </tr>
        </table>
        `;
        await SendMail(emails, Subject, content);
        res.send({ newdrive, msg: "Drive Created Successfully" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ msg: "Internal Server error" });
    }
}

const handleApplyToDrive = async (req, res) => {
    try {
        const drive = await Drives.findById(req.params.id);
        // console.log(drive);
        if (!drive) {
            return res.status(404).send({ msg: "Drives not found" });
        }
        let stu = await User_stu.findById(req.user.id);
        if (!stu) {
            return res.status(404).json({ msg: "User not valid" });
        }
        if (!drive.EligibleDepartMents.includes(stu.dept) || !drive.EligibleYears.includes(stu.year)) {
            return res.status(401).json({ msg: "Not Eligible to apply to this Drive" });
        }
        let isapplied = stu.applicationHistory.find((appl) => appl.DriveId.toString() === req.params.id);
        if (isapplied) {
            return res.send({ msg: "You have already applied for the drive" });
        }
        const { Answers } = req.body;
        const application = await Applications.create({
            DriveId: drive._id,
            StudentId: req.user.id,
            Answers
        });
        console.log(application);
        drive.InterestedStu.push({ StuId: req.user.id, ApplicationID: application._id });
        await Drives.findByIdAndUpdate(req.params.id, { $set: drive });
        stu.applicationHistory.push({ DriveId: req.params.id, ApplicationId: application._id, status: "Applied, Awaiting TPO approval" });
        await User_stu.findByIdAndUpdate(req.user.id, { $set: stu });
        res.send({ stu, msg: "Applied Successfully" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
}

const handleGetSelectedStu = async (req, res) => {
    try {
        const drive = await Drives.findById(req.params.id)
            .select("SelectedStu Questions")
            .populate({
                path: "SelectedStu.StuId",
                populate: {
                    path: "Education"
                }
            })
            .populate({
                path: "SelectedStu.ApplicationID"
            })
        if (!drive) {
            return res.status(404).send({ msg: "Drive not found" });
        }
        // return res.json({SelectedStu:drive.SelectedStu});
        let students = [];
        //wait until all the promise execute
        await Promise.all(
            drive.SelectedStu.map(async (stu, index) => {
                let Student = {
                    "profile": {
                        name: stu.StuId.name,
                        reg_no: stu.StuId.reg_no,
                        email: stu.StuId.email,
                        mob_no: stu.StuId.mob_no,
                        role: stu.StuId.role,
                        dob: stu.StuId.dob,
                        dept: stu.StuId.dept,
                        year: stu.StuId.year,
                        placed: stu.StuId.placed
                    }, "Percentage10th": stu.StuId.Education.Array[0].percentage, "Percentage12th": stu.StuId.Education.Array[1].percentage, "BtechCGPA": stu.StuId.Education.Array[2].percentage
                };
                for (let i = 0; i < drive.Questions.length; i++) {
                    Student.Application = drive.SelectedStu[index].ApplicationID.Answers;
                }
                students.push(Student);
            })
        )
        return res.send({ students, msg: "Stundets fetched Successfully" });
    } catch (error) {
        return res.status(500).send({ messge: error.message, msg: "Internal server Error" });
    }
}

const handleDriveStudent = async (req, res) => {
    try {
        const { id, cat } = req.params;

        let students = [];
        //wait until all the promise execute
        if (cat === "InterestedStu") {
            const drive = await Drives.findById(id)
                .select("InterestedStu Questions")
                .populate({
                    path: "InterestedStu.StuId",
                    select: "-password",
                    populate: {
                        path: "Education"
                    }
                })
                .populate({
                    path: "InterestedStu.ApplicationID"
                });
            // return res.json({drive});
            await Promise.all(drive.InterestedStu.map(async (stu, index) => {
                let Student = {
                    "profile": {
                        _id: stu.StuId._id,
                        name: stu.StuId.name,
                        reg_no: stu.StuId.reg_no,
                        email: stu.StuId.email,
                        mob_no: stu.StuId.mob_no,
                        role: stu.StuId.role,
                        dob: stu.StuId.dob,
                        dept: stu.StuId.dept,
                        year: stu.StuId.year,
                        placed: stu.StuId.placed
                    }, "Percentage10th": stu.StuId.Education.Array[0].percentage, "Percentage12th": stu.StuId.Education.Array[1].percentage, "BtechCGPA": stu.StuId.Education.Array[2].percentage
                };
                students.push(Student);
            }));
        }
        else if (cat === "EligibleStu") {
            const drive = await Drives.findById(id)
                .select("EligibleStu Questions")
                .populate({
                    path: "EligibleStu.StuId",
                    select: "-password",
                    populate: {
                        path: "Education"
                    }
                })
                .populate({
                    path: "EligibleStu.ApplicationID"
                });
            // return res.json({drive});
            await Promise.all(
                drive.EligibleStu.map(async (stu, index) => {
                    let Student = {
                        "profile": {
                            _id: stu.StuId._id,
                            name: stu.StuId.name,
                            reg_no: stu.StuId.reg_no,
                            email: stu.StuId.email,
                            mob_no: stu.StuId.mob_no,
                            role: stu.StuId.role,
                            dob: stu.StuId.dob,
                            dept: stu.StuId.dept,
                            year: stu.StuId.year,
                            placed: stu.StuId.placed
                        }, "Percentage10th": stu.StuId.Education.Array[0].percentage, "Percentage12th": stu.StuId.Education.Array[1].percentage, "BtechCGPA": stu.StuId.Education.Array[2].percentage
                    };
                    for (let i = 0; i < drive.Questions.length; i++) {
                        Student.Application = drive.EligibleStu[index].ApplicationID.Answers;
                    }
                    students.push(Student);
                })
            )
        }
        else if (cat === "SelectedStu") {
            const drive = await Drives.findById(id)
                .select("SelectedStu Questions")
                .populate({
                    path: "SelectedStu.StuId",
                    select: "-password",
                    populate: {
                        path: "Education"
                    }
                })
                .populate({
                    path: "SelectedStu.ApplicationID"
                });
            // return res.json({drive});
            await Promise.all(drive.SelectedStu.map(async (stu, index) => {
                let Student = {
                    "profile": {
                        _id: stu.StuId._id,
                        name: stu.StuId.name,
                        reg_no: stu.StuId.reg_no,
                        email: stu.StuId.email,
                        mob_no: stu.StuId.mob_no,
                        role: stu.StuId.role,
                        dob: stu.StuId.dob,
                        dept: stu.StuId.dept,
                        year: stu.StuId.year,
                        placed: stu.StuId.placed
                    }, "Percentage10th": stu.StuId.Education.Array[0].percentage, "Percentage12th": stu.StuId.Education.Array[1].percentage, "BtechCGPA": stu.StuId.Education.Array[2].percentage
                };
                students.push(Student);
            }));
        }
        return res.send({ students, msg: "Stundets fetched Successfully" });
    } catch (error) {
        return res.status(500).send({ messge: error.message, msg: "Internal server Error" });
    }
}

const handleAddEligibleStu = async (req, res) => {
    try {
        let drive = await Drives.findById(req.params.id);
        if (!drive) {
            res.status(404).send({ msg: "Not found" });
        }
        const { selectedStuid } = req.body;
        // console.log(req.body);
        let Student = await User_stu.findById(selectedStuid);
        if (!Student) {
            return res.status(404).send({ msg: "Student not found" })
        }
        const application = drive.InterestedStu.find((stu) => stu.StuId.toString() === selectedStuid);
        if (!application) {
            return res.send({ msg: "Student did not applied for this drive" })
        }
        if (drive.EligibleStu.find((stu) => stu.StuId.toString() === selectedStuid)) {
            return res.send({ msg: "Student already add to eligible" })
        }
        Student.applicationHistory.find((application) => {
            // console.log(application);
            if (application.DriveId.toString() === req.params.id) {
                // console.log(application.status);
                application.status = "Apporved by TPO, Further process will be initialised soon";
            }
        });
        await User_stu.findByIdAndUpdate(selectedStuid, { $set: Student });
        drive.EligibleStu.push(application);
        drive.InterestedStu = drive.InterestedStu.filter((stu) => stu.StuId != selectedStuid);
        await Drives.findByIdAndUpdate(req.params.id, { $set: drive });
        res.send({ drive, msg: "Student Added Successfully" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
}

const handleAddSelectedStu = async (req, res) => {
    try {
        let drive = await Drives.findById(req.params.id);
        if (!drive) {
            res.status(404).send({ msg: "Not found" });
        }
        const { selectedStuid } = req.body;
        let Student = await User_stu.findById(selectedStuid);
        if (!Student) {
            return res.status(404).send({ msg: "Student not found" })
        }
        const application = drive.EligibleStu.find((stu) => stu.StuId.toString() === selectedStuid);
        if (!application) {
            return res.send({ msg: "Student is not approved by tpo" });
        }
        if (drive.SelectedStu.find((stu) => stu.StuId.toString() === selectedStuid)) {
            return res.send({ msg: "Student is already selected in the drive" });
        }
        Student.placed = true;
        Student.CompanyName.push(drive.CompanyName);
        Student.applicationHistory.find((application) => {
            // console.log(application);
            if (application.DriveId.toString() === req.params.id) {
                // console.log(application.status);
                application.status = "Selected";
            }
        });
        await User_stu.findByIdAndUpdate(selectedStuid, { $set: Student });
        drive.SelectedStu.push(application);
        drive.EligibleStu = drive.EligibleStu.filter((stu) => stu.StuId != selectedStuid);
        await Drives.findByIdAndUpdate(req.params.id, { $set: drive });
        res.send({ drive, msg: "Student Added Successfully" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
}

const handleRejectStu = async (req, res) => {
    try {
        let drive = await Drives.findById(req.params.id);
    if (!drive) {
        res.status(404).send({ msg: "Not found" });
    }
    const { selectedStuid } = req.body;
    // console.log(req.body);
    let Student = await User_stu.findById(selectedStuid);
    if (!Student) {
        return res.status(404).send({ msg: "Student not found" })
    }
    const application = drive.InterestedStu.find((stu) => stu.StuId.toString() === selectedStuid);
    if (!application) {
        return res.send({ msg: "Student did not applied for this drive" })
    }
    Student.applicationHistory.find((application) => {
        // console.log(application);
        if (application.DriveId.toString() === req.params.id) {
            // console.log(application.status);
            application.status = "Rejected by TPO";
        }
    });
    await User_stu.findByIdAndUpdate(selectedStuid, { $set: Student });
    drive.InterestedStu = drive.InterestedStu.filter((stu) => stu.StuId != selectedStuid);
    await Drives.findByIdAndUpdate(req.params.id, { $set: drive });
    await Applications.findByIdAndDelete(application.ApplicationID);
    res.send({ msg: "Rejected Suucessfully" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({msg:"Internal Server Error"});
    }
}
module.exports = { handleGetAllDrive, handleDisplayDrive, handleNewDrive, handleApplyToDrive, handleGetSelectedStu, handleDriveStudent, handleAddEligibleStu, handleAddSelectedStu, handleRejectStu };