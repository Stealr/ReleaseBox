import {React, memo} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "/src/Components/Header/Header.jsx";
import Footer from "/src/Components/Footer/Footer.jsx";
import Test from './pages/test.jsx';
import Home from './pages/Home/home.jsx';
import Login from './pages/Auth/Login/login.jsx';
import Signup from './pages/Auth/Signup/signup.jsx';
import Games from './pages/Games/Games.jsx';
import Calendar from './pages/Calendar/calendar.jsx';


const MemoizedHeader = memo(Header);
const MemoizedFooter = memo(Footer);

function App() {

  return (
    <Router>
      <MemoizedHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Calendar" element={<Calendar />} />
        <Route path="/Games" element={<Games />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/{Game}" element={<Test />} />
        <Route path="/Profile" element={<Test />} />
        <Route path="/Profile/Settings" element={<Test />} />
      </Routes>
      <MemoizedFooter />
    </Router>
  )
}

export default App
