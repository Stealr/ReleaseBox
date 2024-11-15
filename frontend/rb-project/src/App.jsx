import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Test from './pages/test.jsx';
import Home from './pages/Home/home.jsx';
import Games from './pages/Games/Games.jsx';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Calendar" element={<Test />} />
        <Route path="/Games" element={<Games />} />
        <Route path="/Login" element={<Test />} />
        <Route path="/{Game}" element={<Test />} />
        <Route path="/Profile" element={<Test />} />
        <Route path="/Profile/Settings" element={<Test />} />
      </Routes>
    </Router>
  )
}

export default App
