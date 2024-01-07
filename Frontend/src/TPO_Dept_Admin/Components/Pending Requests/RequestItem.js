import { useContext } from "react";
import TpoDeptcontext from "../../../context/TpoDeptstate";

const RequestItem = (props) => {
    const { req } = props;
    const {acceptReq,rejectReq}=useContext(TpoDeptcontext);
    return (
        <>
            <div className="ReqItem">
                <p>Name: <spam>{req.name}</spam></p>
                <p>Registration No: <spam>{req.reg_no}</spam></p>
                <p>Department: <spam>{req.dept}</spam></p>
                <p>Year of Study: <spam>{req.year}</spam></p>
                <p>Date of Birth: <spam>{`${new Date(req.dob).getDate()}/${new Date(req.dob).getMonth()}/${new Date(req.dob).getFullYear()}`}</spam></p>
                <div className="Reqbtns">
                    <button type="button" className="btn btn-success mx-3" onClick={()=>acceptReq(req._id)}>Accept</button>
                    <button type="button" className="btn btn-danger mx-3" onClick={()=>rejectReq(req._id)}>Reject</button>
                </div>
            </div>
        </>
    )
}

export default RequestItem;