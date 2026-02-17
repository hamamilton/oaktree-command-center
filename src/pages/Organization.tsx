
import { useEffect, useState } from 'react';
import { fetchOrgTree } from '../services/mockData';
import type { OrgNode } from '../services/mockData';
import OrgTreeNode from '../components/organization/OrgTreeNode';
import { Search, Filter } from 'lucide-react';

const Organization = () => {
    const [treeData, setTreeData] = useState<OrgNode | null>(null);
    const [loading, setLoading] = useState(true);

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
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Organization</h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Manage your downline and track performance.</p>
            </div>

            {/* Search and Filter Bar */}
            <div className="flex gap-2">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search team..."
                        className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                    />
                </div>
                <button className="p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <Filter size={20} />
                </button>
            </div>

            {/* Tree View */}
            <div className="p-1">
                {treeData ? (
                    <OrgTreeNode node={treeData} />
                ) : (
                    <div className="text-center py-10 text-gray-500">No organization data found.</div>
                )}
            </div>
        </div>
    );
};

export default Organization;
