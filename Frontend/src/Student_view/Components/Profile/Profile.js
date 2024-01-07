import Header from "../Header";
import Navbar from "../Navbar";
import { useContext, useEffect } from "react";
import stucontext from "../../../context/stucontext";
import Education from './Education';
import Experience from "./Experience";
import Projects from './Project';
import { NavLink } from "react-router-dom";
import Spinner from "../../../Spinner/Spinner";
import PlacementStatus from './PlacementStatus';

const Profile_content = () => {
    const { student} = useContext(stucontext).profile;
    return (
        <>
            {/* <Header /> */}
            {/* <Navbar /> */}
            <div className='body_cnt_profile container'>
                <div className='main_cnt_profile'>
                    <div className='Profile_head_profile'>
                        <img className='profile_pic_profile' src="https://th.bing.com/th/id/R.9d32bec8058bd3595a63a08a8cc12ade?rik=9cCTin36GLU%2f5w&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_87237.png&ehk=hVpH%2bC7rwlA1j2KqxGpMs1sp9l0RgM0jjRJsJsvDoPc%3d&risl=&pid=ImgRaw&r=0" />
                        <div className='profile_cnt_profile'>
                            <h1>{student.name}</h1>
                        </div>
                    </div>
                    <div className="profile_main_cnt">
                        <div className="profile_sidebar">
                            <p><a>Education</a></p>
                            <p><a>Experience</a></p>
                            <p><a>Project</a></p>
                        </div>
                        <div className="profile_body">
                            <div className='stu_cnt_profile'>
                                <PlacementStatus/>
                                <Education />
                                <Experience />
                                <Projects />
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}

const Profile=()=>{
    const { loading,setloading,fetchprofile,profile} = useContext(stucontext);
    useEffect(()=>{
        setloading(true);
        fetchprofile();
        // console.log("dfethd");
    },[])
    return(
        <>
            <Header />
            <Navbar />
            {loading?<Spinner/>:<Profile_content/>}
        </>
    )
}
export default Profile;