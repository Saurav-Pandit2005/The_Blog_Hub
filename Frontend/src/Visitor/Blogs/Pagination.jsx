import React from 'react';
import './Pagination.css';

function Pagination({ currentPage, totalPages, onPageChange }) {

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    const handlePageClick = (page, e) => {
        e.preventDefault();
        onPageChange(page);
    };

    return (
        <section className="pagination">
            <a 
                href="#prev" 
                className={currentPage === 1 ? 'disabled' : ''} 
                onClick={(e) => currentPage > 1 && handlePageClick(currentPage - 1, e)}
            >
                « Prev
            </a>
            
            {pages.map(page => (
                <a 
                    key={page}
                    href={`#page${page}`}
                    className={currentPage === page ? 'active' : ''}
                    onClick={(e) => handlePageClick(page, e)}
                >
                    {page}
                </a>
            ))}

            <a 
                href="#next" 
                className={currentPage === totalPages ? 'disabled' : ''} 
                onClick={(e) => currentPage < totalPages && handlePageClick(currentPage + 1, e)}
            >
                Next »
            </a>
        </section>
    );
}

export default Pagination;