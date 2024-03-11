import React, { useContext } from "react";
import ProjectItem from './Projects/ProjectItem';
import { useNavigate } from "react-router-dom";
import TpoAdminContext from "../../../../context/TpoAdminstate";
const Projects = () => {
    const { Array } = useContext(TpoAdminContext).Stuprofile.student.Project;
    const navigate=useNavigate();
    return (
        <>
            <div className="profile_item">
                <div className="btn_cnt">
                    <h3>Projects</h3>
                </div>
                <div className="profile_cnt" id="projects">
                    {Array.map((ele) => {
                        return (
                            <ProjectItem project={ele} />
                        )
                    })}
                </div>
            </div>
        </>
    )
}
export default Projects;