import { useContext, useEffect, useState } from "react";
import TpoDeptcontext from "../../../context/TpoDeptstate";
import Header from "../Header";
import Navbar from "../Navbar";
import Spinner from "../../../Spinner/Spinner";
import Row from './row'


const RegisteredStudentCnt = () => {
    const { Allstu } = useContext(TpoDeptcontext);
    // const [tbl_row,set_tbl_row]=useState('');
    return (
        <>
            {/* <Header />
            <Navbar /> */}
            <div className='stu_cnt_alumin'>
                <h2>All Registered Students</h2>
                <div className="cnt_alumin mt-3">
                    {/* <div className='search_bar'>
                        <input type='text' placeholder='Enter the name of the student' id="srch_stn"></input>
                    </div> */}
                    <div className="tbl_cnt_alumin">
                        <table className='tbl' rules="none" style={{ width: "90%" }}>
                            <tr>
                                <th>Sr NO.</th>
                                <th>Name</th>
                                <th>PRN No</th>
                                <th>Year</th>
                                <th>Branch</th>
                                <th>Status</th>
                            </tr>
                            {Allstu.map((ele,index)=>{
                                return <Row student={ele} index={index}/>
                            })}
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

const RegisteredStudent = () => {
    const { fetchAllstu, setloading, loading } = useContext(TpoDeptcontext);
    useEffect(() => {
        setloading(true);
        // fetchprofile();
        fetchAllstu();
    }, []);

    return (
        <>
        <Header />
            <Navbar />
            {loading ? <Spinner /> : <RegisteredStudentCnt />}
        </>
    )
}
export default RegisteredStudent;