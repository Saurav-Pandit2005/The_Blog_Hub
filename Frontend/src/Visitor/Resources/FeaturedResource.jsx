import React from 'react';
import './FeaturedResource.css';
import resourceImg from '../../assets/Images/Visitor/Resources/resource1.jpg';

function FeaturedResource() {
    return (
        <section className="featured-resource">
            <div className="featured-image">
                <img src={resourceImg} alt="Featured Resource" />
            </div>

            <div className="featured-content">
                <h2>Space Exploration Whitepaper</h2>
                <p>
                    An in-depth whitepaper covering the latest advancements
                    in space missions, asteroid mining and Mars colonization.
                </p>

                <div className="resource-meta">
                    <div><span>Publication:</span> September 2023</div>
                    <div><span>Category:</span> Space Research</div>
                    <div><span>Author:</span> FutureTech Division</div>
                </div>

                <a href="#" className="primary-btn">Download PDF</a>
            </div>
        </section>
    );
}

export default FeaturedResource;
