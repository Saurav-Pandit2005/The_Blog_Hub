import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // Logic like SignupServlet
        alert("Account Created Successfully! Redirecting to login...");
        navigate("/login");
    };

    return (
        <section className="auth-section">
            <div className="auth-box">
                <h2>Create Your Account</h2>
                <p className="auth-subtitle">Join The Blog Hub community today</p>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Enter your full name"
                            required
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
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Create password"
                            required
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
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="auth-btn">Register</button>
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
