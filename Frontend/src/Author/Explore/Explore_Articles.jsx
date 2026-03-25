import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Calendar, Heart } from 'lucide-react';
import './Explore_Articles.css';

// Assets from Author/Explore
import blog1 from '../../assets/Images/Author/Explore/blog1.jpg';
import blog2 from '../../assets/Images/Author/Explore/blog2.jpg';
import blog3 from '../../assets/Images/Author/Explore/blog3.jpg';
import blog4 from '../../assets/Images/Author/Explore/blog4.jpg';
import blog5 from '../../assets/Images/Author/Explore/blog5.jpg';
import blog6 from '../../assets/Images/Author/Explore/blog6.jpg';
import blog7 from '../../assets/Images/Author/Explore/blog7.png';
import blog8 from '../../assets/Images/Author/Explore/blog8.jpg';
import blog9 from '../../assets/Images/Author/Explore/blog9.webp';

function Explore_Articles({ searchTerm = "", selectedCategory = "All Categories", sortBy = "Latest" }) {
    const navigate = useNavigate();

    const handleLikeClick = (e) => {
        e.preventDefault();
        // Maybe navigate somewhere or show toast
    };

    const articles = [
        {
            image: blog1, tag: "Lifestyle", title: "Building Healthy Morning Habits",
            desc: "Discover simple morning routines that boost energy and improve daily productivity.",
            author: "Sarah J.", date: "March 20, 2024"
        },
        {
            image: blog2, tag: "Technology", title: "Understanding Cloud Computing",
            desc: "An easy guide to how cloud platforms are transforming modern businesses.",
            author: "Mark R.", date: "March 18, 2024"
        },
        {
            image: blog3, tag: "Startup", title: "How to Launch Your First Startup",
            desc: "A beginner's roadmap to turning your innovative idea into a successful venture.",
            author: "Lisa K.", date: "March 15, 2024"
        },
        {
            image: blog4, tag: "Technology", title: "The Future of AI in Web Development",
            desc: "Artificial intelligence is rapidly transforming modern web development.",
            author: "Alex J.", date: "March 12, 2024"
        },
        {
            image: blog5, tag: "Travel", title: "Hidden Gems: Mountain Trails Worth Exploring",
            desc: "Discover breathtaking mountain destinations that offer unforgettable experiences away from the crowds.",
            author: "Chris W.", date: "March 10, 2024"
        },
        {
            image: blog6, tag: "Lifestyle", title: "Healthy Eating Made Simple",
            desc: "Easy-to-follow tips and delicious recipes to help you maintain a balanced and nutritious diet.",
            author: "Emma S.", date: "March 08, 2024"
        },
        {
            image: blog7, tag: "Fitness", title: "Building Strength: A Beginner's Guide",
            desc: "Start your fitness journey with these fundamental exercises and training tips for building strength safely.",
            author: "John D.", date: "March 05, 2024"
        },
        {
            image: blog8, tag: "Business", title: "Leadership in the Modern Workplace",
            desc: "Understanding the evolving dynamics of leadership and team management in today's business environment.",
            author: "Robert P.", date: "March 02, 2024"
        },
        {
            image: blog9, tag: "Productivity", title: "Creating the Perfect Home Office",
            desc: "Design tips and essentials for building a productive and comfortable workspace at home.",
            author: "Sophie T.", date: "March 01, 2024"
        }
    ];

    const filteredArticles = articles
        .filter(article => {
            const matchesSearch = 
                article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                article.desc.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === "All Categories" || selectedCategory === "" || article.tag === selectedCategory;
            return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
            if (sortBy === "Latest") {
                return new Date(b.date) - new Date(a.date);
            } else if (sortBy === "Oldest") {
                return new Date(a.date) - new Date(b.date);
            }
            return 0;
        });

    return (
        <section className="explore-grid">
            <div className="cards">
                {filteredArticles.length > 0 ? (
                    filteredArticles.map((article, index) => (
                        <div className="card" key={index}>
                            <div className="card-image">
                                <img src={article.image} alt={article.title} />
                                <span className="tag">{article.tag}</span>
                            </div>
                            <div className="card-content">
                                <h3>{article.title}</h3>
                                <p>{article.desc}</p>
                                
                                <div className="card-footer">
                                    <div className="author-info">
                                        <User size={14} />
                                        <span>{article.author}</span>
                                    </div>
                                    <div className="date-info">
                                        <Calendar size={14} />
                                        <span>{article.date}</span>
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
                    <div className="no-articles" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px 0', color: '#666' }}>
                        <p>No articles found matching your criteria.</p>
                    </div>
                )}
            </div>
        </section>
    );
}

export default Explore_Articles;