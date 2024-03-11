import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header"
import Navbar from "../Navbar"
import TpoAdminContext from "../../../context/TpoAdminstate";

const Signup = () => {
    const [drive, setdrive] = useState({
        "CompanyName": "",
        "JobTitle": "",
        "JobDescription": "",
        "Package": 0,
        "ExpectedOpening": 0,
        "EligibilityCriteria": "",
        "Questions":[]
    })
    const [Que,setQue]=useState('');
    const handle_change = (e) => {
        setdrive({ ...drive, [e.target.name]: e.target.value });
    }
    const {addDrive} = useContext(TpoAdminContext);
    const navigate = useNavigate();
    const handle_submit = () => {

    }
    return (
        <>
            <Header />
            <Navbar />
            <form className="container" style={{ marginTop: "100px" }}>

                <div className="container">
                    <h2>Add new Placement Drive</h2>
                    <div>
                        <label htmlFor="exampleInputEmail1" className="form-label">Name of the Company</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" name="CompanyName" onChange={handle_change} />
                    </div>

                    <div>
                        <label htmlFor="exampleInputEmail1" className="form-label">Title of the Job</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" name="JobTitle" onChange={handle_change} />
                    </div>

                    <div>
                        <label htmlFor="exampleInputEmail1" className="form-label">Description of the job</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="JobDescription" onChange={handle_change} />
                    </div>

                    <div>
                        <label htmlFor="exampleInputEmail1" className="form-label">Expected Pakage (In LPA)</label>
                        <input type="Number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="Package" onChange={handle_change} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Expected Number of Openings</label>
                        <input type="Number" className="form-control" name="ExpectedOpening" id="exampleInputPassword1" onChange={handle_change} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Eligibility Criteria (provide numbering to each criteria)</label>
                        <input type="text" className="form-control" name="EligibilityCriteria" id="exampleInputPassword1" onChange={handle_change} />
                    </div>

                    <div>
                        {drive.Questions.map((Que)=><p>{Que}</p>)}
                    </div>
                    <div>
                        <input type="text" value={Que} onChange={(e)=>setQue(e.target.value)}/>
                        <button type="button" onClick={()=>{drive.Questions.push(Que); setQue('');}}>Add Question</button>
                    </div>
                    <button className="btn btn-primary" type="button" onClick={() => {
                        addDrive(drive);
                        navigate('/AllDrives');
                    }}>Submit</button>
                </div>
            </form>
        </>
    )
}
export default Signup;