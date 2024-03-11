import React, { useContext } from "react";
import ProjectItem from './Projects/ProjectItem';
import { useNavigate } from "react-router-dom";
import TpoDeptcontext from "../../../../context/TpoDeptstate";
const Projects = () => {
    const { student } = useContext(TpoDeptcontext).Stuprofile;
    const navigate=useNavigate();
    // if (projects.length == 0) {
    //     return <></>
    // }
    return (
        <>
            <div className="profile_item">
                <div className="btn_cnt">
                    <h3>Projects</h3>
                </div>
                <div className="profile_cnt" id="projects">
                    {student.Project.Array  .map((ele) => {
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