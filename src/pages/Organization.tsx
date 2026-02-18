
import { useEffect, useState } from 'react';
import { fetchOrgTree } from '../services/mockData';
import type { OrgNode } from '../services/mockData';
import OrgTreeNode from '../components/organization/OrgTreeNode';
import OrgChart from '../components/organization/OrgChart';
import { Search, List, Network } from 'lucide-react';

const Organization = () => {
    const [treeData, setTreeData] = useState<OrgNode | null>(null);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState<'list' | 'chart'>('list');

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchOrgTree();
                setTreeData(data);
            } catch (error) {
                console.error("Failed to load org tree", error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full min-h-[50vh]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Organization</h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Manage your downline and track performance.</p>
            </div>

            {/* View Toggle & Filter */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white dark:bg-gray-800 p-3 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex bg-gray-100 dark:bg-gray-700 p-1 rounded-xl">
                    <button
                        onClick={() => setViewMode('list')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${viewMode === 'list'
                            ? 'bg-white dark:bg-gray-600 text-primary-600 dark:text-primary-300 shadow-sm'
                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                            }`}
                        title="List View"
                    >
                        <List size={18} />
                    </button>
                    <button
                        onClick={() => setViewMode('chart')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${viewMode === 'chart'
                            ? 'bg-white dark:bg-gray-600 text-primary-600 dark:text-primary-300 shadow-sm'
                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                            }`}
                        title="Chart View"
                    >
                        <Network size={18} />
                    </button>
                </div>

                <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input
                        type="text"
                        placeholder="Search team..."
                        className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white"
                    />
                </div>
            </div>

            {/* Content View */}
            <div className="min-h-[400px]">
                {treeData ? (
                    viewMode === 'list' ? (
                        <OrgTreeNode node={treeData} />
                    ) : (
                        <OrgChart node={treeData} />
                    )
                ) : (
                    <div className="text-center py-10 text-gray-500">No organization data found.</div>
                )}
            </div>
        </div>
    );
};

export default Organization;
