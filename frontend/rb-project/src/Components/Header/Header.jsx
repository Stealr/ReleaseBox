import React from 'react';
import { Link } from 'react-router-dom';
import "./header_style.css";

function Header(props) {
    return (
        <div className="header">
            <div className='content-header'>
                {/* <img src=''> */}
                <img src='/src/assets/LOGO.png' alt='logo' />
                <div className='center'>
                    <nav className="navigation">
                        <Link to="/">Home</Link>
                        <Link to="/Games">Games</Link>
                        <Link to="/Calendar">Calendar</Link>
                        <Link to="/Reviews">Reviews</Link>
                    </nav>

                    <div class="menu-container-center">
                        <span>Navigation</span>
                        <div class="dropdown-menu-center">
                            <Link to="/">Home</Link>
                            <Link to="/Games">Games</Link>
                            <Link to="/Calendar">Calendar</Link>
                            <Link to="/Reviews">Reviews</Link>
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

                    <div className='normal-size'>
                        <a href="#en">EN</a>
                        <Link to="/Signup">Sign up</Link>
                        <Link to="/Login">Log in</Link>
                    </div>

                    <div class="menu-container-right">
                        <span>☰</span>
                        <div class="dropdown-menu-right">
                            <a href="#">EN</a>
                            <Link to="/Signup">Sign up</Link>
                            <Link to="/Login">Log in</Link>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default Header