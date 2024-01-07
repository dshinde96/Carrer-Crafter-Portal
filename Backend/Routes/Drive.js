const express = require('express');
const router = express.Router();
const Drives = require('../Models/Drive');
const User_stu = require('../Models/User_stu');
const { AuthenticateUser, restrictTo } = require('../Middleware/Authentication');
const Education = require('../Models/Education');

//router:POST:/getAllDrive=>Fetch All Drives => Must login as Student or Department Admin or Admin
router.get('/getAllDrive', AuthenticateUser, async (req, res) => {
    try {
        let drives = await Drives.find({}).select("-InterestedStu -EligibleStu -SelectedStu");
        drives.reverse();
        return res.send({ drives, msg: "All drives fetched successfully" });
    } catch (error) {
        return res.status(500).send({ msg: "Internal server error" });
    }
})

//router:POST:/displatDrive/:id=>Display the information of the drive => Must login as Student or Department Admin or Admin
router.get('/dsiplay/:id', AuthenticateUser, async (req, res) => {
    try {
        const drive = await Drives.findById(req.params.id).select("-InterestedStu -EligibleStu -SelectedStu");
        if (!drive) {
            return res.status(404).send({ msg: "Drive with specified id not found" })
        }
        return res.send({ drive, msg: "Drives fetched Suucessfully" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ msg: "Internal Server error" });
    }
})

//router:POST:/newDrive=>Create a new Drive => Must login as Admin
router.post('/newDrive', AuthenticateUser, restrictTo(["TPO_Admin"]), async (req, res) => {
    try {
        const { CompanyName, JobTitle, JobDescription, Package, ExpectedOpening, EligibilityCriteria } = req.body;
        const newdrive = await Drives.create({
            CompanyName, JobTitle, JobDescription, Package, ExpectedOpening, EligibilityCriteria
        });
        res.send({ newdrive, msg: "Drive Created Successfully" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ msg: "Internal Server error" });
    }
})

//router:POST:/Apply/:id=>Apply to existing Drive => Must login as Student
router.post('/Apply/:id', AuthenticateUser, restrictTo(["Student"]), async (req, res) => {
    const drive = await Drives.findById(req.params.id);
    if (!drive) {
        return res.status(404).send({ msg: "Drives not found" });
    }
    let stu = await User_stu.findById(req.user.id);
    let isapplied = stu.applicationHistory.find((appl) => appl.DriveId.toString() === req.params.id);
    if (isapplied) {
        return res.send({ msg: "You have already applied for the drive" });
    }
    drive.InterestedStu.push({ StuId: req.user.id });
    await Drives.findByIdAndUpdate(req.params.id, { $set: drive });
    stu.applicationHistory.push({ DriveId: req.params.id, status: "Applied, Awaiting TPO approval" });
    await User_stu.findByIdAndUpdate(req.user.id, { $set: stu });
    res.send({ stu, msg: "Applied Successfully" });
});

//router:POST:/getSelectedStu/:id=>Get the result of the particular Drive => Must login as Admin or Department Admin or Studnet
router.get('/getSelectedStu/:id', AuthenticateUser, async (req, res) => {
    try {
        const drive = await Drives.findById(req.params.id);
        if (!drive) {
            return res.status(404).send({ msg: "Drive not found" });
        }
        let students = [];
        await drive.populate("SelectedStu.StuId");
        //wait until all the promise execute
        await Promise.all(
            drive.SelectedStu.map(async (stu, index) => {
                const Student = {
                    name: stu.StuId.name,
                    reg_no: stu.StuId.reg_no,
                    email: stu.StuId.email,
                    mob_no: stu.StuId.mob_no,
                    role: stu.StuId.role,
                    dob: stu.StuId.dob,
                    dept: stu.StuId.dept,
                    year: stu.StuId.year,
                    placed: stu.StuId.placed
                };
                const edu = await Education.find({ user: stu.StuId });
                if (Student) {
                    students.push({ "profile": Student, "Percentage10th": edu[0].percentage, "Percentage12th": edu[1].percentage, "BtechCGPA": edu[2].percentage });
                }
            })
        )
        return res.send({ students, msg: "Stundets fetched Successfully" });
    } catch (error) {
        return res.status(500).send({ messge: error.message, msg: "Internal server Error" });
    }
})

