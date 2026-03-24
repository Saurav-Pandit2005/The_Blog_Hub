import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Calendar, Heart } from 'lucide-react';
import './FeaturedArticles.css';

import blog1 from '../../assets/Images/Visitor/HomePage/blog1.webp';
import blog2 from '../../assets/Images/Visitor/HomePage/blog2.jpg';
import blog3 from '../../assets/Images/Visitor/HomePage/blog3.jpg';
import blog4 from '../../assets/Images/Visitor/HomePage/blog4.jpg';
import blog5 from '../../assets/Images/Visitor/HomePage/blog5.jpg';
import blog6 from '../../assets/Images/Visitor/HomePage/blog6.webp';

const blogData = [
    {
        id: 1,
        image: blog1,
        tag: "Technology",
        title: "The Future of AI in Web Development",
        desc: "Artificial intelligence is rapidly transforming modern web development.",
        author: "Raghav Nayar",
        date: "June 17, 2024"
    },
    {
        id: 2,
        image: blog2,
        tag: "Design",
        title: "10 Essential Design Principles",
        desc: "Design principles that guide effective and modern UI systems.",
        author: "Samriddhi Uniyal",
        date: "April 29, 2023"
    },
    {
        id: 3,
        image: blog3,
        tag: "Lifestyle",
        title: "Mastering Productivity Tips",
        desc: "Unlock your full productivity potential with smart habits.",
        author: "David Lee",
        date: "March 10, 2024"
    },
    {
        id: 4,
        image: blog4,
        tag: "Technology",
        title: "The Evolution of JavaScript ES2023",
        desc: "Explore new features and updates in modern JavaScript.",
        author: "Raghav Nayar",
        date: "November 20, 2024"
    },
    {
        id: 5,
        image: blog5,
        tag: "Lifestyle",
        title: "Sustainable Living Guide",
        desc: "Practical tips for a more eco-friendly and sustainable life.",
        author: "Sophie Green",
        date: "March 05, 2024"
    },
    {
        id: 6,
        image: blog6,
        tag: "Marketing",
        title: "The Art of Storytelling",
        desc: "Learn how storytelling builds powerful brand identity.",
        author: "Michael Brown",
        date: "March 02, 2024"
    }
];

function FeaturedArticles({ selectedCategory }) {
    const navigate = useNavigate();

    const handleLikeClick = (e) => {
        e.preventDefault();
        navigate('/register');
    };

    const filteredBlogs = selectedCategory === "All"
        ? blogData
        : blogData.filter(blog => blog.tag === selectedCategory);

    return (
        <section className="featured">
            <h2>{selectedCategory === "All" ? "Featured Articles" : `${selectedCategory} Articles`}</h2>
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
                                    <button className="like-btn" onClick={handleLikeClick} title="Like this post">
                                        <Heart size={22} />
                                    </button>
                                </div>

                                <Link to="/blog-detail" className="read-more">Read More →</Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-articles">
                        <p>No articles found in this category yet.</p>
                    </div>
                )}
            </div>
        </section>
    );
}

export default FeaturedArticles;
