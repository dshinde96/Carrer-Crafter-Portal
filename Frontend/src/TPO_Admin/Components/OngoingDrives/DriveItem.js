import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DriveItem = (props) => {
    const navigate=useNavigate();
    const { Drive} = props;
    // const {acceptReq,rejectReq}=useContext(stucontext);
    return (
        <>
            <div className="DriveItemAdmin">
                <div>
                <p>Company Name: <spam>{Drive.CompanyName}</spam></p>
                <p>JobTitle: <spam>{Drive.JobTitle}</spam></p>
                <p>JobDescription: <spam>{Drive.JobDescription}</spam></p>
                </div>
                <div className="btn_cnt">
                    <button type="button" class="btn btn-success mx-2">Edit DriveInfo</button>
                    <button type="button" class="btn btn-success mx-2" onClick={()=>navigate(`/Drive/InterestedStu/${Drive._id}`)}>Applications</button>
                    <button type="button" class="btn btn-success mx-2" onClick={()=>navigate(`/Drive/EligibleStu/${Drive._id}`)}>Eligible Students</button>
                    <button type="button" class="btn btn-success mx-2" onClick={()=>navigate(`/Drive/SelectedStu/${Drive._id}`)}>Selected Students</button>
                </div>
                {/* <p>JobDescription: <spam>{Drive.JobDescription}</spam></p>
                <p>Package: <spam>{Drive.Package}</spam></p>
                <p>Expected Openings: <spam>{Drive.ExpectedOpening}</spam></p>
                <h5>Eligibility Criterias</h5>
                <ul>
                    {Drive.EligibilityCriteria.map((ele)=><li>{`${ele}`}</li>)}
                </ul> */}
                {/* <div className="Reqbtns">
                    {applicationStatus?<p>Status: <spam>{applicationStatus}</spam></p>:<button type="button" className="btn btn-primary mx-2" onClick={()=>{navigate(`/drive/apply/${Drive._id}`)}}>Apply now</button>}
                </div> */}
            </div>
        </>
    )
}

export default DriveItem;   