import { useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldCheck, TrendingUp, Users } from 'lucide-react';

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center items-center p-6 transition-colors duration-200">
            <div className="max-w-md w-full text-center space-y-8 animate-fade-in">
                {/* Logo / Brand */}
                <div className="flex justify-center mb-6">
                    <div className="bg-primary-600 p-4 rounded-2xl shadow-lg shadow-primary-600/20">
                        <TrendingUp size={40} className="text-white" />
                    </div>
                </div>

                <div className="space-y-2">
                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                        Oaktree Command Center
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400">
                        The elite platform for modern loan officers.
                    </p>
                </div>

                {/* Feature Highlights */}
                <div className="grid grid-cols-2 gap-4 py-6">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
                        <TrendingUp className="mx-auto text-green-500 mb-2" size={24} />
                        <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Real Assets</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Track production</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
                        <Users className="mx-auto text-primary-500 mb-2" size={24} />
                        <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Grow Team</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Visual org chart</p>
                    </div>
                </div>

                {/* Actions */}
                <div className="space-y-4">
                    <button
                        onClick={() => navigate('/apply')}
                        className="w-full py-3.5 px-6 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold shadow-lg shadow-primary-600/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                        Apply to Join Oaktree
                        <ArrowRight size={18} />
                    </button>

                    <button
                        onClick={() => navigate('/dashboard')}
                        className="w-full py-3.5 px-6 rounded-xl bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold border border-gray-200 dark:border-gray-700 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                        <ShieldCheck size={18} />
                        Existing Member Login
                    </button>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                        By joining, you agree to our Terms of Service.
                    </p>
                </div>
            </div>

            <div className="absolute bottom-6 text-center">
                <p className="text-[10px] text-gray-300 dark:text-gray-600 uppercase tracking-widest font-semibold">
                    Powered by Oaktree Funding
                </p>
            </div>
        </div>
    );
};

export default Landing;
