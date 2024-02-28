
import { Route, Routes, useLocation, useNavigate ,Redirect, Navigate} from "react-router-dom";
import Home from './Components/Home'
// import Placement_stat from './Components/Placement_stat/Plcament_stat'
// import Alumini_record from "./Components/Alumini_record/Alumini_record";
import Requests from "./Components/Pending Requests/Requests";
import RegisteredStudent from "./Components/RegisteredStudent/RegisteredStudents";
import Profile from "./Components/RegisteredStudent/Profile/Profile";
import Metadata from "../Spinner/Metadata";
const App=()=>{
    return(
        <>
        <Metadata title={"Department admin"}/>
            <Routes>
                <Route exact path="/" element={<Home/>}/>
                {/* <Route exact path="/placement_stat" element={<Placement_stat/>}/> */}
                <Route exact path="/RegisteredStudents" element={<RegisteredStudent/>}/>
                <Route exact path="/profile/display/:id" element={<Profile/>}/>
                 <Route exact path="/PendingRequests" element={<Requests/>}/>
                {/* <Route exact path="/alumini_record" element={<Alumini_record/>}/> */}
            </Routes>
        </>
    )
}
export default App;