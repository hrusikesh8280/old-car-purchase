import React from 'react'
import { Route, Routes } from "react-router-dom";
import Login from './Auth/Login';
import Signup from './Auth/Signup';
const AllRoutes = () => {
  return (
    <Routes>
    
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/signup" element={<Signup />}  />
     
   
  </Routes>
  )
}

export default AllRoutes