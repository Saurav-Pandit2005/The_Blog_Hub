import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Tag, Layers, Send, X, UploadCloud, Info, BookOpen, CheckCircle } from 'lucide-react';
import Slidebar from '../Slidebar/Slidebar';
import api from '../../../api';
import '../WritePost/WritePost.css';
import '../Dashboard.css'; // Global Dashboard styles for Toasts

function UploadResource() {
    const navigate = useNavigate();
    const [resourceFile, setResourceFile] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

    const triggerToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => {
            setToast(prev => ({ ...prev, show: false }));
        }, 3000);
    };
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

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setResourceFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title.trim() || formData.title.length < 10) {
            triggerToast("Please provide a title (min 10 characters).", "error");
            return;
        }

        if (!formData.desc.trim() || formData.desc.length < 30) {
            triggerToast("Please provide a description (min 30 characters).", "error");
            return;
        }

        if (!resourceFile) {
            triggerToast("Please upload a PDF document.", "error");
            return;
        }

        try {
            setSubmitting(true);
            const data = new FormData();
            Object.keys(formData).forEach(key => data.append(key, formData[key]));
            if (resourceFile) {
                data.append('resourceFile', resourceFile);
            }
            const res = await api.post('/resources', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            if (res.data.success) {
                triggerToast("Resource Added Successfully!");
                setTimeout(() => navigate('/author/dashboard/resources'), 1500);
            }
        } catch (err) {
            console.error("Error uploading resource:", err);
            triggerToast(err.response?.data?.error || "Failed to add resource. Please verify category and type.", "error");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="write-post-container">
            <Slidebar />
            
            <main className="write-content-main">
                <header className="write-header-top">
                    <div className="header-badge">
                        <BookOpen size={14} />
                        <span>Library Curator</span>
                    </div>
                    <h1>Upload Resource</h1>
                    <p>Contribute knowledge by sharing PDFs, Guides, and E-books.</p>
                </header>

                <div className="write-editor-wrapper">
                    <form className="editor-main-card" onSubmit={handleSubmit}>

                        {/* LEFT SECTION: Details */}
                        <div className="editor-body">
                            <div className="input-field-group">
                                <label>Resource Title</label>
                                <input 
                                    type="text" 
                                    name="title" 
                                    placeholder="e.g. FullStack Modern Web Guide 2024" 
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="premium-input title-input"
                                    required 
                                />
                            </div>

                             <div className="input-field-group">
                                <label>Detailed Description</label>
                                <textarea 
                                    name="desc" 
                                    placeholder="Explain what's inside this resource..." 
                                    rows="12"
                                    value={formData.desc}
                                    onChange={handleChange}
                                    className="premium-textarea"
                                    required
                                ></textarea>
                            </div>

                            <div className="input-field-group">
                                <label>Select PDF Document</label>
                                <div className="file-selector-premium">
                                    <button 
                                        type="button" 
                                        className="select-file-btn"
                                        onClick={() => document.getElementById('pdf-upload').click()}
                                    >
                                        <UploadCloud size={18} />
                                        Choose File
                                    </button>
                                    <div className="selected-filename">
                                        {resourceFile ? resourceFile.name : 'No file selected yet...'}
                                    </div>
                                    <input 
                                        type="file" 
                                        id="pdf-upload"
                                        accept=".pdf"
                                        onChange={handleFileChange}
                                        style={{ display: 'none' }}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* RIGHT SECTION: Meta & Action */}
                        <div className="editor-sidebar">
                            <div className="sidebar-section">
                                <div className="section-title">
                                    <Tag size={18} />
                                    <h3>Categorization</h3>
                                </div>
                                <div className="input-field-group">
                                    <label>Resource Category</label>
                                    <div className="tag-input-wrapper">
                                        <Layers size={16} className="tag-icon" />
                                        <input 
                                            type="text"
                                            name="category" 
                                            value={formData.category} 
                                            onChange={handleChange} 
                                            placeholder="e.g. Web Design"
                                            className="premium-input with-icon"
                                            required 
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="sidebar-section">
                                <div className="section-title">
                                    <FileText size={18} />
                                    <h3>Format</h3>
                                </div>
                                <div className="input-field-group">
                                    <label>File Type</label>
                                    <select className="premium-input" name="type" value={formData.type} onChange={handleChange} required>
                                        <option value="PDF">PDF Document</option>
                                    </select>
                                </div>
                            </div>

                            <div className="sidebar-info-box">
                                <div className="info-icon"><Info size={16} /></div>
                                <p>Maximum file size allowed is 20MB. Ensure your PDF is optimized for web viewing.</p>
                            </div>

                            <div className="editor-actions">
                                <button type="button" className="action-btn outline" onClick={() => navigate('/author/dashboard/resources')}>
                                    <X size={18} />
                                    Cancel
                                </button>
                                <button type="submit" className="action-btn filled" disabled={submitting}>
                                    <Send size={18} />
                                    {submitting ? 'Uploading...' : 'Publish Resource'}
                                </button>
                            </div>
                        </div>

                    </form>
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

export default UploadResource;
