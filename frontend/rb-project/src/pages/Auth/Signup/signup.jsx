import React, { useState, useEffect } from 'react';
import axios from "axios";
import "./signup.css";

function Login() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        try {
            const response = await axios.post('http://localhost:8000/register/', {
                username,
                email,
                password,
                logo: 'placeholder-logo',
                userCollections: {},
            });

            if (response.status === 201) {
                setSuccessMessage('User registered successfully!');
            }

            
        } catch (error) {
            console.error('Error during registration:', error);
            setErrorMessage(error.response?.data?.message || 'Something went wrong!');
        }
    };

    return (
        <div className='main-content'>
            <div className='auth-cont'>
                <form className="login-form" onSubmit={handleSubmit}>
                    <h1>Sign up</h1>
                    <input
                        className='input-auth'
                        type="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        className='input-auth'
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required />
                    <input
                        className='input-auth'
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required />
                    <div className="remember-me">
                        <input type="checkbox" id="remember" />
                        <label htmlFor="remember">Remember me</label> {/* Чекнуть потом*/}
                    </div>
                    <button type="submit">Sign up</button>
                </form>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
                <div className="login-links">
                    <p>
                        <a href="/Login">Log in here</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login