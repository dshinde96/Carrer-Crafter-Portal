import { json } from "react-router-dom";
import LoadContext from "./loadContext";
import { createContext, useState, useContext } from 'react';
const TpoDeptcontext = createContext();

const TpoDeptstate = (props) => {
    // const initprofile = {
    //     "profile": {
    //         "_id": "",
    //         "username": "",
    //         "dept": "",
    //         "__v": 0
    //     }
    // };
    const initprofile = {
        "_id": "",
        "username": "",
        "dept": "",
        "__v": 0
    };
    // const initreq={
    //     reg_req:[],
    // }
    const { loading, setloading, urlHead } = useContext(LoadContext);
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
    const fetchprofile = async () => {

        const url = "http://localhost:5000/TPO_Dept_Admin/profile";
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
        console.log("FetchPendingReq");
        const url = `${urlHead}/user/registration_req`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "User-Agent": "Thunder Client (https://www.thunderclient.com)",
                "auth-tocken": `${sessionStorage.getItem('tocken')}`
            }
        });
        const data = await response.json();
        // console.log(data);
        setPendingReq(data.request);
        setloading(false);
    }

    const acceptReq = async (id, Remark) => {
        const url = `${urlHead}/user/registration_req/${id}`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "User-Agent": "Thunder Client (https://www.thunderclient.com)",
                "auth-tocken": `${sessionStorage.getItem('tocken')}`
            },
            body: JSON.stringify({ Remark })
        });
        const data = await response.json();
        fetchPendingReq();
    }

    const rejectReq = async (id, Remark) => {
        const url = `${urlHead}/user/registration_req/${id}`;
        console.log(Remark);
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "User-Agent": "Thunder Client (https://www.thunderclient.com)",
                "auth-tocken": `${sessionStorage.getItem('tocken')}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ Remark })
        });
        // const data = await response.json();
        fetchPendingReq();
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
        console.log(data);
        setStuprofile(data);
        setloading(false);
    }
    return (
        <TpoDeptcontext.Provider value={{ profile, setprofile, fetchprofile, loading, setloading, fetchPendingReq, PendingReq, acceptReq, rejectReq, Allstu, fetchAllstu, Stuprofile, fetchStuprofile }}>
            {props.children}
        </TpoDeptcontext.Provider>
    )
}
export default TpoDeptcontext;
export { TpoDeptstate };