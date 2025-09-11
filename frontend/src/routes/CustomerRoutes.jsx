import React from 'react'
import Navbar from '../Customer/pages/Navbar/Navbar'
import Footer from '../Customer/pages/Footer/Footer'
import { Route, Routes } from 'react-router-dom'
import Home from '../Customer/pages/Home/Home'
import SalonDetails from '../Customer/pages/Salon/SalonDetails/SalonDetails'
import Bookings from '../Customer/pages/Bookings/Bookings'
import NotFound from '../Customer/pages/NotFound/NotFound'
import PaymentSuccessHandler from '../Customer/pages/Payment/PaymentSuccessHandler'
import Notification from '../Customer/pages/Notifications/Notification'
import SearchSalon from '../Customer/pages/Salon/SearchSalon'

const CustomerRoutes = () => {
  return (
    <>
    <Navbar />

<div className='pb-20 min-h-[90vh] mt-[5rem]'>
  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/salon/:id' element={<SalonDetails/>}/>
    <Route path='/bookings' element={<Bookings/>}/>
    <Route path='/search' element={<SearchSalon/>}/>
    <Route path='/notifications' element={<Notification type={"USER"}/>}/>
    <Route path='/payment-success/:id' element={<PaymentSuccessHandler/>}/>
    {/* payment-success */}
    <Route path='*' element={<NotFound />} />
  </Routes>
  
</div> 

<Footer />
    </>
  )
}

export default CustomerRoutes