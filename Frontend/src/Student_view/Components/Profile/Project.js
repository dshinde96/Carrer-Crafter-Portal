import React, { useContext } from "react";
import stucontext from "../../../context/stucontext";
import ProjectItem from './Projects/ProjectItem';
import { useNavigate } from "react-router-dom";
const Projects = () => {
    const { projects } = useContext(stucontext).profile;
    const navigate=useNavigate();
    // if (projects.length == 0) {
    //     return <></>
    // }
    return (
        <>
            <div className="profile_item">
                <div className="btn_cnt">
                    <h3>Projects</h3>
                    <button type="button" class="btn btn-primary btn_add" onClick={()=>{navigate("/myprofile/addProject")}}>Add Project</button>
                </div>
                <div className="profile_cnt" id="projects">
                    {projects.map((ele) => {
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