

import { useContext, useState } from "react";
import {useNavigate} from 'react-router-dom'
import stucontext from "../../../../context/stucontext";
const AddExperience = () => {
    const navigate=useNavigate();
    const {add_experience}=useContext(stucontext);
    const p1={position:"",org:"",start_year:"",end_year:""};
    const [exp,setexp]=useState(p1);
    const handle_change=(event)=>{
        setexp({...exp,[event.target.name]:event.target.value});
        // console.log();
    }
    return (
        <>
            <form style={{marginTop:"80px",marginLeft:"50px"}}>
            <h2>Add Experience</h2>
            <h6>Title and description must have minimum length of 5 characters</h6>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Position of responsibility</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="position" value={exp.position} onChange={handle_change}/>
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Company where you worked</label>
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
                <button type="button" className="btn btn-primary" onClick={()=>{add_experience(exp);navigate('/myProfile')}}>Submit</button>
            </form>
        </>
    )
}
export default AddExperience;