//router:POST:/getStudents=>Fetch All the Student of the drive->Interested,Eligible,Selected => Must login as Admin
router.get('/getStudent/:cat/:id', AuthenticateUser, restrictTo(["TPO_Admin"]), async (req, res) => {
    try {
        const { id, cat } = req.params
        const drive = await Drives.findById(id);
        if (!drive) {
            return res.status(404).send({ msg: "Drive not found" });
        }

        let students = [];
        //wait until all the promise execute
        if (cat === "InterestedStu") {
            await Promise.all(drive.InterestedStu.map(async (stu) => {
                const Student = await User_stu.findById(stu.StuId).select("-password -__v");
                // console.log(Student);
                const edu = await Education.find({ user: stu.StuId });
                if (Student) {
                    students.push({ "profile": Student, "Percentage10th": edu[0].percentage, "Percentage12th": edu[1].percentage, "BtechCGPA": edu[2].percentage });
                    // students.push(Student);
                }
            }))
        }
        else if (cat === "EligibleStu") {
            await Promise.all(drive.EligibleStu.map(async (stu) => {
                const Student = await User_stu.findById(stu.StuId).select("-password -__v");
                // console.log(Student);
                const edu = await Education.find({ user: stu.StuId });
                if (Student) {
                    students.push({ "profile": Student, "Percentage10th": edu[0].percentage, "Percentage12th": edu[1].percentage, "BtechCGPA": edu[2].percentage });
                    // students.push(Student);
                }
            }))
        }
        else if (cat === "SelectedStu") {
            await Promise.all(drive.SelectedStu.map(async (stu) => {
                const Student = await User_stu.findById(stu.StuId).select("-password -__v");
                // console.log(Student);
                const edu = await Education.find({ user: stu.StuId });
                if (Student) {
                    students.push({ "profile": Student, "Percentage10th": edu[0].percentage, "Percentage12th": edu[1].percentage, "BtechCGPA": edu[2].percentage });
                    // students.push(Student);
                }
            }))
        }
        // console.log(students);
        // students=students.reverse();
        return res.send({ students, msg: "Stundets fetched Successfully" });
    } catch (error) {
        return res.status(500).send({ messge: error.message, msg: "Internal server Error" });
    }
})

//router:POST:/addEligibleStu/:id=>Accept the pplication of a student for the particular drive => Must login as Admin
router.post('/addEligibleStu/:id', AuthenticateUser, restrictTo(["TPO_Admin"]), async (req, res) => {
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
    if (!drive.InterestedStu.find((stu) => stu.StuId.toString() === selectedStuid)) {
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
    drive.EligibleStu.push({ StuId: selectedStuid });
    drive.InterestedStu = drive.InterestedStu.filter((stu) => stu.StuId != selectedStuid);
    await Drives.findByIdAndUpdate(req.params.id, { $set: drive });
    res.send({ drive, msg: "Student Added Successfully" });
    // selectedStu.map(async(id)=>{

    // })
});

//router:POST:/addSelectedStu/:id=>Mark the student as placed in particular drive => Must login as Admin
router.post('/addSelectedStu/:id', AuthenticateUser, restrictTo(["TPO_Admin"]), async (req, res) => {
    let drive = await Drives.findById(req.params.id);
    if (!drive) {
        res.status(404).send({ msg: "Not found" });
    }
    const { selectedStuid } = req.body;
    let Student = await User_stu.findById(selectedStuid);
    if (!Student) {
        return res.status(404).send({ msg: "Student not found" })
    }
    if (!drive.EligibleStu.find((stu) => stu.StuId.toString() === selectedStuid)) {
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
    drive.SelectedStu.push({ StuId: selectedStuid });
    drive.EligibleStu = drive.EligibleStu.filter((stu) => stu.StuId != selectedStuid);
    await Drives.findByIdAndUpdate(req.params.id, { $set: drive });
    res.send({ drive, msg: "Student Added Successfully" });
});

//router:POST:/rejectStu/:id=>Reject the application of the particular student for the particular drive => Must login as Admin
router.post('/rejectStu/:id', AuthenticateUser, restrictTo(["TPO_Admin"]), async (req, res) => {
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
    if (!drive.InterestedStu.find((stu) => stu.StuId.toString() === selectedStuid)) {
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
    res.send({ msg: "Rejected Suucessfully" });
    // selectedStu.map(async(id)=>{

    // })
});

module.exports = router;