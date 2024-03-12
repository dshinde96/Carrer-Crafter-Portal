import React, { useContext, useEffect, useState } from 'react';
import TpoAdminContext from '../../../context/TpoAdminstate';
import { useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const Row = (props) => {
    const {addEligibleStu,addSelectedStu,rejectStu}=useContext(TpoAdminContext);
    const navigate = useNavigate();
    const {stu,index,driveId,cat}=props;
    console.log(stu);
    return (
        <>
            <tr className='Row' id="Row" >
                <td onClick={() => navigate(`/profile/display/${stu.profile._id}`)}>{index}</td>
                <td onClick={() => navigate(`/profile/display/${stu.profile._id}`)}>{stu.profile.name}</td>
                <td onClick={() => navigate(`/profile/display/${stu.profile._id}`)}>{stu.Percentage10th}</td>
                <td onClick={() => navigate(`/profile/display/${stu.profile._id}`)}>{stu.Percentage12th}</td>
                <td onClick={() => navigate(`/profile/display/${stu.profile._id}`)}>{stu.BtechCGPA}</td>
                <td onClick={() => navigate(`/profile/display/${stu.profile._id}`)}>{stu.profile.year}</td>
                <td onClick={() => navigate(`/profile/display/${stu.profile._id}`)}>{stu.profile.placed?"Placed":"Unplaced"}</td>
                <td>
                {cat=="InterestedStu"?<div className="btns">
                        <i className="fa fa-check edit_btn" title="Select Student" onClick={()=>addEligibleStu(stu.profile._id,driveId)}></i>
                       <i className="fa fa-trash delete_btn" title="Delete Item" onClick={()=>rejectStu(stu.profile._id,driveId)}></i>
                </div>:""}
                {cat=="EligibleStu"?<div className="btns">
                        <i className="fa fa-check edit_btn" title="Select Student" onClick={()=>addSelectedStu(stu.profile._id,driveId)}></i>
                </div>:""}
                {cat=="SelectedStu"?<div className="btns">NA</div>:""}
                </td>
            </tr>
        </>
    )
}

export default Row;