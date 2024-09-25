import React from 'react'
import LoginBg from "../../assets/CircularLogo.png"
function LoginImg({className}) {
  return (
    <>
    <img src={LoginBg}  className={className} alt="" />
    </>
  )
}

export default LoginImg