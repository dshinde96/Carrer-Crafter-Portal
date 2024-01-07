import { useContext, useEffect, useState } from "react";
import Spinner from "../../../Spinner/Spinner";
import Header from "../Header";
import Navbar from "../Navbar";
import { useParams } from "react-router-dom";
import Row from "./row";
import stucontext from "../../../context/stucontext";
const DriveRecord_cnt = (props) => {
    const { DriveStu } = useContext(stucontext);
    const params = useParams();
    // console.log("length "+DriveStu.length);
    return (
        <>
            {/* <div className="container">
                <p>Company Name: <spam>{curDrive.CompanyName}</spam></p>
                <p>JobTitle: <spam>{curDrive.JobTitle}</spam></p>
                <p>JobDescription: <spam>{curDrive.JobDescription}</spam></p>
                <p>Package: <spam>{curDrive.Package}</spam></p>
                <p>ExpectedOpening: <spam>{curDrive.ExpectedOpening}</spam></p>
                <p>EligibilityCriteria: <spam>{curDrive.EligibilityCriteria}</spam></p>
            </div> */}
            <div className="container">
                <h4>Selected Students</h4>
                <table>
                    <tr>
                        <th>Sr no</th>
                        <th>Name</th>
                        <th>10th Percentage</th>
                        <th>12th percentage</th>
                        <th>Btech CGPA</th>
                        <th>Year</th>
                        <th>Placed</th>
                    </tr>
                    {DriveStu.map((stu, index) => <Row stu={stu} index={index + 1}/>)}

                </table>
            </div>
        </>
    )
}


const DriveRecord = () => {
    // const { fetchCurDrive, curDrive, fetchprofile, loading, fetchInterestedStu, setloading,setDriveStu,fetchEligibleStu,fetchSelectedStu } = useContext(TpoAdminContext);
    const { setloading, loading,fetchprofile,fetchSelectedStu,setDriveStu } = useContext(stucontext);
    const params = useParams();
    // const [loaddata, setloaddata] = useState(true);
    // const [Students, setStudents] = useState([]);
    // setDriveStu([]);
    // console.log(loaddata);
    useEffect(() => {
        // console.log(params.category);
        setDriveStu([]);
        setloading(true);
        fetchprofile();
        // fetchCurDrive(params.id);
        fetchSelectedStu(params.id);
        setloading(false);
    }, []);

    return (
        <>
            <Header />
            <Navbar />
            {loading? <Spinner /> : <DriveRecord_cnt />}
        </>
    )
}

export default DriveRecord;