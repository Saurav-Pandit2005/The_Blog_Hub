import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Eye, DownloadCloud, User } from 'lucide-react';
import api from '../../api';
import Pagination from './Pagination';
import '../../Visitor/Blogs/Blog_Articles.css';
import './Resources.css';

function Resources() {
    const navigate = useNavigate();
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const resourcesPerPage = 3;

    useEffect(() => {
        const fetchResources = async () => {
            try {
                setLoading(true);
                const res = await api.get('/resources');
                if (res.data.success) {
                    setResources(res.data.data);
                }
            } catch (err) {
                console.error("Error fetching author resources:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchResources();
    }, []);

    const handleViewDetails = (resourceId, e) => {
        e.preventDefault();
        navigate(`/resource-detail/${resourceId}`);
    };

    const handleDownload = async (resourceId, fileUrl, e) => {
        e.preventDefault();
        if (!fileUrl) {
            alert("No downloadable file attached to this resource.");
            return;
        }

        try {
            // Fetch as blob
            const response = await fetch(fileUrl);
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = 'resource.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);

            // Update count
            api.put(`/resources/${resourceId}/download`)
                .then((res) => {
                    if (!res.data.alreadyDownloaded) {
                        setResources(prev => prev.map(r =>
                            r._id === resourceId
                                ? { ...r, downloads: (r.downloads || 0) + 1 }
                                : r
                        ));
                    }
                })
                .catch(err => console.error("Count update failed:", err));

        } catch (error) {
            console.error("Download failed:", error);
            window.open(fileUrl, '_blank');
        }
    };

    // Pagination Logic
    const indexOfLastResource = currentPage * resourcesPerPage;
    const indexOfFirstResource = indexOfLastResource - resourcesPerPage;
    const currentResources = resources.slice(indexOfFirstResource, indexOfLastResource);
    const totalPages = Math.ceil(resources.length / resourcesPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 300, behavior: 'smooth' });
    };

    if (loading) {
        return <div className="loading-grid">Accessing The Blog Hub resource vaults...</div>;
    }

    return (
        <section className="resources-section">
            <div className="cards">
                {currentResources.length > 0 ? (
                    currentResources.map((item) => (
                        <div className="card" key={item._id}>
                            <div className="card-image">
                                {item.coverImage ? (
                                    <img src={item.coverImage} alt={item.title} />
                                ) : (
                                    <div style={{
                                        width: '100%',
                                        height: '100%',
                                        minHeight: '200px',
                                        background: 'linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '10px'
                                    }}>
                                        <span style={{ fontSize: '48px' }}>📄</span>
                                        <span style={{ fontWeight: '800', color: '#6366F1', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>{item.type || 'PDF'} Document</span>
                                    </div>
                                )}
                                <span className="tag">{item.category}</span>
                            </div>
                            <div className="card-content">
                                <h3>{item.title}</h3>
                                <p>{item.desc}</p>
                                
                                <div className="card-footer">
                                    <div className="left-stats">
                                        <div className="author-info">
                                            <User size={14} />
                                            <span>{item.author?.name || 'Hub Author'}</span>
                                        </div>
                                        <div className="date-info">
                                            <Calendar size={14} />
                                            <span>{new Date(item.createdAt).toLocaleDateString('en-GB')}</span>
                                        </div>
                                    </div>

                                    <div className="social-actions" style={{ gap: '15px' }}>
                                        <div className="social-pill">
                                            <Eye size={18} />
                                            <span className="social-count">{item.views || 0}</span>
                                        </div>
                                        <div className="social-pill">
                                            <DownloadCloud size={18} />
                                            <span className="social-count">{item.downloads || 0}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="card-buttons">
                                    <button className="outline-btn" onClick={(e) => handleViewDetails(item._id, e)}>View Details</button>
                                    <button className="primary-btn" onClick={(e) => handleDownload(item._id, item.fileUrl, e)}>Download {item.type}</button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-resources" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px 0', color: '#666' }}>
                        <p>No resources found in the library.</p>
                    </div>
                )}
            </div>

            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}
        </section>
    );
}

export default Resources;