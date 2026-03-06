import React from 'react';
import { Search } from 'lucide-react';
import './Filter.css';

function Filter() {
    return (
        <section className="blog-controls">
            <div className="search-container">
                <Search className="search-icon" size={18} />
                <input type="text" placeholder="Search articles..." className="search-input" />
            </div>

            <div className="filters">
                <select>
                    <option>All Categories</option>
                    <option>Technology</option>
                    <option>Lifestyle</option>
                    <option>Startup</option>
                    <option>Marketing</option>
                </select>

                <select>
                    <option>Sort By</option>
                    <option>Latest</option>
                    <option>Oldest</option>
                    <option>Popular</option>
                </select>
            </div>
        </section>
    );
}

export default Filter;