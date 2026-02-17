import { TrendingUp, FileText, Clock, BarChart3 } from 'lucide-react';
import type { ProductionStats } from '../../services/mockData';

interface StatGridProps {
    stats: ProductionStats;
}

const StatGrid = ({ stats }: StatGridProps) => {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const items = [
        {
            label: 'YTD Volume',
            value: formatCurrency(stats.totalVolumeYTD),
            icon: BarChart3,
            color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
        },
        {
            label: 'YTD Units',
            value: stats.totalUnitsYTD,
            icon: FileText,
            color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
        },
        {
            label: 'Avg Loan Size',
            value: formatCurrency(stats.avgLoanSize),
            icon: TrendingUp,
            color: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
        },
        {
            label: 'Avg Cycle Time',
            value: `${stats.avgCycleTime} Days`,
            icon: Clock,
            color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400',
        },
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {items.map((item, index) => (
                <div
                    key={index}
                    className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700"
                >
                    <div className={`p-2 rounded-lg w-fit mb-3 ${item.color}`}>
                        <item.icon size={20} />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{item.label}</p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">{item.value}</p>
                </div>
            ))}
        </div>
    );
};

export default StatGrid;
