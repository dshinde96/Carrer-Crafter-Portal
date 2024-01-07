import { useContext, useEffect } from "react"
import Header from "../Header"
import Navbar from "../Navbar"
import stucontext from "../../../context/stucontext"
import Spinner from "../../../Spinner/Spinner"
import DriveItem from './DriveItem';
import TpoAdminContext from "../../../context/TpoAdminstate";
import { useNavigate } from "react-router-dom"

const Drives_cnt = () => {
    const { Alldrives } = useContext(TpoAdminContext);
    const navigate=useNavigate();
    return (
        <>
            {/* <Header /> */}
            {/* <Navbar /> */}
            <div className="ReqCnt container">
            <div className="Downloadbtn">
                <button type="button" class="btn btn-primary mx-2 my-2" onClick={()=>navigate('/Drive/AddDrive')}><i class="fa fa-plus mx-2"></i><h6 style={{display:"inline"}}>New Drive</h6></button>
                </div>
                <h4>Ongoing Drives</h4>
                {Alldrives.map((ele) => <DriveItem Drive={ele}/>)}
            </div>
        </>
    )
}
const OngoingDrives = () => {
    const { fetchAllDrive, setloading, loading,fetchprofile } = useContext(TpoAdminContext);
    useEffect(() => {
        setloading(true);
        // fetchprofile();
        fetchAllDrive();
    }, []);

    return (
        <>
            <Header />
            <Navbar />
            {loading? <Spinner /> : <Drives_cnt />}
        </>
    )
}
export default OngoingDrives;