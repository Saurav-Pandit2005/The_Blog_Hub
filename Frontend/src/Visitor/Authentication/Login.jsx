import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api';
import { UserContext } from '../../context/UserContext';
import './Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await api.post('/auth/login', { email, password });
            
            if (res.data.success) {
                const { token, user } = res.data;
                
                // Store in localStorage
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                
                // Update Global User State
                setUser(user);

                // Navigate based on role
                if (user.role === 'Admin') {
                    navigate("/admin/dashboard");
                } else if (user.role === 'Author') {
                    navigate("/author/home");
                } else {
                    navigate("/home");
                }
            }
        } catch (err) {
            alert(err.response?.data?.error || "Invalid email or password!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="back-home">
                    <Link to="/home">← Back to Home</Link>
                </div>
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

                    <div className="extra-options">
                        <label>
                            <input type="checkbox" name="remember" />
                            Remember Me
                        </label>
                        <Link to="/forgot-password" name="forgot" className="forgot-link">
                            Forgot Password?
                        </Link>
                    </div>

                    <button type="submit" className="primary-btn" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
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
