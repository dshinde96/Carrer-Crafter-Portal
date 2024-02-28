
import { Navigate, Route, Routes, useNavigate} from "react-router-dom";
import Home from './Components/Home'
import Profile from "./Components/Profile/Profile";
// import Login from "../User_authentication/Login";
import Stustate from "../context/stustate";
import AddProject from './Components/Profile/Projects/AddProject'
import UpdateProject from "./Components/Profile/Projects/UpdateProject";
import AddEducation from "./Components/Profile/Education/AddEducation";
import UpdateEducationt from "./Components/Profile/Education/UpdateEducation";
import AddExperience from "./Components/Profile/Experience/AddExperience";
import UpdateExperience from "./Components/Profile/Experience/UpdateExperience";
import { useEffect } from "react";
import OngoingDrives from "./Components/OngoingDrives/OngoinDrives";
import ApplicationForm from './Components/OngoingDrives/ApplicationFrom';
import DisplayDriveRecord from "./Components/OngoingDrives/DisplayDriveRecord";
import Metadata from "../Spinner/Metadata";
const App = () => {
    const navigate=useNavigate();
    useEffect(()=>{
        if(!sessionStorage.getItem('tocken')){
            navigate('/login');
        }
        // else{
        //     setloading(true);
        //     await fetchprofile();
        // }
    },[])
    
    return (
        <>
        <Metadata title={"Student "}/>
            <Stustate>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    {/* <Route exact path="/placement_stat" element={<Placement_stat />} />
                    <Route exact path="/alumini_record" element={<Alumini_record />} /> */}
                    <Route exact path="/myProfile" element={<Profile />} />
                    <Route exact path="/AllDrives" element={<OngoingDrives />} />
                    <Route exact path="/drive/apply/:id" element={<ApplicationForm />} />
                    <Route exact path="/drive/selectedStudents/:id" element={<DisplayDriveRecord />} />
                    {/* <Route exact path="/login" element={<Login />} /> */}
                    <Route exact path="/myprofile/addProject" element={<AddProject />} />
                    <Route exact path="/myprofile/updateProject/:id" element={<UpdateProject />} />
                    <Route exact path="/myprofile/addEducation" element={<AddEducation />} />
                    <Route exact path="/myprofile/updateEducation/:id" element={<UpdateEducationt />} />
                    <Route exact path="/myprofile/addExperience" element={<AddExperience />} />
                    <Route exact path="/myprofile/updateExperience/:id" element={<UpdateExperience />} />
                </Routes>
            </Stustate>
        </>
    )
}
export default App;