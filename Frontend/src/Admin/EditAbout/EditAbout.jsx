import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Slidebar from '../Slidebar/Slidebar';
import './EditAbout.css';
import adminProfileImg from '../../assets/Images/Admin/Profile/admin.jpg';

function EditAbout() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');
    const [saved, setSaved] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = (e) => {
        e.stopPropagation();
        setIsDropdownOpen(!isDropdownOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

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
        { id: 1, name: 'Razz Patel', role: 'Founder and Full Stack Developer', bio: 'Leads the technical vision and ensures the platform remains scalable, modern, and user-focused.' },
        { id: 2, name: 'Surbhi Khyati', role: 'Editorial and Strategy Head', bio: 'Oversees content quality, research direction, and ensures every article delivers real value.' },
        { id: 3, name: 'Kriti Goyal', role: 'Platform Architecture', bio: 'Responsible for system design, performance optimization, and continuous innovation.' },
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

    const updateTimeline = (index, field, value) => {
        const updated = [...story.timeline];
        updated[index][field] = value;
        setStory({ ...story, timeline: updated });
    };

    const sections = [
        { key: 'hero', label: '🏠 Hero Section' },
        { key: 'story', label: '📖 Our Story' },
        { key: 'team', label: '👥 Team Members' },
        { key: 'cta', label: '🚀 Call to Action' },
    ];

    return (
        <div className="edit-about-container">
            <Slidebar />

            <main className="edit-about-main">
                <header className="admin-header">
                    <div className="header-text">
                        <h1>Edit About Page</h1>
                        <p>Update content sections that appear on the public About page.</p>
                    </div>
                    <div className="header-actions">
                        <button className={`save-all-btn ${saved ? 'saved' : ''}`} onClick={handleSave}>
                            {saved ? '✅ Saved!' : '💾 Save All Changes'}
                        </button>
                        <div className="admin-profile-container" ref={dropdownRef}>
                            <div className="admin-profile-icon" onClick={toggleDropdown}>
                                <img src={adminProfileImg} alt="Admin Profile" />
                                <span className="status-online"></span>
                            </div>
                            {isDropdownOpen && (
                                <div className="admin-profile-dropdown">
                                    <Link to="/admin/profile" className="dropdown-item">👤 Profile</Link>
                                    <div className="dropdown-divider"></div>
                                    <Link to="/login" className="dropdown-item logout-item">🚪 Logout</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                <div className="edit-about-layout">
                    {/* SECTION NAV SIDEBAR */}
                    <aside className="section-nav">
                        <p className="section-nav-title">Page Sections</p>
                        {sections.map(sec => (
                            <button
                                key={sec.key}
                                className={`section-nav-btn ${activeSection === sec.key ? 'active' : ''}`}
                                onClick={() => setActiveSection(sec.key)}
                            >
                                {sec.label}
                            </button>
                        ))}
                        <div className="nav-preview-link">
                            <Link to="/about" target="_blank">👁️ Preview About Page</Link>
                        </div>
                    </aside>

                    {/* EDITOR PANEL */}
                    <div className="editor-panel">

                        {/* ---- HERO SECTION ---- */}
                        {activeSection === 'hero' && (
                            <div className="editor-card">
                                <div className="editor-card-header">
                                    <h2>🏠 Hero Section</h2>
                                    <p>The main banner that appears at the top of the About page.</p>
                                </div>
                                <div className="editor-fields">
                                    <div className="field-group">
                                        <label>Main Heading</label>
                                        <input
                                            type="text"
                                            value={hero.heading}
                                            onChange={(e) => setHero({ ...hero, heading: e.target.value })}
                                        />
                                        <span className="char-count">{hero.heading.length} chars</span>
                                    </div>
                                    <div className="field-group">
                                        <label>Sub Text</label>
                                        <textarea
                                            rows="3"
                                            value={hero.subtext}
                                            onChange={(e) => setHero({ ...hero, subtext: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="preview-box">
                                    <p className="preview-label">Live Preview</p>
                                    <h3 className="preview-heading">{hero.heading}</h3>
                                    <p className="preview-text">{hero.subtext}</p>
                                </div>
                            </div>
                        )}

                        {/* ---- STORY SECTION ---- */}
                        {activeSection === 'story' && (
                            <div className="editor-card">
                                <div className="editor-card-header">
                                    <h2>📖 Our Story</h2>
                                    <p>Edit the brand story paragraphs and the milestone timeline.</p>
                                </div>
                                <div className="editor-fields">
                                    <div className="field-group">
                                        <label>Paragraph 1</label>
                                        <textarea rows="2" value={story.paragraph1} onChange={(e) => setStory({ ...story, paragraph1: e.target.value })} />
                                    </div>
                                    <div className="field-group">
                                        <label>Paragraph 2</label>
                                        <textarea rows="3" value={story.paragraph2} onChange={(e) => setStory({ ...story, paragraph2: e.target.value })} />
                                    </div>
                                    <div className="field-group">
                                        <label>Paragraph 3</label>
                                        <textarea rows="2" value={story.paragraph3} onChange={(e) => setStory({ ...story, paragraph3: e.target.value })} />
                                    </div>

                                    <div className="section-divider">
                                        <span>📅 Timeline Milestones</span>
                                    </div>

                                    {story.timeline.map((item, i) => (
                                        <div className="timeline-edit-row" key={i}>
                                            <div className="field-group small">
                                                <label>Year</label>
                                                <input type="text" value={item.year} onChange={(e) => updateTimeline(i, 'year', e.target.value)} />
                                            </div>
                                            <div className="field-group">
                                                <label>Title</label>
                                                <input type="text" value={item.title} onChange={(e) => updateTimeline(i, 'title', e.target.value)} />
                                            </div>
                                            <div className="field-group full">
                                                <label>Description</label>
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
                                    <h2>👥 Team Members</h2>
                                    <p>Edit the name, role, and bio of each team member.</p>
                                </div>
                                <div className="editor-fields">
                                    {team.map((member, i) => (
                                        <div className="team-edit-card" key={member.id}>
                                            <div className="team-edit-avatar">{member.name.charAt(0)}</div>
                                            <div className="team-edit-fields">
                                                <div className="field-row-2">
                                                    <div className="field-group">
                                                        <label>Full Name</label>
                                                        <input type="text" value={member.name} onChange={(e) => updateTeamMember(i, 'name', e.target.value)} />
                                                    </div>
                                                    <div className="field-group">
                                                        <label>Role / Title</label>
                                                        <input type="text" value={member.role} onChange={(e) => updateTeamMember(i, 'role', e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="field-group">
                                                    <label>Bio</label>
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
                                    <h2>🚀 Call to Action</h2>
                                    <p>Edit the bottom CTA banner with heading and button labels.</p>
                                </div>
                                <div className="editor-fields">
                                    <div className="field-group">
                                        <label>CTA Heading</label>
                                        <input type="text" value={cta.heading} onChange={(e) => setCta({ ...cta, heading: e.target.value })} />
                                    </div>
                                    <div className="field-group">
                                        <label>Sub Text</label>
                                        <input type="text" value={cta.subtext} onChange={(e) => setCta({ ...cta, subtext: e.target.value })} />
                                    </div>
                                    <div className="field-row-2">
                                        <div className="field-group">
                                            <label>Primary Button Label</label>
                                            <input type="text" value={cta.primaryLabel} onChange={(e) => setCta({ ...cta, primaryLabel: e.target.value })} />
                                        </div>
                                        <div className="field-group">
                                            <label>Outline Button Label</label>
                                            <input type="text" value={cta.outlineLabel} onChange={(e) => setCta({ ...cta, outlineLabel: e.target.value })} />
                                        </div>
                                    </div>
                                </div>
                                <div className="preview-box cta-preview">
                                    <p className="preview-label">Live Preview</p>
                                    <h3 className="preview-heading">{cta.heading}</h3>
                                    <p className="preview-text">{cta.subtext}</p>
                                    <div className="preview-cta-btns">
                                        <span className="preview-primary-btn">{cta.primaryLabel}</span>
                                        <span className="preview-outline-btn">{cta.outlineLabel}</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* SAVE FOOTER */}
                        <div className="editor-save-footer">
                            <button className={`save-all-btn ${saved ? 'saved' : ''}`} onClick={handleSave}>
                                {saved ? '✅ Changes Saved!' : '💾 Save All Changes'}
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default EditAbout;
