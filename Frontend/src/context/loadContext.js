import React, { createContext, useState } from 'react';
const LoadContext=createContext();
// import Profile from '../Components/Profile/Profile';
const Loadstate = (props) => {
  const [loading, setloading] = useState(false);
  const [urlHead,seturlHead]=useState('http://localhost:5000');
  return (
    <>
      <LoadContext.Provider value={{loading,setloading,urlHead}}>
        {props.children}
      </LoadContext.Provider>
    </> 
  )
}
export default LoadContext;
export {Loadstate};