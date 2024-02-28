import React from 'react';
// import '../Placement_stat/CSS/row.css'
import { useNavigate } from 'react-router-dom';
const Row=(props)=>{
    const navigate=useNavigate();
    return(
        <>
        <tr className='Row neo' id="Row" >
        {/* {console.log(props.value)} */}
        <td  onClick={()=>navigate(`/profile/display/${props.student._id}`)}>{props.index+1}</td>
        <td  onClick={()=>navigate(`/profile/display/${props.student._id}`)}>{props.student.name}</td>
        <td  onClick={()=>navigate(`/profile/display/${props.student._id}`)}>{props.student.reg_no}</td>
        <td  onClick={()=>navigate(`/profile/display/${props.student._id}`)}>{props.student.year}</td>
        <td  onClick={()=>navigate(`/profile/display/${props.student._id}`)}>{props.student.dept}</td>
        <td  onClick={()=>navigate(`/profile/display/${props.student._id}`)}>{props.student.placed?"Placed":"Unplaced"}</td>
        </tr>
        </>
    )
}

export default Row;