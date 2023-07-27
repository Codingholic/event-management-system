import React , { useContext }  from 'react'
import "./Display.css"
import Event from './Events/Event'
import { Route, Routes, Navigate } from "react-router-dom";
import { AuthContext } from './context/Authcontext';
import Loginsignup from './Login-Signup/Loginsignup';
import Employees from './Employes/Employees';
const Display = () => {
  const {currentUser} = useContext(AuthContext)
  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to={"/login"} />
  }
console.log(currentUser)
  return (
    <div className='Display'>
      <Routes>
        <Route path="/">
          <Route index element={ <RequireAuth> <Event /></RequireAuth>} />
          <Route path='login' element={<Loginsignup />} />
          <Route path='Employees' element={<RequireAuth><Employees /></RequireAuth>} />
        </Route>
      </Routes>

    </div>
  )
}

export default Display