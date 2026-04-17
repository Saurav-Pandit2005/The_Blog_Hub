import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../api';
import './PodcastDetailPage.css';

function PodcastDetailPage() {
    const { id } = useParams();
    const [podcast, setPodcast] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPodcastDetail = async () => {
            try {
                const res = await api.get(`/podcasts/${id}`);
                if (res.data.success) {
                    setPodcast(res.data.data);
                }
            } catch (err) {
                console.error("Error fetching podcast video details:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPodcastDetail();
    }, [id]);

    if (loading) return <div className="loading-player">Initializing Cinema Experience...</div>;
    if (!podcast) return <div className="error-player">Podcast not found!</div>;

    return (
        <div className="podcast-player-container">
            <div className="player-header">
                <Link to="/podcasts" className="back-to-list">← Back to Podcasts</Link>
                <h1>{podcast.title}</h1>
                <div className="podcast-meta">
                    <span>{podcast.category}</span> • <span>{new Date(podcast.createdAt).toLocaleDateString()}</span>
                </div>
            </div>

            <div className="media-player-wrapper">
                {podcast.isExternal && podcast.source === 'YouTube' ? (
                    <div className="youtube-embed-wrapper">
                        <iframe 
                            width="100%" 
                            height="100%" 
                            src={`https://www.youtube.com/embed/${podcast.audioUrl.split('v=')[1]?.split('&')[0] || podcast.audioUrl.split('/').pop()}`}
                            title="YouTube video player" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            allowFullScreen
                        ></iframe>
                    </div>
                ) : podcast.type === 'Audio' ? (
                    <div className="audio-player-container">
                        <img src={podcast.coverImage} alt={podcast.title} className="audio-thumb-bg" />
                        <div className="audio-controls-overlay">
                            <audio 
                                controls 
                                controlsList="nodownload" 
                                className="main-audio-player"
                                key={podcast.audioUrl}
                            >
                                <source src={podcast.audioUrl} type="audio/mpeg" />
                                Your browser does not support the audio tag.
                            </audio>
                        </div>
                    </div>
                ) : (
                    <div className="video-wrapper">
                        <video 
                            controls 
                            controlsList="nodownload" 
                            className="main-video-player"
                            poster={podcast.coverImage}
                            key={podcast.audioUrl}
                        >
                            <source src={podcast.audioUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                )}
            </div>

            <div className="podcast-description-section">
                <h3>Podcast Description</h3>
                <p>{podcast.desc}</p>
                
                <div className="host-card">
                    <img src={podcast.host?.profilePic || `https://ui-avatars.com/api/?name=${podcast.host?.name || 'Expert'}&background=eff6ff&color=3b82f6`} alt="Host" />
                    <div className="host-details">
                        <span className="hosted-by">Hosted By</span>
                        <span className="host-name">{podcast.host?.name || 'Hub Expert'}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PodcastDetailPage;
