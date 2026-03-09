import React from 'react';
import './Explore_Categories.css';

function Explore_Categories() {
    const categories = [
        "Technology", "Design", "Productivity", "AI & ML",
        "Business", "Marketing", "Writing Tips", "SEO"
    ];

    return (
        <section className="categories">
            <h2>Topics for Your Next Story</h2>
            <div className="category-list">
                {categories.map((category, index) => (
                    <span key={index}>{category}</span>
                ))}
            </div>
        </section>
    );
}

export default Explore_Categories;