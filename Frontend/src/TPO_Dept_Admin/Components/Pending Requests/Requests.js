import { useContext, useEffect } from "react"
import Header from "../../../Header/Header"
import Navbar from "../Navbar"
import TpoDeptcontext from "../../../context/TpoDeptstate"
import LoadContext from "../../../context/loadContext"
import Spinner from "../../../Spinner/Spinner"
import RequestItem from './RequestItem';
import './Requests.css'

const Requests_cnt = () => {
    const { PendingReq } = useContext(TpoDeptcontext);
    // console.log(PendingReq);
    return (
        <>
            <div className="ReqCnt container">
                <h4>Pending Registration Requests</h4>
                {PendingReq.map((ele) => <RequestItem req={ele} />)}
            </div>
        </>
    )
}
const Requests = () => {
    const { fetchPendingReq, setloading, loading } = useContext(TpoDeptcontext);
    useEffect(() => {
        setloading(true);
        console.log("fetchPendingreq");
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