import React, { useState } from 'react';
import './FAQ.css';

function FAQ() {
    const [activeIndex, setActiveIndex] = useState(0);

    const faqs = [
        {
            question: "What is The Blog Hub?",
            answer: "The Blog Hub is a modern content platform where readers can explore insightful articles across technology, startups, design, and lifestyle."
        },
        {
            question: "How can I publish my own blog?",
            answer: "You can register as an author and submit your blog posts directly through your dashboard."
        },
        {
            question: "Are articles free to read?",
            answer: "Yes, all published articles are freely accessible to our readers."
        },
        {
            question: "How often is new content published?",
            answer: "We publish fresh content regularly to keep our readers updated."
        }
    ];

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? -1 : index);
    };

    return (
        <section className="faq-section">
            <div className="faq-container">
                {/* LEFT SIDE */}
                <div className="faq-left">
                    <h2>Asked Questions</h2>
                    <p>
                        If your question isn’t listed here, feel free to contact us.
                        We’re always happy to help and resolve your doubts.
                    </p>
                    <a href="#" className="ask-btn">Ask Question ↗</a>
                </div>

                {/* RIGHT SIDE ACCORDION */}
                <div className="faq-right">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`faq-item ${activeIndex === index ? 'active' : ''}`}
                        >
                            <div className="faq-question" onClick={() => toggleFAQ(index)}>
                                {faq.question}
                                <span className="icon">{activeIndex === index ? '−' : '+'}</span>
                            </div>
                            <div className="faq-answer">
                                {faq.answer}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default FAQ;