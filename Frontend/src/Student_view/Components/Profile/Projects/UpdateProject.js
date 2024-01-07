import { useContext, useEffect, useState } from "react";
import {useNavigate, useParams} from 'react-router-dom'
import stucontext from "../../../../context/stucontext";
const UpdateProject=()=>{
    const navigate=useNavigate();
    const {update_project}=useContext(stucontext);
    const {projects}=useContext(stucontext).profile;

    const {id}=useParams();
    console.log(id);

    // var p1={title:"",description:"",start_date:"",end_date:""};
    var p1=projects.find((project)=>project._id===id);
    console.log(p1);
    const [project,setproject]=useState(p1);
    const handle_change=(event)=>{
        setproject({...project,[event.target.name]:event.target.value});
        // console.log();
    }

    // useEffect(()=>{
    //     p1=projects.find((project)=>project._id=id);
    //     setproject(p1);
    // })
    return (
        <>
            <form style={{marginTop:"80px",marginLeft:"50px"}}>
            <h2>Add Project</h2>
            <h6>Title and description must have minimum length of 5 characters</h6>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Project Title</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="title" value={project.title} onChange={handle_change}/>
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Project description</label>
                    <input type="text" className="form-control" id="exampleInputPassword1" value={project.description} name="description" onChange={handle_change}/>
                </div>
                <div className="mb-3" style={{"width":"500px"}}>
                    <label for="exampleInputPassword1" className="form-label">Starting Date</label>
                    <input type="Date" className="form-control" id="exampleInputPassword1" value={project.start_date} name="start_date" onChange={handle_change}/>
                </div>
                <div className="mb-3" style={{"width":"500px"}}>
                    <label for="exampleInputPassword1" className="form-label">Ending Date</label>
                    <input type="Date" className="form-control" id="exampleInputPassword1" value={project.end_date} name="end_date" onChange={handle_change}/>
                </div>
                <button type="button" className="btn btn-primary" onClick={()=>{update_project(id,project);navigate('/myProfile')}}>Submit</button>
            </form>
        </>
    )
}

export default UpdateProject;