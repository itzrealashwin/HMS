import React from "react";
import image from "./../../assets/Logo.webp"
function Logo({styles}) {
  return (

    <>
    <img src={image} className={styles} alt="logo" />
    </>
  );
}

export default Logo;
