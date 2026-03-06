import React from 'react';
import './Blog_Articles.css';

import blog1 from '../../assets/Images/Visitor/Blogs/blog1.jpg';
import blog2 from '../../assets/Images/Visitor/Blogs/blog2.jpg';
import blog3 from '../../assets/Images/Visitor/Blogs/blog3.jpg';
import blog4 from '../../assets/Images/Visitor/Blogs/blog4.jpg';
import blog5 from '../../assets/Images/Visitor/Blogs/blog5.jpg';
import blog6 from '../../assets/Images/Visitor/Blogs/blog6.jpg';
import blog7 from '../../assets/Images/Visitor/Blogs/blog7.png';
import blog8 from '../../assets/Images/Visitor/Blogs/blog8.jpg';
import blog9 from '../../assets/Images/Visitor/Blogs/blog9.webp';

function Blog_Articles() {
    const articles = [
        {
            image: blog1, tag: "Lifestyle", title: "Building Healthy Morning Habits",
            desc: "Discover simple morning routines that boost energy and improve daily productivity."
        },
        {
            image: blog2, tag: "Technology", title: "Understanding Cloud Computing",
            desc: "An easy guide to how cloud platforms are transforming modern businesses."
        },
        {
            image: blog3, tag: "Startup", title: "How to Launch Your First Startup",
            desc: "A beginner's roadmap to turning your innovative idea into a successful venture."
        },
        {
            image: blog4, tag: "Technology", title: "The Future of AI in Web Development",
            desc: "Artificial intelligence is rapidly transforming modern web development."
        },
        {
            image: blog5, tag: "Travel", title: "Hidden Gems: Mountain Trails Worth Exploring",
            desc: "Discover breathtaking mountain destinations that offer unforgettable experiences away from the crowds."
        },
        {
            image: blog6, tag: "Lifestyle", title: "Healthy Eating Made Simple",
            desc: "Easy-to-follow tips and delicious recipes to help you maintain a balanced and nutritious diet."
        },
        {
            image: blog7, tag: "Fitness", title: "Building Strength: A Beginner's Guide",
            desc: "Start your fitness journey with these fundamental exercises and training tips for building strength safely."
        },
        {
            image: blog8, tag: "Business", title: "Leadership in the Modern Workplace",
            desc: "Understanding the evolving dynamics of leadership and team management in today's business environment."
        },
        {
            image: blog9, tag: "Productivity", title: "Creating the Perfect Home Office",
            desc: "Design tips and essentials for building a productive and comfortable workspace at home."
        }
    ];

    return (
        <section className="blog-grid">
            <div className="cards">
                {articles.map((article, index) => (
                    <div className="card" key={index}>
                        <img src={article.image} alt={article.title} />
                        <span className="tag">{article.tag}</span>
                        <h3>{article.title}</h3>
                        <p>{article.desc}</p>
                        <a href="#read">Read More →</a>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Blog_Articles;