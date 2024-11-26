import React, { useState, useEffect } from 'react';
import "./login.css";

function Login() {

    return (
        <div className='main-content'>
            <div className='auth-cont'>
                <form className="login-form">
                    <h1>Log in</h1>
                    <input className='input-auth' type="email" placeholder="Email" required />
                    <input className='input-auth' type="password" placeholder="Password" required />
                    <div className="remember-me">
                        <input type="checkbox" id="remember" />
                        <label htmlFor="remember">Remember me</label>
                    </div>
                    <button type="submit">Log in</button>
                </form>
                <div className="login-links">
                    <p>
                         <a href="#">Sign up here</a>
                    </p>
                    <p>
                        <a href="#">Forgot password</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login