import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const Row = (props) => {
    const navigate = useNavigate();
    const {stu,index}=props;
    return (
        <>
            <tr className='Row' id="Row" >
                <td >{index}</td>
                <td >{stu.profile.name}</td>
                <td >{stu.Percentage10th}</td>
                <td >{stu.Percentage12th}</td>
                <td >{stu.BtechCGPA}</td>
                <td >{stu.profile.year}</td>
                <td >{stu.profile.placed?"Placed":"Unplaced"}</td>
            </tr>
        </>
    )
}

export default Row;