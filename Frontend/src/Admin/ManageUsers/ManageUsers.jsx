import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Slidebar from '../Slidebar/Slidebar';
import api from '../../api';
import './ManageUsers.css';
import adminProfileImg from '../../assets/Images/Admin/Profile/admin.jpg';
import AddUsers from './AddUsers';
import { Search, Plus, Filter, User as UserIcon, Mail, Calendar, ShieldAlert, Trash2, Edit2, Users as UsersIcon, PenTool, ChevronDown } from 'lucide-react';
import { UserContext } from '../../context/UserContext';

function ManageUsers() {
    const { user } = useContext(UserContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('All Roles');
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const res = await api.get('/admin/users');
            if (res.data.success) {
                setUsers(res.data.data);
            }
        } catch (err) {
            console.error('Error fetching users:', err);
        } finally {
            setLoading(false);
        }
    };

    const filteredUsers = users.filter(user => {
        const matchesSearch = (user.name || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
                             (user.email || '').toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = roleFilter === 'All Roles' || user.role === roleFilter;
        // Exclude Admin from management list
        return matchesSearch && matchesRole && user.role !== 'Admin';
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleEditUser = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    const handleDeleteUser = async (userId) => {
        if(window.confirm('Are you sure you want to delete this user?')) {
            try {
                const res = await api.delete(`/admin/users/${userId}`);
                if (res.data.success) {
                    alert('User Deleted!');
                    fetchUsers();
                }
            } catch (err) {
                alert(err.response?.data?.error || 'Error deleting user');
            }
        }
    };

    return (
        <div className="manage-users-container">
            <Slidebar />

            <main className="manage-users-main">
                <header className="admin-header">
                    <div className="header-text">
                        <span className="breadcrumb">Platform Ecosystem</span>
                        <h1>User Database Hub</h1>
                        <p>Manage community members, moderate author roles, and monitor account registrations.</p>
                    </div>
                    <div className="header-actions">
                        <div className="header-date">
                            <Calendar size={16} color="var(--admin-accent)" style={{marginRight: '10px'}} />
                            <span className="live-clock">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                        </div>
                        <div className="admin-profile-container" onClick={() => navigate('/admin/profile')}>
                            <div className="admin-profile-icon">
                                <img src={user?.profilePic || adminProfileImg} alt="Admin Profile" />
                                <span className="status-online"></span>
                            </div>
                        </div>
                    </div>
                </header>

                <section className="users-overview-stats">
                    <div className="overview-card total" style={{cursor:'pointer'}} onClick={() => setRoleFilter('All Roles')}>
                        <div className="over-icon"><UsersIcon size={24} /></div>
                        <div className="over-details">
                            <span className="over-label">Total Registered</span>
                            <h3 className="over-value">{users.filter(u => u.role !== 'Admin').length}</h3>
                        </div>
                    </div>
                    <div className="overview-card authors" style={{cursor:'pointer'}} onClick={() => setRoleFilter('Author')}>
                        <div className="over-icon"><PenTool size={20} /></div>
                        <div className="over-details">
                            <span className="over-label">Total Authors</span>
                            <h3 className="over-value">{users.filter(u => u.role === 'Author').length}</h3>
                        </div>
                    </div>
                    <div className="overview-card visitors" style={{cursor:'pointer'}} onClick={() => setRoleFilter('Visitor')}>
                        <div className="over-icon"><UserIcon size={20} /></div>
                        <div className="over-details">
                            <span className="over-label">Total Viewers</span>
                            <h3 className="over-value">{users.filter(u => u.role === 'Visitor').length}</h3>
                        </div>
                    </div>
                </section>

                <section className="users-management-hub">
                    <div className="hub-controls">
                        <div className="search-wrapper">
                            <Search size={18} className="search-i" />
                            <input 
                                type="text" 
                                placeholder="Search users by name or credentials..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="hub-actions">
                            <div className="filter-select-box">
                                <Filter size={16} className="filter-i" />
                                <select 
                                    value={roleFilter}
                                    onChange={(e) => setRoleFilter(e.target.value)}
                                >
                                    <option>All Roles</option>
                                    <option>Author</option>
                                    <option value="Visitor">Viewer</option>
                                </select>
                                <ChevronDown size={14} className="chevron-i" />
                            </div>
                            <button className="premium-add-btn" onClick={() => setIsModalOpen(true)}>
                                <Plus size={18} /> Add User
                            </button>
                        </div>
                    </div>

                    <div className="users-grid-display">
                        {loading ? (
                            <div className="sync-pulse">Syncing user database...</div>
                        ) : filteredUsers.length > 0 ? (
                            filteredUsers.map(user => (
                                <div className="user-profile-card" key={user._id}>
                                    <div className="card-top">
                                        <div className={`role-tag ${user.role.toLowerCase()}`}>
                                            {user.role === 'Visitor' ? 'Viewer' : user.role}
                                        </div>
                                        <div className="user-options-trigger">...</div>
                                    </div>
                                    
                                    <div className="card-body">
                                        <div className="avatar-preview">
                                            <img src={user.profilePic || `https://ui-avatars.com/api/?name=${user.name}&background=eff6ff&color=3b82f6`} alt="user" />
                                            {user.role === 'Admin' && <ShieldAlert size={14} className="admin-warn-icon" />}
                                        </div>
                                        <h4 className="user-name-display">{user.name}</h4>
                                        <p className="user-email-display"><Mail size={12} /> {user.email}</p>
                                    </div>

                                    <div className="card-footer">
                                        <div className="joined-info">
                                            <Calendar size={12} />
                                            <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
                                        </div>
                                        <div className="action-row">
                                            <button 
                                                className="act-btn edit-at" 
                                                title="Edit Profile"
                                                onClick={() => handleEditUser(user)}
                                            ><Edit2 size={16} /></button>
                                            <button 
                                                className="act-btn delete-at" 
                                                title="Delete Account"
                                                onClick={() => handleDeleteUser(user._id)}
                                            ><Trash2 size={16} /></button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="empty-results">No users found matching your criteria.</div>
                        )}
                    </div>
                </section>
            </main>

            <AddUsers 
                isOpen={isModalOpen} 
                onClose={handleCloseModal} 
                onUserAdded={fetchUsers} 
                editUser={selectedUser}
            />
        </div>
    );
}

export default ManageUsers;
