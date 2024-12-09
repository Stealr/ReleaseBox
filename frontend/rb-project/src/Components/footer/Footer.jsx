import React from 'react';
import { Link } from 'react-router-dom';
import "./footer_style.css";

function Footer() {
    return (
        <div className="footer">
            <div className='content-footer'>
                <img src='/src/assets/LOGO.png' alt='logo' />

                <nav className="navigation">
                    <Link to="/">Home</Link>
                    <Link to="/Games">Games</Link>
                    <Link to="/Calendar">Calendar</Link>
                    <Link to="/Reviews">Reviews</Link>
                </nav>
            </div>
        </div>
    );
}

export default Footer