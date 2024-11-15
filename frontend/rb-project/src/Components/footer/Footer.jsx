import React from 'react';
import "./footer_style.css";

function Footer() {
    return (
        <div className="footer">
            <div className='content-footer'>
                <img src='/src/assets/LOGO.png' alt='logo' />

                <nav className="navigation">
                    <a href="home">Home</a>
                    <a href="games">Games</a>
                    <a href="calendar">Calendar</a>
                    <a href="reviews">Reviews</a>
                </nav>
            </div>
        </div>
    );
}

export default Footer