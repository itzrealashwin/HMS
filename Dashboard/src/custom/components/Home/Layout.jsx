import React from 'react'
import Header from '../vSlider Components/Header/Header'
// import Home from './Home/Home'
import Footer from './Footer/Footer'
import { Outlet } from 'react-router-dom'


function Layout() {
  return (
    <>
        <Header />
        <Outlet/>
        <Footer/>

    </>
  )
}

export default Layout