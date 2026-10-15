import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowRight,
    BookOpen,
    Check,
    Eye,
    Headphones,
    Heart,
    LayoutDashboard,
    Library,
    MessageCircle,
    PenTool,
    Play,
    ShieldCheck,
    Sparkles,
    TrendingUp,
    Users,
} from 'lucide-react';
import api from '../../api';
import { UserContext } from '../../context/UserContext';
import Logo from '../../components/Logo/Logo';
import ThemeToggle from '../../components/ThemeToggle/ThemeToggle';
import './Landing.css';

const NAV_LINKS = [
    { href: '#features', label: 'Features' },
    { href: '#how-it-works', label: 'How it works' },
    { href: '#roles', label: 'Who it is for' },
];

const FEATURES = [
    {
        icon: Sparkles,
        title: 'AI writing assistant',
        text: 'Turn a topic into a first draft in seconds, then edit it in your own voice. Powered by Groq and Gemini.',
    },
    {
        icon: PenTool,
        title: 'Distraction-free editor',
        text: 'Format with a rich text editor, add a cover image and keep drafts until you are ready to publish.',
    },
    {
        icon: Headphones,
        title: 'Podcasts',
        text: 'Upload audio or video episodes and let listeners play them right next to your articles.',
    },
    {
        icon: Library,
        title: 'Premium resources',
        text: 'Share guides, templates and PDFs. Every view and download is counted for you.',
    },
    {
        icon: LayoutDashboard,
        title: 'Your own dashboard',
        text: 'Track total views, recent posts, podcasts and resources from one clean author workspace.',
    },
    {
        icon: MessageCircle,
        title: 'Built-in community',
        text: 'Readers can like and comment on every story, so conversations happen where the writing is.',
    },
];

const STEPS = [
    {
        title: 'Create your free account',
        text: 'Join as a reader or an author in under a minute. No credit card, no setup.',
    },
    {
        title: 'Write and polish',
        text: 'Start from a blank page or let the AI assistant draft it. Save drafts and refine at your pace.',
    },
    {
        title: 'Publish and grow',
        text: 'Go live with one click, share your story and watch the views and likes come in.',
    },
];

const ROLES = [
    {
        icon: BookOpen,
        name: 'Readers',
        text: 'Discover great stories and stay part of the conversation.',
        points: ['Browse blogs, podcasts and resources', 'Like and comment on articles', 'Download free resources'],
    },
    {
        icon: PenTool,
        name: 'Authors',
        text: 'Everything you need to build an audience with your ideas.',
        points: ['Write with the AI assistant', 'Publish blogs, podcasts and resources', 'Follow your stats in a dashboard'],
        featured: true,
    },
    {
        icon: ShieldCheck,
        name: 'Admins',
        text: 'Keep the platform healthy and the community safe.',
        points: ['Manage users and roles', 'Review and edit all content', 'Reply to visitor inquiries'],
    },
];

const formatDate = (value) =>
    value ? new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '';

const getDashboardPath = (user) => {
    if (user?.role === 'Admin') return '/admin/dashboard';
    if (user?.role === 'Author') return '/author/dashboard';
    return '/home';
};

