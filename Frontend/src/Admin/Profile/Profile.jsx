import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Slidebar from '../Slidebar/Slidebar';
import './Profile.css';
import adminProfileImg from '../../assets/Images/Admin/Profile/admin.jpg';

function AdminProfile() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [saved, setSaved] = useState(false);
    const [pwSaved, setPwSaved] = useState(false);
    const [activeTab, setActiveTab] = useState('profile');
    const [avatarSrc, setAvatarSrc] = useState(adminProfileImg);
    const dropdownRef = useRef(null);
    const fileInputRef = useRef(null);

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
        name: 'Surja Bist',
        email: 'admin@thebloghub.com',
        phone: '+91 98765 43210',
        location: 'Rajkot, India',
        bio: 'Platform administrator responsible for managing content, users, and overall system integrity of The Blog Hub.',
        role: 'Super Administrator',
        joinDate: 'January 1, 2019',
    });

    // ── Password State ──
    const [passwords, setPasswords] = useState({
        current: '',
        newPass: '',
        confirm: '',
    });

    const handleProfileSave = (e) => {
        e.preventDefault();
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const handlePasswordSave = (e) => {
        e.preventDefault();
        if (passwords.newPass !== passwords.confirm) {
            alert('New passwords do not match!');
            return;
        }
        setPwSaved(true);
        setPasswords({ current: '', newPass: '', confirm: '' });
        setTimeout(() => setPwSaved(false), 3000);
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => setAvatarSrc(ev.target.result);
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="admin-profile-page-container">
            <Slidebar />

            <main className="admin-profile-main">
                {/* HEADER */}
                <header className="admin-header">
                    <div className="header-text">
                        <h1>My Profile</h1>
                        <p>Manage your account details and security settings.</p>
                    </div>
                    <div className="header-actions">
                        <div className="admin-profile-container" ref={dropdownRef}>
                            <div className="admin-profile-icon" onClick={toggleDropdown}>
                                <img src={adminProfileImg} alt="Admin Profile" />
                                <span className="status-online"></span>
                            </div>
                            {isDropdownOpen && (
                                <div className="admin-profile-dropdown">
                                    <Link to="/admin/profile" className="dropdown-item">👤 Profile</Link>
                                    <div className="dropdown-divider"></div>
                                    <Link to="/login" className="dropdown-item logout-item">🚪 Logout</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

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
                            <button type="submit" className={`pf-save-btn ${saved ? 'saved' : ''}`}>
                                {saved ? '✅ Profile Updated!' : '💾 Save Changes'}
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
                            <button type="submit" className={`pf-save-btn ${pwSaved ? 'saved' : ''}`}>
                                {pwSaved ? '✅ Password Updated!' : '🔒 Update Password'}
                            </button>
                        </div>
                    </form>
                )}
            </main>
        </div>
    );
}

export default AdminProfile;
