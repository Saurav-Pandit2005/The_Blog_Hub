import React, { useState } from 'react';
import './UploadPodcasts.css';

function UploadPodcasts({ isOpen, onClose }) {
    const [formData, setFormData] = useState({
        title: '',
        host: '',
        category: 'Technology',
        description: ''
    });

    const handleUpload = (e) => {
        e.preventDefault();
        alert(`Podcast "${formData.title}" uploaded successfully!`);
        onClose();
        setFormData({ title: '', host: '', category: 'Technology', description: '' });
    };

    if (!isOpen) return null;

    return (
        <div className="upload-modal-overlay">
            <div className="upload-modal-card">
                <div className="um-header">
                    <h2>🎙️ Publish New Podcast</h2>
                    <button className="um-close" onClick={onClose}>×</button>
                </div>

                <form className="um-form" onSubmit={handleUpload}>
                    <div className="um-grid">
                        <div className="um-group full">
                            <label>Podcast Title</label>
                            <input 
                                type="text" 
                                placeholder="e.g. Scaling React Apps in 2024" 
                                required
                                value={formData.title}
                                onChange={(e) => setFormData({...formData, title: e.target.value})}
                            />
                        </div>

                        <div className="um-group">
                            <label>Primary Host</label>
                            <input 
                                type="text" 
                                placeholder="e.g. Saurav Pandit" 
                                required
                                value={formData.host}
                                onChange={(e) => setFormData({...formData, host: e.target.value})}
                            />
                        </div>

                        <div className="um-group">
                            <label>Category</label>
                            <select 
                                value={formData.category}
                                onChange={(e) => setFormData({...formData, category: e.target.value})}
                            >
                                <option>Technology</option>
                                <option>Design</option>
                                <option>Coding</option>
                                <option>Business</option>
                                <option>Lifestyle</option>
                            </select>
                        </div>

                        <div className="um-group full">
                            <label>Audio File Upload</label>
                            <div className="um-file-drop">
                                <span className="um-file-icon">📁</span>
                                <p>Click to select or drag & drop MP3/WAV</p>
                                <input type="file" accept="audio/*" required />
                            </div>
                        </div>

                        <div className="um-group full">
                            <label>Cover Image (Recommended 1080x1080)</label>
                            <input type="file" accept="image/*" />
                        </div>

                        <div className="um-group full">
                            <label>Podcast Description</label>
                            <textarea 
                                rows="3" 
                                placeholder="Write a brief overview..."
                                value={formData.description}
                                onChange={(e) => setFormData({...formData, description: e.target.value})}
                            ></textarea>
                        </div>
                    </div>

                    <div className="um-footer">
                        <button type="button" className="um-cancel" onClick={onClose}>Cancel</button>
                        <button type="submit" className="um-submit">Begin Upload Process</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UploadPodcasts;
