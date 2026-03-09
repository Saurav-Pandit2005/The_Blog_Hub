import React from 'react';
import { Link } from 'react-router-dom';
import './ForgotPassword.css';

function ForgotPassword() {
    return (
        <div className="forgot-container">
            <div className="forgot-card">
                <h2>Forgot Password?</h2>
                <p>Change your password by entering your email and new credentials below.</p>

                <form>
                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email address"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="password"
                            name="newPassword"
                            placeholder="Enter New Password"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm New Password"
                            required
                        />
                    </div>

                    <button type="submit" className="primary-btn">
                        Reset Password
                    </button>
                </form>

                <div className="back-link">
                    <Link to="/login">← Back to Login</Link>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
