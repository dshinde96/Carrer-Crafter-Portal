

import { useContext, useState } from "react";
import {useNavigate} from 'react-router-dom'
import stucontext from "../../../../context/stucontext";
const AddEducation = () => {
    const navigate=useNavigate();
    const {add_education}=useContext(stucontext);
    const e1={title:"",school:"",start_year:"",end_year:"",percentage:0};
    const [education,setedcation]=useState(e1);
    const handle_change=(event)=>{
        setedcation({...education,[event.target.name]:event.target.value});
        // console.log();
    }
    return (
        <>
            <form style={{marginTop:"80px",marginLeft:"50px"}}>
            <h2>Add Education</h2>
            <h6>Title and description must have minimum length of 5 characters</h6>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Education Title</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="title" value={education.title} onChange={handle_change}/>
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">School/College/University</label>
                    <input type="text" className="form-control" id="exampleInputPassword1" value={education.school} name="school" onChange={handle_change}/>
                </div>
                <div className="mb-3" style={{"width":"500px"}}>
                    <label for="exampleInputPassword1" className="form-label">Starting Year</label>
                    <input type="Date" className="form-control" id="exampleInputPassword1" value={education.start_year} name="start_year" onChange={handle_change}/>
                </div>
                <div className="mb-3" style={{"width":"500px"}}>
                    <label for="exampleInputPassword1" className="form-label">Ending Year(completed or expecting to complete)</label>
                    <input type="Date" className="form-control" id="exampleInputPassword1" value={education.end_year} name="end_year" onChange={handle_change}/>
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Overall Percentage/CGPA</label>
                    <input type="number" className="form-control" id="exampleInputPassword1" value={education.percentage} name="percentage" onChange={handle_change}/>
                </div>
                <button type="button" className="btn btn-primary" onClick={()=>{add_education(education);navigate('/myProfile')}}>Submit</button>
            </form>
        </>
    )
}
export default AddEducation;