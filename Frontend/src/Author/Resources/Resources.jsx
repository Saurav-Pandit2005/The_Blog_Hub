import React from 'react';
import './Resources.css';

// Assets from Author/Resources
import res1 from '../../assets/Images/Author/Resources/resource1.jpg';
import res2 from '../../assets/Images/Author/Resources/resource2.jpg';
import res3 from '../../assets/Images/Author/Resources/resource3.jpg';
import res4 from '../../assets/Images/Author/Resources/resource4.jpg';
import res5 from '../../assets/Images/Author/Resources/resource5.png';
import res6 from '../../assets/Images/Author/Resources/resource6.jpg';

function Resources() {
    const resources = [
        {
            img: res1,
            title: "Space Exploration Whitepaper",
            desc: "An in-depth whitepaper covering the latest advancements in space missions, asteroid mining and Mars colonization."
        },
        {
            img: res2,
            title: "FutureTech Trends 2026",
            desc: "Understand where technology is headed and how to write about it effectively."
        },
        {
            img: res3,
            title: "The Author's Brand Ebook",
            desc: "Complete guide on how to build and maintain your professional author brand."
        },
        {
            img: res4,
            title: "Quantum Journalism Research",
            desc: "Exploring how complex scientific topics are covered in modern digital blogs."
        },
        {
            img: res5,
            title: "Cybersecurity / Ethical Hacking",
            desc: "Protecting digital frontiers: advanced strategies for ethical hacking and data security."
        },
        {
            img: res6,
            title: "Robotics & Automation",
            desc: "The next generation of robotics: from manufacturing to autonomous AI agents."
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
                            <a href="#" className="outline-btn">View Guide</a>
                            <a href="#" className="primary-btn">Download PDF</a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Resources;