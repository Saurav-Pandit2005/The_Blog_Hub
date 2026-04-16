import React, { useContext } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { UserContext } from './context/UserContext';

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
import ResourceDetailPage from './Visitor/Resources/ResourceDetailPage';
import PodcastDetailPage from './Visitor/Podcasts/PodcastDetailPage';
import ForgotPassword from './Visitor/Authentication/ForgotPassword';
import ProtectedRoute from './ProtectedRoute';

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
import EditPost from './Author/Dashboard/WritePost/EditPost';
import AuthorDashPodcasts from './Author/Dashboard/Podcasts/Podcasts';
import AuthorDashResources from './Author/Dashboard/Resources/Resources';
import AuthorProfile from './Author/Dashboard/Profile/Profile';
import UploadPodcast from './Author/Dashboard/Podcasts/UploadPodcast';
import UploadResource from './Author/Dashboard/Resources/UploadResource';
import AuthorDashEditResource from './Author/Dashboard/Resources/EditResource';
import AuthorDashEditPodcast from './Author/Dashboard/Podcasts/EditPodcast';
import AdminDashboard from './Admin/Dashboard/Dashboard';
import WriteBlog from './Admin/WriteBlog/WriteBlog';
import ManageUsers from './Admin/ManageUsers/ManageUsers';
import ManageBlogs from './Admin/ManageBlogs/ManageBlogs';
import ManagePodcasts from './Admin/ManagePodcasts/ManagePodcasts';
import ManageResources from './Admin/ManageResources/ManageResources';
import Inquiries from './Admin/Inquiries/Inquiries';
import EditAbout from './Admin/EditAbout/EditAbout';
import AdminProfile from './Admin/Profile/Profile';

import Navbar from './Visitor/Authentication/navbar.jsx';
import Footer from './Visitor/Authentication/footer.jsx';

import AdminNavbar from './Admin/BackToHome/Navbar/Navbar';
import AdminFooter from './Admin/BackToHome/Footer/Footer';
import AdminHomePage from './Admin/BackToHome/Home/HomePage';
import AdminExplorePage from './Admin/BackToHome/Explore/ExplorePage';
import AdminPodcastsPage from './Admin/BackToHome/Podcasts/AdminPodcastsPage';
import AdminResourcesPage from './Admin/BackToHome/Resources/ResourcesPage';
import AdminAboutPage from './Admin/BackToHome/About/AboutPage';
import AdminContactPage from './Admin/BackToHome/Contact/ContactPage';

function App() {
  const location = useLocation();
  const { user } = useContext(UserContext);
  const isAdmin = user?.role === 'Admin';
  
  // Paths where we don't want Visitor Navbar and Footer
  const isAuthorPath = location.pathname.startsWith('/author');
  const isAdminPath = location.pathname.startsWith('/admin');
  
  // Define which pages should show the Admin "Back to Home" UI
  const isAdminBackToHome = ['/admin/home', '/admin/explore', '/admin/podcasts', '/admin/resources', '/admin/about', '/admin/contact'].includes(location.pathname) || 
                           (isAdmin && !isAuthorPath && !isAdminPath && !['/', '/login', '/register', '/forgot-password'].includes(location.pathname));

  const hideNavFooter = ['/', '/login', '/register', '/forgot-password'].includes(location.pathname) || isAuthorPath || isAdminPath || isAdminBackToHome;

  return (
    <>
      {!hideNavFooter && <Navbar />}
      {isAdminBackToHome && <AdminNavbar />}
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
        <Route path="/blog-detail/:slug" element={<BlogDetailPage />} />
        <Route path="/resource-detail/:id" element={<ResourceDetailPage />} />

        {/* Protected Visitor-Accessible Routes (Requires any login) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/podcast-detail/:id" element={<PodcastDetailPage />} />
        </Route>



        {/* Author Routes (Protected: Author or Admin) */}
        <Route element={<ProtectedRoute allowedRoles={['Author', 'Admin']} />}>
          <Route path="/author/home" element={<AuthorHome />} />
          <Route path="/author/about" element={<AuthorAbout />} />
          <Route path="/author/explore" element={<AuthorExplore />} />
          <Route path="/author/podcasts" element={<AuthorPodcasts />} />
          <Route path="/author/resources" element={<AuthorResources />} />
          <Route path="/author/contact" element={<AuthorContact />} />
          <Route path="/author/dashboard" element={<AuthorDashboard />} />
          <Route path="/author/write-post" element={<WritePost />} />
          <Route path="/author/edit-post/:id" element={<EditPost />} />
          <Route path="/author/my-blogs" element={<MyBlogs />} />
          <Route path="/author/dashboard/podcasts" element={<AuthorDashPodcasts />} />
          <Route path="/author/dashboard/resources" element={<AuthorDashResources />} />
          <Route path="/author/profile" element={<AuthorProfile />} />
          <Route path="/author/upload-podcast" element={<UploadPodcast />} />
          <Route path="/author/upload-resource" element={<UploadResource />} />
          <Route path="/author/edit-resource/:id" element={<AuthorDashEditResource />} />
          <Route path="/author/edit-podcast/:id" element={<AuthorDashEditPodcast />} />
        </Route>

        {/* Admin Routes (Protected: Admin Only) */}
        <Route element={<ProtectedRoute allowedRoles={['Admin']} />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/write-blog" element={<WriteBlog />} />
          <Route path="/admin/manage-users" element={<ManageUsers />} />
          <Route path="/admin/manage-blogs" element={<ManageBlogs />} />
          <Route path="/admin/manage-podcasts" element={<ManagePodcasts />} />
          <Route path="/admin/manage-resources" element={<ManageResources />} />
          <Route path="/admin/inquiries" element={<Inquiries />} />
          <Route path="/admin/edit-about" element={<EditAbout />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
          <Route path="/admin/home" element={<AdminHomePage />} />
          <Route path="/admin/explore" element={<AdminExplorePage />} />
          <Route path="/admin/podcasts" element={<AdminPodcastsPage />} />
          <Route path="/admin/resources" element={<AdminResourcesPage />} />
          <Route path="/admin/about" element={<AdminAboutPage />} />
          <Route path="/admin/contact" element={<AdminContactPage />} />
        </Route>
      </Routes>
      {!hideNavFooter && <Footer />}
      {isAdminBackToHome && <AdminFooter />}
    </>
  )
}

export default App
