import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Home, Login, Signup, Dashboard } from './index.js'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  )
}

export default App