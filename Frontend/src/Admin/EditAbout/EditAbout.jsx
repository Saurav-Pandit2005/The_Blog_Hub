import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Slidebar from '../Slidebar/Slidebar';
import { 
    Home, 
    Book, 
    Calendar, 
    Users, 
    Rocket, 
    ChevronRight, 
    Eye, 
    Camera, 
    Save 
} from 'lucide-react';
import './EditAbout.css';
import adminProfileImg from '../../assets/Images/Admin/Profile/admin.jpg';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

function EditAbout() {
    const { user } = useContext(UserContext);
    const [activeSection, setActiveSection] = useState('hero');
    const [saved, setSaved] = useState(false);
    const navigate = useNavigate();

    // --- SECTION STATES ---
    const [hero, setHero] = useState({
        heading: 'Empowering Curious Minds Through Meaningful Content',
        subtext: "The Blog Hub is more than a publishing platform — it's a space where ideas grow, knowledge spreads, and communities connect.",
    });

    const [story, setStory] = useState({
        paragraph1: 'The Blog Hub began with a simple belief — that quality content should inspire growth, spark curiosity, and create impact.',
        paragraph2: 'In a world flooded with information, we focus on clarity, depth, and authenticity. Our mission is to build a platform where readers can discover reliable insights across technology, startups, design, and modern lifestyle.',
        paragraph3: 'We are not just publishing articles — we are building a community driven by learning, creativity, and innovation.',
        timeline: [
            { year: '2019', title: 'The Blog Hub Founded', desc: 'Started with a mission to deliver insightful and meaningful digital content.' },
            { year: '2021', title: 'Growing Community', desc: 'Expanded into multiple categories and welcomed global contributors.' },
            { year: '2023', title: 'Platform Expansion', desc: 'Enhanced user experience and introduced advanced publishing tools.' },
        ]
    });

    const [team, setTeam] = useState([
        { id: 1, name: 'Saurav Patel', role: 'Founder and Full Stack Developer', bio: 'Leads the technical vision and ensures the platform remains scalable, modern, and user-focused.', image: null },
        { id: 2, name: 'Tanisha Khyati', role: 'Editorial and Strategy Head', bio: 'Oversees content quality, research direction, and ensures every article delivers real value.', image: null },
        { id: 3, name: 'Sneha Goyal', role: 'Platform Architecture', bio: 'Responsible for system design, performance optimization, and continuous innovation.', image: null },
    ]);

    const [cta, setCta] = useState({
        heading: 'Be Part of Our Journey',
        subtext: 'Start exploring insights or contribute your own ideas today.',
        primaryLabel: 'Explore Articles',
        outlineLabel: 'Join as Author',
    });

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const updateTeamMember = (index, field, value) => {
        const updated = [...team];
        updated[index][field] = value;
        setTeam(updated);
    };

    const handleImageChange = (index, e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                updateTeamMember(index, 'image', reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const updateTimeline = (index, field, value) => {
        const updated = [...story.timeline];
        updated[index][field] = value;
        setStory({ ...story, timeline: updated });
    };

    const sections = [
        { key: 'hero', label: 'Home Section', icon: <Home size={18} /> },
        { key: 'story', label: 'Our Story', icon: <Book size={18} /> },
        { key: 'milestones', label: 'Journey Milestones', icon: <Calendar size={18} /> },
        { key: 'team', label: 'Team Members', icon: <Users size={18} /> },
        { key: 'cta', label: 'Call to Action', icon: <Rocket size={18} /> },
    ];

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <div className="edit-about-container">
            <Slidebar />

            <main className="edit-about-main">
                <header className="admin-header">
                    <div className="header-text">
                        <span className="breadcrumb">Brand Identity</span>
                        <h1>Customize About Page</h1>
                        <p>Modify your platform's narrative, mission statement, and showcase your core leadership team.</p>
                    </div>
                    <div className="header-actions">
                        <div className="header-date">
                            <Calendar size={16} color="var(--admin-accent)" style={{marginRight: '10px'}} />
                            <span className="live-clock">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                        </div>
                        <div className="admin-profile-container" onClick={() => navigate('/admin/profile')}>
                            <div className="admin-profile-icon">
                                <img src={user?.profilePic || adminProfileImg} alt="Admin Profile" />
                                <span className="status-online"></span>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="edit-about-layout">
                    {/* SECTION NAV SIDEBAR */}
                    <aside className="section-nav">
                        <p className="section-nav-title">Page Architecture</p>
                        {sections.map(sec => (
                            <button
                                key={sec.key}
                                className={`section-nav-btn ${activeSection === sec.key ? 'active' : ''}`}
                                onClick={() => setActiveSection(sec.key)}
                            >
                                {sec.icon}
                                {sec.label}
                                {activeSection === sec.key && <ChevronRight size={16} style={{marginLeft:'auto'}} />}
                            </button>
                        ))}
                        <div className="nav-preview-link">
                            <Link to="/about" target="_blank"><Eye size={16} /> Preview Mode</Link>
                        </div>
                    </aside>

                    {/* EDITOR PANEL */}
                    <div className="editor-panel">

                        {/* ---- HERO SECTION ---- */}
                        {activeSection === 'hero' && (
                            <div className="editor-card">
                                <div className="editor-card-header">
                                    <h2><Home size={22} color="#3b82f6" style={{verticalAlign:'middle', marginRight:'10px'}} /> Hero Section</h2>
                                    <p>The main visual hook that visitors see first on the About page.</p>
                                </div>
                                <div className="editor-fields">
                                    <div className="field-group">
                                        <label>Main Heading <span>{hero.heading.length}/80</span></label>
                                        <input
                                            type="text"
                                            maxLength="80"
                                            value={hero.heading}
                                            onChange={(e) => setHero({ ...hero, heading: e.target.value })}
                                        />
                                    </div>
                                    <div className="field-group">
                                        <label>Sub Text / Philosophy</label>
                                        <textarea
                                            rows="4"
                                            value={hero.subtext}
                                            onChange={(e) => setHero({ ...hero, subtext: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ---- STORY SECTION ---- */}
                        {activeSection === 'story' && (
                            <div className="editor-card">
                                <div className="editor-card-header">
                                    <h2><Book size={22} color="#3b82f6" style={{verticalAlign:'middle', marginRight:'10px'}} /> Our Story</h2>
                                    <p>Edit the narrative paragraphs that explain your platform's origin.</p>
                                </div>
                                <div className="editor-fields">
                                    <div className="field-group">
                                        <label>The Beginning (Paragraph 1)</label>
                                        <textarea rows="3" value={story.paragraph1} onChange={(e) => setStory({ ...story, paragraph1: e.target.value })} />
                                    </div>
                                    <div className="field-group">
                                        <label>The Mission (Paragraph 2)</label>
                                        <textarea rows="4" value={story.paragraph2} onChange={(e) => setStory({ ...story, paragraph2: e.target.value })} />
                                    </div>
                                    <div className="field-group">
                                        <label>The Future (Paragraph 3)</label>
                                        <textarea rows="3" value={story.paragraph3} onChange={(e) => setStory({ ...story, paragraph3: e.target.value })} />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ---- MILESTONES SECTION ---- */}
                        {activeSection === 'milestones' && (
                            <div className="editor-card">
                                <div className="editor-card-header">
                                    <h2><Calendar size={22} color="#3b82f6" style={{verticalAlign:'middle', marginRight:'10px'}} /> Journey Milestones</h2>
                                    <p>Manage the timeline of major achievements and growth phases.</p>
                                </div>
                                <div className="editor-fields">
                                    {story.timeline.map((item, i) => (
                                        <div className="timeline-edit-row" key={i}>
                                            <div className="field-group">
                                                <label>Year</label>
                                                <input type="text" value={item.year} onChange={(e) => updateTimeline(i, 'year', e.target.value)} />
                                            </div>
                                            <div className="field-group">
                                                <label>Milestone Title</label>
                                                <input type="text" value={item.title} onChange={(e) => updateTimeline(i, 'title', e.target.value)} />
                                            </div>
                                            <div className="field-group full">
                                                <label>Details</label>
                                                <input type="text" value={item.desc} onChange={(e) => updateTimeline(i, 'desc', e.target.value)} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* ---- TEAM SECTION ---- */}
                        {activeSection === 'team' && (
                            <div className="editor-card">
                                <div className="editor-card-header">
                                    <h2><Users size={22} color="#3b82f6" style={{verticalAlign:'middle', marginRight:'10px'}} /> Leadership Team</h2>
                                    <p>Manage the key people behind the platform's success.</p>
                                </div>
                                <div className="editor-fields">
                                    {team.map((member, i) => (
                                        <div className="team-edit-card" key={member.id}>
                                            <div className="team-edit-left">
                                                <div className="team-image-wrapper">
                                                    {member.image ? (
                                                        <img src={member.image} alt={member.name} className="team-image-preview" />
                                                    ) : (
                                                        <div className="team-placeholder">{member.name.charAt(0)}</div>
                                                    )}
                                                    <label htmlFor={`upload-${member.id}`} className="image-upload-overlay">
                                                        <Camera size={24} />
                                                        <input 
                                                            type="file" 
                                                            id={`upload-${member.id}`} 
                                                            hidden 
                                                            accept="image/*"
                                                            onChange={(e) => handleImageChange(i, e)}
                                                        />
                                                    </label>
                                                </div>
                                                <span className="upload-hint">Change Photo</span>
                                            </div>
                                            <div className="team-edit-fields">
                                                <div className="field-row-2">
                                                    <div className="field-group">
                                                        <label>Full Name</label>
                                                        <input type="text" value={member.name} onChange={(e) => updateTeamMember(i, 'name', e.target.value)} />
                                                    </div>
                                                    <div className="field-group">
                                                        <label>Role / Area of Expertise</label>
                                                        <input type="text" value={member.role} onChange={(e) => updateTeamMember(i, 'role', e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="field-group">
                                                    <label>Short Bio</label>
                                                    <textarea rows="2" value={member.bio} onChange={(e) => updateTeamMember(i, 'bio', e.target.value)} />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* ---- CTA SECTION ---- */}
                        {activeSection === 'cta' && (
                            <div className="editor-card">
                                <div className="editor-card-header">
                                    <h2><Rocket size={22} color="#3b82f6" style={{verticalAlign:'middle', marginRight:'10px'}} /> Call to Action</h2>
                                    <p>Customize the closing banner and action buttons of the About page.</p>
                                </div>
                                <div className="editor-fields">
                                    <div className="field-group">
                                        <label>Main CTA Heading</label>
                                        <input type="text" value={cta.heading} onChange={(e) => setCta({ ...cta, heading: e.target.value })} />
                                    </div>
                                    <div className="field-group">
                                        <label>Supporting Text</label>
                                        <input type="text" value={cta.subtext} onChange={(e) => setCta({ ...cta, subtext: e.target.value })} />
                                    </div>
                                    <div className="field-row-2">
                                        <div className="field-group">
                                            <label>Primary Button Text</label>
                                            <input type="text" value={cta.primaryLabel} onChange={(e) => setCta({ ...cta, primaryLabel: e.target.value })} />
                                        </div>
                                        <div className="field-group">
                                            <label>Secondary Button Text</label>
                                            <input type="text" value={cta.outlineLabel} onChange={(e) => setCta({ ...cta, outlineLabel: e.target.value })} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ---- FLOATING SAVE BAR ---- */}
                        <div className="floating-save-bar">
                            <p>You have unsaved changes in {activeSection.toUpperCase()}</p>
                            <button className={`save-all-btn ${saved ? 'saved' : ''}`} onClick={handleSave}>
                                {saved ? <CheckCircleIcon size={18} /> : <Save size={18} />}
                                {saved ? 'Configuration Saved!' : 'Save All Changes'}
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

function CheckCircleIcon({size}) {
    return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>;
}

export default EditAbout;
