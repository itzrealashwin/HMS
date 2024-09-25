import React from 'react'
import { Outlet } from 'react-router-dom'

function AuthPage() {
  return (
    <div className='light'><Outlet/></div>
  )
}

export default AuthPage