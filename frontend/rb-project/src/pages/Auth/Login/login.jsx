import React, { useState, useEffect } from 'react';
import "./login.css";

function Login() {

    return (
        <div className='main-content'>
            <div className='auth-cont'>
                Log in
                <div className='login-form'>
                    <input/>
                    <input/>
                    {/* Может заменить потом checkbox */}
                    <input type="checkbox" />  remember me
                    <button>Log in</button>
                </div>
                New User? Sign up here
                Forgot your password?
            </div>
        </div>
    );
}

export default Login