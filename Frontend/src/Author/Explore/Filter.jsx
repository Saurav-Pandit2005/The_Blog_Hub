import React from 'react';
import './Filter.css';

function Filter() {
    return (
        <section className="explore-controls">
            <div className="search-container">
                <input type="text" placeholder="Search community posts..." className="search-input" />
            </div>

            <div className="filters">
                <select>
                    <option>All Categories</option>
                    <option>Writing Tips</option>
                    <option>Technology</option>
                    <option>Lifestyle</option>
                    <option>Marketing</option>
                </select>

                <select>
                    <option>Sort By</option>
                    <option>Latest</option>
                    <option>Oldest</option>
                    <option>Top Rated</option>
                </select>
            </div>
        </section>
    );
}

export default Filter;