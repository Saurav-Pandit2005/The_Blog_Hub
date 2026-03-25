import React from 'react';
import './Explore_Categories.css';

function Explore_Categories({ selectedCategory, setSelectedCategory }) {
    const categories = [
        "All", "Technology", "Design", "Productivity", "Lifestyle", "AI & ML",
        "Business", "Marketing"
    ];

    return (
        <section className="categories">
            <h2>Topics in The Blog Hub</h2>
            <div className="category-list">
                {categories.map((category, index) => (
                    <button
                        key={index}
                        className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </section>
    );
}

export default Explore_Categories;