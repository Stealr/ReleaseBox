import React from 'react';
import { Link } from 'react-router-dom';
import "./header_style.css";

function Header() {
    const user_id = localStorage.getItem('userID');
    const accessToken = localStorage.getItem('accessToken');

    return (
        <div className="header">
            <div className='content-header'>
                <img src='/src/assets/LOGO.png' alt='logo' />
                <div className='center'>
                    <nav className="navigation">
                        <Link to="/">Home</Link>
                        <Link to="/Games">Games</Link>
                        <Link to="/Calendar">Calendar</Link>
                    </nav>

                    <div class="menu-container-center">
                        <span>Navigation</span>
                        <div class="dropdown-menu-center">
                            <Link to="/">Home</Link>
                            <Link to="/Games">Games</Link>
                            <Link to="/Calendar">Calendar</Link>
                        </div>
                    </div>

                    <div className='mini-lup'>
                        <img src='/src/assets/search.png' alt='magnifier' />
                    </div>
                    <div className="search-bar">
                        <input type="text" placeholder="Enter game's name" />
                    </div>
                </div>
                <div className="right">
                    {!accessToken ? (
                        <div className='normal-size'>
                            <Link to="/Signup">Sign up</Link>
                            <Link to="/Login">Log in</Link>
                        </div>
                    ) : (
                        <div className='normal-size'>
                            <Link to="/profile">Profile</Link>
                        </div>
                    )}
                    {!accessToken ? (
                        <div class="menu-container-right">
                            <span>☰</span>
                            <div class="dropdown-menu-right">
                                <Link to="/Signup">Sign up</Link>
                                <Link to="/Login">Log in</Link>
                            </div>
                        </div>
                    ) : (
                        <div class="menu-container-right">
                            <Link to="/profile">Profile</Link>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}

export default Header