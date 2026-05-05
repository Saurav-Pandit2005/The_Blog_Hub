import React, { useState, useEffect } from 'react';
import api from '../../api';
import './AddUsers.css';

function AddUsers({ isOpen, onClose, onUserAdded, editUser = null, triggerToast }) {
    const defaultData = { name: '', username: '', email: '', password: '', role: 'Visitor' };
    const [user, setUser] = useState(defaultData);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (editUser) {
            setUser({
                name: editUser.name,
                username: editUser.username,
                email: editUser.email,
                role: editUser.role,
                password: '' // Don't show password for security, only update if typed
            });
        } else {
            setUser(defaultData);
        }
    }, [editUser, isOpen]);

    const handleSaveUser = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            let res;
            if (editUser) {
                // Update existing user
                res = await api.put(`/admin/users/${editUser._id}`, user);
            } else {
                // Create new user
                res = await api.post('/admin/users', user);
            }
            
            if (res.data.success) {
                triggerToast(`User account ${editUser ? 'updated' : 'created'} successfully!`);
                onUserAdded(); // Refresh list
                onClose();
                setUser(defaultData);
            }
        } catch (err) {
            triggerToast(err.response?.data?.error || 'Operation failed', 'error');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="user-modal-card">
                <div className="modal-header">
                    <h2>{editUser ? 'Edit User Profile' : 'Create New User Account'}</h2>
                    <button className="close-modal" onClick={onClose} disabled={loading}>×</button>
                </div>
                <form onSubmit={handleSaveUser}>
                    <div className="modal-form-grid">
                        <div className="m-group">
                            <label>Full Name</label>
                            <input 
                                type="text" 
                                placeholder="e.g. Saurav Pandit" 
                                required
                                value={user.name}
                                onChange={(e) => setUser({...user, name: e.target.value})}
                            />
                        </div>
                        <div className="m-group">
                            <label>Username</label>
                            <input 
                                type="text" 
                                placeholder="e.g. saurav987" 
                                required
                                value={user.username}
                                onChange={(e) => setUser({...user, username: e.target.value})}
                            />
                        </div>
                        <div className="m-group">
                            <label>Email Address</label>
                            <input 
                                type="email" 
                                placeholder="e.g. saurav@bloghub.com" 
                                required
                                value={user.email}
                                onChange={(e) => setUser({...user, email: e.target.value})}
                            />
                        </div>
                        <div className="m-group">
                            <label>Assign Role</label>
                            <select value={user.role} onChange={(e) => setUser({...user, role: e.target.value})}>
                                <option value="Visitor">Viewer</option>
                                <option value="Author">Author</option>
                            </select>
                        </div>
                        {!editUser && (
                            <div className="m-group full-width">
                                <label>Set Initial Password</label>
                                <input 
                                    type="password" 
                                    placeholder="Min 6 characters" 
                                    required 
                                    value={user.password}
                                    onChange={(e) => setUser({...user, password: e.target.value})}
                                />
                            </div>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="cancel-btn" onClick={onClose} disabled={loading}>Cancel</button>
                        <button type="submit" className="confirm-add-btn" disabled={loading}>
                            {loading ? 'Processing...' : (editUser ? 'Save Changes' : 'Create User Account')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddUsers;
