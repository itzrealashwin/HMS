import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/vSlider Components/Header/Header'
import Hero from '../components/Home/Hero/Hero'
import HomePageLayout from '../components/Home/Home/Home'
import Footer from '../components/Home/Footer/Footer'


function Home() {

  
  return (
    <div className="flex flex-col gap96 min-h-screen">

    <Hero />
    <HomePageLayout />
  </div>
  )
}

export default Home