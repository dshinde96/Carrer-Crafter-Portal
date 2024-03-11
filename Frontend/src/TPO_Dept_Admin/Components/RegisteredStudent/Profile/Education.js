import React, { useContext } from "react";
import EducationItem from './Education/EducationItem'
import { useNavigate } from "react-router-dom";
import TpoDeptcontext from "../../../../context/TpoDeptstate";
const Education = () => {
    const { student } = useContext(TpoDeptcontext).Stuprofile;
    // console.log(student);
    const navigate=useNavigate();
    // if (education.length == 0) {
    //     return <></>
    // }
    return (
        <>
            <div className="profile_item">
                <div className="btn_cnt">
                    <h3>Education</h3>
                </div>
                <div className="profile_cnt" id="experience">
                    {student.Education.Array.map((ele) => {
                        return (
                            <EducationItem edu={ele} />
                        )
                    })}
                </div>
            </div>
        </>
    )
}
export default Education;