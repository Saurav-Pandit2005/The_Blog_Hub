import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Calendar, DownloadCloud, User, FileText, ArrowLeft, CheckCircle } from 'lucide-react';
import api from '../../api';
import './ResourceDetailPage.css';

function ResourceDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [resource, setResource] = useState(null);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    const isLoggedIn = !!(token && user?.id);

    useEffect(() => {
        const fetchResource = async () => {
            try {
                setLoading(true);
                await api.put(`/resources/${id}/view`);
                const res = await api.get(`/resources/${id}`);
                if (res.data.success) {
                    setResource(res.data.data);
                }
            } catch (err) {
                console.error("Error fetching resource detail:", err);
                navigate('/resources');
            } finally {
                setLoading(false);
            }
        };
        fetchResource();
        window.scrollTo(0, 0);
    }, [id, navigate]);

    const handleDownload = async (e) => {
        e.preventDefault();
        if (!isLoggedIn) {
            navigate('/register');
            return;
        }

        if (!resource.fileUrl) {
            alert("No downloadable file is attached to this resource yet.");
            return;
        }

        try {
            // Fetch file as blob (bypasses cross-origin popup block)
            const response = await fetch(resource.fileUrl);
            const blob = await response.blob();
            
            // Create a local object URL and trigger download
            const blobUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = `${resource.title || 'resource'}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);

            // Update download count in background
            api.put(`/resources/${id}/download`)
                .then(() => setResource(prev => ({ ...prev, downloads: (prev.downloads || 0) + 1 })))
                .catch(err => console.error("Count update failed:", err));

        } catch (error) {
            console.error("❌ Download failed:", error);
            // Fallback: open in new tab
            window.open(resource.fileUrl, '_blank');
        }
    };

    if (loading) return <div className="resource-loading-screen">Extracting Knowledge Assets...</div>;
    if (!resource) return null;

    return (
        <div className="resource-detail-view">
            <div className="content-container">
                <button onClick={() => navigate(-1)} className="back-btn-minimal">
                    <ArrowLeft size={16} /> Back to Library
                </button>

                {/* THE MASTER RESOURCE CARD */}
                <div className="resource-master-card">
                    <div className="card-media">
                        {(resource.type?.includes('PDF') || !resource.coverImage) ? (
                            <div className="pdf-document-placeholder">
                                <div className="pdf-icon-wrapper">
                                    <div className="pdf-corner"></div>
                                </div>
                                <span className="pdf-label">PDF DOCUMENT</span>
                            </div>
                        ) : (
                            <img 
                                src={resource.coverImage} 
                                alt={resource.title} 
                                className="resource-thumbnail"
                            />
                        )}
                    </div>

                    <div className="card-info-side">
                        <div className="resource-tags">
                            <span className="tag-pill category">{resource.category}</span>
                            <span className="tag-pill type">
                                <FileText size={14} /> {resource.type || 'PDF Document'}
                            </span>
                        </div>

                        <h1 className="master-title">{resource.title}</h1>

                        <div className="author-strip">
                            <img 
                                src={resource.author?.profilePic || `https://ui-avatars.com/api/?name=${resource.author?.name || 'Author'}&background=eff6ff&color=3b82f6`} 
                                alt="Author"
                                onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${resource.author?.name || 'Author'}&background=eff6ff&color=3b82f6`; }}
                            />
                            <div className="author-text">
                                <span className="label">Resource Author</span>
                                <span className="name">{resource.author?.name}</span>
                            </div>
                        </div>

                        <div className="resource-discussion">
                            <h3>Overview & Discussion</h3>
                            <p>{resource.desc}</p>
                            
                            <ul className="benefit-list">
                                <li><CheckCircle size={14} /> Full lifetime access</li>
                                <li><CheckCircle size={14} /> Verfied technical content</li>
                                <li><CheckCircle size={14} /> Downloadable reference material</li>
                            </ul>
                        </div>

                        <div className="card-action-bar">
                            <button className="premium-download-btn" onClick={handleDownload}>
                                <DownloadCloud size={20} />
                                Download Now
                            </button>
                            <div className="download-stats">
                                <span className="count">{resource.downloads || 0}</span>
                                <span className="sub">Already Downloaded</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ADDITIONAL CONTENT (If any) */}
                {resource.content && (
                    <div className="extra-resource-docs">
                        <h3>Detailed Documentation</h3>
                        <div className="doc-content">
                            {resource.content.split('\n').map((line, index) => (
                                <p key={index}>{line}</p>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ResourceDetailPage;
