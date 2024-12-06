import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./header_style.css";
import { useState } from 'react';
import axios from 'axios';

function Header({ isAuthenticated, onLogOut }) {
    const user_id = localStorage.getItem('userID');
    const accessToken = localStorage.getItem('accessToken');
    const [data, setData] = useState([]);

    useEffect(() => {
        if (user_id) {
            axios.get(`http://localhost:8000/get_user/`,
                { params: { user_id: user_id } },
            )
                .then((response) => {
                    setData(response.data);
                })
                .catch((err) => {
                    console.log("Пользователь ненайден");
                    onLogOut()
                });
        }
    }, [isAuthenticated]);


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

                </div>
                <div className="right">
                    {!accessToken ? (
                        <div className='normal-size'>
                            <Link to="/Signup">Sign up</Link>
                            <Link to="/Login">Log in</Link>
                        </div>
                    ) : (
                        <div className='normal-size'>
                            <Link to="/profile">{data.username}</Link>
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
                            <Link to="/profile">{data.username}</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Header