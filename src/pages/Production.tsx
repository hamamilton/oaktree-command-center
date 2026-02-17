
import { useEffect, useState } from 'react';
import {
    fetchProductionHistory,
    fetchProductionStats,
} from '../services/mockData';
import type { ProductionHistoryItem, ProductionStats } from '../services/mockData';
import VolumeChart from '../components/production/VolumeChart';
import StatGrid from '../components/production/StatGrid';

const Production = () => {
    const [history, setHistory] = useState<ProductionHistoryItem[]>([]);
    const [stats, setStats] = useState<ProductionStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [historyData, statsData] = await Promise.all([
                    fetchProductionHistory(),
                    fetchProductionStats()
                ]);
                setHistory(historyData);
                setStats(statsData);
            } catch (error) {
                console.error("Failed to load production data", error);
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
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Production Analytics</h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Detailed view of your loan performance.</p>
            </div>

            {stats && <StatGrid stats={stats} />}

            {history.length > 0 && <VolumeChart data={history} />}

            {/* Placeholder for Deal List */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Deals</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                    Deal list table to be implemented in Phase 2.
                </p>
            </div>
        </div>
    );
};

export default Production;
