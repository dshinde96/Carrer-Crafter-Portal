import Header from './Header';
import Navbar from './Navbar';
import Body from './Body';
import { useEffect,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import stucontext from '../../context/stucontext';
import Spinner from '../../Spinner/Spinner'
const Content=()=>{
    return(
        <>
            {/* <Header/>  */}
            {/* <Navbar/> */}
            <Body/>
        </>
    )
}
const Home=()=>{
    const navigate=useNavigate();
    const {loading,setloading}=useContext(stucontext);
    useEffect(()=>{
        if(!sessionStorage.getItem('tocken')){
            navigate("/login");
        }
        else{
            setloading(false);
            // fetchprofile();
        }
    },[]);
    // console.log(loading);
    return(
        <>
            <Header/>
            <Navbar/>
            {loading?<Spinner/>:<Content/>}
        </>
    )
}

export default Home;