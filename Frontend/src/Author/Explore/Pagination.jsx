import React from 'react';
import './Pagination.css';

function Pagination() {
    return (
        <section className="pagination">
            <a href="#prev">« Prev</a>
            <a href="#page1" className="active">1</a>
            <a href="#page2">2</a>
            <a href="#page3">3</a>
            <a href="#next">Next »</a>
        </section>
    );
}

export default Pagination;