import React from 'react';
import { Search } from 'lucide-react';
import './Filter.css';

function Filter({ searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, sortBy, setSortBy }) {
    return (
        <section className="blog-controls">
            <div className="search-container">
                {/* <Search className="search-icon" size={18} /> */}
                <input
                    type="text"
                    placeholder="Search articles..."
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="filters">
                <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                    <option value="All Categories">All Categories</option>
                    <option value="Technology">Technology</option>
                    <option value="Geopolitics">Geopolitics</option>
                    <option value="World News">World News</option>
                    <option value="Business">Business</option>
                    <option value="Sports">Sports</option>
                    <option value="Defence">Defence</option>
                    <option value="Productivity">Productivity</option>
                    <option value="Health">Health</option>
                </select>

                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="Latest">Latest</option>
                    <option value="Oldest">Oldest</option>
                </select>
            </div>
        </section>
    );
}

export default Filter;