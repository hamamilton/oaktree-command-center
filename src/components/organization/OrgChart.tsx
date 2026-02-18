import { useState } from 'react';
import { User, ChevronDown, ChevronUp } from 'lucide-react';
import type { OrgNode } from '../../services/mockData';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface OrgChartProps {
    node: OrgNode;
}

const OrgChartNode = ({ node }: { node: OrgNode }) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const navigate = useNavigate();
    const hasChildren = node.children && node.children.length > 0;

    const formatCurrency = (amount: number) => {
        if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
        if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}k`;
        return `$${amount}`;
    };

    return (
        <div className="flex flex-col items-center">
            <div
                className={`
                    relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
                    rounded-xl p-3 shadow-sm hover:shadow-md transition-all cursor-pointer w-48
                    ${node.status === 'Active' ? 'border-l-4 border-l-green-500' : 'border-l-4 border-l-gray-300'}
                `}
                onClick={() => navigate(`/profile/${node.id}`)}
            >
                <div className="flex items-center gap-3 mb-2">
                    {node.avatarUrl ? (
                        <img src={node.avatarUrl} alt={node.name} className="w-10 h-10 rounded-full object-cover" />
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                            <User size={18} />
                        </div>
                    )}
                    <div className="overflow-hidden">
                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm truncate">{node.name}</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{node.role}</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400">Volume</span>
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{formatCurrency(node.mtdProduction)}</span>
                    </div>
                    {node.revShareContribution > 0 && (
                        <div className="flex flex-col">
                            <span className="text-[10px] text-gray-400">RevShare</span>
                            <span className="text-xs font-medium text-green-600 dark:text-green-400">+{formatCurrency(node.revShareContribution)}</span>
                        </div>
                    )}
                </div>

                {hasChildren && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsExpanded(!isExpanded);
                        }}
                        className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-full p-0.5 shadow-sm text-gray-500 hover:text-blue-500 z-10"
                    >
                        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                )}
            </div>

            <AnimatePresence>
                {isExpanded && hasChildren && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex flex-col items-center"
                    >
                        <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
                        <div className="flex items-start gap-4 pt-4 border-t border-gray-300 dark:border-gray-600 relative">
                            {/* Connector adjustment handled by flex gap/margin logic implicitly for simple trees, 
                                but strict tree lines usually require more complex CSS. 
                                For this MVP, we use a simple flex layout. */}
                            {node.children?.map((child) => (
                                <div key={child.id} className="flex flex-col items-center relative">
                                    {/* Vertical line from sibling bar to child */}
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 h-4 w-px bg-gray-300 dark:bg-gray-600"></div>
                                    <OrgChartNode node={child} />
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const OrgChart = ({ node }: OrgChartProps) => {
    return (
        <div className="overflow-x-auto pb-10 pt-4">
            <div className="min-w-max flex justify-center">
                <OrgChartNode node={node} />
            </div>
        </div>
    );
};

export default OrgChart;
