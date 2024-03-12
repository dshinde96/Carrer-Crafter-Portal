import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import stucontext from "../../../context/stucontext";
import Spinner from "../../../Spinner/Spinner";
import Header from "../Header";
import Navbar from "../Navbar";

const Applicationform_cnt = (props) => {
    const { profile, ApplyDrive } = useContext(stucontext);
    const { Drive } = props;
    console.log(Drive.Questions);
    const navigate = useNavigate();
    const params = useParams();
    let Answers = {};
    return (
        <>
            <form className="container" style={{ marginTop: "100px" }}>
                <div className="container">
                    <h2>Application Form</h2>

                    <div>
                        <label htmlFor="exampleInputEmail1" className="form-label">Full Name</label>
                        <input type="text" className="form-control" disabled="true" value={profile.student.name} />
                    </div>

                    <div>
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" aria-describedby="emailHelp" disabled="true" value={profile.student.email} />
                    </div>

                    <div>
                        <label htmlFor="exampleInputEmail1" className="form-label">Mobile Number</label>
                        <input type="Number" className="form-control" aria-describedby="emailHelp" disabled="true" value={profile.student.mob_no} />
                    </div>

                    <div>
                        <label htmlFor="exampleInputEmail1" className="form-label">10th Percentage</label>
                        <input type="Number" className="form-control" aria-describedby="emailHelp" disabled="true" value={profile.student.Education.Array[0].percentage} />
                    </div>

                    <div>
                        <label htmlFor="exampleInputEmail1" className="form-label">12th/Diploma Percentage</label>
                        <input type="Number" className="form-control" aria-describedby="emailHelp" disabled="true" value={profile.student.Education.Array[0].percentage} />
                    </div>

                    <div>
                        <label htmlFor="exampleInputEmail1" className="form-label">Btech CGPA</label>
                        <input type="Number" className="form-control" aria-describedby="emailHelp" disabled="true" value={profile.student.Education.Array[0].percentage} />
                    </div>

                    {Drive.Questions.map((Que) => 
                        <div>
                            <label htmlFor="exampleInputEmail1" className="form-label">{Que}</label>
                            <input type="text" className="form-control" aria-describedby="emailHelp" onChange={(e)=>Answers[Que]=e.target.value} />
                        </div>
                    )}
                    <button className="btn btn-primary" type="button" onClick={() => { ApplyDrive(params.id,Answers); navigate('/') }}>Submit</button>
                </div>
            </form>
        </>
    )
}
const Applicationform = () => {
    const { profile, fetchprofile, fetchDriveDetails, Drive } = useContext(stucontext);
    const { id } = useParams();
    useEffect(() => {
        fetchprofile();
        fetchDriveDetails(id);
    }, [])
    return (
        <>
            <Header />
            <Navbar />
            {profile.student._id == '' ? <Spinner /> : <Applicationform_cnt Drive={Drive} />}
        </>
    )
}

export default Applicationform;