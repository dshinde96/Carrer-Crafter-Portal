import { useContext, useEffect, useState } from "react";
import {useNavigate, useParams} from 'react-router-dom'
import stucontext from "../../../../context/stucontext";
const UpdateProject=()=>{
    const navigate=useNavigate();
    const {update_experience}=useContext(stucontext);
    const {experience}=useContext(stucontext).profile;

    const {id}=useParams();
    console.log(id);

    // var p1={title:"",description:"",start_date:"",end_date:""};
    var p1=experience.find((exp)=>exp._id===id);
    console.log(p1);
    const [exp,setexp]=useState(p1);
    const handle_change=(event)=>{
        setexp({...exp,[event.target.name]:event.target.value});
        // console.log();
    }

    // useEffect(()=>{
    //     p1=projects.find((project)=>project._id=id);
    //     setproject(p1);
    // })
    return (
        <>
            <form style={{marginTop:"80px",marginLeft:"50px"}}>
            <h2>Update Experience</h2>
            <h6>Title and description must have minimum length of 5 characters</h6>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Position of responsibility</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="position" value={exp.position} onChange={handle_change}/>
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Oranisation where you worked</label>
                    <input type="text" className="form-control" id="exampleInputPassword1" value={exp.org} name="org" onChange={handle_change}/>
                </div>
                <div className="mb-3" style={{"width":"500px"}}>
                    <label for="exampleInputPassword1" className="form-label">Starting Year</label>
                    <input type="Date" className="form-control" id="exampleInputPassword1" value={exp.start_year} name="start_year" onChange={handle_change}/>
                </div>
                <div className="mb-3" style={{"width":"500px"}}>
                    <label for="exampleInputPassword1" className="form-label">Ending Year</label>
                    <input type="Date" className="form-control" id="exampleInputPassword1" value={exp.end_year} name="end_year" onChange={handle_change}/>
                </div>
                <button type="button" className="btn btn-primary" onClick={()=>{update_experience(id,exp);navigate('/myProfile')}}>Submit</button>
            </form>
        </>
    )
}

export default UpdateProject;