import React, { useState } from 'react';
import Slidebar from '../Slidebar/Slidebar';
import './Profile.css';

// Assets
import profilePic from '../../../assets/Images/Author/Dashboard/Profile/Profile.jpg';

function Profile() {
    const [isEditing, setIsEditing] = useState(false);
    const [authorData, setAuthorData] = useState({
        name: "Rima Shah",
        username: "@rimashah",
        email: "rimas97@gmail.com",
        bio: "Passionate developer building modern web applications and sharing knowledge through blogs and podcasts.",
        website: "https://rshah.com",
        twitter: "@rimashah"
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAuthorData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="author-profile-container">
            <Slidebar />

            <main className="profile-main-content">
                <header className="profile-header-top">
                    <h1>Your Profile</h1>
                    <p>Manage your account information and public profile.</p>
                </header>

                <div className="profile-main-wrapper">

                    {/* LEFT COLUMN: Avatar Card */}
                    <div className="profile-left-card">
                        <div className="avatar-section">
                            <div className="avatar-wrapper">
                                <img src={profilePic} alt="Profile" />
                            </div>
                            <h2>{authorData.name}</h2>
                            <span className="username-tag">{authorData.username}</span>
                        </div>

                        <div className="avatar-actions">
                            <button className="change-avatar-btn">Change Avatar</button>
                            <span className="upload-note">JPG, PNG or GIF (max. 5MB)</span>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Profile Info Card */}
                    <div className="profile-right-info">
                        <div className="info-header">
                            <h2>Profile Information</h2>
                            <button
                                className={`edit-mode-btn ${isEditing ? 'active' : ''}`}
                                onClick={() => setIsEditing(!isEditing)}
                            >
                                {isEditing ? 'Save Changes' : 'Edit Profile'}
                            </button>
                        </div>

                        <div className="profile-form-grid">
                            <div className="input-group">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={authorData.name}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />
                            </div>

                            <div className="input-group">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    value={authorData.email}
                                    disabled={true}
                                />
                                <span className="input-note">Email cannot be changed</span>
                            </div>

                            <div className="input-group full-width">
                                <label>Bio</label>
                                <textarea
                                    name="bio"
                                    rows="4"
                                    value={authorData.bio}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    maxLength="500"
                                ></textarea>
                                <div className="char-count">{authorData.bio.length}/500 characters</div>
                            </div>

                            <div className="input-group">
                                <label>Website</label>
                                <input
                                    type="text"
                                    name="website"
                                    placeholder="https://example.com"
                                    value={authorData.website}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />
                            </div>

                            <div className="input-group">
                                <label>Twitter Handle</label>
                                <input
                                    type="text"
                                    name="twitter"
                                    placeholder="@username"
                                    value={authorData.twitter}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />
                            </div>
                        </div>

                        {isEditing && (
                            <div className="form-footer-actions">
                                <button className="cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
                                <button className="update-btn" onClick={() => setIsEditing(false)}>Update Profile</button>
                            </div>
                        )}
                    </div>

                </div>
            </main>
        </div>
    );
}

export default Profile;
