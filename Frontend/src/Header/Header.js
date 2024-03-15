import React from "react";
import clg_logo from './Connect2Campus_.png'
import './index.css'
const Header = () => {
  return (
    // <div className="Container  d-flex flex-column align-items-center justify-content-center">
    //   {/* <div className="clg_logo_cnt">
    //     <img className="clg_logo"
    //       // src="https://mis.gcekarad.ac.in/GCEKMIS/IMAGES/GCEK_logo_new1.png"
    //       // src="https://th.bing.com/th/id/OIP.FqZ3XFU5_SDypeCK6QMDsgHaHa?pid=ImgDet&rs=1"
    //       alt="logo"
    //     />
    //   </div> */}
    //   <div className="">
    //     {/* <h1>Government College Of Engineering Karad</h1>
    //     <div>
    //       <h3 className="text-center">Training and Placement Offices</h3>
    //     </div> */}
    // <img src="http://www.gcekarad.ac.in/images/logo.gif" className="mt-2 mb-2" style={{height:"100px"}}></img>
    //   </div>
    // </div>

    <div>
      <div className="header-container">
          <div className="logo-container">
          <img src={clg_logo} className="logo"></img>
          </div>

          <div className="text-container">
              <h1>Career Crafter Portal of </h1>
              <h3>Government College of Engineering Karad</h3>
              <p>(An Autonomous Institute of Government Of Maharashtra)</p>
          </div>
      </div>
    </div>
  );
}; 

export default Header;