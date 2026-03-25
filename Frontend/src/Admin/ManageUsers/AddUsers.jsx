import React, { useState } from 'react';
import './AddUsers.css';

function AddUsers({ isOpen, onClose }) {
    const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Visitor', status: 'Active' });

    const handleAddUser = (e) => {
        e.preventDefault();
        alert(`User ${newUser.name} created successfully!`);
        onClose();
        setNewUser({ name: '', email: '', role: 'Visitor', status: 'Active' });
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="user-modal-card">
                <div className="modal-header">
                    <h2>Create New User Account</h2>
                    <button className="close-modal" onClick={onClose}>×</button>
                </div>
                <form onSubmit={handleAddUser}>
                    <div className="modal-form-grid">
                        <div className="m-group">
                            <label>Full Name</label>
                            <input 
                                type="text" 
                                placeholder="e.g. Saurav Pandit" 
                                required
                                value={newUser.name}
                                onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                            />
                        </div>
                        <div className="m-group">
                            <label>Email Address</label>
                            <input 
                                type="email" 
                                placeholder="e.g. saurav@bloghub.com" 
                                required
                                value={newUser.email}
                                onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                            />
                        </div>
                        <div className="m-group">
                            <label>Assign Role</label>
                            <select value={newUser.role} onChange={(e) => setNewUser({...newUser, role: e.target.value})}>
                                <option>Visitor</option>
                                <option>Author</option>
                                <option>Admin</option>
                            </select>
                        </div>
                        <div className="m-group">
                            <label>Initial Status</label>
                            <select value={newUser.status} onChange={(e) => setNewUser({...newUser, status: e.target.value})}>
                                <option>Active</option>
                                <option>Pending</option>
                            </select>
                        </div>
                        <div className="m-group full-width">
                            <label>Set Initial Password</label>
                            <div className="password-wrap">
                                <input type="password" placeholder="Min 8 characters" required />
                                <button type="button" className="gen-btn">Generate</button>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
                        <button type="submit" className="confirm-add-btn">Create User Account</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddUsers;
