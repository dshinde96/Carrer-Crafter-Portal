import React from "react";
const Header = () => {
  return (
    <div className="Container  d-flex flex-column align-items-center justify-content-center">
      {/* <div className="clg_logo_cnt">
        <img className="clg_logo"
          // src="https://mis.gcekarad.ac.in/GCEKMIS/IMAGES/GCEK_logo_new1.png"
          // src="https://th.bing.com/th/id/OIP.FqZ3XFU5_SDypeCK6QMDsgHaHa?pid=ImgDet&rs=1"
          alt="logo"
        />
      </div> */}
      <div className="">
        {/* <h1>Government College Of Engineering Karad</h1>
        <div>
          <h3 className="text-center">Training and Placement Offices</h3>
        </div> */}
    <img src="http://www.gcekarad.ac.in/images/logo.gif" className="mt-2 mb-2" style={{height:"100px"}}></img>
      </div>
    </div>
  );
}; 

export default Header;