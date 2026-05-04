import React, { useState, useEffect, useRef } from 'react';
import { User, Globe, Lock, Camera, Shield, Check, Mail, Info, CheckCircle, X } from 'lucide-react';
import '../Dashboard.css'; // Global Dashboard styles for Toasts
import Slidebar from '../Slidebar/Slidebar';
import api from '../../../api';
import './Profile.css';

function Profile() {
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [activeTab, setActiveTab] = useState('general');
    const fileInputRef = useRef(null);
    const [authorData, setAuthorData] = useState({
        name: "",
        username: "",
        email: "",
        bio: "",
        website: "",
        twitter: "",
        profilePic: "",
        role: ""
    });
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

    const triggerToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => {
            setToast(prev => ({ ...prev, show: false }));
        }, 3000);
    };

    useEffect(() => {
        fetchMe();
    }, []);

    const fetchMe = async () => {
        try {
            setLoading(true);
            const res = await api.get('/auth/me');
            if (res.data.success) {
                setAuthorData({
                    name: res.data.data.name || "",
                    username: res.data.data.username || "",
                    email: res.data.data.email || "",
                    bio: res.data.data.bio || "",
                    website: res.data.data.website || "",
                    twitter: res.data.data.twitter || "",
                    profilePic: res.data.data.profilePic || "",
                    role: res.data.data.role || "Author"
                });
            }
        } catch (err) {
            console.error("Error fetching profile:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAuthorData(prev => ({ ...prev, [name]: value }));
    };

    const [passwords, setPasswords] = useState({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: ""
    });

    const handleUpdate = async () => {
        try {
            const res = await api.put('/auth/updatedetails', authorData);
            if (res.data.success) {
                triggerToast("Profile Updated Successfully!");
                setIsEditing(false);
                const user = JSON.parse(localStorage.getItem('user'));
                localStorage.setItem('user', JSON.stringify({ ...user, name: authorData.name, profilePic: authorData.profilePic }));
            }
        } catch (err) {
            console.error("Error updating profile:", err);
            triggerToast(err.response?.data?.error || "Failed to update profile.", "error");
        }
    };

    const handlePasswordUpdate = async () => {
        if (!passwords.currentPassword || !passwords.newPassword || !passwords.confirmNewPassword) {
            return triggerToast("Please fill in all password fields.", "error");
        }
        if (passwords.newPassword !== passwords.confirmNewPassword) {
            return triggerToast("New passwords do not match!", "error");
        }
        if (passwords.newPassword.length < 6) {
            return triggerToast("New password must be at least 6 characters.", "error");
        }

        try {
            const res = await api.put('/auth/updatepassword', {
                currentPassword: passwords.currentPassword,
                newPassword: passwords.newPassword
            });
            
            if (res.data.success) {
                triggerToast("Password updated successfully!");
                setPasswords({ currentPassword: "", newPassword: "", confirmNewPassword: "" });
            }
        } catch (err) {
            triggerToast(err.response?.data?.error || "Failed to update password.", "error");
        }
    };

    const handleAvatarChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('profilePic', file);

        try {
            setUploading(true);
            const res = await api.put('/auth/updateavatar', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (res.data.success) {
                setAuthorData(prev => ({ ...prev, profilePic: res.data.profilePic }));
                const user = JSON.parse(localStorage.getItem('user'));
                localStorage.setItem('user', JSON.stringify({ ...user, profilePic: res.data.profilePic }));
                triggerToast("Avatar updated!");
            }
        } catch (err) {
            console.error("Error uploading avatar:", err);
            triggerToast("Failed to upload avatar.", "error");
        } finally {
            setUploading(false);
        }
    };

    if (loading) return <div className="loading-state">Accessing The Blog Hub profile vault...</div>;

    return (
        <div className="author-profile-container">
            <Slidebar />

            <main className="profile-main-content">
                <header className="profile-header-top">
                    <h1>Profile Settings</h1>
                    <p>Customize your author profile and stay secure.</p>
                </header>

                <div className="profile-merged-card">
                    {/* PROFILE BANNER / TOP SECTION */}
                    <div className="card-top-header">
                        <div className="profile-avatar-stack" onClick={() => fileInputRef.current.click()}>
                            <div className="main-avatar">
                                <img 
                                    src={authorData.profilePic || `https://ui-avatars.com/api/?name=${authorData.name}&background=eff6ff&color=3b82f6`} 
                                    alt="Profile" 
                                />
                                <div className="cam-overlay">
                                    <Camera size={20} />
                                </div>
                                {uploading && <div className="upload-spin"></div>}
                            </div>
                            <input 
                                type="file" 
                                ref={fileInputRef} 
                                style={{ display: 'none' }} 
                                accept="image/*"
                                onChange={handleAvatarChange}
                            />
                        </div>
                        <div className="profile-titles">
                            <h2>{authorData.name}</h2>
                            <div className="profile-metadata">
                                <span className="meta-username">@{authorData.username}</span>
                                <span className="meta-sep"></span>
                                <span className="meta-role">{authorData.role}</span>
                            </div>
                        </div>
                    </div>

                    {/* TABS NAVIGATION */}
                    <nav className="profile-tabs-nav">
                        <button 
                            className={`tab-btn ${activeTab === 'general' ? 'active' : ''}`} 
                            onClick={() => setActiveTab('general')}
                        >
                            <User size={18} />
                            <span>General</span>
                        </button>
                        <button 
                            className={`tab-btn ${activeTab === 'social' ? 'active' : ''}`} 
                            onClick={() => setActiveTab('social')}
                        >
                            <Globe size={18} />
                            <span>Social Presence</span>
                        </button>
                        <button 
                            className={`tab-btn ${activeTab === 'security' ? 'active' : ''}`} 
                            onClick={() => setActiveTab('security')}
                        >
                            <Shield size={18} />
                            <span>Security</span>
                        </button>
                    </nav>

                    {/* TAB CONTENT */}
                    <div className="card-content-area">
                        {activeTab === 'general' && (
                            <div className="tab-pane-view">
                                <div className="pane-header">
                                    <div className="pane-title">
                                        <Info size={18} />
                                        <h3>Essential Information</h3>
                                    </div>
                                    <button
                                        className={`edit-toggle-btn ${isEditing ? 'is-editing' : ''}`}
                                        onClick={() => isEditing ? handleUpdate() : setIsEditing(true)}
                                    >
                                        {isEditing ? <><Check size={16}/> Save</> : 'Edit Profile'}
                                    </button>
                                </div>
                                
                                <div className="form-responsive-grid">
                                    <div className="input-field">
                                        <label>Full Display Name</label>
                                        <div className="input-wrapper">
                                            <User size={16} className="input-icon" />
                                            <input
                                                type="text"
                                                name="name"
                                                value={authorData.name}
                                                onChange={handleChange}
                                                disabled={!isEditing}
                                                placeholder="Your full name"
                                            />
                                        </div>
                                    </div>
                                    <div className="input-field">
                                        <label>Registered Email</label>
                                        <div className="input-wrapper disabled">
                                            <Mail size={16} className="input-icon" />
                                            <input
                                                type="email"
                                                value={authorData.email}
                                                disabled={true}
                                            />
                                        </div>
                                    </div>
                                    <div className="input-field full-row">
                                        <label>Author Bio</label>
                                        <textarea
                                            name="bio"
                                            rows="5"
                                            value={authorData.bio}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            maxLength="500"
                                            placeholder="Write a short biography about your writing journey..."
                                        ></textarea>
                                        <span className="char-limit">{authorData.bio?.length || 0}/500</span>
                                    </div>
                                </div>
                                {isEditing && (
                                    <div className="action-footer">
                                        <button className="sec-btn" onClick={() => setIsEditing(false)}>Cancel</button>
                                        <button className="pri-btn" onClick={handleUpdate}>Save Profile</button>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'social' && (
                            <div className="tab-pane-view">
                                <div className="pane-header">
                                    <div className="pane-title">
                                        <Globe size={18} />
                                        <h3>External Links</h3>
                                    </div>
                                    <button
                                        className={`edit-toggle-btn ${isEditing ? 'is-editing' : ''}`}
                                        onClick={() => isEditing ? handleUpdate() : setIsEditing(true)}
                                    >
                                        {isEditing ? 'Save' : 'Edit Links'}
                                    </button>
                                </div>
                                <div className="form-responsive-grid">
                                    <div className="input-field full-row">
                                        <label>Personal Website / Portfolio</label>
                                        <input
                                            type="text"
                                            name="website"
                                            placeholder="https://yoursite.com"
                                            value={authorData.website}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                    <div className="input-field full-row">
                                        <label>Twitter (X) Profile</label>
                                        <input
                                            type="text"
                                            name="twitter"
                                            placeholder="@yourhandle"
                                            value={authorData.twitter}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'security' && (
                            <div className="tab-pane-view">
                                <div className="pane-header">
                                    <div className="pane-title">
                                        <Lock size={18} />
                                        <h3>Password Management</h3>
                                    </div>
                                </div>
                                <div className="security-form-container">
                                    <div className="input-field">
                                        <label>Old Password</label>
                                        <input
                                            type="password"
                                            placeholder="Current password"
                                            value={passwords.currentPassword}
                                            onChange={(e) => setPasswords({...passwords, currentPassword: e.target.value})}
                                        />
                                    </div>
                                    <div className="input-field">
                                        <label>New Secure Password</label>
                                        <input
                                            type="password"
                                            placeholder="Min 6 characters"
                                            value={passwords.newPassword}
                                            onChange={(e) => setPasswords({...passwords, newPassword: e.target.value})}
                                        />
                                    </div>
                                    <div className="input-field">
                                        <label>Verify New Password</label>
                                        <input
                                            type="password"
                                            placeholder="Repeat new password"
                                            value={passwords.confirmNewPassword}
                                            onChange={(e) => setPasswords({...passwords, confirmNewPassword: e.target.value})}
                                        />
                                    </div>
                                    <button className="pri-btn full-w" onClick={handlePasswordUpdate}>Update Password</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
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

export default Profile;

