import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Slidebar from '../Slidebar/Slidebar';
import api from '../../../api';
import '../WritePost/WritePost.css';

function EditResource() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [coverImage, setCoverImage] = useState(null);
    const [resourceFile, setResourceFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        desc: '',
        category: '',
        type: 'PDF',
        status: 'Published'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        const fetchResourceDetails = async () => {
            try {
                const res = await api.get(`/resources/${id}`);
                if (res.data.success) {
                    const r = res.data.data;
                    setFormData({
                        title: r.title,
                        desc: r.desc,
                        category: r.category,
                        type: r.type,
                        status: r.status
                    });
                    if (r.coverImage) setPreviewUrl(r.coverImage);
                }
            } catch (err) {
                console.error("Failed to load resource data", err);
            }
        };
        fetchResourceDetails();
    }, [id]);

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setCoverImage(e.target.files[0]);
            setPreviewUrl(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setResourceFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setSubmitting(true);
            const data = new FormData();
            Object.keys(formData).forEach(key => data.append(key, formData[key]));
            if (coverImage) {
                data.append('coverImage', coverImage);
            }
            if (resourceFile) {
                data.append('resourceFile', resourceFile);
            }
            const res = await api.put(`/resources/${id}`, data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            if (res.data.success) {
                alert("Resource Updated Successfully!");
                navigate('/author/dashboard/resources');
            }
        } catch (err) {
            console.error("Error uploading resource:", err);
            alert("Failed to add resource. Please verify category and type.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="write-post-container">
            <Slidebar />
            
            <main className="write-content-main">
                <header className="write-header">
                    <div className="header-info">
                        <h1>Edit Library Resource</h1>
                        <p>Update or improve your existing toolkits and ebooks.</p>
                    </div>
                </header>

                <section className="write-form-card">
                    <form className="form-grid" onSubmit={handleSubmit}>

                        {/* LEFT SECTION */}
                        <div className="form-left">
                            <div className="form-group">
                                <label>Resource Title</label>
                                <input 
                                    type="text" 
                                    name="title" 
                                    placeholder="e.g. Master React Patterns Ebook" 
                                    value={formData.title}
                                    onChange={handleChange}
                                    required 
                                />
                            </div>

                            <div className="form-group relative">
                                <label>Resource Description</label>
                                <textarea 
                                    name="desc" 
                                    placeholder="Briefly describe what this resource offers..." 
                                    rows="12"
                                    value={formData.desc}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>

                            <div className="form-group">
                                <label>Upload New PDF Document (Optional)</label>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                    <button 
                                        type="button" 
                                        onClick={() => document.getElementById('pdf-upload').click()}
                                        style={{ padding: '12px 20px', background: '#f1f5f9', color: '#334155', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: '700', transition: '0.3s' }}
                                        onMouseEnter={(e) => { e.target.style.background = '#e2e8f0'; }}
                                        onMouseLeave={(e) => { e.target.style.background = '#f1f5f9'; }}
                                    >
                                        📄 Select PDF
                                    </button>
                                    <input 
                                        type="text" 
                                        readOnly 
                                        value={resourceFile ? resourceFile.name : 'Keep Existing PDF...'} 
                                        style={{ flex: 1, padding: '12px 15px', borderRadius: '8px', border: '2px solid #e2e8f0', background: '#f8fafc', color: '#475569', fontSize: '14px', outline: 'none' }}
                                        placeholder="Keep Existing PDF..."
                                    />
                                    <input 
                                        type="file" 
                                        id="pdf-upload"
                                        accept=".pdf"
                                        onChange={handleFileChange}
                                        style={{ display: 'none' }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* RIGHT SECTION */}
                        <div className="form-right">
                            <div className="form-group">
                                <label>Upload Thumbnail Image</label>
                                <div className="thumbnail-upload-box" onClick={() => document.getElementById('resource-thumbnail').click()}>
                                    {previewUrl ? (
                                        <img src={previewUrl} alt="Preview" className="thumbnail-preview-img" />
                                    ) : (
                                        <div className="upload-placeholder">
                                            <div className="upload-icon">📁</div>
                                            <span>Click to Upload</span>
                                            <small>JPG, PNG, WEBP</small>
                                        </div>
                                    )}
                                    <input 
                                        type="file" 
                                        id="resource-thumbnail"
                                        className="file-input" 
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        style={{ display: 'none' }}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Category</label>
                                <input 
                                    type="text"
                                    name="category" 
                                    value={formData.category} 
                                    onChange={handleChange} 
                                    placeholder="e.g. Technology, Web Development..."
                                    required 
                                />
                            </div>

                            <div className="form-group mt-2">
                                <label>Resource Type</label>
                                <select className="resource-type-select" name="type" value={formData.type} onChange={handleChange} required>
                                    <option value="PDF">PDF Document</option>
                                </select>
                            </div>

                            <div className="action-buttons-group mt-auto">
                                <button type="button" className="draft-btn" onClick={() => navigate('/author/dashboard/resources')}>Cancel</button>
                                <button type="submit" className="submit-btn primary-btn" disabled={submitting}>
                                    {submitting ? 'Updating...' : 'Update Resource'}
                                </button>
                            </div>
                        </div>

                    </form>
                </section>
            </main>
        </div>
    );
}

export default EditResource;
