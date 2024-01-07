import React from "react";
const Header = () => {
  return (
    <div className="Container">
      <div className="clg_logo_cnt">
        <img className="clg_logo"
          // src="https://mis.gcekarad.ac.in/GCEKMIS/IMAGES/GCEK_logo_new1.png"
          src="https://th.bing.com/th/id/OIP.FqZ3XFU5_SDypeCK6QMDsgHaHa?pid=ImgDet&rs=1"
          alt="logo"
        />
      </div>
      <div className="clg_name">
        <h1>Government College Of Engineering Karad</h1>
        <div>
          <h3>Training and Placement Office</h3>
        </div>
      </div>
    </div>
  );
}; 

export default Header;