import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Play, Headphones, Eye } from 'lucide-react';
import api from '../../api';
import Pagination from './Pagination';
import './Podcasts.css';

const PodcastSkeleton = () => (
    <div className="podcast-skeleton-card">
        <div className="skeleton-image shine"></div>
        <div className="skeleton-content">
            <div className="skeleton-line full shine"></div>
            <div className="skeleton-line half shine"></div>
            <div className="skeleton-footer">
                <div className="skeleton-circle shine"></div>
                <div className="skeleton-btn shine"></div>
            </div>
        </div>
    </div>
);

function Podcasts() {
    const navigate = useNavigate();
    const [podcasts, setPodcasts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const podcastsPerPage = 3;

    useEffect(() => {
        const fetchPodcasts = async () => {
            try {
                setLoading(true);
                const res = await api.get('/podcasts');
                if (res.data.success) {
                    setPodcasts(res.data.data);
                }
            } catch (err) {
                console.error("Error fetching podcasts:", err);
            } finally {
                setTimeout(() => setLoading(false), 800);
            }
        };
        fetchPodcasts();
    }, []);

    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    const isLoggedIn = !!(token && user?.id);

    const handleWatchClick = (podcastId, e) => {
        e.preventDefault();
        if (!isLoggedIn) {
            navigate('/register');
        } else {
            navigate(`/podcast-detail/${podcastId}`);
        }
    };

    // Pagination Logic
    const indexOfLastPodcast = currentPage * podcastsPerPage;
    const indexOfFirstPodcast = indexOfLastPodcast - podcastsPerPage;
    const currentPodcasts = podcasts.slice(indexOfFirstPodcast, indexOfLastPodcast);
    const totalPages = Math.ceil(podcasts.length / podcastsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <section className="podcast-container">
            <div className="podcast-grid">
                {loading ? (
                    [1, 2, 3].map(i => <PodcastSkeleton key={i} />)
                ) : currentPodcasts.length > 0 ? (
                    currentPodcasts.map((podcast) => (
                        <div className="podcast-card" key={podcast._id}>
                            <div className="podcast-image-wrapper">
                                <img src={podcast.coverImage || 'https://via.placeholder.com/600x400'} alt={podcast.title} />
                                <div 
                                    className="play-button-overlay" 
                                    onClick={(e) => handleWatchClick(podcast._id, e)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className="play-icon-circle">
                                        {podcast.type === 'Audio' ? <Headphones size={24} color="white" /> : <Play size={24} color="white" fill="white" />}
                                    </div>
                                </div>
                                <div className="duration-pill">{podcast.duration || '0:00'} min</div>
                                <div className="format-badge">{podcast.type}</div>
                            </div>

                            <div className="podcast-content">
                                <div className="card-top-meta">
                                    <span className="podcast-category-pill">{podcast.category}</span>
                                    <span className="podcast-plays">
                                        {podcast.type === 'Audio' ? <Headphones size={14} /> : <Eye size={14} />}
                                        {podcast.plays || 0} {podcast.type === 'Audio' ? 'Listens' : 'Views'}
                                    </span>
                                </div>
                                
                                <h3 className="podcast-title">{podcast.title}</h3>
                                <p className="podcast-description">{podcast.desc}</p>

                                <div className="card-bottom-footer">
                                    <div className="podcast-author">
                                        <img 
                                            src={podcast.host?.profilePic || `https://ui-avatars.com/api/?name=${podcast.host?.name || 'Author'}&background=eff6ff&color=3b82f6`} 
                                            alt={podcast.host?.name} 
                                        />
                                        <div className="author-text">
                                            <span className="by">Hosted by</span>
                                            <span className="name">{podcast.host?.name || 'Hub Expert'}</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={(e) => handleWatchClick(podcast._id, e)}
                                        className="action-btn-main"
                                    >
                                        {podcast.type === 'Audio' ? 'Listen Podcast →' : 'Watch Podcast →'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-podcasts-state">
                        <p>No podcasts available. Be the first to start a conversation!</p>
                    </div>
                )}
            </div>

            {podcasts.length > podcastsPerPage && !loading && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}
        </section>
    );
}

export default Podcasts;