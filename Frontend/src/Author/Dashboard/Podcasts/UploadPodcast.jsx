import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slidebar from '../Slidebar/Slidebar';
import './UploadPodcast.css';

function UploadPodcast() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        type: 'audio', // Default to audio, but prepared for video
        file: null,
        thumbnail: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData(prev => ({ ...prev, [name]: files[0] }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically upload the data to your server
        console.log("Podcast Data Submitted:", formData);
        alert("Podcast uploaded successfully!");
        navigate('/author/dashboard/podcasts');
    };

    return (
        <div className="upload-podcast-container">
            <Slidebar />
            
            <main className="upload-podcast-main">
                <header className="upload-header">
                    <div className="header-text">
                        <h1>Upload New Podcast</h1>
                        <p>Share your stories and insights with the world.</p>
                    </div>
                </header>

                <form className="upload-form" onSubmit={handleSubmit}>
                    <div className="form-section">
                        <div className="input-group">
                            <label>Podcast Title</label>
                            <input 
                                type="text" 
                                name="title" 
                                placeholder="Enter a catchy title..." 
                                value={formData.title}
                                onChange={handleChange}
                                required 
                            />
                        </div>

                        <div className="input-group">
                            <label>Description</label>
                            <textarea 
                                name="description" 
                                placeholder="What is this podcast about?"
                                value={formData.description}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>

                        <div className="row">
                            <div className="input-group half">
                                <label>Category</label>
                                <select name="category" value={formData.category} onChange={handleChange} required>
                                    <option value="">Select Category</option>
                                    <option value="tech">Technology</option>
                                    <option value="lifestyle">Lifestyle</option>
                                    <option value="business">Business</option>
                                    <option value="education">Education</option>
                                </select>
                            </div>

                            <div className="input-group half">
                                <label>Content Type</label>
                                <select name="type" value={formData.type} onChange={handleChange} required>
                                    <option value="audio">Audio Podcast</option>
                                    <option value="video">Video Podcast (Coming Soon)</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="upload-section">
                        <div className="upload-box-wrapper">
                            <div className="upload-box">
                                <label>Podcast File</label>
                                <div className="file-drop-zone">
                                    <input 
                                        type="file" 
                                        name="file" 
                                        accept={formData.type === 'audio' ? "audio/*" : "video/*"}
                                        onChange={handleFileChange}
                                        required 
                                    />
                                    <div className="drop-zone-content">
                                        <span className="icon">{formData.type === 'audio' ? '🎙️' : '🎬'}</span>
                                        <p>{formData.file ? formData.file.name : `Click or drag your ${formData.type} file here`}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="upload-box">
                                <label>Cover Thumbnail</label>
                                <div className="file-drop-zone thumbnail-zone">
                                    <input 
                                        type="file" 
                                        name="thumbnail" 
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        required 
                                    />
                                    <div className="drop-zone-content">
                                        <span className="icon">🖼️</span>
                                        <p>{formData.thumbnail ? formData.thumbnail.name : "Upload cover image"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="button" className="cancel-btn" onClick={() => navigate('/author/dashboard/podcasts')}>Cancel</button>
                        <button type="submit" className="submit-btn primary-btn">Publish Podcast</button>
                    </div>
                </form>
            </main>
        </div>
    );
}

export default UploadPodcast;
