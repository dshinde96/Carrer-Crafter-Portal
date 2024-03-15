import { useContext, useEffect } from "react"
import Header from "../../../Header/Header"
import Navbar from "../Navbar"
import stucontext from "../../../context/stucontext"
import Spinner from "../../../Spinner/Spinner"
import DriveItem from './DriveItem';

const Drives_cnt = () => {
    const { Alldrives,profile } = useContext(stucontext);
    // console.log(profile);
    return (
        <>
            {/* <Header /> */}
            {/* <Navbar /> */}
            <div className="ReqCnt container">
                <h4>Ongoing Drives</h4>
                {Alldrives.map((ele) => <DriveItem Drive={ele} student={profile.student} />)}
            </div>
        </>
    )
}
const OngoingDrives = () => {
    const { fetchAlldrives, setloading, loading,fetchprofile,profile } = useContext(stucontext);
    useEffect(() => {
        setloading(true);
        fetchprofile();
        fetchAlldrives();
    }, []);

    return (
        <>
            <Header />
            <Navbar />
            {profile.student._id=='' ? <Spinner /> : <Drives_cnt />}
        </>
    )
}
export default OngoingDrives;