import React from 'react';
import './ExploreCategories.css';

function ExploreCategories() {
    const categories = [
        "Technology", "Design", "Lifestyle", "Productivity",
        "Travel", "Food", "Health", "Finance",
        "Marketing", "Science"
    ];

    return (
        <section className="categories">
            <h2>Explore Categories</h2>
            <div className="category-list">
                {categories.map((category, index) => (
                    <span key={index}>{category}</span>
                ))}
            </div>
        </section>
    );
}

export default ExploreCategories;
