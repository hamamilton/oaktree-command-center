import { Trophy, ArrowUp, ArrowDown, Minus, User as UserIcon } from 'lucide-react';
import type { LeaderboardEntry } from '../../services/mockData';

interface LeaderboardTableProps {
    data: LeaderboardEntry[];
    currentUserId?: string;
}

const LeaderboardTable = ({ data, currentUserId }: LeaderboardTableProps) => {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const getRankIcon = (rank: number) => {
        if (rank === 1) return <Trophy className="text-yellow-400" size={20} fill="currentColor" />;
        if (rank === 2) return <Trophy className="text-gray-400" size={18} fill="currentColor" />;
        if (rank === 3) return <Trophy className="text-amber-600" size={16} fill="currentColor" />;
        return <span className="font-bold text-gray-400 w-5 text-center">{rank}</span>;
    };

    const getChangeIcon = (change: string) => {
        if (change === 'up') return <ArrowUp size={14} className="text-green-500" />;
        if (change === 'down') return <ArrowDown size={14} className="text-red-500" />;
        return <Minus size={14} className="text-gray-400" />;
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                        <tr className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700">
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Rank</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Volume</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Units</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                        {data.map((entry) => (
                            <tr
                                key={entry.id}
                                className={`
                  hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors
                  ${entry.id === currentUserId ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}
                `}
                            >
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 flex justify-center">
                                            {getRankIcon(entry.rank)}
                                        </div>
                                        {getChangeIcon(entry.change)}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-8 w-8">
                                            {entry.avatarUrl ? (
                                                <img className="h-8 w-8 rounded-full object-cover" src={entry.avatarUrl} alt="" />
                                            ) : (
                                                <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400">
                                                    <UserIcon size={16} />
                                                </div>
                                            )}
                                        </div>
                                        <div className="ml-4">
                                            <div className={`text-sm font-medium ${entry.id === currentUserId ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-gray-900 dark:text-white'}`}>
                                                {entry.name} {entry.id === currentUserId && '(You)'}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-semibold text-gray-900 dark:text-gray-200">
                                    {formatCurrency(entry.volume)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500 dark:text-gray-400">
                                    {entry.units}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LeaderboardTable;