function Landing() {
    const { user } = useContext(UserContext);
    const [articles, setArticles] = useState([]);

    // Latest published articles (the section simply stays hidden if none can be loaded)
    useEffect(() => {
        let ignore = false;

        api.get('/blogs', { params: { limit: 3 } })
            .then((res) => {
                if (!ignore) setArticles(res.data.data || []);
            })
            .catch(() => {});

        return () => {
            ignore = true;
        };
    }, []);

    // Fade elements in while scrolling
    useEffect(() => {
        const items = document.querySelectorAll('.lp-reveal:not(.is-visible)');

        if (!('IntersectionObserver' in window)) {
            items.forEach((el) => el.classList.add('is-visible'));
            return undefined;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const el = entry.target;
                        el.classList.add('is-visible');
                        observer.unobserve(el);
                        // the stagger delay is only needed for the reveal, not for hover effects
                        window.setTimeout(() => {
                            el.style.transitionDelay = '0ms';
                        }, 1000);
                    }
                });
            },
            { threshold: 0.12 }
        );

        items.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [articles.length]);

    const primaryCta = user
        ? { to: getDashboardPath(user), label: user.role === 'Visitor' ? 'Continue reading' : 'Open dashboard' }
        : { to: '/register', label: 'Start writing free' };

    return (
        <div className="lp">
            {/* ===== HEADER ===== */}
            <header className="lp-header">
                <div className="lp-container lp-header-inner">
                    <Link to="/" className="lp-brand" aria-label="The Blog Hub home">
                        <Logo />
                    </Link>

                    <nav className="lp-nav" aria-label="Main">
                        {NAV_LINKS.map((link) => (
                            <a key={link.href} href={link.href}>
                                {link.label}
                            </a>
                        ))}
                        {articles.length > 0 && <a href="#latest">Latest</a>}
                    </nav>

                    <div className="lp-header-actions">
                        <ThemeToggle />
                        {!user && (
                            <Link to="/login" className="lp-link-btn">
                                Log in
                            </Link>
                        )}
                        <Link to={primaryCta.to} className="lp-btn lp-btn-primary lp-btn-sm">
                            {user ? primaryCta.label : 'Get started'}
                        </Link>
                    </div>
                </div>
            </header>

            <main>
                {/* ===== HERO ===== */}
                <section className="lp-hero">
                    <div className="lp-container lp-hero-grid">
                        <div className="lp-hero-copy">
                            <span className="lp-badge">
                                <Sparkles size={14} /> AI-powered blogging platform
                            </span>

                            <h1>
                                Write it. Publish it. <span className="lp-gradient-text">Let the world read it.</span>
                            </h1>

                            <p className="lp-hero-text">
                                The Blog Hub brings blogs, podcasts and resources together in one place, with an AI
                                assistant that helps you go from idea to published story faster than ever.
                            </p>

                            <div className="lp-hero-actions">
                                <Link to={primaryCta.to} className="lp-btn lp-btn-primary">
                                    {primaryCta.label} <ArrowRight size={18} />
                                </Link>
                                <Link to="/home" className="lp-btn lp-btn-ghost">
                                    Explore articles
                                </Link>
                            </div>

                            <ul className="lp-trust">
                                <li>
                                    <Check size={16} /> Free to join
                                </li>
                                <li>
                                    <Check size={16} /> AI-assisted drafts
                                </li>
                                <li>
                                    <Check size={16} /> Blogs, podcasts &amp; resources
                                </li>
                            </ul>
                        </div>

                        {/* Illustration of the product (decorative) */}
                        <div className="lp-hero-visual" aria-hidden="true">
                            <div className="lp-window">
                                <div className="lp-window-bar">
                                    <span />
                                    <span />
                                    <span />
                                    <small>New story</small>
                                </div>
                                <div className="lp-window-body">
                                    <div className="lp-window-title">The future of remote work</div>
                                    <div className="lp-window-tools">
                                        <b>B</b>
                                        <i>I</i>
                                        <u>U</u>
                                        <span className="lp-ai-chip">
                                            <Sparkles size={12} /> Generate with AI
                                        </span>
                                    </div>
                                    <div className="lp-lines">
                                        <span style={{ width: '96%' }} />
                                        <span style={{ width: '88%' }} />
                                        <span style={{ width: '92%' }} />
                                        <span style={{ width: '58%' }} />
                                    </div>
                                    <div className="lp-ai-box">
                                        <Sparkles size={16} />
                                        <div>
                                            <strong>AI suggestion</strong>
                                            <span>Add a short intro about flexible schedules and async teams.</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="lp-float lp-float-views">
                                <span className="lp-float-icon">
                                    <TrendingUp size={18} />
                                </span>
                                <div>
                                    <strong>12.4k</strong>
                                    <small>views this week</small>
                                </div>
                            </div>

                            <div className="lp-float lp-float-podcast">
                                <span className="lp-play">
                                    <Play size={14} fill="currentColor" />
                                </span>
                                <div>
                                    <strong>Episode 12</strong>
                                    <div className="lp-progress">
                                        <span />
                                    </div>
                                </div>
                            </div>

                            <div className="lp-float lp-float-likes">
                                <Heart size={16} fill="currentColor" /> 2.1k
                            </div>
                        </div>
                    </div>
                </section>

                {/* ===== HIGHLIGHTS ===== */}
                <section className="lp-strip lp-reveal" aria-label="Highlights">
                    <div className="lp-container lp-strip-grid">
                        <div>
                            <strong>Blogs</strong>
                            <span>Stories worth reading</span>
                        </div>
                        <div>
                            <strong>Podcasts</strong>
                            <span>Listen on the go</span>
                        </div>
                        <div>
                            <strong>Resources</strong>
                            <span>Guides and templates</span>
                        </div>
                        <div>
                            <strong>AI assistant</strong>
                            <span>Draft in seconds</span>
                        </div>
                    </div>
                </section>

                {/* ===== FEATURES ===== */}
                <section className="lp-section" id="features">
                    <div className="lp-container">
                        <div className="lp-heading lp-reveal">
                            <span className="lp-eyebrow">Features</span>
                            <h2>Everything a creator needs, in one place</h2>
                            <p>From the first idea to a growing audience, the tools are already built in.</p>
                        </div>

                        <div className="lp-feature-grid">
                            {FEATURES.map(({ icon: Icon, title, text }, index) => (
                                <article
                                    className="lp-card lp-feature lp-reveal"
                                    key={title}
                                    style={{ transitionDelay: `${(index % 3) * 80}ms` }}
                                >
                                    <span className="lp-icon-tile">
                                        <Icon size={22} />
                                    </span>
                                    <h3>{title}</h3>
                                    <p>{text}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ===== HOW IT WORKS ===== */}
                <section className="lp-section lp-section-alt" id="how-it-works">
                    <div className="lp-container">
                        <div className="lp-heading lp-reveal">
                            <span className="lp-eyebrow">How it works</span>
                            <h2>From idea to published in three steps</h2>
                            <p>No complicated setup. Just sign up and start creating.</p>
                        </div>

                        <ol className="lp-steps">
                            {STEPS.map((step, index) => (
                                <li
                                    className="lp-step lp-reveal"
                                    key={step.title}
                                    style={{ transitionDelay: `${index * 100}ms` }}
                                >
                                    <span className="lp-step-number">{index + 1}</span>
                                    <h3>{step.title}</h3>
                                    <p>{step.text}</p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </section>

                {/* ===== ROLES ===== */}
                <section className="lp-section" id="roles">
                    <div className="lp-container">
                        <div className="lp-heading lp-reveal">
                            <span className="lp-eyebrow">Who it is for</span>
                            <h2>A space for readers, authors and admins</h2>
                            <p>Each role gets its own tools, so everyone sees exactly what they need.</p>
                        </div>

                        <div className="lp-role-grid">
                            {ROLES.map(({ icon: Icon, name, text, points, featured }, index) => (
                                <article
                                    className={`lp-card lp-role lp-reveal${featured ? ' is-featured' : ''}`}
                                    key={name}
                                    style={{ transitionDelay: `${index * 80}ms` }}
                                >
                                    {featured && <span className="lp-role-tag">Most popular</span>}
                                    <span className="lp-icon-tile">
                                        <Icon size={22} />
                                    </span>
                                    <h3>{name}</h3>
                                    <p>{text}</p>
                                    <ul>
                                        {points.map((point) => (
                                            <li key={point}>
                                                <Check size={16} /> {point}
                                            </li>
                                        ))}
                                    </ul>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ===== LATEST ARTICLES (only when the API returned some) ===== */}
                {articles.length > 0 && (
                    <section className="lp-section lp-section-alt" id="latest">
                        <div className="lp-container">
                            <div className="lp-heading lp-reveal">
                                <span className="lp-eyebrow">Fresh from the community</span>
                                <h2>Latest stories</h2>
                                <p>See what our authors have been writing lately.</p>
                            </div>

                            <div className="lp-article-grid">
                                {articles.map((blog, index) => (
                                    <Link
                                        to={`/blog-detail/${blog.slug}`}
                                        className="lp-card lp-article lp-reveal"
                                        key={blog._id}
                                        style={{ transitionDelay: `${index * 80}ms` }}
                                    >
                                        <div className="lp-article-cover">
                                            {blog.coverImage && <img src={blog.coverImage} alt="" loading="lazy" />}
                                            <span className="lp-article-category">{blog.category}</span>
                                        </div>
                                        <div className="lp-article-body">
                                            <h3>{blog.title}</h3>
                                            <div className="lp-article-meta">
                                                <span className="lp-author">
                                                    {blog.author?.profilePic ? (
                                                        <img src={blog.author.profilePic} alt="" />
                                                    ) : (
                                                        <Users size={14} />
                                                    )}
                                                    {blog.author?.name || 'Author'}
                                                </span>
                                                <span>{formatDate(blog.createdAt)}</span>
                                                <span className="lp-views">
                                                    <Eye size={14} /> {blog.views || 0}
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            <div className="lp-center lp-reveal">
                                <Link to="/blogs" className="lp-btn lp-btn-ghost">
                                    Browse all articles <ArrowRight size={18} />
                                </Link>
                            </div>
                        </div>
                    </section>
                )}

                {/* ===== CALL TO ACTION ===== */}
                <section className="lp-section lp-cta-section">
                    <div className="lp-container">
                        <div className="lp-cta lp-reveal">
                            <h2>Ready to share your story?</h2>
                            <p>Join The Blog Hub today and publish your first article in minutes.</p>
                            <div className="lp-cta-actions">
                                <Link to={primaryCta.to} className="lp-btn lp-btn-white">
                                    {user ? primaryCta.label : 'Create free account'} <ArrowRight size={18} />
                                </Link>
                                <Link to="/home" className="lp-btn lp-btn-outline-light">
                                    Explore first
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* ===== FOOTER ===== */}
            <footer className="lp-footer">
                <div className="lp-container lp-footer-inner">
                    <div className="lp-footer-brand">
                        <Logo />
                        <p>Stories, podcasts and resources for curious minds and creators.</p>
                    </div>

                    <nav className="lp-footer-links" aria-label="Footer">
                        <Link to="/home">Home</Link>
                        <Link to="/blogs">Blogs</Link>
                        <Link to="/podcasts">Podcasts</Link>
                        <Link to="/resources">Resources</Link>
                        <Link to="/about">About</Link>
                        <Link to="/contact">Contact</Link>
                    </nav>
                </div>
                <div className="lp-container lp-footer-bottom">
                    &copy; {new Date().getFullYear()} The Blog Hub. All rights reserved.
                </div>
            </footer>
        </div>
    );
}

export default Landing;
