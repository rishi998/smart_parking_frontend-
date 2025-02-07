import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home.jsx'
import Register from './components/Register.jsx'
import Login from './components/Login.jsx'
import VerifyOtp from './components/Verifyotp.jsx'
import Dashboard from './components/Dashboard.jsx'
const App = () => {
  return (
    <div>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/verifyotp' element={<VerifyOtp/>}></Route>
      <Route path='/dashboard' element={<Dashboard/>}></Route>
    </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
