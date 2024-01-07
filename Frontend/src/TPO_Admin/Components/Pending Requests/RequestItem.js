import { useContext } from "react";

const RequestItem = (props) => {
    const { req } = props;
    return (
        <>
            <div className="ReqItem">
                <p>Name: <spam>{req.name}</spam></p>
                <p>Registration No: <spam>{req.reg_no}</spam></p>
                <p>Department: <spam>{req.dept}</spam></p>
                <p>Year of Study: <spam>{req.year}</spam></p>
                <p>Date of Birth: <spam>{`${new Date(req.dob).getDate()}/${new Date(req.dob).getMonth()}/${new Date(req.dob).getFullYear()}`}</spam></p>
            </div>
        </>
    )
}

export default RequestItem;