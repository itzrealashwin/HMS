import React, { useContext } from 'react'
import { WACountContext } from '../../context/dashboard/WACountContext.jsx'

function useDashboardContext() {
  const context = useContext(WACountContext)
  if (context === undefined) {
    throw new Error('useDashboardContext must be used within a WACountProvider')
  }
  return context
}

export default useDashboardContext