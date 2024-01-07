
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import './index.css'
// import Home from './Student_view/Components/Home'
// import Placement_stat from './Student_view/Components/Placement_stat/Plcament_stat'
// import Alumini_record from "./Student_view/Components/Alumini_record/Alumini_record";
// import Profile from "./Student_view/Components/Profile/Profile";
// import Stustate from "./Student_view/context/stustate";
// import AddProject from './Student_view/Components/Profile/Projects/AddProject'
// import UpdateProject from "./Student_view/Components/Profile/Projects/UpdateProject";
// import AddEducation from "./Student_view/Components/Profile/Education/AddEducation";
// import UpdateEducationt from "./Student_view/Components/Profile/Education/UpdateEducation";
// import AddExperience from "./Student_view/Components/Profile/Experience/AddExperience";
// import UpdateExperience from "./Student_view/Components/Profile/Experience/UpdateExperience";

import Login from "./User_authentication/Login";
import StudentApp from './Student_view/StudentApp'
import { useEffect, useState } from "react";
import TpoDeptAdmin from './TPO_Dept_Admin/TpoDeptAdminApp'
import Stustate from "./context/stustate";
import { Loadstate } from "./context/loadContext";
import { TpoDeptstate } from './context/TpoDeptstate';
import Signup from './User_authentication/Signup';
import TpoAdminApp from './TPO_Admin/TPOadminApp';
import {TpoAdminstate} from './context/TpoAdminstate';
const App = () => {
    const navigate = useNavigate();
    const [role, setrole] = useState('');
    useEffect(() => {
        if (!sessionStorage.getItem('tocken')) {
            navigate('/login');
        }
        else {
            setrole(sessionStorage.getItem('role'));
        }
    }, [])
    console.log(role);
    return (
        <>
            <Loadstate>
                <Stustate>
                    {role === 'Student' && <StudentApp />}
                </Stustate>
                <TpoDeptstate>
                    {role === 'TPO_Dept_Admin' && <TpoDeptAdmin />}
                </TpoDeptstate>
                <TpoAdminstate>
                    {role==='TPO_Admin' && <TpoAdminApp/>}
                </TpoAdminstate>
                <Routes>
                    <Route exact path="/login" element={<Login role={role} setrole={setrole} />} />
                    <Route exact path="/Signup" element={<Signup />} />
                </Routes>
            </Loadstate>
        </>
    )
    // return (
    //     <>
    //         <Stustate>
    //             <Routes>
    //                 <Route exact path="/" element={<Home />} />
    //                 <Route exact path="/placement_stat" element={<Placement_stat />} />
    //                 <Route exact path="/alumini_record" element={<Alumini_record />} />
    //                 <Route exact path="/myProfile" element={<Profile />} />
    //                 <Route exact path="/login" element={<Login />} />
    //                 <Route exact path="/myprofile/addProject" element={<AddProject />} />
    //                 <Route exact path="/myprofile/updateProject/:id" element={<UpdateProject />} />
    //                 <Route exact path="/myprofile/addEducation" element={<AddEducation />} />
    //                 <Route exact path="/myprofile/updateEducation/:id" element={<UpdateEducationt />} />
    //                 <Route exact path="/myprofile/addExperience" element={<AddExperience />} />
    //                 <Route exact path="/myprofile/updateExperience/:id" element={<UpdateExperience />} />
    //             </Routes>
    //         </Stustate>
    //     </>
    // )
}
export default App;