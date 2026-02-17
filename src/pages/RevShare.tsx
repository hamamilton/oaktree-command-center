
import { useEffect, useState } from 'react';
import { fetchTiers } from '../services/mockData';
import type { Tier } from '../services/mockData';
import TierStack from '../components/revshare/TierStack';

const RevShare = () => {
    const [tiers, setTiers] = useState<Tier[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchTiers();
                setTiers(data);
            } catch (error) {
                console.error("Failed to load tiers", error);
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
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Revenue Share</h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Track your tier progress and unlock bonuses.</p>
            </div>

            <TierStack tiers={tiers} />

            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white shadow-lg">
                <h3 className="font-bold text-lg mb-2">Earnings Disclaimer</h3>
                <p className="text-gray-400 text-xs leading-relaxed">
                    Revenue share figures are estimates based on closed production within your downline. Actual payouts may vary based on policy requirements and active status.
                </p>
            </div>
        </div>
    );
};

export default RevShare;
