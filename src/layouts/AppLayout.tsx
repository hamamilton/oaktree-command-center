import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, TrendingUp, User, Users, Zap, BookOpen, BarChart2, Settings, Shield } from 'lucide-react';

const NAV_ITEMS = [
    { to: '/dashboard', icon: Home, label: 'Dashboard' },
    { to: '/pipeline', icon: BarChart2, label: 'Pipeline' },
    { to: '/production', icon: TrendingUp, label: 'Production' },
    { to: '/organization', icon: Users, label: 'Organization' },
    { to: '/community', icon: Zap, label: 'Community' },
    { to: '/growth', icon: BookOpen, label: 'Growth Hub' },
    { to: '/admin-portal', icon: Shield, label: 'Admin Portal' },
];

// Mobile nav shows a curated 5 items (most used)
const MOBILE_NAV = [
    { to: '/dashboard', icon: Home, label: 'Home' },
    { to: '/production', icon: TrendingUp, label: 'Production' },
    { to: '/community', icon: Zap, label: 'Community', prominent: true },
    { to: '/organization', icon: Users, label: 'Org' },
    { to: '/growth', icon: BookOpen, label: 'Growth' },
];

const AppLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = (path: string) =>
        location.pathname === path || location.pathname.startsWith(path + '/');

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex">

            {/* ── Desktop / Tablet Sidebar ──────────────────────────────── */}
            <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 sticky top-0 h-screen flex-shrink-0">

                {/* Brand */}
                <div className="flex items-center gap-3 px-5 py-5 border-b border-gray-100 dark:border-gray-700">
                    <img src="/icon-192.png" alt="Oaktree" className="w-9 h-9 rounded-xl shadow-sm" />
                    <div>
                        <span className="font-bold text-base text-gray-900 dark:text-white tracking-tight block leading-tight">Oaktree</span>
                        <span className="text-[10px] text-gray-400 uppercase tracking-wider">Command Center</span>
                    </div>
                </div>

                {/* Nav Links */}
                <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
                    {NAV_ITEMS.map(({ to, icon: Icon, label }) => {
                        const active = isActive(to);
                        return (
                            <Link
                                key={to}
                                to={to}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group
                                    ${active
                                        ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400'
                                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white'
                                    }`}
                            >
                                <Icon
                                    size={18}
                                    strokeWidth={active ? 2.5 : 2}
                                    className={active ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'}
                                />
                                {label}
                                {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-500" />}
                            </Link>
                        );
                    })}
                </nav>

                {/* User Profile Footer */}
                <div className="border-t border-gray-100 dark:border-gray-700 p-3">
                    <button
                        onClick={() => navigate('/profile/current-user')}
                        className="w-full flex items-center gap-3 px-2 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                        <div className="w-9 h-9 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
                            <User size={18} className="text-primary-600 dark:text-primary-400" />
                        </div>
                        <div className="text-left">
                            <p className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">My Profile</p>
                            <p className="text-xs text-gray-400">Settings & account</p>
                        </div>
                        <Settings size={14} className="ml-auto text-gray-300 dark:text-gray-600" />
                    </button>
                    <div className="flex justify-center mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
                        <img src="/buildu-logo.png" alt="BuildU" className="h-4 opacity-40" />
                    </div>
                </div>
            </aside>

            {/* ── Main Content ────────────────────────────────────────── */}
            <div className="flex-1 flex flex-col min-w-0">

                {/* Mobile-only topbar */}
                <header className="md:hidden bg-white dark:bg-gray-800 shadow-sm px-4 py-3 sticky top-0 z-10 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <img src="/icon-192.png" alt="Oaktree" className="w-7 h-7 rounded-lg" />
                        <span className="font-bold text-base text-gray-900 dark:text-white tracking-tight">Oaktree</span>
                    </div>
                    <button
                        onClick={() => navigate('/profile/current-user')}
                        className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center"
                    >
                        <User size={18} className="text-gray-600 dark:text-gray-300" />
                    </button>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-4 md:p-6 pb-24 md:pb-8 max-w-5xl w-full mx-auto">
                    <Outlet />
                </main>
            </div>

            {/* ── Mobile Bottom Nav ────────────────────────────────────── */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-50 px-2 safe-area-bottom">
                <div className="flex justify-between items-center h-16 max-w-md mx-auto">
                    {MOBILE_NAV.map(({ to, icon: Icon, label, prominent }) => {
                        const active = isActive(to);
                        return (
                            <Link
                                key={to}
                                to={to}
                                className={`flex flex-col items-center justify-center flex-1 h-full min-w-[50px] gap-0.5
                                    ${active ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400 dark:text-gray-500'}`}
                            >
                                {prominent ? (
                                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center -mt-4 border-4 border-gray-50 dark:border-gray-900 shadow-lg
                                        ${active
                                            ? 'bg-gradient-to-br from-primary-500 to-secondary-600 text-white'
                                            : 'bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-300'
                                        }`}>
                                        <Icon size={22} fill={active ? 'currentColor' : 'none'} />
                                    </div>
                                ) : (
                                    <Icon size={22} strokeWidth={active ? 2.5 : 2} />
                                )}
                                {!prominent && <span className="text-[9px] font-medium leading-none">{label}</span>}
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </div>
    );
};

export default AppLayout;
