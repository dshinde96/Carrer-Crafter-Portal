import React, { useContext } from "react";
import stucontext from "../../../context/stucontext";
import ExperienceItem from './Experience/ExperienceItem';
import { useNavigate } from "react-router-dom";
const Experience = () => {
    const { experience } = useContext(stucontext).profile;
    const navigate=useNavigate();
    // if (experience.length == 0) {
    //     return <></>
    // }
    return (
        <>
            <div className="profile_item">
                <div className="btn_cnt">
                    <h3>Experience</h3>
                    <button type="button" class="btn btn-primary btn_add" onClick={()=>navigate('/myprofile/addExperience')}>Add Experience</button>
                </div>
                <div className="profile_cnt" id="experience">
                    {experience.map((ele) => {
                        return (
                            <ExperienceItem exp={ele} />
                        )
                    })}
                </div>
            </div>
        </>
    )
}
export default Experience;