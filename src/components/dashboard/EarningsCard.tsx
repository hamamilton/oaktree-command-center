import { ArrowUpRight, DollarSign, TrendingUp } from 'lucide-react';
import type { EarningsData } from '../../services/mockData';
import { motion } from 'framer-motion';

interface EarningsCardProps {
    data: EarningsData;
}

const EarningsCard = ({ data }: EarningsCardProps) => {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>

            <div className="mb-6">
                <h2 className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wider mb-1">Month to Date Earnings</h2>
                <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">{formatCurrency(data.monthToDate)}</span>
                    <span className="flex items-center text-green-500 text-sm font-medium bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded-full">
                        <ArrowUpRight size={14} className="mr-1" />
                        +12%
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-xl">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                            <TrendingUp size={16} />
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">Projected</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{formatCurrency(data.projected)}</p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-xl">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="p-1.5 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
                            <DollarSign size={16} />
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">Rev Share</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{formatCurrency(data.revShare)}</p>
                </div>
            </div>
        </motion.div>
    );
};

export default EarningsCard;
