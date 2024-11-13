import React, { useState, useEffect } from 'react';
import "./header_style.css";

function Home() {

    return (
        <div className="header">
            <div className='content-header'>
                {/* <img src=''> */}
                <img src='/src/assets/LOGO.png' alt='logo' />
                <div className='center'>
                    <nav className="navigation">
                        <a href="home">Home</a>
                        <a href="games">Games</a>
                        <a href="calendar">Calendar</a>
                        <a href="reviews">Reviews</a>
                    </nav>

                    <div class="menu-container-center">
                        <span>Navigation</span>
                        <div class="dropdown-menu-center">
                            <a href="home">Home</a>
                            <a href="games">Games</a>
                            <a href="calendar">Calendar</a>
                            <a href="reviews">Reviews</a>
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
                        <a href="#sign-up">Sign up</a>
                        <a href="#log-in">Log in</a>
                    </div>

                    <div class="menu-container-right">
                        <span>☰</span>
                        <div class="dropdown-menu-right">
                            <a href="#">EN</a>
                            <a href="#">Sign up</a>
                            <a href="#">Log in</a>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default Home