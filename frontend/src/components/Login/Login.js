import React, { useState } from 'react';
import '../Login/Login.css';

function Login({ setLoggedIn }) {
    const [registerData, setRegisterData] = useState({ username: '', password: '', confirmPassword: '' });
    const [loginData, setLoginData] = useState({ username: '', password: '' });

    const handleRegisterChange = (e) => {
        const { name, value } = e.target;
        setRegisterData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData(prevState => ({ ...prevState, [name]: value }));
    };

    const validatePassword = (password) => {
        const minLength = 8;
        const hasNumber = /\d/;
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
        return password.length >= minLength && hasNumber.test(password) && hasSpecialChar.test(password);
    };


    const handleRegister = async () => {
        if (registerData.password !== registerData.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        if (!validatePassword(registerData.password)) {
            alert('Password must be at least 8 characters long, contain a number and a special character.');
            return;
        }

        try {
            const response = await fetch('http://localhost:9000/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: registerData.username, password: registerData.password })
            });

            if (response.ok) {
                alert('Registration successful!');
                setRegisterData({ username: '', password: '', confirmPassword: '' });
            } else {
                alert('Registration failed.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Registration failed due to network error.');
        }
    };

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:9000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData)
            });

            if (response.ok) {
                alert('Login successful!');
                setLoggedIn(true); // Set the logged-in state to true
                setLoginData({ username: '', password: '' }); // Clear login fields
            } else {
                alert('Login failed.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Login failed due to network error.');
        }
    };

    return (
        <div className='log-reg'>
            <div className='registracija'>
                <span className='text1'>Join Today!</span>
                <p className='text'>Username:</p>
                <input className='input' type="text" name="username" value={registerData.username} onChange={handleRegisterChange} />
                <p className='text'>Password:</p>
                <input className='input' type="password" name="password" value={registerData.password} onChange={handleRegisterChange} />
                <p className='text'>Confirm Password:</p>
                <input className='input' type="password" name="confirmPassword" value={registerData.confirmPassword} onChange={handleRegisterChange} />
                <button className='btnAcc' onClick={handleRegister}>Create Account</button>
            </div>
            <div className='prijava'>
                <span className='text2'>Already have an account?</span>
                <p className='text'>Username:</p>
                <input className='input' type="text" name="username" value={loginData.username} onChange={handleLoginChange} />
                <p className='text'>Password:</p>
                <input className='input' type="password" name="password" value={loginData.password} onChange={handleLoginChange} />
                <button className='btnAcc' onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
}

export default Login;



