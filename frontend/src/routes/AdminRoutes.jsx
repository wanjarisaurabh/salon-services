import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SalonTable from '../Admin/pages/salon/SalonTable'



const AdminRoutes = () => {
  return (
    <Routes>
    <Route path='/' element={<SalonTable/>}/>
    
  </Routes>
  )
}

export default AdminRoutes