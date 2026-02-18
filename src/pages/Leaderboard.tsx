
import { useEffect, useState } from 'react';
import { fetchLeaderboard, fetchUser } from '../services/mockData';
import type { LeaderboardEntry } from '../services/mockData';
import LeaderboardTable from '../components/leaderboard/LeaderboardTable';

const Leaderboard = () => {
    const [data, setData] = useState<LeaderboardEntry[]>([]);
    const [currentUserId, setCurrentUserId] = useState<string>('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [leaderboardData, userData] = await Promise.all([
                    fetchLeaderboard(),
                    fetchUser()
                ]);
                setData(leaderboardData);
                setCurrentUserId(userData.id);
            } catch (error) {
                console.error("Failed to load leaderboard data", error);
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
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Leaderboard</h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Top performers for this month.</p>
                </div>

                <div className="flex gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg self-start">
                    <button className="px-4 py-1.5 bg-white dark:bg-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-900 dark:text-white">
                        Volume
                    </button>
                    <button className="px-4 py-1.5 text-gray-500 dark:text-gray-400 text-sm font-medium hover:text-gray-900 dark:hover:text-white transition-colors">
                        Units
                    </button>
                    <button className="px-4 py-1.5 text-gray-500 dark:text-gray-400 text-sm font-medium hover:text-gray-900 dark:hover:text-white transition-colors">
                        Recruiting
                    </button>
                </div>
            </div>

            <LeaderboardTable data={data} currentUserId={currentUserId} />
        </div>
    );
};

export default Leaderboard;
