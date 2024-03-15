import Header from "../../../../Header/Header";
import Navbar from "../../Navbar";
import { useContext, useEffect } from "react";
import Education from './Education';
import Experience from "./Experience";
import Projects from './Project';
import { NavLink, useParams } from "react-router-dom";
import Spinner from "../../../../Spinner/Spinner";
import TpoAdminContext from "../../../../context/TpoAdminstate";

const Profile_content = () => {
    const { student } = useContext(TpoAdminContext).Stuprofile;
    console.log(student);
    return (
        <>
            <div className='body_cnt_profile container'>
                <div className='main_cnt_profile'>
                    <div className='Profile_head_profile'>
                        <img className='profile_pic_profile' src="https://th.bing.com/th/id/R.9d32bec8058bd3595a63a08a8cc12ade?rik=9cCTin36GLU%2f5w&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_87237.png&ehk=hVpH%2bC7rwlA1j2KqxGpMs1sp9l0RgM0jjRJsJsvDoPc%3d&risl=&pid=ImgRaw&r=0" />
                        <div className='profile_cnt_profile'>
                            <h1>{student.name}</h1>
                        </div>
                    </div>
                    <div className="profile_main_cnt">
                        <div className="profile_sidebar mt-4">
                            <p><NavLink>Education</NavLink></p>
                            <p><a>Experience</a></p>
                            <p><a>Project</a></p>
                        </div>
                        <div className="profile_body">
                            <div className='stu_cnt_profile'>
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

const Profile = () => {
    const { loading, setloading, fetchStuprofile } = useContext(TpoAdminContext);
    const params = useParams();
    useEffect(() => {
        console.log(params.id);
        setloading(true);
        fetchStuprofile(params.id);
    }, [])
    return (
        <>
            <Header />
            <Navbar />
            {loading ? <Spinner /> : <Profile_content />}
        </>
    )
}
export default Profile;