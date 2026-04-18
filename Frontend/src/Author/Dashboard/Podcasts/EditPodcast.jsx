import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Slidebar from '../Slidebar/Slidebar';
import api from '../../../api';
import './UploadPodcast.css'; // Reusing the same styles

function EditPodcast() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [category, setCategory] = useState('Technology');
    const [duration, setDuration] = useState('');
    const [type, setType] = useState('Video'); 
    const [status, setStatus] = useState('Draft');
    const [uploadType, setUploadType] = useState('File'); // 'File' or 'Link'
    const [externalLink, setExternalLink] = useState('');
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    
    // File states
    const [mediaFile, setMediaFile] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);
    const [mediaPreview, setMediaPreview] = useState(null);
    const [thumbPreview, setThumbPreview] = useState(null);

    useEffect(() => {
        const fetchPodcast = async () => {
            try {
                const res = await api.get(`/podcasts/${id}`);
                if (res.data.success) {
                    const pod = res.data.data;
                    setTitle(pod.title);
                    setDesc(pod.desc);
                    setCategory(pod.category);
                    setDuration(pod.duration || '');
                    setType(pod.type || 'Video');
                    setStatus(pod.status);
                    setUploadType(pod.isExternal ? 'Link' : 'File');
                    setExternalLink(pod.audioUrl || '');
                    setThumbPreview(pod.coverImage);
                    setMediaPreview(pod.isExternal ? null : 'Current File (leave blank to keep)');
                }
            } catch (err) {
                console.error("Error fetching podcast:", err);
                alert("Failed to load podcast data.");
                navigate('/author/dashboard/podcasts');
            } finally {
                setIsLoading(false);
            }
        };
        fetchPodcast();
    }, [id, navigate]);

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

        try {
            setIsSubmitting(true);
            const formData = new FormData();
            formData.append('title', title);
            formData.append('desc', desc);
            formData.append('category', category);
            formData.append('duration', duration);
            formData.append('type', type);
            formData.append('status', statusOverride || status);
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

            const res = await api.put(`/podcasts/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (res.data.success) {
                alert(`Podcast updated successfully!`);
                navigate('/author/dashboard/podcasts');
            }
        } catch (err) {
            console.error("Update Error:", err);
            alert(err.response?.data?.error || `Failed to update podcast. Try again.`);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="upload-podcast-container">
                <Slidebar />
                <main className="upload-main-area">
                    <div style={{ padding: '50px', textAlign: 'center' }}>Loading podcast data...</div>
                </main>
            </div>
        );
    }

    return (
        <div className="upload-podcast-container">
            <Slidebar />
            
            <main className="upload-main-area">
                <div className="upload-content-wrapper full-width">
                    <header className="upload-header-minimal">
                        <h1>Edit Podcast Episode</h1>
                        <p>Refine your story and keep your audience engaged.</p>
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
                                    <label>Update {type} File (Optional)</label>
                                    <div className="media-upload-zone" onClick={() => document.getElementById('media-input').click()}>
                                        <div className="zone-content">
                                            <div className="zone-icon">{type === 'Video' ? '🎥' : '📻'}</div>
                                            <p>{mediaPreview || `Drag & Drop your new ${type} here`}</p>
                                            <span>Leave empty to keep current file.</span>
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
                                    <span>Status: <strong>{status}</strong></span>
                                </div>

                                <div className="final-buttons">
                                    <button className="btn-secondary" disabled={isSubmitting} onClick={() => navigate('/author/dashboard/podcasts')}>Cancel</button>
                                    <button className="btn-primary" disabled={isSubmitting} onClick={() => handleSubmit()}>
                                        {isSubmitting ? 'Updating...' : `Save Changes`}
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

export default EditPodcast;
