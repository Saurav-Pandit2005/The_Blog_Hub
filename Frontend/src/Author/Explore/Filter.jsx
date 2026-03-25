import React from 'react';
import './Filter.css';

function Filter({ searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, sortBy, setSortBy }) {
    return (
        <section className="explore-controls">
            <div className="search-container">
                <input 
                    type="text" 
                    placeholder="Search community posts..." 
                    className="search-input" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="filters">
                <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                    <option value="All Categories">All Categories</option>
                    <option value="Technology">Technology</option>
                    <option value="Lifestyle">Lifestyle</option>
                    <option value="Startup">Startup</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Travel">Travel</option>
                    <option value="Fitness">Fitness</option>
                    <option value="Business">Business</option>
                    <option value="Productivity">Productivity</option>
                    <option value="Writing Tips">Writing Tips</option>
                </select>

                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="Latest">Latest</option>
                    <option value="Oldest">Oldest</option>
                    <option value="Top Rated">Top Rated</option>
                </select>
            </div>
        </section>
    );
}

export default Filter;