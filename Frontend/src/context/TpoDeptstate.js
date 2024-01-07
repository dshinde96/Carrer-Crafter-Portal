import LoadContext from "./loadContext";
import { createContext, useState ,useContext} from 'react';
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
    const initprofile={
        "_id": "",
        "username": "",
        "dept": "",
        "__v": 0
    };
    const initreq={
        reg_req:[],
    }
    const { loading, setloading ,urlHead} = useContext(LoadContext);
    const [profile, setprofile] = useState(initprofile);
    const [PendingReq,setPendingReq]=useState(initreq);
    const [Allstu,setAllstu]=useState([]);
    const [Stuprofile,setStuprofile]=useState({
        "student": {
          "_id": "",
          "name": "",
          "reg_no": "",
          "dob": "",
          "__v": 0
        },
        "education": [],
        "projects": [],
        "experience": [],
        "msg": "Profile fetched successfully"
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

    const fetchPendingReq=async()=>{
        const url = `${urlHead}/user/registration_req`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "User-Agent": "Thunder Client (https://www.thunderclient.com)",
                "auth-tocken": `${sessionStorage.getItem('tocken')}`
            }
        });
        const data = await response.json();
        setPendingReq(data);
        setloading(false);
    }

    const acceptReq=async(id)=>{
        const url = `${urlHead}/user/req_accept/${id}`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "User-Agent": "Thunder Client (https://www.thunderclient.com)",
                "auth-tocken": `${sessionStorage.getItem('tocken')}`
            }
        });
        const data = await response.json();
        fetchPendingReq();
    }

    const rejectReq=async(id)=>{
        const url = `${urlHead}/user/req_reject/${id}`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "User-Agent": "Thunder Client (https://www.thunderclient.com)",
                "auth-tocken": `${sessionStorage.getItem('tocken')}`
            }
        });
        // const data = await response.json();
        fetchPendingReq();
        setloading(false);
    }

    const fetchAllstu=async()=>{
        const url=`${urlHead}/user/getAllStudents`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "User-Agent": "Thunder Client (https://www.thunderclient.com)",
                "auth-tocken": `${sessionStorage.getItem('tocken')}`
            }
        });
        const data=await response.json();
        // console.log(data);
        setAllstu(data.Students);
        setloading(false);
    }

    const fetchStuprofile=async (id)=>{
        const url=`${urlHead}/Student/profile/display/${id}`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "User-Agent": "Thunder Client (https://www.thunderclient.com)",
                "auth-tocken": `${sessionStorage.getItem('tocken')}`
            }
        });
        const data=await response.json();
        console.log(data);
        setStuprofile(data);
        setloading(false);
    }
    return (
        <TpoDeptcontext.Provider value={{profile,setprofile,fetchprofile,loading,setloading,fetchPendingReq,PendingReq,acceptReq,rejectReq,Allstu,fetchAllstu,Stuprofile,fetchStuprofile}}>
            {props.children}
        </TpoDeptcontext.Provider>
    )
}
export default TpoDeptcontext;
export { TpoDeptstate };