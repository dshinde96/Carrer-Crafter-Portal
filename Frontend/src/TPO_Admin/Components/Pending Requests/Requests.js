import { useContext, useEffect } from "react"
import Header from "../Header"
import Navbar from "../Navbar"
import Spinner from "../../../Spinner/Spinner"
import RequestItem from './RequestItem';
import './Requests.css'
import TpoAdminContext from "../../../context/TpoAdminstate"

const Requests_cnt = () => {
    const { PendingReq } = useContext(TpoAdminContext);
    console.log(PendingReq);
    return (
        <>
            <div className="ReqCnt container">
                <h4>Pending Registration Requests</h4>
                {PendingReq.reg_req.map((ele) => <RequestItem req={ele} />)}
            </div>
        </>
    )
}
const Requests = () => {
    const { fetchPendingReq, setloading, loading, } = useContext(TpoAdminContext);
    useEffect(() => {
        setloading(true);
        fetchPendingReq();
    }, []);

    return (
        <>
            <Header />
            <Navbar />
            {loading ? <Spinner /> : <Requests_cnt />}
        </>
    )
}
export default Requests;