import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchCompany, fetchTenantUsers, fetchTenantRoles } from '../services/tenantData';
import type { Company } from '../services/tenantData';
import { Settings, Users, Shield, ChevronRight, ExternalLink } from 'lucide-react';

const AdminPortal = () => {
    const navigate = useNavigate();
    const [company, setCompany] = useState<Company | null>(null);
    const [stats, setStats] = useState({ totalUsers: 0, activeUsers: 0, totalRoles: 0 });

    useEffect(() => {
        Promise.all([fetchCompany(), fetchTenantUsers(), fetchTenantRoles()]).then(([c, users, roles]) => {
            setCompany(c);
            setStats({
                totalUsers: users.length,
                activeUsers: users.filter(u => u.status === 'active').length,
                totalRoles: roles.length,
            });
        });
    }, []);

    const cards = [
        {
            title: 'Company Settings',
            description: 'Logo, branding colors, portal domain',
            icon: Settings,
            href: '/admin-portal/settings',
            color: 'from-primary-500 to-primary-700',
        },
        {
            title: 'User Management',
            description: `${stats.activeUsers} active · ${stats.totalUsers - stats.activeUsers} pending/inactive`,
            icon: Users,
            href: '/admin-portal/users',
            color: 'from-secondary-500 to-secondary-700',
        },
        {
            title: 'Role Manager',
            description: `${stats.totalRoles} roles · Custom permissions`,
            icon: Shield,
            href: '/admin-portal/roles',
            color: 'from-emerald-500 to-emerald-700',
        },
    ];

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl overflow-hidden shadow">
                    {company?.logoUrl && <img src={company.logoUrl} alt={company?.name} className="w-full h-full object-cover" />}
                </div>
                <div>
                    <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">{company?.name ?? '...'}</h1>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500 dark:text-gray-400">{company?.domain}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 font-semibold capitalize">{company?.plan}</span>
                    </div>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-3">
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 text-center shadow-sm">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalUsers}</p>
                    <p className="text-xs text-gray-500 mt-0.5">Total Users</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 text-center shadow-sm">
                    <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">{stats.activeUsers}</p>
                    <p className="text-xs text-gray-500 mt-0.5">Active</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 text-center shadow-sm">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalRoles}</p>
                    <p className="text-xs text-gray-500 mt-0.5">Roles</p>
                </div>
            </div>

            {/* Nav Cards */}
            <div className="space-y-3">
                <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Manage</p>
                {cards.map(card => {
                    const Icon = card.icon;
                    return (
                        <button
                            key={card.href}
                            onClick={() => navigate(card.href)}
                            className="w-full bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 flex items-center gap-4 shadow-sm hover:shadow-md hover:border-primary-200 dark:hover:border-primary-700 transition-all text-left"
                        >
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                                <Icon size={22} className="text-white" />
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold text-gray-900 dark:text-white">{card.title}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{card.description}</p>
                            </div>
                            <ChevronRight size={18} className="text-gray-300 dark:text-gray-600 flex-shrink-0" />
                        </button>
                    );
                })}
            </div>

            {/* Powered by BuildU */}
            <div className="flex flex-col items-center gap-2 pt-4">
                <p className="text-xs text-gray-400 uppercase tracking-widest">Powered by</p>
                <img src="/buildu-logo.png" alt="BuildU" className="h-5 opacity-50 hover:opacity-100 transition-opacity" />
                <a href="#" className="flex items-center gap-1 text-xs text-gray-400 hover:text-primary-600 transition-colors">
                    <ExternalLink size={10} />
                    BuildU Platform Docs
                </a>
            </div>
        </div>
    );
};

export default AdminPortal;
