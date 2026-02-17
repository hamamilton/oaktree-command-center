import { useEffect, useState } from 'react';
import { fetchCommunityFeed } from '../services/mockData';
import type { CommunityPost } from '../services/mockData';
import { Heart, MessageCircle, Share2, Megaphone, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';
import ReferralModal from '../components/community/ReferralModal';

const Community = () => {
    const [posts, setPosts] = useState<CommunityPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [isReferralModalOpen, setIsReferralModalOpen] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchCommunityFeed();
                setPosts(data);
            } catch (error) {
                console.error("Failed to load community feed", error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full min-h-[50vh]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in max-w-2xl mx-auto pb-20">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Community</h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Celebrate wins and stay updated.</p>
                </div>
                <button
                    onClick={() => setIsReferralModalOpen(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-lg shadow-blue-500/20"
                >
                    <UserPlus size={18} />
                    Send Referral
                </button>
            </div>

            <div className="space-y-4">
                {posts.map((post, index) => (
                    <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700"
                    >
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0">
                                {post.author.avatarUrl ? (
                                    <img src={post.author.avatarUrl} alt={post.author.name} className="w-10 h-10 rounded-full object-cover" />
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                                        {post.author.name.charAt(0)}
                                    </div>
                                )}
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                            {post.author.name}
                                            {post.type === 'announcement' && (
                                                <span className="bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wide font-bold flex items-center gap-1">
                                                    <Megaphone size={10} /> Official
                                                </span>
                                            )}
                                        </h3>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{post.timestamp}</p>
                                    </div>
                                </div>

                                <p className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed">
                                    {post.content}
                                </p>

                                <div className="flex items-center gap-6 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                                    <button className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-red-500 transition-colors text-sm">
                                        <Heart size={18} />
                                        <span>{post.likes}</span>
                                    </button>
                                    <button className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors text-sm">
                                        <MessageCircle size={18} />
                                        <span>Comment</span>
                                    </button>
                                    <button className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-green-500 transition-colors text-sm ml-auto">
                                        <Share2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <ReferralModal isOpen={isReferralModalOpen} onClose={() => setIsReferralModalOpen(false)} />
        </div>
    );
};

export default Community;
