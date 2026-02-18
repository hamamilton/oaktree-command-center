
import { useEffect, useState } from 'react';
import { fetchCompanyStats } from '../services/mockData';
import type { CompanyStats } from '../services/mockData';
import { TrendingUp, Users, DollarSign, Activity, AlertTriangle, Settings, Lock, Unlock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const Admin = () => {
    const [stats, setStats] = useState<CompanyStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchCompanyStats();
                setStats(data);
            } catch (error) {
                console.error("Failed to load company stats", error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    const formatCurrency = (amount: number) => {
        if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
        if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}k`;
        return `$${amount}`;
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full min-h-[50vh]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    if (!stats) return <div>No data available</div>;

    const recruitmentData = stats.recruitmentTrend.map((val, i) => ({
        month: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'][i],
        recruits: val
    }));

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Corporate Dashboard</h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Company-wide performance and controls.</p>
                </div>
                <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                    <Settings size={20} />
                </button>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-xs text-gray-500 font-medium">Total Volume YTD</span>
                        <Activity size={16} className="text-primary-500" />
                    </div>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">{formatCurrency(stats.totalVolumeYTD)}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-xs text-gray-500 font-medium">Active LOs</span>
                        <Users size={16} className="text-secondary-500" />
                    </div>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">{stats.activeLOs}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-xs text-gray-500 font-medium">RevShare Liability</span>
                        <DollarSign size={16} className="text-red-500" />
                    </div>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">{formatCurrency(stats.revShareLiability)}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-xs text-gray-500 font-medium">Recruits MTD</span>
                        <TrendingUp size={16} className="text-green-500" />
                    </div>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">+{stats.newRecruitsMTD}</p>
                </div>
            </div>

            {/* Growth Velocity Chart */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Growth Velocity (New Recruits)</h3>
                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={recruitmentData}>
                            <XAxis dataKey="month" stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#F3F4F6' }}
                                itemStyle={{ color: '#F3F4F6' }}
                                cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                            />
                            <Bar dataKey="recruits" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* At-Risk Signal */}
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl border border-red-100 dark:border-red-900/50 flex items-start gap-3">
                <AlertTriangle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
                <div>
                    <h4 className="text-sm font-semibold text-red-700 dark:text-red-400">Attrition Risk Detected</h4>
                    <p className="text-xs text-red-600 dark:text-red-300 mt-1">3 Top Producers have experienced a &gt;20% volume drop-off in the last 30 days. Investigate pipeline health.</p>
                </div>
            </div>

            {/* Admin Controls */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Feature Controls</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                        <div className="flex items-center gap-3">
                            <Lock size={18} className="text-gray-500" />
                            <div className="text-sm">
                                <p className="font-medium text-gray-900 dark:text-white">Tier Locking</p>
                                <p className="text-gray-500 text-xs">Prevent users from unlocking new tiers manually</p>
                            </div>
                        </div>
                        <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary-600">
                            <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition" />
                        </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                        <div className="flex items-center gap-3">
                            <Unlock size={18} className="text-gray-500" />
                            <div className="text-sm">
                                <p className="font-medium text-gray-900 dark:text-white">Beta Features</p>
                                <p className="text-gray-500 text-xs">Enable AI Coach for all users</p>
                            </div>
                        </div>
                        <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-700">
                            <span className="translate-x-1 inline-block h-4 w-4 transform rounded-full bg-white transition" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;
