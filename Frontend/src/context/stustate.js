import React, { useContext, useState } from 'react';
import Stucontext from './stucontext';
import LoadContext from './loadContext';
// import Profile from '../Components/Profile/Profile';
const Stustate = (props) => {
  const initprofile = {
    "student": {
      "_id": "",
      "name": "",
      "dept": "",
      "year": "",
      "email":"",
      "mob_no":"",
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
    },
    "msg": "Profile fetched successfully"
  };
  const [profile, setprofile] = useState(initprofile);
  const [DriveStu, setDriveStu] = useState([]);
  const [Drive,setDrive]=useState({
    "CompanyName": "",
    "JobTitle": "",
    "JobDescription": "",
    "Package": 0,
    "ExpectedOpening": 0,
    "EligibilityCriteria": "",
    "EligibleDepartMents": [],
    "EligibleYears": [],
    "Questions": [],
  });
  // const [loading, setloading] = useState(false);
  const { loading, setloading, urlHead } = useContext(LoadContext);
  const [Alldrives, setAllDrives] = useState([])

  const fetchprofile = async () => {
    setloading(true);
    const url = `${urlHead}/Student/profile/myprofile`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "auth-tocken": `${sessionStorage.getItem('tocken')}`
      }
    });
    const data = await response.json();
    // console.log(data);
    setprofile(data);
    setloading(false);
  }
  const add_project = async (project) => {
    const { title, description, start_date, end_date } = project;
    // console.log(project);
    const url = `${urlHead}/student/profile/addproject`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "auth-tocken": `${sessionStorage.getItem('tocken')}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title, description, start_date, end_date })
    });
    const data = await response.json();
    console.log(data);
    setloading(false);
  }
  const update_project = async (id, newproject) => {

    const url = `${urlHead}/Student/profile/updateproject/${id}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "auth-tocken": `${sessionStorage.getItem('tocken')}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newproject),
    });
    const data = await response.json();
    // console.log(data);
    setloading(false);

  }

  const delete_project = async (id) => {
    const url = `${urlHead}/Student/profile/deleteproject/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "auth-tocken": `${sessionStorage.getItem('tocken')}`,
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();
    // console.log(data);
    fetchprofile();
    setloading(false);
  }

  const add_education = async (education) => {
    const { title, school, start_year, end_year, percentage } = education;
    // console.log(project);
    const url = `${urlHead}/Student/profile/addeducation`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "auth-tocken": `${sessionStorage.getItem('tocken')}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title, school, start_year, end_year, percentage })
    });
    const data = await response.json();
    console.log(data);
    setloading(false);
  }

  const update_education = async (id, neweducation) => {
    // const { title, school, start_year, end_year,percentage } = neweducation;

    const url = `${urlHead}/Student/profile/updateeducation/${id}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "auth-tocken": `${sessionStorage.getItem('tocken')}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(neweducation),
    });
    const data = await response.json();
    setloading(false);
  }

  const delete_education = async (id) => {
    const url = `${urlHead}/Student/profile/deleteeducation/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "auth-tocken": `${sessionStorage.getItem('tocken')}`,
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();
    // console.log(data);
    fetchprofile();
    setloading(false);
  }

  const add_experience = async (exp) => {
    const { position, org, start_year, end_year } = exp;
    // console.log(project);
    const url = `${urlHead}/Student/profile/addexp`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "auth-tocken": `${sessionStorage.getItem('tocken')}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ position, org, start_year, end_year })
    });
    const data = await response.json();
    console.log(data);
    setloading(false);
  }

  const update_experience = async (id, newexp) => {
    // const { title, school, start_year, end_year,percentage } = newexp;

    const url = `${urlHead}/Student/profile/updateexp/${id}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "auth-tocken": `${sessionStorage.getItem('tocken')}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newexp),
    });
    const data = await response.json();
    setloading(false);
  }

  const delete_experience = async (id) => {
    const url = `${urlHead}/Student/profile/deleteexp/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "auth-tocken": `${sessionStorage.getItem('tocken')}`,
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();
    // console.log(data);
    fetchprofile();
    setloading(false);
  }



  const fetchAlldrives = async () => {
    setloading(true);
    const url = `${urlHead}/Drive/getAllDrive`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "auth-tocken": `${sessionStorage.getItem('tocken')}`
      }
    });
    const data = await response.json();
    setAllDrives(data.drives);
    setloading(false);
  }

  const fetchDriveDetails=async (id)=>{
    setloading(true);
    const url = `${urlHead}/Drive/dsiplay/${id}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "auth-tocken": `${sessionStorage.getItem('tocken')}`
      }
    });
    const data = await response.json();
    console.log(data);
    setDrive(data.drive);
    setloading(false);
  }
  const ApplyDrive = async (id,Answers) => {
    setloading(true);
    const url = `${urlHead}/Drive/Apply/${id}`;
    console.log(id);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "auth-tocken": `${sessionStorage.getItem('tocken')}`,
        "Content-Type": "application/json"
      },
      body:JSON.stringify({Answers})
    });
    const data = await response.json();
    console.log(data);
    // setAllDrives(data.drives);
    setloading(false);
  }

  const fetchSelectedStu = async (id) => {
    setloading(true);
    const url = `${urlHead}/Drive/getSelectedStu/${id}`;
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
    // setAllDrives(data.drives);
    setloading(false);
  }
  return (
    <>
      <Stucontext.Provider value={{ profile, setprofile, fetchprofile, loading, setloading, add_project, update_project, delete_project, add_education, update_education, delete_education, add_experience, update_experience, delete_experience, Alldrives, fetchAlldrives, ApplyDrive, DriveStu, setDriveStu, fetchSelectedStu,fetchDriveDetails,Drive }}>
        {props.children}
      </Stucontext.Provider>
    </>
  )
}
export default Stustate;