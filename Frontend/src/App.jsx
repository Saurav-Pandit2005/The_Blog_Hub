import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import HomePage from './Visitor/Home/HomePage';
import BlogPage from './Visitor/Blogs/BlogPage';
import PodcastsPage from './Visitor/Podcasts/PodcastsPage';
import ResourcesPage from './Visitor/Resources/ResourcesPage';
import AboutPage from './Visitor/About/AboutPage';
import ContactPage from './Visitor/Contact/ContactPage';
import Login from './Visitor/Authentication/Login';
import Register from './Visitor/Authentication/Register';
import Landing from './Visitor/Landing/Landing';
import BlogDetailPage from './Visitor/Blogs/BlogDetail/BlogDetailPage';
import ForgotPassword from './Visitor/Authentication/ForgotPassword';

// Author Pages
import AuthorHome from './Author/Home/HomePage';
import AuthorAbout from './Author/About/AboutPage';
import AuthorExplore from './Author/Explore/ExplorePage';
import AuthorPodcasts from './Author/Podcasts/PodcastsPage';
import AuthorResources from './Author/Resources/ResourcesPage';
import AuthorContact from './Author/Contact/ContactPage';
import AuthorDashboard from './Author/Dashboard/Dashboard';
import WritePost from './Author/Dashboard/WritePost/WritePost';
import MyBlogs from './Author/Dashboard/MyBlogs/MyBlogs';
import AuthorDashPodcasts from './Author/Dashboard/Podcasts/Podcasts';
import AuthorDashResources from './Author/Dashboard/Resources/Resources';
import AuthorProfile from './Author/Dashboard/Profile/Profile';
import UploadPodcast from './Author/Dashboard/Podcasts/UploadPodcast';
import UploadResource from './Author/Dashboard/Resources/UploadResource';
import AdminDashboard from './Admin/Dashboard/Dashboard';
import WriteBlog from './Admin/WriteBlog/WriteBlog';
import ManageUsers from './Admin/ManageUsers/ManageUsers';
import ManageBlogs from './Admin/ManageBlogs/ManageBlogs';
import ManagePodcasts from './Admin/ManagePodcasts/ManagePodcasts';
import ManageResources from './Admin/ManageResources/ManageResources';
import Inquiries from './Admin/Inquiries/Inquiries';
import EditAbout from './Admin/EditAbout/EditAbout';
import Analytics from './Admin/Analytics/Analytics';
import AdminProfile from './Admin/Profile/Profile';

import Navbar from './Visitor/Authentication/navbar.jsx';
import Footer from './Visitor/Authentication/footer.jsx';

function App() {
  const location = useLocation();

  // Paths where we don't want Navbar and Footer
  // Paths where we don't want Visitor Navbar and Footer
  const isAuthorPath = location.pathname.startsWith('/author');
  const isAdminPath = location.pathname.startsWith('/admin');
  const hideNavFooter = ['/', '/login', '/register', '/forgot-password'].includes(location.pathname) || isAuthorPath || isAdminPath;

  return (
    <>
      {!hideNavFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/blogs" element={<BlogPage />} />
        <Route path="/podcasts" element={<PodcastsPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/blog-detail" element={<BlogDetailPage />} />

        {/* Author Routes */}
        <Route path="/author/home" element={<AuthorHome />} />
        <Route path="/author/about" element={<AuthorAbout />} />
        <Route path="/author/explore" element={<AuthorExplore />} />
        <Route path="/author/podcasts" element={<AuthorPodcasts />} />
        <Route path="/author/resources" element={<AuthorResources />} />
        <Route path="/author/contact" element={<AuthorContact />} />
        <Route path="/author/dashboard" element={<AuthorDashboard />} />
        <Route path="/author/write-post" element={<WritePost />} />
        <Route path="/author/my-blogs" element={<MyBlogs />} />
        <Route path="/author/dashboard/podcasts" element={<AuthorDashPodcasts />} />
        <Route path="/author/dashboard/resources" element={<AuthorDashResources />} />
        <Route path="/author/profile" element={<AuthorProfile />} />
        <Route path="/author/upload-podcast" element={<UploadPodcast />} />
        <Route path="/author/upload-resource" element={<UploadResource />} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/write-blog" element={<WriteBlog />} />
        <Route path="/admin/manage-users" element={<ManageUsers />} />
        <Route path="/admin/manage-blogs" element={<ManageBlogs />} />
        <Route path="/admin/manage-podcasts" element={<ManagePodcasts />} />
        <Route path="/admin/manage-resources" element={<ManageResources />} />
        <Route path="/admin/inquiries" element={<Inquiries />} />
        <Route path="/admin/edit-about" element={<EditAbout />} />
        <Route path="/admin/analytics" element={<Analytics />} />
        <Route path="/admin/profile" element={<AdminProfile />} />
      </Routes>
      {!hideNavFooter && <Footer />}

    </>
  )
}

export default App
