import React from 'react';
import { Link } from 'react-router-dom';
import './Articles.css';

import blog1 from '../../assets/Images/Author/Home/blog1.webp';
import blog2 from '../../assets/Images/Author/Home/blog2.jpg';
import blog3 from '../../assets/Images/Author/Home/blog3.jpg';
import blog4 from '../../assets/Images/Author/Home/blog4.jpg';
import blog5 from '../../assets/Images/Author/Home/blog5.jpg';
import blog6 from '../../assets/Images/Author/Home/blog6.webp';

function Articles() {
    return (
        <section className="featured">
            <h2>Your Recent Publications</h2>
            <div className="cards">

                {/* CARD 1 */}
                <div className="card">
                    <img src={blog1} alt="Blog 1" />
                    <span className="tag">Technology</span>
                    <h3>The Future of AI in Web Development</h3>
                    <p>Artificial intelligence is rapidly transforming modern web development.</p>
                    <Link to="/author/blogs">Edit Post →</Link>
                </div>

                {/* CARD 2 */}
                <div className="card">
                    <img src={blog2} alt="Blog 2" />
                    <span className="tag">Design</span>
                    <h3>10 Essential Design Principles</h3>
                    <p>Design principles that guide effective and modern UI systems.</p>
                    <Link to="/author/blogs">Edit Post →</Link>
                </div>

                {/* CARD 3 */}
                <div className="card">
                    <img src={blog3} alt="Blog 3" />
                    <span className="tag">Lifestyle</span>
                    <h3>Mastering Productivity Tips</h3>
                    <p>Unlock your full productivity potential with smart habits.</p>
                    <Link to="/author/blogs">Edit Post →</Link>
                </div>

                {/* CARD 4 */}
                <div className="card">
                    <img src={blog4} alt="Blog 4" />
                    <span className="tag">Technology</span>
                    <h3>The Evolution of JavaScript ES2023</h3>
                    <p>Explore new features and updates in modern JavaScript.</p>
                    <Link to="/author/blogs">Edit Post →</Link>
                </div>

                {/* CARD 5 */}
                <div className="card">
                    <img src={blog5} alt="Blog 5" />
                    <span className="tag">Lifestyle</span>
                    <h3>Sustainable Living Guide</h3>
                    <p>Practical tips for a more eco-friendly and sustainable life.</p>
                    <Link to="/author/blogs">Edit Post →</Link>
                </div>

                {/* CARD 6 */}
                <div className="card">
                    <img src={blog6} alt="Blog 6" />
                    <span className="tag">Marketing</span>
                    <h3>The Art of Storytelling</h3>
                    <p>Learn how storytelling builds powerful brand identity.</p>
                    <Link to="/author/blogs">Edit Post →</Link>
                </div>

            </div>
        </section>
    );
}

export default Articles;