import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Dummy Author Login
        if (email === "author@test.com" && password === "123456" && role === "author") {
            alert("Login Successful as Author!");
            // navigate("/author/home"); // Not yet implemented, but this is how you'd do it
        }
        // Dummy Admin Login
        else if (email === "admin@test.com" && password === "123456" && role === "admin") {
            alert("Login Successful as Admin!");
            // navigate("/admin/dashboard"); // Not yet implemented
        }
        else {
            alert("Invalid email, password, or role!");
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Login to The Blog Hub</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            required
                        >
                            <option value="">✔ Select Role</option>
                            <option value="author">Author</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    <div className="extra-options">
                        <label>
                            <input type="checkbox" name="remember" />
                            Remember Me
                        </label>
                        <Link to="/forgot-password" name="forgot" className="forgot-link">
                            Forgot Password?
                        </Link>
                    </div>

                    <button type="submit" className="primary-btn">
                        Login
                    </button>
                </form>

                <div className="auth-footer">
                    Don’t have an account?
                    <Link to="/register">Register</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
