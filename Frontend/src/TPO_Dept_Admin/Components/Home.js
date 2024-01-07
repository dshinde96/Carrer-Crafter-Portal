import Header from './Header';
import Navbar from './Navbar';
import Body from './Body';
import Spinner from '../../Spinner/Spinner';
import TpoDeptcontext from '../../context/TpoDeptstate';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const Content=()=>{

    return(
        <>
            {/* <Header/> */}
            <Body/>
        </>
    )
}
const Home=()=>{
    const {loading,setloading}=useContext(TpoDeptcontext);
    const navigate=useNavigate();
    useEffect(()=>{
        if(!sessionStorage.getItem('tocken')){
            navigate('/login');
        }
        else{
            setloading(false);
            // fetchprofile();
        }
    },[]);

    return(
        <>
            <Header/>
            <Navbar/>
            {loading?<Spinner/>:<Content/>};
        </>
    )
}
export default Home;