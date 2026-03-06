import React from 'react';
import PageHeader from './PageHeader';
import Filter from './Filter';
import Blog_Articles from './Blog_Articles';
import Pagination from './Pagination';

function BlogPage() {
    return (
        <main>
            <PageHeader />
            <Filter />
            <Blog_Articles />
            <Pagination />
        </main>
    );
}

export default BlogPage;