import { motion } from 'framer-motion';

interface ProgressBarProps {
    current: number;
    target: number;
    label: string;
}

const ProgressBar = ({ current, target, label }: ProgressBarProps) => {
    const percentage = Math.min(Math.round((current / target) * 100), 100);

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex justify-between items-end mb-2">
                <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</h3>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                        {percentage}% <span className="text-sm font-normal text-gray-400">to Next Tier</span>
                    </p>
                </div>
                <span className="text-xs text-gray-400 font-mono">
                    ${(current / 1000).toFixed(0)}k / ${(target / 1000).toFixed(0)}k
                </span>
            </div>

            <div className="h-3 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                />
            </div>
        </div>
    );
};

export default ProgressBar;
