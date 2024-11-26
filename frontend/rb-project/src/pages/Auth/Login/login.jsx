import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./login.css";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        try {
            const response = await axios.post('http://localhost:8000/login/', {
                email,
                password,
            });

            if (response.status === 200) {
                setSuccessMessage('Logged in successfully!');
                // Сохраните токен или другие данные, если нужно
                localStorage.setItem('token', response.data.token);
            }
        } catch (error) {
            console.error('Error during login:', error);
            setErrorMessage(error.response?.data?.message || 'Invalid credentials!');
        }
    };

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
                        <a href="/Signup">Sign up here</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login