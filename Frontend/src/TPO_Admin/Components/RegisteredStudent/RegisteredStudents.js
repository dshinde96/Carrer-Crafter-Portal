import { useContext, useEffect, useState } from "react";
import Header from "../../../Header/Header";
import Navbar from "../Navbar";
import Spinner from "../../../Spinner/Spinner";
import Row from "./row";
import TpoAdminContext from "../../../context/TpoAdminstate";


const RegisteredStudentCnt = () => {
    const { Allstu } = useContext(TpoAdminContext);
    console.log(Allstu);
    return (
        <>
            <div className='stu_cnt_alumin'>
                <h2>All Registered Students</h2>
                <div className="cnt_alumin mt-4">
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
    const { fetchAllstu, setloading, loading } = useContext(TpoAdminContext);
    useEffect(() => {
        setloading(true);
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