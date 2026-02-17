
import { useState, useEffect } from 'react';
import { Sparkles, X, MessageSquare, ArrowRight } from 'lucide-react';
import { fetchAISuggestions } from '../../services/mockData';
import type { AISuggestion } from '../../services/mockData';
import { motion, AnimatePresence } from 'framer-motion';

const AICoach = () => {
    const [suggestions, setSuggestions] = useState<AISuggestion[]>([]);
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            const data = await fetchAISuggestions();
            setSuggestions(data);
        };
        loadData();
    }, []);

    if (!isOpen || suggestions.length === 0) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-5 text-white shadow-xl relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 p-2">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-white/70 hover:text-white transition-colors"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="flex items-start gap-4 z-10 relative">
                    <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                        <Sparkles size={24} className="text-yellow-300" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-lg mb-1">Coach Insight</h3>
                        <p className="text-indigo-100 text-sm mb-3">
                            {suggestions[0].text}
                        </p>
                        {suggestions[0].action && (
                            <button className="flex items-center gap-2 bg-white text-indigo-600 px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-indigo-50 transition-colors">
                                {suggestions[0].action}
                                <ArrowRight size={14} />
                            </button>
                        )}
                    </div>
                </div>

                {/* Mock Chat Input */}
                <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Ask me anything..."
                            className="w-full bg-black/20 border border-white/10 rounded-lg pl-3 pr-10 py-2 text-sm text-white placeholder-indigo-200 focus:outline-none focus:bg-black/30 transition-colors"
                        />
                        <button className="absolute right-2 top-1/2 -translate-y-1/2 text-indigo-200 hover:text-white">
                            <MessageSquare size={16} />
                        </button>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default AICoach;
