import { useState } from 'react'
// import './App.css'
import Signup from './components/Signup'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import AddNote from './components/AddNote'
import BigNote from './components/BigNote'
import ProtectedRoutes from './components/ProtectedRoutes'
import EmptyRoutes from './components/EmptyRoutes'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<ProtectedRoutes><Home /></ProtectedRoutes>} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/addnote' element={<ProtectedRoutes><AddNote /></ProtectedRoutes>} />
        <Route path='/note/:id' element={<ProtectedRoutes><BigNote /></ProtectedRoutes>} />
        <Route path='/*' element={<EmptyRoutes/>} />
      </Routes>
    </>
  )
}

export default App
