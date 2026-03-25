import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Slidebar from '../Slidebar/Slidebar';
import './ManageUsers.css';
import adminProfileImg from '../../assets/Images/Admin/Profile/admin.jpg';
import AddUsers from './AddUsers';

function ManageUsers() {
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('All Roles');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = (e) => {
        e.stopPropagation();
        setIsDropdownOpen(!isDropdownOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const users = [
        { id: 1, name: 'Saurav Pandit', email: 'saurav@bloghub.com', role: 'Admin', status: 'Active', joined: 'Mar 10, 2024' },
        { id: 2, name: 'Rima Sah', email: 'rima@bloghub.com', role: 'Author', status: 'Active', joined: 'Mar 12, 2024' },
        { id: 3, name: 'Surja Bist', email: 'surja@bloghub.com', role: 'Author', status: 'Pending', joined: 'Mar 14, 2024' },
        { id: 4, name: 'John Doe', email: 'john@example.com', role: 'Visitor', status: 'Suspended', joined: 'Feb 20, 2024' },
        { id: 5, name: 'Alice Smith', email: 'alice@bloghub.com', role: 'Author', status: 'Active', joined: 'Jan 05, 2024' },
        { id: 6, name: 'Bob Wilson', email: 'bob@visitor.com', role: 'Visitor', status: 'Active', joined: 'Feb 28, 2024' },
    ];

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = roleFilter === 'All Roles' || user.role === roleFilter;
        return matchesSearch && matchesRole;
    });

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="manage-users-container">
            <Slidebar />

            <main className="manage-users-main">
                <header className="admin-header">
                    <div className="header-text">
                        <h1>Manage Platform Users</h1>
                        <p>Oversee roles, permissions, and account statuses.</p>
                    </div>
                    <div className="header-actions">
                        <div className="admin-profile-container" ref={dropdownRef}>
                            <div className="admin-profile-icon" onClick={toggleDropdown}>
                                <img src={adminProfileImg} alt="Admin Profile" />
                                <span className="status-online"></span>
                            </div>

                            {isDropdownOpen && (
                                <div className="admin-profile-dropdown">
                                    <Link to="/admin/profile" className="dropdown-item">👤 Profile</Link>
                                    <div className="dropdown-divider"></div>
                                    <Link to="/login" className="dropdown-item logout-item">🚪 Logout</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                <section className="users-stats-row">
                    <div className="user-mini-stat">
                        <span className="s-label">Total Users</span>
                        <h3 className="s-value">1,240</h3>
                    </div>
                    <div className="user-mini-stat">
                        <span className="s-label">Active Authors</span>
                        <h3 className="s-value">85</h3>
                    </div>
                    <div className="user-mini-stat pending">
                        <span className="s-label">Pending Approval</span>
                        <h3 className="s-value">12</h3>
                    </div>
                </section>

                <section className="users-list-card">
                    <div className="list-controls">
                        <div className="search-bar">
                            <span>🔍</span>
                            <input 
                                type="text" 
                                placeholder="Search by name or email..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <select 
                            className="role-select" 
                            value={roleFilter}
                            onChange={(e) => setRoleFilter(e.target.value)}
                        >
                            <option>All Roles</option>
                            <option>Admin</option>
                            <option>Author</option>
                            <option>Visitor</option>
                        </select>
                        <button className="add-user-btn" onClick={() => setIsModalOpen(true)}>+ Add New User</button>
                    </div>

                    <div className="table-responsive">
                        <table className="user-table">
                            <thead>
                                <tr>
                                    <th>User</th>
                                    <th>Role</th>
                                    <th>Joined Date</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map(user => (
                                    <tr key={user.id}>
                                        <td>
                                            <div className="user-info-cell">
                                                <img src={`https://ui-avatars.com/api/?name=${user.name}&background=random&color=fff`} alt="user" />
                                                <div className="u-meta">
                                                    <p className="u-name">{user.name}</p>
                                                    <p className="u-email">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className={`role-badge ${user.role.toLowerCase()}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td><span className="joined-date">{user.joined}</span></td>
                                        <td>
                                            <span className={`status-pill ${user.status.toLowerCase()}`}>
                                                {user.status}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="action-btns">
                                                <button className="t-btn edit" title="Edit">✏️</button>
                                                <button className="t-btn delete" title="Suspend">🚫</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>

            <AddUsers isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}

export default ManageUsers;
