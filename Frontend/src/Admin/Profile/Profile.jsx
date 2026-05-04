import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import Slidebar from '../Slidebar/Slidebar';
import './Profile.css';
import adminProfileImg from '../../assets/Images/Admin/Profile/admin.jpg';
import { UserContext } from '../../context/UserContext';
import api from '../../api';
import { CheckCircle, X } from 'lucide-react';
import '../Dashboard/Dashboard.css'; // Global Toast styles

function AdminProfile() {
    const { user, updateUserData } = useContext(UserContext);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
    const [activeTab, setActiveTab] = useState('profile');
    const [avatarSrc, setAvatarSrc] = useState(user?.profilePic || adminProfileImg);
    const dropdownRef = useRef(null);
    const fileInputRef = useRef(null);

    const triggerToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => {
            setToast(prev => ({ ...prev, show: false }));
        }, 3000);
    };

    const toggleDropdown = (e) => {
        e.stopPropagation();
        setIsDropdownOpen(!isDropdownOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    // ── Profile Info State ──
    const [profile, setProfile] = useState({
        name: user?.name || 'Admin User',
        email: user?.email || 'admin@bloghub.com',
        phone: user?.phone || '+91 00000 00000',
        location: user?.location || 'Rajkot, India',
        bio: user?.bio || 'Platform administrator...',
        role: user?.role || 'Administrator',
        joinDate: user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'January 1, 2024',
    });

    // ── Password State ──
    const [passwords, setPasswords] = useState({
        current: '',
        newPass: '',
        confirm: '',
    });

    const handleProfileSave = async (e) => {
        e.preventDefault();
        try {
            setIsSaving(true);
            const res = await api.put('/auth/updatedetails', {
                name: profile.name,
                email: profile.email,
                phone: profile.phone,
                location: profile.location,
                bio: profile.bio
            });

            if (res.data.success) {
                updateUserData(res.data.data);
                triggerToast('Profile information updated successfully!');
            }
        } catch (err) {
            triggerToast(err.response?.data?.error || 'Failed to update profile.', 'error');
        } finally {
            setIsSaving(false);
        }
    };

    const handlePasswordSave = async (e) => {
        e.preventDefault();
        if (passwords.newPass !== passwords.confirm) {
            triggerToast('New passwords do not match!', 'error');
            return;
        }

        try {
            setIsSaving(true);
            const res = await api.put('/auth/updatepassword', {
                currentPassword: passwords.current,
                newPassword: passwords.newPass
            });

            if (res.data.success) {
                triggerToast('Password updated successfully!');
                setPasswords({ current: '', newPass: '', confirm: '' });
            }
        } catch (err) {
            triggerToast(err.response?.data?.error || 'Failed to update password.', 'error');
        } finally {
            setIsSaving(false);
        }
    };

    const handleAvatarChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                setIsSaving(true);
                const formData = new FormData();
                formData.append('profilePic', file);

                const res = await api.put('/auth/updateavatar', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });

                if (res.data.success) {
                    setAvatarSrc(res.data.profilePic);
                    updateUserData({ profilePic: res.data.profilePic });
                    triggerToast('Profile picture updated!');
                }
            } catch (err) {
                triggerToast('Failed to upload avatar.', 'error');
            } finally {
                setIsSaving(false);
            }
        }
    };

    return (
        <div className="admin-profile-page-container">
            <Slidebar />

            <main className="admin-profile-main">
                {/* PROFILE HERO CARD */}
                <div className="profile-hero-card">
                    <div className="profile-hero-bg"></div>
                    <div className="profile-hero-body">
                        <div className="profile-avatar-wrap">
                            <img src={avatarSrc} alt="Admin" className="profile-avatar-img" />
                            <span className="profile-online-dot"></span>
                            <button
                                type="button"
                                className="avatar-change-btn"
                                title="Change profile picture"
                                onClick={() => fileInputRef.current.click()}
                            >
                                📷
                            </button>
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleAvatarChange}
                            />
                        </div>
                        <div className="profile-hero-info">
                            <h2>{profile.name}</h2>
                            <span className="profile-role-badge">🛡️ {profile.role}</span>
                            <p className="profile-hero-email">✉️ {profile.email}</p>
                            <p className="profile-hero-location">📍 {profile.location} &nbsp;·&nbsp; 🗓️ Joined {profile.joinDate}</p>
                        </div>
                    </div>

                </div>

                {/* TABS */}
                <div className="profile-tabs">
                    <button
                        className={`profile-tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
                        onClick={() => setActiveTab('profile')}
                    >
                        👤 Edit Profile
                    </button>
                    <button
                        className={`profile-tab-btn ${activeTab === 'security' ? 'active' : ''}`}
                        onClick={() => setActiveTab('security')}
                    >
                        🔒 Security
                    </button>
                </div>

                {/* ── EDIT PROFILE TAB ── */}
                {activeTab === 'profile' && (
                    <form className="profile-form-card" onSubmit={handleProfileSave}>
                        <div className="pfc-header">
                            <h3>Personal Information</h3>
                            <p>Update your name, contact details and bio.</p>
                        </div>
                        <div className="pfc-body">
                            <div className="pf-grid">
                                <div className="pf-group">
                                    <label>Full Name</label>
                                    <input
                                        type="text"
                                        value={profile.name}
                                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                    />
                                </div>
                                <div className="pf-group">
                                    <label>Email Address</label>
                                    <input
                                        type="email"
                                        value={profile.email}
                                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                    />
                                </div>
                                <div className="pf-group">
                                    <label>Phone Number</label>
                                    <input
                                        type="text"
                                        value={profile.phone}
                                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                    />
                                </div>
                                <div className="pf-group">
                                    <label>Location</label>
                                    <input
                                        type="text"
                                        value={profile.location}
                                        onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                                    />
                                </div>
                                <div className="pf-group full">
                                    <label>Admin Bio</label>
                                    <textarea
                                        rows="3"
                                        value={profile.bio}
                                        onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                                    />
                                </div>
                                <div className="pf-group">
                                    <label>Role (Read-only)</label>
                                    <input type="text" value={profile.role} readOnly className="readonly-field" />
                                </div>
                                <div className="pf-group">
                                    <label>Join Date (Read-only)</label>
                                    <input type="text" value={profile.joinDate} readOnly className="readonly-field" />
                                </div>
                            </div>
                        </div>
                        <div className="pfc-footer">
                            <button type="submit" className="pf-save-btn" disabled={isSaving}>
                                {isSaving ? '⏳ Saving...' : '💾 Save Changes'}
                            </button>
                        </div>
                    </form>
                )}

                {/* ── SECURITY TAB ── */}
                {activeTab === 'security' && (
                    <form className="profile-form-card" onSubmit={handlePasswordSave}>
                        <div className="pfc-header">
                            <h3>Change Password</h3>
                            <p>Ensure your account uses a strong, unique password.</p>
                        </div>
                        <div className="pfc-body">
                            <div className="pf-grid">
                                <div className="pf-group full">
                                    <label>Current Password</label>
                                    <input
                                        type="password"
                                        placeholder="Enter current password"
                                        value={passwords.current}
                                        onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="pf-group">
                                    <label>New Password</label>
                                    <input
                                        type="password"
                                        placeholder="Min. 8 characters"
                                        value={passwords.newPass}
                                        onChange={(e) => setPasswords({ ...passwords, newPass: e.target.value })}
                                        required
                                        minLength={8}
                                    />
                                </div>
                                <div className="pf-group">
                                    <label>Confirm New Password</label>
                                    <input
                                        type="password"
                                        placeholder="Repeat new password"
                                        value={passwords.confirm}
                                        onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="security-tip">
                                <span>🔐</span>
                                <p>Use a mix of uppercase letters, numbers, and symbols for a stronger password.</p>
                            </div>
                        </div>
                        <div className="pfc-footer">
                            <button type="submit" className="pf-save-btn" disabled={isSaving}>
                                {isSaving ? '⏳ Updating...' : '🔒 Update Password'}
                            </button>
                        </div>
                    </form>
                )}
            </main>

            {/* Toast Notification */}
            {toast.show && (
                <div className={`premium-toast-container ${toast.type}`}>
                    <div className="toast-content">
                        {toast.type === 'success' ? <CheckCircle size={20} /> : <X size={20} />}
                        <span>{toast.message}</span>
                    </div>
                    <div className="toast-progress-bar"></div>
                </div>
            )}
        </div>
    );
}

export default AdminProfile;
