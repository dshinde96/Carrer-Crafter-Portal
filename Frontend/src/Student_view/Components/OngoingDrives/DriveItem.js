import { useContext, useEffect, useState } from "react";
import stucontext from "../../../context/stucontext";
import { useNavigate } from "react-router-dom";

const DriveItem = (props) => {
    const { student } = useContext(stucontext).profile;
    const navigate = useNavigate();
    const { Drive } = props;
    const [applicationStatus, setapplicationStatus] = useState('');
    useEffect(() => {
        // fetchprofile();
        // console.log(student);
        const appl = student.applicationHistory.find((app) => app.DriveId === Drive._id);
        // console.log(appl);
        if (appl) {
            setapplicationStatus(appl.status);
        }
        // setloading(false);
    }, [])
    // const {acceptReq,rejectReq}=useContext(stucontext);
    return (
        <>
            <div className="ReqItem rounded">
                <p>Company Name: <spam>{Drive.CompanyName}</spam></p>
                <p>JobTitle: <spam>{Drive.JobTitle}</spam></p>
                <p>JobDescription: <spam>{Drive.JobDescription}</spam></p>
                <p>Package: <spam>{Drive.Package}</spam></p>
                <p>Expected Openings: <spam>{Drive.ExpectedOpening}</spam></p>
                <p>Eligibility Criterias <spam>{Drive.EligibilityCriteria}</spam></p>
                {
                    Drive.EligibleDepartMents.includes(student.dept) && Drive.EligibleYears.includes(student.year) ? <div className="Reqbtns">
                        {applicationStatus ? <p>Status: <spam>{applicationStatus}</spam></p> : <button type="button" className="btn btn-primary mx-2" onClick={() => { navigate(`/drive/apply/${Drive._id}`) }}>Apply now</button>}
                        <button className="btn btn-primary mx-2" onClick={() => navigate(`/drive/selectedStudents/${Drive._id}`)}>View Selected Students</button>
                    </div> : <p><spam>You are not eligible to apply to this drive</spam></p>
                }

            </div>
        </>
    )
}

export default DriveItem;   