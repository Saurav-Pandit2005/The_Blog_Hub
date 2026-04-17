import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api';
import './ForgotPassword.css';

function ForgotPassword() {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSendOTP = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api.post('/auth/forgotpassword', { email });
            if (res.data.success) {
                alert(res.data.message);
                setStep(2);
            }
        } catch (err) {
            alert(err.response?.data?.error || "Failed to send OTP. Account might not exist.");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api.post('/auth/verifyotp', { email, otp });
            if (res.data.success) {
                alert("OTP verified! Now create a new password.");
                setStep(3);
            }
        } catch (err) {
            alert(err.response?.data?.error || "Invalid or expired OTP.");
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            return alert("Passwords do not match!");
        }
        if (newPassword.length < 6) {
            return alert("Password must be at least 6 characters.");
        }

        setLoading(true);
        try {
            const res = await api.put('/auth/resetpassword', { email, otp, newPassword });
            if (res.data.success) {
                alert("Password Reset successfully! Please login with your new password.");
                navigate('/login');
            }
        } catch (err) {
            alert(err.response?.data?.error || "Failed to reset password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="forgot-container">
            <div className="forgot-card">
                <h2>{step === 1 ? 'Forgot Password?' : step === 2 ? 'Verify OTP' : 'New Password'}</h2>
                <p>
                    {step === 1 && "Enter your email to receive a secure 6-digit OTP."}
                    {step === 2 && "Enter the 6-digit OTP mailed to your inbox."}
                    {step === 3 && "Create a strong new password for your account."}
                </p>

                {/* STEP 1: SEND OTP */}
                {step === 1 && (
                    <form onSubmit={handleSendOTP}>
                        <div className="form-group">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="primary-btn" disabled={loading}>
                            {loading ? 'Sending...' : 'Send OTP'}
                        </button>
                    </form>
                )}

                {/* STEP 2: VERIFY OTP */}
                {step === 2 && (
                    <form onSubmit={handleVerifyOTP}>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Enter 6-Digit OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                maxLength="6"
                                required
                            />
                        </div>
                        <button type="submit" className="primary-btn" disabled={loading}>
                            {loading ? 'Verifying...' : 'Verify OTP'}
                        </button>
                    </form>
                )}

                {/* STEP 3: NEW PASSWORD */}
                {step === 3 && (
                    <form onSubmit={handleResetPassword}>
                        <div className="form-group">
                            <input
                                type="password"
                                placeholder="Enter New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                placeholder="Confirm New Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="primary-btn" disabled={loading}>
                            {loading ? 'Updating...' : 'Set New Password'}
                        </button>
                    </form>
                )}

                <div className="back-link" style={{ marginTop: '20px', textAlign: 'center' }}>
                    <Link to="/login" style={{ color: '#3B82F6', textDecoration: 'none' }}>← Back to Login</Link>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
