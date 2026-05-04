import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../../api';
import './PodcastDetailPage.css';

function PodcastDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [podcast, setPodcast] = useState(null);
    const [similarPodcasts, setSimilarPodcasts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetailsAndSimilar = async () => {
            setLoading(true);
            try {
                // Fetch current podcast
                const res = await api.get(`/podcasts/${id}`);
                if (res.data.success) {
                    setPodcast(res.data.data);
                }

                // Fetch similar podcasts (just fetch all and filter to simulate)
                const allRes = await api.get('/podcasts');
                if (allRes.data.success) {
                    const filtered = allRes.data.data.filter(p => p._id !== id);
                    setSimilarPodcasts(filtered.slice(0, 8)); // Top 8 suggestions
                }
            } catch (err) {
                console.error("Error fetching podcast details:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchDetailsAndSimilar();
        
        // Scroll top on id change
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) return <div className="loading-player">Initializing Cinema Experience...</div>;
    if (!podcast) return <div className="error-player">Podcast not found!</div>;

    const hostName = podcast.host?.name || 'Hub Expert';
    const hostPic = podcast.host?.profilePic || `https://ui-avatars.com/api/?name=${hostName}&background=eff6ff&color=3b82f6`;
    const hostRole = podcast.host?.role || 'Expert Content Creator';

    return (
        <div className="platform-layout-container">
            {/* Left Column: Media Panel */}
            <div className="platform-main-content">
                <Link to="/podcasts" className="back-to-list">← Back to Podcasts</Link>
                
                <div className="platform-media-player-wrapper">
                    {podcast.isExternal && podcast.source === 'YouTube' ? (
                        <div className="platform-youtube-embed">
                            <iframe 
                                src={`https://www.youtube.com/embed/${podcast.audioUrl.split('v=')[1]?.split('&')[0] || podcast.audioUrl.split('/').pop()}`}
                                title="YouTube video player" 
                                frameBorder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                allowFullScreen
                            ></iframe>
                        </div>
                    ) : podcast.type === 'Audio' ? (
                        <div className="platform-audio-container">
                            <img src={podcast.coverImage} alt={podcast.title} className="platform-audio-thumb-bg" />
                            <div className="platform-audio-controls-overlay">
                                <img src={podcast.coverImage} className="platform-audio-front-cover" alt="cover"/>
                                <audio 
                                    controls 
                                    controlsList="nodownload" 
                                    className="platform-main-audio-player"
                                    key={podcast.audioUrl}
                                >
                                    <source src={podcast.audioUrl} type="audio/mpeg" />
                                    Your browser does not support the audio tag.
                                </audio>
                            </div>
                        </div>
                    ) : (
                        <div className="platform-video-wrapper">
                            <video 
                                controls 
                                controlsList="nodownload" 
                                className="platform-main-video-player"
                                poster={podcast.coverImage}
                                key={podcast.audioUrl}
                            >
                                <source src={podcast.audioUrl} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    )}
                </div>

                <div className="platform-video-info">
                    <h1 className="platform-video-title">{podcast.title}</h1>
                </div>

                <div className="platform-video-description-box">
                    <div className="platform-desc-meta">
                        <span className="platform-category-badge">{podcast.category}</span>
                        <div className="platform-dot"></div>
                        <span>{new Date(podcast.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    
                    <div className="platform-desc-text-wrapper">
                        <p className="platform-desc-text">{podcast.desc}</p>
                    </div>

                    <div className="platform-author-integration">
                        <img src={hostPic} alt={hostName} className="platform-author-mini-pic" />
                        <div className="platform-author-mini-info">
                            <h4 className="platform-author-mini-name">Hosted by {hostName}</h4>
                            <p className="platform-author-mini-bio">
                                {podcast.host?.bio || "Expert contributor at The Blog Hub, sharing insights and deep-dives into the latest trends and stories."}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column: Suggestions Pipeline */}
            <div className="platform-sidebar-content">
                <h3 className="platform-sidebar-title">Similar Podcasts</h3>
                <div className="platform-suggestions-list">
                    {similarPodcasts.length > 0 ? similarPodcasts.map((simPod) => (
                        <div 
                            key={simPod._id} 
                            className="platform-suggestion-card"
                            onClick={() => navigate(`/podcast-detail/${simPod._id}`)}
                        >
                            <div className="platform-suggestion-thumb">
                                <img src={simPod.coverImage} alt={simPod.title} />
                                {simPod.type === 'Audio' && <span className="platform-badge">Audio</span>}
                                {simPod.type === 'Video' && <span className="platform-badge">Video</span>}
                            </div>
                            <div className="platform-suggestion-details">
                                <h4 className="platform-suggestion-title">{simPod.title}</h4>
                                <span className="platform-suggestion-author">{simPod.host?.name || 'Hub Expert'}</span>
                                <span className="platform-suggestion-meta">
                                    {new Date(simPod.createdAt).toLocaleDateString()} • {simPod.category}
                                </span>
                            </div>
                        </div>
                    )) : (
                        <p className="no-suggestions">No similar podcasts available.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PodcastDetailPage;
