import Header from '../../Header/Header';
import Navbar from './Navbar';
import Body from './Body';
import Spinner from '../../Spinner/Spinner';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TpoAdminContext from '../../context/TpoAdminstate';
const Content=()=>{

    return(
        <>
            {/* <Header/> */}
            <Body/>
        </>
    )
}
const Home=()=>{
    const {loading,setloading}=useContext(TpoAdminContext);
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