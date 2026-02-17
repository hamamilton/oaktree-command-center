
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchUserById } from '../services/mockData';
import type { UserProfile } from '../services/mockData';
import { ArrowLeft, User, Phone, Mail, MessageSquare, Award } from 'lucide-react';

const Profile = () => {
    const { userId } = useParams<{ userId: string }>();
    const navigate = useNavigate();
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            if (userId) {
                const userData = await fetchUserById(userId);
                setUser(userData);
            }
            setLoading(false);
        };

        loadData();
    }, [userId]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full min-h-[50vh]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center h-full gap-4">
                <p className="text-gray-500">User not found</p>
                <button onClick={() => navigate(-1)} className="text-blue-600 hover:underline">Go Back</button>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header with Back Button */}
            <div className="flex items-center gap-2">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                    <ArrowLeft size={20} className="text-gray-600 dark:text-gray-300" />
                </button>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Profile View</span>
            </div>

            {/* Profile Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-4 overflow-hidden border-4 border-white dark:border-gray-700 shadow-md">
                    {user.avatarUrl ? (
                        <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                        <User size={40} className="text-gray-400" />
                    )}
                </div>

                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{user.name}</h1>
                <p className="text-gray-500 dark:text-gray-400 mb-2">{user.role}</p>

                <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full text-blue-700 dark:text-blue-300 text-sm font-medium mb-6">
                    <Award size={14} />
                    {user.tier} Tier
                </div>

                {/* Demo Toggle */}
                <button
                    onClick={() => navigate('/admin')}
                    className="mb-6 text-xs text-gray-500 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                    Switch to Admin View (Demo)
                </button>

                {/* Action Buttons */}
                <div className="flex gap-4 w-full justify-center">
                    <button className="flex flex-col items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group">
                        <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 transition-colors">
                            <Phone size={18} />
                        </div>
                        <span className="text-xs">Call</span>
                    </button>
                    <button className="flex flex-col items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group">
                        <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 transition-colors">
                            <MessageSquare size={18} />
                        </div>
                        <span className="text-xs">Message</span>
                    </button>
                    <button className="flex flex-col items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group">
                        <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 transition-colors">
                            <Mail size={18} />
                        </div>
                        <span className="text-xs">Email</span>
                    </button>
                </div>
            </div>

            {/* Mini Stats (Mocked for now as we don't have per-user stats in MOCK_DATA other than MTD) */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                    <p className="text-xs text-gray-500 mb-1">MTD Volume</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">$1.2M</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                    <p className="text-xs text-gray-500 mb-1">YTD Volume</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">$14.5M</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
