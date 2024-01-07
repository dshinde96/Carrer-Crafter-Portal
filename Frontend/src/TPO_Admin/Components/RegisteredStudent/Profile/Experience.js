import React, { useContext } from "react";
import ExperienceItem from './Experience/ExperienceItem';
import { useNavigate } from "react-router-dom";
import TpoAdminContext from "../../../../context/TpoAdminstate";
const Experience = () => {
    const { experience } = useContext(TpoAdminContext).Stuprofile;
    const navigate=useNavigate();
    return (
        <>
            <div className="profile_item">
                <div className="btn_cnt">
                    <h3>Experience</h3>
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