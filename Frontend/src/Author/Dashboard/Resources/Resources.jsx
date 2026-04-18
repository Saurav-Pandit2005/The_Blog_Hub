import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Slidebar from '../Slidebar/Slidebar';
import api from '../../../api';
import './Resources.css';

// Assets
import editIcon from '../../../assets/Images/Author/Dashboard/MyBlogs/edit.png';
import deleteIcon from '../../../assets/Images/Author/Dashboard/MyBlogs/delete.png';

function Resources() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [resourcesData, setResourcesData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResources = async () => {
            try {
                const res = await api.get('/resources/my-resources');
                if (res.data.success) {
                    setResourcesData(res.data.data);
                }
            } catch (err) {
                console.error("Error fetching resources:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchResources();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this resource?")) {
            try {
                const res = await api.delete(`/resources/${id}`);
                if (res.data.success) {
                    setResourcesData(prev => prev.filter(r => r._id !== id));
                }
            } catch (err) {
                console.error("Error deleting resource:", err);
                alert("Failed to delete resource");
            }
        }
    };

    const filteredResources = resourcesData.filter(res =>
        res.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="author-resources-container">
            <Slidebar />

            <main className="resources-main-content">
                <header className="resources-header">
                    <div className="header-left">
                        <h1>Manage Resources</h1>
                        <p>Organize and track your educational materials and community assets.</p>
                    </div>
                    <Link to="/author/upload-resource" className="upload-btn">
                        <span>📂</span> Upload New Resource
                    </Link>
                </header>

                <div className="management-controls">
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Find a resource..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="filter-stats">
                        <span className="stat-tag total">Total: {resourcesData.length}</span>
                        <span className="stat-tag published">Live: {resourcesData.filter(r => r.status === "Published").length}</span>
                        <span className="stat-tag downloads">Total Downloads: {resourcesData.reduce((acc, r) => acc + (r.downloads || 0), 0)}</span>
                    </div>
                </div>

                <div className="resources-list">
                    {filteredResources.map((res) => (
                        <div className="resource-item-card" key={res._id}>
                            <div className="res-icon-box">
                                <span className="type-badge">{res.type}</span>
                            </div>

                            <div className="res-info">
                                <div className="title-row">
                                    <h3>{res.title}</h3>
                                    <span className={`status-pill ${res.status?.toLowerCase()}`}>{res.status}</span>
                                </div>
                                <p className="res-desc">{res.desc}</p>
                                <div className="res-meta">
                                    <span className="meta-item">📅 {new Date(res.createdAt).toLocaleDateString()}</span>
                                    <span className="meta-divider">|</span>
                                    <span className="meta-item">💾 {res.downloads || 0} downloads</span>
                                </div>
                            </div>

                            <div className="res-actions">
                                <button className="action-button edit" title="Edit Resource" onClick={() => navigate(`/author/edit-resource/${res._id}`)}>
                                    <img src={editIcon} alt="Edit" />
                                </button>
                                <button className="action-button delete" title="Remove Resource" onClick={() => handleDelete(res._id)}>
                                    <img src={deleteIcon} alt="Delete" />
                                </button>
                            </div>
                        </div>
                    ))}

                    {filteredResources.length === 0 && (
                        <div className="empty-results">
                            <p>No resources found matching "{searchTerm}"</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default Resources;
