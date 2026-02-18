
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchDeals, fetchUser, fetchTiers } from '../services/mockData';
import type { Deal, UserProfile, Tier } from '../services/mockData';
import { ArrowLeft, Search, Filter, DollarSign } from 'lucide-react';

const Pipeline = () => {
    const navigate = useNavigate();
    const [deals, setDeals] = useState<Deal[]>([]);
    const [user, setUser] = useState<UserProfile | null>(null);
    const [tiers, setTiers] = useState<Tier[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterStage, setFilterStage] = useState<string>('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [showPrivacy, setShowPrivacy] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [dealsData, userData, tiersData] = await Promise.all([
                    fetchDeals(),
                    fetchUser(),
                    fetchTiers()
                ]);
                setDeals(dealsData);
                setUser(userData);
                setTiers(tiersData);
            } catch (error) {
                console.error("Failed to load pipeline data", error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    // Find active tier BPS
    const activeTier = tiers.find(t => t.name === user?.tier);
    const userBps = activeTier?.commissionBps || 100; // Default to 100bps if not found

    const filteredDeals = deals.filter(d => {
        const matchesStage = filterStage === 'All' || d.stage === filterStage;
        const matchesSearch = d.borrowerName.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStage && matchesSearch;
    });

    // Calculate Metrics based on filtered view
    const totalDeals = filteredDeals.length;
    const totalVolume = filteredDeals.reduce((sum, d) => sum + d.loanAmount, 0);
    const totalCommission = filteredDeals.reduce((sum, d) => sum + (d.loanAmount * (userBps / 10000)), 0);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const stages = ['All', 'Application', 'Processing', 'Underwriting', 'Clear to Close'];

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full min-h-[50vh]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-4 animate-fade-in">
            <div className="flex items-center gap-2 mb-4">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                    <ArrowLeft size={20} className="text-gray-600 dark:text-gray-300" />
                </button>
                <span className="text-lg font-bold text-gray-900 dark:text-white">Pipeline</span>
            </div>

            {/* Metrics Bar */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                    <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Deals</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalDeals}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                    <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Volume</p>
                    <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">{formatCurrency(totalVolume)}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                    <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Est. Commission</p>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">{formatCurrency(totalCommission)}</p>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input
                        type="text"
                        placeholder="Search borrower..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 cursor-pointer select-none bg-white dark:bg-gray-800 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                        <input
                            type="checkbox"
                            checked={showPrivacy}
                            onChange={(e) => setShowPrivacy(e.target.checked)}
                            className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                        />
                        Privacy Mode
                    </label>

                    <button className="p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                        <Filter size={20} />
                    </button>
                </div>
            </div>

            {/* Horizontal Scroll Filter Chips */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {stages.map(stage => (
                    <button
                        key={stage}
                        onClick={() => setFilterStage(stage)}
                        className={`
              px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors
              ${filterStage === stage
                                ? 'bg-primary-600 text-white'
                                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'}
            `}
                    >
                        {stage}
                    </button>
                ))}
            </div>

            {/* Deal List */}
            <div className="space-y-2">
                {filteredDeals.map((deal) => (
                    <div
                        key={deal.id}
                        className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                    >
                        <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white text-base">
                                {showPrivacy ? 'Client #' + deal.id.substring(1) : deal.borrowerName}
                            </h4>
                            <div className="flex items-center gap-2 mt-1 flex-wrap">
                                <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                    {deal.address}, {deal.state}
                                </span>
                                <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">{deal.loanType}</span>
                                <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                <span className="text-xs font-medium text-primary-600 dark:text-primary-400 px-2 py-0.5 bg-primary-50 dark:bg-primary-900/30 rounded-full">
                                    {deal.stage}
                                </span>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="font-bold text-gray-900 dark:text-white text-sm">{formatCurrency(deal.loanAmount)}</p>
                            <div className="flex items-center justify-end gap-1 mt-1 text-green-600 dark:text-green-400 font-medium text-xs">
                                <DollarSign size={10} />
                                <span>{formatCurrency(deal.loanAmount * (userBps / 10000))}</span>
                                <span className="text-[10px] text-gray-400 ml-0.5">({userBps} bps)</span>
                            </div>
                            <p className="text-[10px] text-gray-400 mt-0.5">Close: {new Date(deal.closeDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</p>
                        </div>
                    </div>
                ))}
                {filteredDeals.length === 0 && (
                    <p className="text-center text-gray-500 py-8 text-sm">No deals found in this stage.</p>
                )}
            </div>
        </div>
    );
};

export default Pipeline;
