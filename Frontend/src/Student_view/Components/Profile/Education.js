import React, { useContext } from "react";
import stucontext from "../../../context/stucontext";
import EducationItem from './Education/EducationItem'
import { useNavigate } from "react-router-dom";
const Education = () => {
    const { education } = useContext(stucontext).profile;
    const navigate=useNavigate();
    // if (education.length == 0) {
    //     return <></>
    // }
    return (
        <>
            <div className="profile_item">
                <div className="btn_cnt">
                    <h3>Education</h3>
                    <button type="button" class="btn btn-primary btn_add" onClick={()=>navigate('/myprofile/addEducation')}>Add Education</button>
                </div>
                <div className="profile_cnt" id="experience">
                    {education.map((ele) => {
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