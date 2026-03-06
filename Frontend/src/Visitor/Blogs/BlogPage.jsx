import React from 'react';
import Navbar from '../navbar';
import Page_Header from './Page_Header';
import Filter from './Filter';
import Blog_Articles from './Blog_Articles';
import Pagination from './Pagination';
import Footer from '../footer';

function BlogPage() {
    return (
        <>
            <Navbar />
            <Page_Header />
            <Filter />
            <Blog_Articles />
            <Pagination />
            <Footer />
        </>
    );
}

export default BlogPage;