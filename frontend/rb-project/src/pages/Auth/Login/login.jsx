import React, { useState } from 'react';
import axios from 'axios';
import './login.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        try {
            const response = await axios.post('http://localhost:8000/token/', {
                username,
                password,
            });

            if (response.status === 200) {
                const { access, refresh, user_id } = response.data;

                localStorage.setItem('accessToken', access);
                localStorage.setItem('refreshToken', refresh);
                localStorage.setItem('userID', user_id);

                setSuccessMessage('Logged in successfully!');
            }
        } catch (error) {
            console.error('Error during login:', error);
            setErrorMessage(
                error.response?.data?.detail || 'Invalid credentials! Please try again.'
            );
        }
    };

    return (
        <div className='main-content'>
            <div className='auth-cont'>
                <form className="login-form" onSubmit={handleSubmit}>
                    <h1>Log in</h1>
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
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <div className="remember-me">
                        <input type="checkbox" id="remember" />
                        <label htmlFor="remember">Remember me</label>
                    </div>
                    <button type="submit">Log in</button>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    {successMessage && <p className="success-message">{successMessage}</p>}
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

export default Login;
