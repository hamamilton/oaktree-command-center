import { useState, useEffect } from 'react';
import { fetchTenantRoles, createRole, updateRole, deleteRole, ALL_PERMISSIONS } from '../services/tenantData';
import type { TenantRole, PermissionKey } from '../services/tenantData';
import { ArrowLeft, Plus, Trash2, ChevronDown, ChevronUp, Shield, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Group permissions by category
const PERMISSION_GROUPS = ALL_PERMISSIONS.reduce((acc, p) => {
    if (!acc[p.category]) acc[p.category] = [];
    acc[p.category].push(p);
    return acc;
}, {} as Record<string, typeof ALL_PERMISSIONS>);

const RoleEditor = ({ role, onSave, onClose }: {
    role: Partial<TenantRole> | null;
    onSave: (r: TenantRole) => void;
    onClose: () => void;
}) => {
    const isNew = !role?.id;
    const [name, setName] = useState(role?.name ?? '');
    const [description, setDescription] = useState(role?.description ?? '');
    const [permissions, setPermissions] = useState<Set<PermissionKey>>(new Set(role?.permissions ?? []));
    const [expandedCategory, setExpandedCategory] = useState<string | null>('Dashboard');
    const [saving, setSaving] = useState(false);

    const togglePerm = (key: PermissionKey) => {
        setPermissions(prev => {
            const next = new Set(prev);
            next.has(key) ? next.delete(key) : next.add(key);
            return next;
        });
    };

    const toggleCategory = (cat: string) => {
        const catPerms = PERMISSION_GROUPS[cat].map(p => p.key);
        const allOn = catPerms.every(k => permissions.has(k));
        setPermissions(prev => {
            const next = new Set(prev);
            catPerms.forEach(k => allOn ? next.delete(k) : next.add(k));
            return next;
        });
    };

    const handleSave = async () => {
        if (!name.trim()) return;
        setSaving(true);
        const payload = { name, description, permissions: Array.from(permissions), isDefault: false };
        const result = isNew
            ? await createRole(payload)
            : await updateRole(role!.id!, payload);
        onSave(result);
        setSaving(false);
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="p-5 border-b border-gray-100 dark:border-gray-800">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">{isNew ? 'Create New Role' : `Edit: ${role?.name}`}</h2>
                    <div className="mt-3 space-y-2">
                        <input type="text" placeholder="Role name (e.g. Senior Processor)" value={name}
                            onChange={e => setName(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
                        <input type="text" placeholder="Short description" value={description}
                            onChange={e => setDescription(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
                    </div>
                </div>

                {/* Permissions */}
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                    <p className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-3">{permissions.size} permissions selected</p>
                    {Object.entries(PERMISSION_GROUPS).map(([cat, perms]) => {
                        const allOn = perms.every(p => permissions.has(p.key));
                        const someOn = perms.some(p => permissions.has(p.key));
                        const isExpanded = expandedCategory === cat;
                        return (
                            <div key={cat} className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                                <button
                                    className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                    onClick={() => setExpandedCategory(isExpanded ? null : cat)}
                                >
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); toggleCategory(cat); }}
                                            className={`w-5 h-5 rounded flex items-center justify-center border-2 transition-colors ${allOn ? 'bg-primary-600 border-primary-600' : someOn ? 'bg-primary-200 border-primary-400 dark:bg-primary-900 dark:border-primary-500' : 'border-gray-300 dark:border-gray-600'}`}
                                        >
                                            {allOn && <Check size={12} className="text-white" strokeWidth={3} />}
                                            {someOn && !allOn && <div className="w-2 h-2 bg-primary-600 rounded-sm" />}
                                        </button>
                                        <span className="font-semibold text-gray-900 dark:text-white text-sm">{cat}</span>
                                        <span className="text-xs text-gray-400">{perms.filter(p => permissions.has(p.key)).length}/{perms.length}</span>
                                    </div>
                                    {isExpanded ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                                </button>
                                {isExpanded && (
                                    <div className="divide-y divide-gray-100 dark:divide-gray-800">
                                        {perms.map(p => (
                                            <label key={p.key} className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer">
                                                <input type="checkbox" checked={permissions.has(p.key)} onChange={() => togglePerm(p.key)}
                                                    className="w-4 h-4 rounded text-primary-600 focus:ring-primary-500" />
                                                <span className="text-sm text-gray-700 dark:text-gray-300">{p.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-100 dark:border-gray-800 flex gap-3">
                    <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-sm font-medium">Cancel</button>
                    <button onClick={handleSave} disabled={saving || !name.trim()}
                        className="flex-1 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 disabled:opacity-60 text-white text-sm font-semibold">
                        {saving ? 'Saving...' : isNew ? 'Create Role' : 'Save Changes'}
                    </button>
                </div>
            </div>
        </div>
    );
};

const RoleManager = () => {
    const navigate = useNavigate();
    const [roles, setRoles] = useState<TenantRole[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingRole, setEditingRole] = useState<Partial<TenantRole> | null | 'new'>(null);

    useEffect(() => {
        fetchTenantRoles().then(r => { setRoles(r); setLoading(false); });
    }, []);

    const handleSave = (saved: TenantRole) => {
        setRoles(prev => {
            const idx = prev.findIndex(r => r.id === saved.id);
            if (idx !== -1) {
                const next = [...prev];
                next[idx] = saved;
                return next;
            }
            return [...prev, saved];
        });
        setEditingRole(null);
    };

    const handleDelete = async (roleId: string) => {
        await deleteRole(roleId);
        setRoles(prev => prev.filter(r => r.id !== roleId));
    };

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
                        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Role Manager</h1>
                        <p className="text-sm text-gray-500">{roles.length} roles defined</p>
                    </div>
                </div>
                <button
                    onClick={() => setEditingRole('new')}
                    className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl shadow-sm transition-all"
                >
                    <Plus size={16} />
                    New Role
                </button>
            </div>

            {/* Roles List */}
            <div className="space-y-3">
                {roles.map(role => (
                    <div key={role.id} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm">
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
                                    <Shield size={20} className="text-primary-600 dark:text-primary-400" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-semibold text-gray-900 dark:text-white">{role.name}</h3>
                                        {role.isDefault && (
                                            <span className="text-xs px-1.5 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400">Default</span>
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{role.description}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                                <button
                                    onClick={() => setEditingRole(role)}
                                    className="px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
                                >Edit</button>
                                <button
                                    onClick={() => handleDelete(role.id)}
                                    disabled={role.isDefault || role.name === 'Super Admin'}
                                    className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </div>

                        {/* Permission count + user count */}
                        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                            <span className="text-xs text-gray-500">{role.permissions.length} permissions</span>
                            <span className="w-1 h-1 rounded-full bg-gray-300" />
                            <span className="text-xs text-gray-500">{role.userCount} users</span>
                            <div className="flex gap-1 flex-wrap ml-auto">
                                {/* Show category badges for permissions */}
                                {[...new Set(ALL_PERMISSIONS.filter(p => role.permissions.includes(p.key)).map(p => p.category))].slice(0, 3).map(cat => (
                                    <span key={cat} className="text-[10px] px-1.5 py-0.5 rounded-full bg-secondary-50 text-secondary-700 dark:bg-secondary-900/20 dark:text-secondary-400 font-medium">
                                        {cat}
                                    </span>
                                ))}
                                {[...new Set(ALL_PERMISSIONS.filter(p => role.permissions.includes(p.key)).map(p => p.category))].length > 3 && (
                                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-400">
                                        +{[...new Set(ALL_PERMISSIONS.filter(p => role.permissions.includes(p.key)).map(p => p.category))].length - 3} more
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Role Editor Modal */}
            {editingRole !== null && (
                <RoleEditor
                    role={editingRole === 'new' ? null : editingRole}
                    onSave={handleSave}
                    onClose={() => setEditingRole(null)}
                />
            )}
        </div>
    );
};

export default RoleManager;
