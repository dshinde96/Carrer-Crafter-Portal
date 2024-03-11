import { createContext, useContext, useState } from "react";
import LoadContext from "./loadContext";
const TpoAdminContext = createContext();

const TpoAdminstate = (props) => {
    const initprofile = {
        "_id": "",
        "username": "",
        "__v": 0
    };
    // const initreq = {
    //     reg_req: [],
    // }
    const { loading, setloading,urlHead } = useContext(LoadContext);
    const [profile, setprofile] = useState(initprofile);
    const [PendingReq, setPendingReq] = useState([]);
    const [Allstu, setAllstu] = useState([]);
    const [Stuprofile, setStuprofile] = useState({
        "student":{
         "_id": "65eed44f914dfc81ad66b645",
         "name": "Dnyaneshwar Vijay Shinde",
         "dept": "Information Technology",
         "year": "Final Year",
         "Education": {
             "Array": []
         },
         "Experience": {
             "Array": []
         },
         "Project": {
             "Array": []
         },
         "CompanyName": [],
         "placed": false,
        }
     })
    const [Alldrives, setAllDrives] = useState([]);
    const [DriveStu, setDriveStu] = useState([]);
    const [curDrive, setcurDrive] = useState({
        "_id": "",
        "CompanyName": "",
        "JobTitle": "",
        "JobDescription": "",
        "Package": 0,
        "ExpectedOpening": 0,
        "EligibilityCriteria": [],
        "InterestedStu": [],
        "EligibleStu": [],
        "SelectedStu": []
    })

    const fetchprofile = async () => {

        const url = "http://localhost:5000/TPO_Admin/profile";
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "User-Agent": "Thunder Client (https://www.thunderclient.com)",
                "auth-tocken": `${sessionStorage.getItem('tocken')}`
            }
        });
        const data = await response.json();
        console.log(data.profile.username);
        setprofile(data.profile);
        setloading(false);
    }

    const fetchPendingReq = async () => {
        const url = `${urlHead}/user/registration_req`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "auth-tocken": `${sessionStorage.getItem('tocken')}`
            }
        });
        const data = await response.json();
        // console.log(data);
        setPendingReq(data.request);
        setloading(false);
    }

    const fetchAllstu = async () => {
        const url = `${urlHead}/user/getAllStudents`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "User-Agent": "Thunder Client (https://www.thunderclient.com)",
                "auth-tocken": `${sessionStorage.getItem('tocken')}`
            }
        });
        const data = await response.json();
        // console.log(data);
        setAllstu(data.Students);
        setloading(false);
    }

    const fetchStuprofile = async (id) => {
        const url = `${urlHead}/Student/profile/display/${id}`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "User-Agent": "Thunder Client (https://www.thunderclient.com)",
                "auth-tocken": `${sessionStorage.getItem('tocken')}`
            }
        });
        const data = await response.json();
        // console.log(data);
        setStuprofile(data);
        setloading(false);
    }

    const fetchAllDrive = async () => {
        const url = `${urlHead}/Drive/getAllDrive`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "User-Agent": "Thunder Client (https://www.thunderclient.com)",
                "auth-tocken": `${sessionStorage.getItem('tocken')}`
            }
        });
        const data = await response.json();
        // console.log(data);
        setAllDrives(data.drives);
        setloading(false);
    }

    const fetchCurDrive = async (id) => {
        setloading(true);
        const url = `${urlHead}/Drive/dsiplay/${id}`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "User-Agent": "Thunder Client (https://www.thunderclient.com)",
                "auth-tocken": `${sessionStorage.getItem('tocken')}`
            }
        });
        const data = await response.json();
        // console.log(data);
        setcurDrive(data.drive);
        setloading(false);
    }
    const fetchDriveStu=async(category,id)=>{
        setloading(true)
        const url = `${urlHead}/Drive/getStudent/${category}/${id}`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "User-Agent": "Thunder Client (https://www.thunderclient.com)",
                "auth-tocken": `${sessionStorage.getItem('tocken')}`
            }
        });
        const data = await response.json();
        console.log(data);
        setDriveStu(data.students);
        setloading(false);
    }
    const addEligibleStu = async (selectedStuid, driveId) => {
        console.log(selectedStuid);
        setloading(true)
        const url = `${urlHead}/Drive/addEligibleStu/${driveId}`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "User-Agent": "Thunder Client (https://www.thunderclient.com)",
                "auth-tocken": `${sessionStorage.getItem('tocken')}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ selectedStuid })
        });
        const data = await response.json();
        console.log(data);
        fetchDriveStu("InterestedStu",driveId);
        setloading(false);
    }
    const addSelectedStu = async (selectedStuid, driveId) => {
        // console.log(selectedStuid);
        setloading(true)
        const url = `${urlHead}/Drive/addSelectedStu/${driveId}`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "User-Agent": "Thunder Client (https://www.thunderclient.com)",
                "auth-tocken": `${sessionStorage.getItem('tocken')}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ selectedStuid })
        });
        const data = await response.json();
        console.log(data);
        fetchDriveStu("EligibleStu",driveId);
        setloading(false);
    }

    const rejectStu=async(selectedStuid,driveId)=>{
        setloading(true)
        const url = `${urlHead}/Drive/rejectStu/${driveId}`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "User-Agent": "Thunder Client (https://www.thunderclient.com)",
                "auth-tocken": `${sessionStorage.getItem('tocken')}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ selectedStuid })
        });
        const data = await response.json();
        // console.log(data);
        fetchDriveStu("InterestedStu",driveId);
        setloading(false);
    }
    const addDrive = async (Drive) => {
        setloading(true)
        const url = `${urlHead}/Drive/newDrive`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "User-Agent": "Thunder Client (https://www.thunderclient.com)",
                "auth-tocken": `${sessionStorage.getItem('tocken')}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Drive)
        });
        const data = await response.json();
        console.log(data);
        setloading(false);
    }

    // const getStuprofile=async(id) => {
    //     const url = `http://localhost:5000/TPO_Admin/profile/display/${id}`;
    //     const response = await fetch(url, {
    //         method: "GET",
    //         headers: {
    //             "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    //             "auth-tocken": `${sessionStorage.getItem('tocken')}`
    //         }
    //     });
    //     const data = await response.json();
    //     return data;
    // }
    return (
        <>
            <TpoAdminContext.Provider value={{ profile, fetchprofile, setprofile, loading, setloading, fetchPendingReq, PendingReq, Allstu, setAllstu, fetchAllstu, fetchStuprofile, Stuprofile, fetchAllDrive, Alldrives, curDrive, fetchCurDrive, DriveStu, addEligibleStu, addSelectedStu, setDriveStu, addDrive,rejectStu,fetchDriveStu }}>
                {props.children}
            </TpoAdminContext.Provider>
        </>
    )
}

export default TpoAdminContext;
export { TpoAdminstate };