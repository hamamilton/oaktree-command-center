import { useState, useEffect } from 'react';
import { fetchTenantUsers, fetchTenantRoles, inviteUser, updateUserRole, deactivateUser } from '../services/tenantData';
import type { TenantUser, TenantRole } from '../services/tenantData';
import { ArrowLeft, UserPlus, MoreVertical, Mail, Shield, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const statusConfig = {
    active: { label: 'Active', icon: CheckCircle, className: 'text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400' },
    invited: { label: 'Invited', icon: Clock, className: 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-400' },
    deactivated: { label: 'Inactive', icon: XCircle, className: 'text-gray-400 bg-gray-100 dark:bg-gray-700 dark:text-gray-500' },
};

const UserManagement = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState<TenantUser[]>([]);
    const [roles, setRoles] = useState<TenantRole[]>([]);
    const [loading, setLoading] = useState(true);
    const [showInvite, setShowInvite] = useState(false);
    const [inviteForm, setInviteForm] = useState({ name: '', email: '', roleId: '' });
    const [inviting, setInviting] = useState(false);
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        Promise.all([fetchTenantUsers(), fetchTenantRoles()]).then(([u, r]) => {
            setUsers(u);
            setRoles(r);
            setInviteForm(f => ({ ...f, roleId: r.find(r => r.isDefault)?.id || r[0]?.id }));
            setLoading(false);
        });
    }, []);

    const handleInvite = async () => {
        if (!inviteForm.name || !inviteForm.email || !inviteForm.roleId) return;
        setInviting(true);
        const newUser = await inviteUser(inviteForm);
        setUsers(u => [...u, newUser]);
        setShowInvite(false);
        setInviteForm(f => ({ ...f, name: '', email: '' }));
        setInviting(false);
    };

    const handleRoleChange = async (userId: string, roleId: string) => {
        await updateUserRole(userId, roleId);
        setUsers(u => u.map(user => user.id === userId ? { ...user, roleId } : user));
    };

    const handleDeactivate = async (userId: string) => {
        await deactivateUser(userId);
        setUsers(u => u.map(user => user.id === userId ? { ...user, status: 'deactivated' as const } : user));
        setOpenMenuId(null);
    };

    const filtered = users.filter(u =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return (
        <div className="flex items-center justify-center h-full min-h-[50vh]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
    );

    return (
        <div className="space-y-5 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button onClick={() => navigate('/admin-portal')} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-xl font-bold text-gray-900 dark:text-white">User Management</h1>
                        <p className="text-sm text-gray-500">{users.filter(u => u.status === 'active').length} active · {users.filter(u => u.status === 'invited').length} invited</p>
                    </div>
                </div>
                <button
                    onClick={() => setShowInvite(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl shadow-sm transition-all"
                >
                    <UserPlus size={16} />
                    Invite User
                </button>
            </div>

            {/* Search */}
            <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white"
            />

            {/* Users List */}
            <div className="space-y-2">
                {filtered.map(user => {
                    const status = statusConfig[user.status];
                    const StatusIcon = status.icon;
                    return (
                        <div key={user.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 flex items-center gap-4 shadow-sm">
                            {/* Avatar */}
                            <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0 overflow-hidden">
                                {user.avatarUrl
                                    ? <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                                    : <span className="text-primary-700 dark:text-primary-300 font-bold text-sm">{user.name.charAt(0)}</span>
                                }
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-gray-900 dark:text-white text-sm truncate">{user.name}</p>
                                <div className="flex items-center gap-1 text-gray-400 text-xs">
                                    <Mail size={10} />
                                    <span className="truncate">{user.email}</span>
                                </div>
                            </div>

                            {/* Role Selector */}
                            <select
                                value={user.roleId}
                                onChange={e => handleRoleChange(user.id, e.target.value)}
                                disabled={user.status === 'deactivated'}
                                className="hidden md:block text-xs px-2 py-1 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-1 focus:ring-primary-500 disabled:opacity-40"
                            >
                                {roles.map(r => (
                                    <option key={r.id} value={r.id}>{r.name}</option>
                                ))}
                            </select>

                            {/* Status Badge */}
                            <span className={`hidden md:flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${status.className}`}>
                                <StatusIcon size={10} />
                                {status.label}
                            </span>

                            {/* Menu */}
                            <div className="relative">
                                <button
                                    onClick={() => setOpenMenuId(openMenuId === user.id ? null : user.id)}
                                    className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400"
                                >
                                    <MoreVertical size={16} />
                                </button>
                                {openMenuId === user.id && (
                                    <div className="absolute right-0 mt-1 w-44 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-xl z-10 py-1 text-sm">
                                        <div className="px-3 py-2 text-xs text-gray-400 font-medium uppercase tracking-wider border-b border-gray-100 dark:border-gray-700">
                                            Role
                                        </div>
                                        {roles.map(r => (
                                            <button key={r.id} onClick={() => { handleRoleChange(user.id, r.id); setOpenMenuId(null); }}
                                                className="w-full text-left px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                                {user.roleId === r.id && <Shield size={12} className="text-primary-600" />}
                                                <span className={user.roleId === r.id ? 'font-semibold' : ''}>{r.name}</span>
                                            </button>
                                        ))}
                                        <div className="border-t border-gray-100 dark:border-gray-700 mt-1">
                                            <button
                                                onClick={() => handleDeactivate(user.id)}
                                                disabled={user.status === 'deactivated'}
                                                className="w-full text-left px-3 py-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 disabled:opacity-40"
                                            >
                                                Deactivate
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Invite Modal */}
            {showInvite && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-4">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-4">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Invite New User</h2>

                        <div className="space-y-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                                <input type="text" placeholder="Jane Smith" value={inviteForm.name}
                                    onChange={e => setInviteForm(f => ({ ...f, name: e.target.value }))}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                                <input type="email" placeholder="jane@oaktree.com" value={inviteForm.email}
                                    onChange={e => setInviteForm(f => ({ ...f, email: e.target.value }))}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Role</label>
                                <select value={inviteForm.roleId} onChange={e => setInviteForm(f => ({ ...f, roleId: e.target.value }))}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                                    {roles.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                                </select>
                                {roles.find(r => r.id === inviteForm.roleId) && (
                                    <p className="text-xs text-gray-400 mt-1">{roles.find(r => r.id === inviteForm.roleId)?.description}</p>
                                )}
                            </div>
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button onClick={() => setShowInvite(false)} className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800">Cancel</button>
                            <button onClick={handleInvite} disabled={inviting || !inviteForm.name || !inviteForm.email}
                                className="flex-1 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 disabled:opacity-60 text-white text-sm font-semibold flex items-center justify-center gap-2">
                                <Mail size={14} />
                                {inviting ? 'Sending...' : 'Send Invite'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserManagement;
