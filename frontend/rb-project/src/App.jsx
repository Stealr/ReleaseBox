import { React, memo, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "/src/Components/Header/Header.jsx";
import Footer from "/src/Components/Footer/Footer.jsx";
import Test from './pages/test.jsx';
import Home from './pages/Home/home.jsx';
import Login from './pages/Auth/Login/login.jsx';
import Signup from './pages/Auth/Signup/signup.jsx';
import Games from './pages/Games/Games.jsx';
import Calendar from './pages/Calendar/calendar.jsx';
import GameInfo from './pages/GameInfo/gameInfo.jsx';
import Profile from './pages/profile/profile.jsx';


const MemoizedHeader = memo(Header);
const MemoizedFooter = memo(Footer);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const handleLogOut = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false); // Меняем состояние
  };

  const handleLogIn = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true); // Меняем состояние

  };
  return (
    <Router>
      <MemoizedHeader isAuthenticated={isAuthenticated} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/games" element={<Games />} />
        <Route path="/login" element={<Login onLogIn={handleLogIn} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/games/:game" element={<GameInfo />} />
        <Route path="/:user" element={<Profile onLogOut={handleLogOut} />} />
        <Route path="/profile/settings" element={<Test />} />
      </Routes>
    </Router>
  )
}

export default App
