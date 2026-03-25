import React from 'react';
import { Link } from 'react-router-dom';
import { User, Calendar, Edit } from 'lucide-react';
import './Articles.css';

import blog1 from '../../assets/Images/Author/Home/blog1.webp';
import blog2 from '../../assets/Images/Author/Home/blog2.jpg';
import blog3 from '../../assets/Images/Author/Home/blog3.jpg';
import blog4 from '../../assets/Images/Author/Home/blog4.jpg';
import blog5 from '../../assets/Images/Author/Home/blog5.jpg';
import blog6 from '../../assets/Images/Author/Home/blog6.webp';

const blogData = [
    {
        id: 1,
        image: blog1,
        tag: "Technology",
        title: "The Future of AI in Web Development",
        desc: "Artificial intelligence is rapidly transforming modern web development.",
        author: "Alex Johnson",
        date: "March 15, 2024",
        link: "/author/blogs"
    },
    {
        id: 2,
        image: blog2,
        tag: "Design",
        title: "10 Essential Design Principles",
        desc: "Design principles that guide effective and modern UI systems.",
        author: "Sarah Smith",
        date: "March 12, 2024",
        link: "/author/blogs"
    },
    {
        id: 3,
        image: blog3,
        tag: "Lifestyle",
        title: "Mastering Productivity Tips",
        desc: "Unlock your full productivity potential with smart habits.",
        author: "David Lee",
        date: "March 10, 2024",
        link: "/author/blogs"
    },
    {
        id: 4,
        image: blog4,
        tag: "Technology",
        title: "The Evolution of JavaScript ES2023",
        desc: "Explore new features and updates in modern JavaScript.",
        author: "Raghav Nayar",
        date: "March 08, 2024",
        link: "/author/blogs"
    },
    {
        id: 5,
        image: blog5,
        tag: "Lifestyle",
        title: "Sustainable Living Guide",
        desc: "Practical tips for a more eco-friendly and sustainable life.",
        author: "Sophie Green",
        date: "March 05, 2024",
        link: "/author/blogs"
    },
    {
        id: 6,
        image: blog6,
        tag: "Marketing",
        title: "The Art of Storytelling",
        desc: "Learn how storytelling builds powerful brand identity.",
        author: "Michael Brown",
        date: "March 02, 2024",
        link: "/author/blogs"
    }
];

function Articles({ selectedCategory = "All" }) {
    const filteredBlogs = selectedCategory === "All" || !selectedCategory
        ? blogData
        : blogData.filter(blog => blog.tag === selectedCategory);

    return (
        <section className="featured">
            <h2>{selectedCategory === "All" || !selectedCategory ? "Plateform Recent Publications" : `${selectedCategory} Publications`}</h2>
            <div className="cards">
                {filteredBlogs.length > 0 ? (
                    filteredBlogs.map((blog) => (
                        <div className="card" key={blog.id}>
                            <div className="card-image">
                                <img src={blog.image} alt={blog.title} />
                                <span className="tag">{blog.tag}</span>
                            </div>
                            <div className="card-content">
                                <h3>{blog.title}</h3>
                                <p>{blog.desc}</p>

                                <div className="card-footer">
                                    <div className="author-info">
                                        <User size={14} />
                                        <span>{blog.author}</span>
                                    </div>
                                    <div className="date-info">
                                        <Calendar size={14} />
                                        <span>{blog.date}</span>
                                    </div>
                                    <Link to={blog.link} className="like-btn" title="Edit this post">
                                        <Edit size={18} />
                                    </Link>
                                </div>

                                <Link to={blog.link} className="read-more">Read Post →</Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-articles" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px 0', color: '#666' }}>
                        <p>No publications found in this category.</p>
                    </div>
                )}
            </div>
        </section>
    );
}

export default Articles;