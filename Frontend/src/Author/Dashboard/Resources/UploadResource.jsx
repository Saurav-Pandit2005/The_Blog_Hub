import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slidebar from '../Slidebar/Slidebar';
import './UploadResource.css';

function UploadResource() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        resourceType: '',
        file: null,
        link: '',
        visibility: 'public'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({ ...prev, file: e.target.files[0] }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Resource Submitted:", formData);
        alert("Resource uploaded successfully!");
        navigate('/author/dashboard/resources');
    };

    return (
        <div className="upload-resource-container">
            <Slidebar />

            <main className="upload-resource-main">
                <header className="upload-header">
                    <div className="header-text">
                        <h1>Upload New Resource</h1>
                        <p>Share templates, guides, or external resources with your audience.</p>
                    </div>
                </header>

                <form className="upload-form" onSubmit={handleSubmit}>
                    <div className="form-grid">
                        <div className="form-left">
                            <div className="input-group">
                                <label>Resource Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="e.g., SEO Checklist 2024"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label>Description</label>
                                <textarea
                                    name="description"
                                    placeholder="Briefly describe what this resource offers..."
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>

                            <div className="input-group">
                                <label>Resource Type</label>
                                <select 
                                    name="resourceType" 
                                    value={formData.resourceType} 
                                    onChange={handleChange} 
                                    required
                                >
                                    <option value="">Select Type</option>
                                    <option value="PDF">PDF Document</option>
                                    <option value="Ebook">E-book</option>
                                    <option value="Template">Template</option>
                                    <option value="Spreadsheet">Spreadsheet</option>
                                    <option value="External Link">External Link</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-right">
                            <div className="upload-box-container">
                                <label>Upload File (Optional for Links)</label>
                                <div className="resource-upload-zone">
                                    <input 
                                        type="file" 
                                        onChange={handleFileChange} 
                                    />
                                    <div className="zone-content">
                                        <span className="icon">📁</span>
                                        <p>{formData.file ? formData.file.name : "Drag & Drop or Click to Upload"}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="input-group">
                                <label>External URL (If applicable)</label>
                                <input
                                    type="url"
                                    name="link"
                                    placeholder="https://example.com/resource"
                                    value={formData.link}
                                    onChange={handleChange}
                                />
                                <span className="input-hint">Use this if the resource is hosted elsewhere.</span>
                            </div>

                            <div className="input-group">
                                <label>Visibility</label>
                                <div className="radio-group">
                                    <label className="radio-label">
                                        <input 
                                            type="radio" 
                                            name="visibility" 
                                            value="public" 
                                            checked={formData.visibility === 'public'}
                                            onChange={handleChange}
                                        />
                                        Public
                                    </label>
                                    <label className="radio-label">
                                        <input 
                                            type="radio" 
                                            name="visibility" 
                                            value="private" 
                                            checked={formData.visibility === 'private'}
                                            onChange={handleChange}
                                        />
                                        Private (Draft)
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="form-footer">
                        <button type="button" className="secondary-btn" onClick={() => navigate('/author/dashboard/resources')}>Cancel</button>
                        <button type="submit" className="primary-btn">Save Resource</button>
                    </div>
                </form>
            </main>
        </div>
    );
}

export default UploadResource;
