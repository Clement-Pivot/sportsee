import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './main.scss'
import Navbar from 'components/Navbar'

import Profile from './pages/profile'

const root = createRoot(document.getElementById('root')!)
root.render(
  <React.StrictMode>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Profile />} />
      </Routes>
    </Router>
  </React.StrictMode>,
)
