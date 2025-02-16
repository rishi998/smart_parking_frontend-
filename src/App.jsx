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
const App = () => {
  return (
    <div>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/verifyotp' element={<VerifyOtp/>}></Route>
      <Route path='/dashboard' element={<Dashboard/>}></Route>
      <Route path='/book_parking' element={<Book_parking/>}></Route>
      <Route path='/contact_us' element={<ContactUs/>}></Route>
    </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
