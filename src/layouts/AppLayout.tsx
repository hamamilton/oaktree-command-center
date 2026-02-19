
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, TrendingUp, User, Users, Zap, BookOpen } from 'lucide-react';

const AppLayout = () => {
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
            {/* Header */}
            <header className="bg-white dark:bg-gray-800 shadow-sm p-4 sticky top-0 z-10 transition-colors">
                <div className="flex justify-between items-center max-w-7xl mx-auto w-full">
                    <div className="flex items-center gap-2">
                        <img src="/icon-192.png" alt="Oaktree" className="w-8 h-8 rounded-lg" />
                        <span className="font-bold text-xl text-gray-900 dark:text-white tracking-tight">Oaktree</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-primary-500 transition-all">
                                <User size={20} className="text-gray-600 dark:text-gray-300" />
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 p-4 pb-28 md:pb-6 max-w-7xl mx-auto w-full">
                <Outlet />
            </main>

            {/* Mobile Bottom Navigation - Expanded for Phase 3 */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 pb-safe z-50 px-2">
                <div className="flex justify-between items-center h-16 max-w-md mx-auto">
                    <Link
                        to="/"
                        className={`flex flex-col items-center justify-center flex-1 h-full min-w-[50px] ${isActive('/') ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
                            }`}
                    >
                        <Home size={22} strokeWidth={isActive('/') ? 2.5 : 2} />
                        {/* <span className="text-[10px] mt-1 font-medium">Home</span> */}
                    </Link>

                    <Link
                        to="/production"
                        className={`flex flex-col items-center justify-center flex-1 h-full min-w-[50px] ${isActive('/production') ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
                            }`}
                    >
                        <TrendingUp size={22} strokeWidth={isActive('/production') ? 2.5 : 2} />
                    </Link>

                    <Link
                        to="/community"
                        className={`flex flex-col items-center justify-center flex-1 h-full min-w-[50px] ${isActive('/community') ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
                            }`}
                    >
                        {/* Center prominent button for Community/Feed */}
                        <div className={`
              w-12 h-12 rounded-2xl flex items-center justify-center mb-4 border-4 border-gray-50 dark:border-gray-900 shadow-lg
              ${isActive('/community')
                                ? 'bg-gradient-to-br from-primary-500 to-secondary-600 text-white'
                                : 'bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-300'}
            `}>
                            <Zap size={24} fill={isActive('/community') ? "currentColor" : "none"} />
                        </div>
                    </Link>

                    <Link
                        to="/organization"
                        className={`flex flex-col items-center justify-center flex-1 h-full min-w-[50px] ${isActive('/organization') ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
                            }`}
                    >
                        <Users size={22} strokeWidth={isActive('/organization') ? 2.5 : 2} />
                    </Link>

                    <Link
                        to="/growth"
                        className={`flex flex-col items-center justify-center flex-1 h-full min-w-[50px] ${isActive('/growth') ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
                            }`}
                    >
                        <BookOpen size={22} strokeWidth={isActive('/growth') ? 2.5 : 2} />
                    </Link>
                </div>
            </nav>

            {/* Desktop Sidebar could go here */}
        </div>
    );
};

export default AppLayout;
