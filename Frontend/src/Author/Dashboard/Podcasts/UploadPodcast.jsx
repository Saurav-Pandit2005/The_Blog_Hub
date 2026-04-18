import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slidebar from '../Slidebar/Slidebar';
import api from '../../../api';
import './UploadPodcast.css';

function UploadPodcast() {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [category, setCategory] = useState('Technology');
    const [duration, setDuration] = useState('');
    const [type, setType] = useState('Video'); 
    const [publishNow, setPublishNow] = useState(false);
    const [uploadType, setUploadType] = useState('File'); // 'File' or 'Link'
    const [externalLink, setExternalLink] = useState('');
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // File states
    const [mediaFile, setMediaFile] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);
    const [mediaPreview, setMediaPreview] = useState(null);
    const [thumbPreview, setThumbPreview] = useState(null);

    const extractYouTubeId = (url) => {
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[7].length === 11) ? match[7] : null;
    };

    const handleLinkChange = (url) => {
        setExternalLink(url);
        const ytId = extractYouTubeId(url);
        if (ytId) {
            const ytThumb = `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`;
            setThumbPreview(ytThumb);
            setThumbnail(ytThumb); 
        }
    };

    const handleMediaChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setMediaFile(file);
            setMediaPreview(file.name);
        }
    };

    const handleThumbChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setThumbnail(file);
            setThumbPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (statusOverride) => {
        if (!title.trim() || title.length < 5) {
            alert("Please provide a title (min 5 characters).");
            return;
        }

        if (!desc.trim() || desc.length < 20) {
            alert("Please provide a description (min 20 characters).");
            return;
        }

        if (uploadType === 'File' && !mediaFile) {
            alert(`Please upload a ${type} file.`);
            return;
        }

        if (uploadType === 'Link' && !externalLink) {
            alert("Please provide an external stream link.");
            return;
        }

        if (!thumbnail) {
            alert("Please provide a cover thumbnail image.");
            return;
        }

        try {
            setIsSubmitting(true);
            const formData = new FormData();
            formData.append('title', title);
            formData.append('desc', desc);
            formData.append('category', category);
            formData.append('duration', duration);
            formData.append('type', type);
            formData.append('status', statusOverride || (publishNow ? 'Published' : 'Draft'));
            formData.append('isExternal', uploadType === 'Link');

            if (uploadType === 'Link') {
                formData.append('audioUrl', externalLink);
                formData.append('source', externalLink.includes('youtube.com') || externalLink.includes('youtu.be') ? 'YouTube' : 'External');
                if (typeof thumbnail === 'string') {
                    formData.append('coverImage', thumbnail);
                } else if (thumbnail) {
                    formData.append('coverImage', thumbnail);
                }
            } else {
                formData.append('source', 'Upload');
                if (mediaFile) formData.append('audio', mediaFile);
                if (thumbnail) formData.append('coverImage', thumbnail);
            }

            const res = await api.post('/podcasts', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (res.data.success) {
                alert(`Podcast ${statusOverride === 'Draft' ? 'draft saved' : 'published'} successfully!`);
                navigate('/author/dashboard/podcasts');
            }
        } catch (err) {
            console.error("Submission Error:", err);
            alert(err.response?.data?.error || `Failed to process podcast. Try again.`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="upload-podcast-container">
            <Slidebar />
            
            <main className="upload-main-area">
                <div className="upload-content-wrapper full-width">
                    <header className="upload-header-minimal">
                        <h1>New Podcast Episode</h1>
                        <p>Share your voice with the world in a few clicks.</p>
                    </header>

                    <div className="upload-form-card-premium">
                        <div className="form-section-main">
                            
                            <div className="form-row">
                                <div className="form-group flex-2">
                                    <label>Podcast Title</label>
                                    <input 
                                        type="text" 
                                        placeholder="Give your podcast a catchy title..." 
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="premium-input"
                                    />
                                </div>
                                <div className="form-group flex-1">
                                    <label>Duration</label>
                                    <input 
                                        type="text" 
                                        placeholder="e.g. 15:00" 
                                        value={duration} 
                                        onChange={(e) => setDuration(e.target.value)} 
                                        className="premium-input"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Genre / Category</label>
                                <input 
                                    type="text" 
                                    placeholder="e.g. Technology, Education, Music..." 
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="premium-input"
                                />
                            </div>

                            <div className="form-group">
                                <label>Podcast Description</label>
                                <textarea 
                                    placeholder="What is this episode about?"
                                    rows="10"
                                    value={desc}
                                    onChange={(e) => setDesc(e.target.value)}
                                    className="premium-textarea"
                                ></textarea>
                            </div>

                            <div className="form-divider"></div>

                            <div className="form-row">
                                <div className="form-group flex-1">
                                    <label>Podcast Format</label>
                                    <div className="toggle-pills">
                                        <button type="button" className={`pill ${type === 'Video' ? 'active' : ''}`} onClick={() => setType('Video')}>📹 Video</button>
                                        <button type="button" className={`pill ${type === 'Audio' ? 'active' : ''}`} onClick={() => setType('Audio')}>🎙️ Audio</button>
                                    </div>
                                </div>
                                <div className="form-group flex-1">
                                    <label>Source Type</label>
                                    <div className="toggle-pills">
                                        <button type="button" className={`pill ${uploadType === 'File' ? 'active' : ''}`} onClick={() => setUploadType('File')}>📁 Upload</button>
                                        <button type="button" className={`pill ${uploadType === 'Link' ? 'active' : ''}`} onClick={() => setUploadType('Link')}>🔗 Link</button>
                                    </div>
                                </div>
                            </div>

                            {uploadType === 'File' ? (
                                <div className="form-group">
                                    <label>Upload {type} File</label>
                                    <div className="media-upload-zone" onClick={() => document.getElementById('media-input').click()}>
                                        <div className="zone-content">
                                            <div className="zone-icon">{type === 'Video' ? '🎥' : '📻'}</div>
                                            <p>{mediaPreview || `Drag & Drop your ${type} here`}</p>
                                            <span>Maximum size: 100MB</span>
                                        </div>
                                        <input type="file" id="media-input" accept={type === 'Video' ? "video/*" : "audio/*"} style={{ display: 'none' }} onChange={handleMediaChange} />
                                    </div>
                                </div>
                            ) : (
                                <div className="form-group">
                                    <label>External Stream Link</label>
                                    <div className="link-input-modern">
                                        <span className="link-icon">🔗</span>
                                        <input 
                                            type="text" 
                                            placeholder="Paste YouTube or Soundcloud URL..." 
                                            value={externalLink}
                                            onChange={(e) => handleLinkChange(e.target.value)}
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="form-group">
                                <label>Cover Thumbnail</label>
                                <div className="thumb-grid-layout">
                                    <div className="thumb-preview-box" onClick={() => document.getElementById('thumb-input').click()}>
                                        {thumbPreview ? (
                                            <img src={thumbPreview} alt="Preview" />
                                        ) : (
                                            <div className="thumb-placeholder">
                                                <span>+ Browse</span>
                                            </div>
                                        )}
                                        <input type="file" id="thumb-input" accept="image/*" style={{ display: 'none' }} onChange={handleThumbChange} />
                                    </div>
                                    <div className="thumb-info">
                                        <p>Recommendation: 1280x720px</p>
                                        <span>JPG, PNG preferred. URL-based fetching supported for YouTube.</span>
                                    </div>
                                </div>
                            </div>

                            <div className="upload-footer-actions">
                                <div className="publish-toggle">
                                    <span>Publish Directly</span>
                                    <label className="premium-switch">
                                        <input type="checkbox" checked={publishNow} onChange={() => setPublishNow(!publishNow)} />
                                        <span className="slider round"></span>
                                    </label>
                                </div>

                                <div className="final-buttons">
                                    <button className="btn-secondary" disabled={isSubmitting} onClick={() => handleSubmit('Draft')}>Save as Draft</button>
                                    <button className="btn-primary" disabled={isSubmitting} onClick={() => handleSubmit('Published')}>
                                        {isSubmitting ? 'Processing...' : `Confirm & Upload`}
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default UploadPodcast;
