import { useEffect, useState } from 'react';
import {
  fetchEarnings,
  fetchPipeline,
  fetchUser
} from '../services/mockData';
import type {
  EarningsData,
  PipelineStage,
  UserProfile
} from '../services/mockData';
import EarningsCard from '../components/dashboard/EarningsCard';
import ProgressBar from '../components/dashboard/ProgressBar';
import PipelineSnapshot from '../components/dashboard/PipelineSnapshot';
import AICoach from '../components/ai/AICoach';
import OnboardingChat from '../components/ai/OnboardingChat';

const Dashboard = () => {
  const [earnings, setEarnings] = useState<EarningsData | null>(null);
  const [pipeline, setPipeline] = useState<PipelineStage[]>([]);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    // Check for first-time login
    const hasOnboarded = localStorage.getItem('oaktree_onboarding_complete');
    if (!hasOnboarded) {
      setTimeout(() => setShowOnboarding(true), 1500);
    }

    const loadData = async () => {
      try {
        const [earningsData, pipelineData, userData] = await Promise.all([
          fetchEarnings(),
          fetchPipeline(),
          fetchUser()
        ]);
        setEarnings(earningsData);
        setPipeline(pipelineData);
        setUser(userData);
      } catch (error) {
        console.error("Failed to load dashboard data", error);
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
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Hello, {user?.name.split(' ')[0]}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Here is what's happening today.</p>
        </div>
        <div className="bg-white dark:bg-gray-800 px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700 text-xs font-medium text-gray-600 dark:text-gray-300">
          {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
        </div>
      </div>

      <AICoach />

      {earnings && <EarningsCard data={earnings} />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <ProgressBar
            label="Progress to Diamond Tier"
            current={earnings?.yearToDate || 0}
            target={250000}
          />
          {/* Placeholder for future widgets */}
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
            <h3 className="font-bold text-lg mb-2">Recruit a Friend</h3>
            <p className="text-indigo-100 text-sm mb-4">Earn up to 50bps on their production.</p>
            <button className="bg-white text-indigo-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-50 transition-colors w-full">
              Copy Referral Link
            </button>
          </div>
        </div>

        <div>
          <PipelineSnapshot data={pipeline} />
        </div>
      </div>

      {showOnboarding && <OnboardingChat onClose={() => {
        setShowOnboarding(false);
        localStorage.setItem('oaktree_onboarding_complete', 'true');
      }} />}
    </div>
  );
};

export default Dashboard;
