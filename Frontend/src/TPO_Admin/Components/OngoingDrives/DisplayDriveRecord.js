import { useContext, useEffect, useState } from "react";
import TpoAdminContext from "../../../context/TpoAdminstate";
import Spinner from "../../../Spinner/Spinner";
import Header from "../Header";
import Navbar from "../Navbar";
import { useParams } from "react-router-dom";
import Row from "./row";
import * as XLSX from 'xlsx';
const DriveRecord_cnt = (props) => {
    const { curDrive, DriveStu } = useContext(TpoAdminContext);
    console.log(curDrive);
    const params = useParams();
    const handleDownload = () => {

        // Convert JSON to Excel
        const students = [];
        DriveStu.map((stu) => {
            let Student={
                name: stu.profile.name,
                email: stu.profile.email,
                "Moblie No": `${stu.profile.mob_no}`,
                "Date of birth": `${new Date(stu.profile.dob).getDate()}/${new Date(stu.profile.dob).getMonth()}/${new Date(stu.profile.dob).getFullYear()}`,
                Department: stu.profile.dept,
                year: stu.profile.year,
                "10th Percentage": stu.Percentage10th,
                "12th/Diploma Percentage": stu.Percentage10th,
                "Btech CGPA": stu.Percentage10th
            }
            curDrive.Questions.map((que)=>{
                Student[que]=stu.Application[que];
            })
            students.push(Student)
        })
        const ws = XLSX.utils.json_to_sheet(students);

        // Create a workbook and add the worksheet
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        // Save the workbook as an Excel file
        const fileName = `${curDrive.CompanyName} Eligible Students.xlsx`;
        XLSX.writeFile(wb, fileName);
    };
    return (
        <>
            <div className="container">
                <p>Company Name: <spam>{curDrive.CompanyName}</spam></p>
                <p>JobTitle: <spam>{curDrive.JobTitle}</spam></p>
                <p>JobDescription: <spam>{curDrive.JobDescription}</spam></p>
                <p>Package: <spam>{curDrive.Package}</spam></p>
                <p>ExpectedOpening: <spam>{curDrive.ExpectedOpening}</spam></p>
                <p>EligibilityCriteria: <spam>{curDrive.EligibilityCriteria}</spam></p>
            </div>
            <div className="container mt-4">
                {params.category == "InterestedStu" && <h4>Applications</h4>}
                {params.category == "EligibleStu" && <h4>Shortlisted Students</h4>}
                {params.category == "SelectedStu" && <h4>Selected Students</h4>}
                <h4></h4>
                <table>
                    <tr>
                        <th>Sr no</th>
                        <th>Name</th>
                        <th>10th Percentage</th>
                        <th>12th percentage</th>
                        <th>Btech CGPA</th>
                        <th>Year</th>
                        <th>Placed</th>
                        <th>Action</th>
                    </tr>
                    {DriveStu && DriveStu.map((stu, index) => <Row stu={stu} index={index + 1} driveId={curDrive._id} cat={params.category} />)}

                </table>

                <div><div className="Downloadbtn">
                    {params.category == "EligibleStu" ? <button type="button" class="btn btn-primary mx-2 my-2" onClick={handleDownload} disabled={DriveStu.length === 0 ? "true" : ""}>Download Eligible Student data</button> : ""}
                </div></div>
            </div>
        </>
    )
}


const DriveRecord = () => {
    const { fetchCurDrive, loading, setloading, setDriveStu, fetchDriveStu } = useContext(TpoAdminContext);
    const params = useParams();
    useEffect(() => {
        console.log(params.category);
        setDriveStu([]);
        setloading(true);
        fetchCurDrive(params.id);
        fetchDriveStu(params.category, params.id);
        setloading(false);
    }, []);

    return (
        <>
            <Header />
            <Navbar />
            {loading ? <Spinner /> : <DriveRecord_cnt />}
        </>
    )
}

export default DriveRecord;