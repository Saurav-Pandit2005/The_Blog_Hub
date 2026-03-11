import React, { useState } from 'react';
import './FAQ.css';

function FAQ() {
    const [activeIndex, setActiveIndex] = useState(0);

    const faqs = [
        {
            question: "How do I start publishing?",
            answer: "Once you log in to your dashboard, click on 'Create New Story' to use our premium editor tools and submit your work for review."
        },
        {
            question: "What are the editorial guidelines?",
            answer: "We value clarity, depth, and authenticity. Ensure your content is original, well-researched, and follows the specified category tone."
        },
        {
            question: "How long does the review process take?",
            answer: "Our editorial team typically reviews submissions within 24-48 hours. You will receive a notification once your post is live."
        },
        {
            question: "Can I manage my published posts?",
            answer: "Yes, you can edit or update your articles anytime through the 'Recent Publications' section on your dashboard."
        },
        {
            question: "Is there a limit on articles per month?",
            answer: "No, as long as you maintain quality and follow guidelines, there is no limit to how much you can contribute."
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
                    <h2>Author FAQ</h2>
                    <p>
                        Have questions about the creative community? Here are our
                        most common queries. If you don't find what you are
                        looking for, our team is just a message away.
                    </p>
                    <a href="#ask" className="ask-btn">Ask Question ↗</a>
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