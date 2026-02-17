import { Lock, Unlock, CheckCircle } from 'lucide-react';
import type { Tier } from '../../services/mockData';
import { motion } from 'framer-motion';

interface TierStackProps {
    tiers: Tier[];
}

const TierStack = ({ tiers }: TierStackProps) => {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <div className="space-y-4">
            {tiers.map((tier, index) => {
                const isLocked = tier.status === 'locked';
                const isCompleted = tier.status === 'completed';
                const isActive = tier.status === 'active';

                return (
                    <motion.div
                        key={tier.level}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`
              relative overflow-hidden rounded-2xl border transition-all duration-300
              ${isActive ? 'bg-gradient-to-r from-blue-600 to-indigo-700 border-transparent shadow-lg scale-105 z-10' : ''}
              ${isCompleted ? 'bg-white dark:bg-gray-800 border-green-200 dark:border-green-900/30' : ''}
              ${isLocked ? 'bg-gray-100 dark:bg-gray-900 border-gray-200 dark:border-gray-800 opacity-70' : ''}
            `}
                    >
                        <div className="p-5 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg
                  ${isActive ? 'bg-white text-blue-600' : ''}
                  ${isCompleted ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : ''}
                  ${isLocked ? 'bg-gray-200 dark:bg-gray-800 text-gray-500' : ''}
                `}>
                                    {tier.level}
                                </div>
                                <div>
                                    <h3 className={`font-bold ${isActive ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                                        {tier.name}
                                    </h3>
                                    <p className={`text-sm ${isActive ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'}`}>
                                        {isLocked ? 'Locked' : (tier.earnings > 0 ? `Earned: ${formatCurrency(tier.earnings)}` : 'In Progress')}
                                    </p>
                                </div>
                            </div>

                            <div>
                                {isCompleted && <CheckCircle className="text-green-500" size={24} />}
                                {isLocked && <Lock className="text-gray-400 dark:text-gray-600" size={24} />}
                                {isActive && <Unlock className="text-blue-200" size={24} />}
                            </div>
                        </div>

                        {/* Progress Bar for Active Tier */}
                        {isActive && (
                            <div className="px-5 pb-5">
                                <div className="space-y-3">
                                    {tier.requirements.map((req, i) => (
                                        <div key={i}>
                                            <div className="flex justify-between text-xs text-blue-100 mb-1">
                                                <span>{req.description}</span>
                                                <span>{req.type === 'volume' || req.type === 'org_volume' ? formatCurrency(req.current) : req.current} / {req.type === 'volume' || req.type === 'org_volume' ? formatCurrency(req.target) : req.target}</span>
                                            </div>
                                            <div className="h-2 bg-blue-900/30 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-white/90 rounded-full"
                                                    style={{ width: `${Math.min((req.current / req.target) * 100, 100)}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {tier.nextUnlock && (
                                    <div className="mt-4 p-3 bg-white/10 rounded-lg backdrop-blur-sm border border-white/10">
                                        <p className="text-xs font-medium text-blue-100 uppercase tracking-wider mb-1">Unlocks Next</p>
                                        <p className="text-sm font-semibold text-white">{tier.nextUnlock}</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </motion.div>
                );
            })}
        </div>
    );
};

export default TierStack;
