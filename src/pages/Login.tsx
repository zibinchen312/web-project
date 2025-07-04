import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './login.scss'; // Import the styles
import { login, LoginResponse } from '../api/index';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const location =useLocation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response: LoginResponse = await login(username, password);
            if (response.success) {
                localStorage.setItem('user', username);
                const { from } = location.state || { from: { pathname: '/' } };
                navigate(from.pathname);
            } else {
                alert(response.error || 'Invalid username or password');
            }
        } catch (error) {
            console.error('Login error: ', error);
            alert('Invalid username or password');
        }
    };

    const handleReturnHome = () => {
        navigate('/');
    };

    return (
        <div id="login">
            <div className="container">
                <div className="login-form">
                    <h2 className="text-center mb-4">登录</h2>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">用户名</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">密码</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="text-center">
                            <button type="button" className="btn btn-primary" onClick={handleLogin}>
                                登录
                            </button>
                            <button type="button" className="btn btn-secondary" onClick={handleReturnHome}>
                                返回首页
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;