import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api';
import './Register.css';

function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'Author'
    });
    const [loading, setLoading] = useState(false);

    const { name, username, email, password, confirmPassword, role } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !username || !email || !password) {
            alert("All fields are required!");
            return;
        }

        if (username.includes(' ')) {
            alert("Username cannot contain spaces!");
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters long!");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        setLoading(true);

        try {
            const res = await api.post('/auth/register', { 
                name, 
                username, 
                email, 
                password, 
                role 
            });

            if (res.data.success) {
                alert('Registration Successful! Please Login.');
                navigate("/login");
            }
        } catch (err) {
            alert(err.response?.data?.error || 'Registration failed. Try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="auth-section">
            <div className="auth-box">
                <div className="back-home">
                    <Link to="/home">← Back to Home</Link>
                </div>
                <h2>Create Your Account</h2>
                <p className="auth-subtitle">Join The Blog Hub community today</p>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your full name"
                            required
                            value={name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-group">
                        <label>Username</label>
                        <input
                            type="text"
                            name="username"
                            placeholder="Pick a unique username"
                            required
                            value={username}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            required
                            value={email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-group">
                        <label>Role</label>
                        <select 
                            name="role" 
                            className="role-select" 
                            value={role} 
                            onChange={handleChange}
                            required
                        >
                            <option value="Author">Author</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Create password"
                            required
                            value={password}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-group">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm password"
                            required
                            value={confirmPassword}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="auth-btn" disabled={loading}>
                        {loading ? 'Creating Account...' : 'Register'}
                    </button>
                </form>

                <p className="switch-text">
                    Already have an account?
                    <Link to="/login">Sign In</Link>
                </p>
            </div>
        </section>
    );
}

export default Register;
