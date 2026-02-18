import { Link } from 'react-router-dom';
import type { PipelineStage } from '../../services/mockData';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface PipelineSnapshotProps {
    data: PipelineStage[];
}

const PipelineSnapshot = ({ data }: PipelineSnapshotProps) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 h-full">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Pipeline Snapshot</h3>
                <Link to="/pipeline" className="text-sm text-primary-600 dark:text-primary-400 font-medium hover:underline flex items-center">
                    View All <ChevronRight size={14} />
                </Link>
            </div>

            <div className="space-y-3">
                {data.map((stage, index) => (
                    <motion.div
                        key={stage.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex justify-between items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl transition-colors cursor-pointer group"
                    >
                        <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-primary-500' : index === 1 ? 'bg-secondary-500' : 'bg-secondary-500'}`}></div>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{stage.name}</span>
                        </div>
                        <div className="text-right">
                            <span className="block text-sm font-bold text-gray-900 dark:text-white">{stage.count}</span>
                            {stage.volume > 0 && (
                                <span className="block text-xs text-gray-400">${(stage.volume / 1000).toFixed(0)}k</span>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default PipelineSnapshot;
