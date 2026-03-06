import React from 'react';
import './ResourcesGrid.css';
import res2 from '../../assets/Images/Visitor/Resources/resource2.jpg';
import res3 from '../../assets/Images/Visitor/Resources/resource3.jpg';
import res4 from '../../assets/Images/Visitor/Resources/resource4.jpg';

function ResourcesGrid() {
    const resources = [
        {
            img: res2,
            title: "FutureTech Trends 2026",
            desc: "Technology trend predictions and AI developments."
        },
        {
            img: res3,
            title: "Space Exploration Ebook",
            desc: "Comprehensive research on deep space missions."
        },
        {
            img: res4,
            title: "Quantum Computing Whitepaper",
            desc: "Exploring future computing principles & applications."
        }
    ];

    return (
        <section className="resources-section">
            <div className="resources-grid">
                {resources.map((item, index) => (
                    <div className="resource-card" key={index}>
                        <img src={item.img} alt={item.title} />
                        <h3>{item.title}</h3>
                        <p>{item.desc}</p>
                        <div className="card-buttons">
                            <a href="#" className="outline-btn">View Details</a>
                            <a href="#" className="primary-btn">Download PDF</a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default ResourcesGrid;
