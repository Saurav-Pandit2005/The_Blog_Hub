import React from 'react';
import './ExploreCategories.css';

function ExploreCategories({ selectedCategory, setSelectedCategory }) {
    const categories = [
        "All", "Technology", "Design", "Lifestyle", "Productivity",
        "Travel", "Food", "Health", "Finance"
    ];

    return (
        <section className="categories">
            <h2>Explore Categories</h2>
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

export default ExploreCategories;
