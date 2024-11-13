import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Test from './pages/test';
import Home from './pages/home';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Calendar" element={<Test />} />
        <Route path="/Games" element={<Test />} />
        <Route path="/Login" element={<Test />} />
        <Route path="/{Game}" element={<Test />} />
        <Route path="/Profile" element={<Test />} />
        <Route path="/Profile/Settings" element={<Test />} />

      </Routes>
    </Router>
  )
}

export default App
