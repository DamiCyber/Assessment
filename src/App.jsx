import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from "./component/Login"
import Dashboard from './component/Dashboard'
const App = () => {
  return (
    <div>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
    </div>
  )
}

export default App