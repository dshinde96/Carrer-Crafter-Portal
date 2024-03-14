import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import './Login.css';
import loadContext from "../context/loadContext";
import Header from "../Student_view/Components/Header";
import Navbar from "./Navbar";
const Login = (props) => {
    const {setloading,urlHead}=useContext(loadContext)
    const [invalidcred, setinvalidcred] = useState(false);
    const [user, setuser] = useState({ reg_no: "", password: "" });
    const navigate = useNavigate();
    const handle_change = (e) => {
        setuser({ ...user, [e.target.name]: e.target.value });
    }
    const Add_user = async () => {
        const url=`${urlHead}/user/login`;
        let response;
        if(props.role==='Student'){
            response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({reg_no:user.reg_no,password:user.password,role:props.role})
            });
        }
        else{
            response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email:user.reg_no,password:user.password,role:"Admin"})
            });
        }
        const data = await response.json();
        console.log(data);
        if (response.status !== 200) {
            sessionStorage.setItem('tocken', '');
            sessionStorage.setItem('user', '');
            setinvalidcred(true);
        }
        else {
            sessionStorage.setItem('tocken', data.tocken);
            sessionStorage.setItem('user', data.user);
            sessionStorage.setItem('role',props.role );
            console.log(sessionStorage.getItem('user'));
            navigate('/');
        }

    }
    useEffect(()=>{
        setloading(true);
        props.setrole('Student');
    },[])
    return (
        <>
            <Header/>
            <Navbar/>
            <div className="d-flex justify-content-center">

            <form style={{ marginTop: "100px",width:"40vw" }}>
                <div className="alert">
                    {invalidcred ? <div class="alert alert-primary  d-flex justify-content-between" role="alert">
                        <h5>Invalid credentials...Please try again </h5><i className="fa fa-trash delete_btn" title="Delete Item" onClick={() => { setinvalidcred(false) }}></i>
                    </div> : ""}
                </div>
                <div className="container">
                    <h2>Login</h2>

                    <div>
                        <label htmlFor="exampleInputEmail1" className="form-label">{props.role==='Student'?"Registration No." :"email"}</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="reg_no" onChange={handle_change} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" name="password" id="exampleInputPassword1" onChange={handle_change} />
                    </div>
                    <div className="loginDropdown for">
                    <select name="" className='Dropdown form-select'  value={props.role} onChange={(event)=>{props.setrole(event.target.value)}}>
                        <option value="Student" className='options'>Student</option>
                        <option value="TPO_Dept_Admin" className='options'>TPO Department Login</option>
                        <option value="TPO_Admin" className='options'>TPO Admin</option>
                    </select>
                </div>
                    <button className=" bg-red-300 h-10 w-20 btn rounded-md mt-3 justify-center" type="button" onClick={()=>{Add_user()}}>Login</button>
                </div>
            </form>
            </div>
        </>
    )
}
export default Login;