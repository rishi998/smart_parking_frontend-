import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import Home from './components/Home.jsx'
import Register from './components/Register.jsx'
import Login from './components/Login.jsx'
import VerifyOtp from './components/Verifyotp.jsx'
// import Dashboard from './components/Dashboard.jsx'
import Dashboard from './components/Dashboard.jsx'
import Book_parking from './components/Book_parking.jsx'
import ContactUs from './components/Contactus.jsx'
import MyBookings from './components/Mybookings.jsx'
import AboutUs from './components/Aboutus.jsx'
import Choice from './components/Choice.jsx'
import Alogin from './components/Alogin.jsx'
import Aregister from './components/Aregister.jsx'
import Adashboard from './components/Adashboard.jsx'
const App = () => {
  return (
    <div>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Choice/>}></Route>
      <Route path='/adminlogin' element={<Alogin/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/adminregister' element={<Aregister/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/verifyotp' element={<VerifyOtp/>}></Route>
      <Route path='/dashboard' element={<Dashboard/>}></Route>
      <Route path='/admindashboard' element={<Adashboard/>}></Route>
      
      <Route path='/book_parking' element={<Book_parking/>}></Route>
      <Route path='/contact_us' element={<ContactUs/>}></Route>
      <Route path='/mybookings' element={<MyBookings/>}></Route>
      <Route path='/about_us' element={<AboutUs/>}></Route>
    </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
