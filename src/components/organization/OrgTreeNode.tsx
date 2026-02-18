import { useState } from 'react';
import { ChevronDown, ChevronRight, User, DollarSign, Activity } from 'lucide-react';
import type { OrgNode } from '../../services/mockData';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface OrgNodeProps {
    node: OrgNode;
    level?: number;
}

const OrgTreeNode = ({ node, level = 0 }: OrgNodeProps) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const navigate = useNavigate();
    const hasChildren = node.children && node.children.length > 0;

    const formatCurrency = (amount: number) => {
        if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
        if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}k`;
        return `$${amount}`;
    };

    const handleNodeClick = (e: React.MouseEvent) => {
        // Prevent navigation if clicking expand button
        if ((e.target as HTMLElement).closest('button')) return;
        navigate(`/profile/${node.id}`);
    };

    return (
        <div className="select-none">
            <div
                onClick={handleNodeClick}
                className={`
          flex items-center p-3 rounded-xl mb-2 transition-colors border cursor-pointer
          ${level === 0 ? 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm' : ''}
          ${level > 0 ? 'bg-gray-50 dark:bg-gray-800/50 border-transparent hover:bg-gray-100 dark:hover:bg-gray-700' : ''}
        `}
                style={{ marginLeft: `${level * 16}px` }}
            >
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        hasChildren && setIsExpanded(!isExpanded);
                    }}
                    className={`mr-2 p-1 rounded-md text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors ${!hasChildren && 'invisible'}`}
                >
                    {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </button>

                <div className="flex-shrink-0 mr-3">
                    {node.avatarUrl ? (
                        <img src={node.avatarUrl} alt={node.name} className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-gray-700" />
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400">
                            <User size={20} />
                        </div>
                    )}
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                        <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white truncate hover:underline">{node.name}</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{node.role}</p>
                        </div>
                        <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${node.status === 'Active'
                                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                            }`}>
                            {node.status}
                        </span>
                    </div>

                    <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-300">
                            <Activity size={12} className="text-primary-500" />
                            <span>{formatCurrency(node.mtdProduction)} Vol</span>
                        </div>
                        {node.revShareContribution > 0 && (
                            <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-300">
                                <DollarSign size={12} className="text-green-500" />
                                <span>+{formatCurrency(node.revShareContribution)}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isExpanded && hasChildren && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {node.children?.map((child) => (
                            <OrgTreeNode key={child.id} node={child} level={level + 1} />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default OrgTreeNode;
