import React from "react";
//import { Icon } from "antd";

function Footer() {
  return (
    <div
      style={{
        height: "80px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1rem",
      }}
    >
      <p>
        {/* <Icon type="video-camera" theme="twoTone" /> */}
        Data provided by{" "}
        <a href="http://www.themoviedb.org">www.themoviedb.org</a>
      </p>
    </div>
  );
}

export default Footer;
