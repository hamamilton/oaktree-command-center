import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle, User, Briefcase, Target, Loader2 } from 'lucide-react';
import { updateUserProfile } from '../services/mockData';

const Apply = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        nmls: '',
        role: 'Loan Officer',
        experience: 'Less than 1 year',
        incomeGoal: '$100,000+',
    });

    const updateField = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleNext = () => {
        if (step < 3) setStep(step + 1);
        else handleSubmit();
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
        else navigate('/');
    };

    const handleSubmit = async () => {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Update mock data with new user name
        const fullName = `${formData.firstName} ${formData.lastName}`;
        updateUserProfile({ name: fullName, role: formData.role }); // Simplified update

        setLoading(false);
        setStep(4); // Success step
    };

    // Step Components
    const renderStep1 = () => (
        <div className="space-y-4 animate-fade-in">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Let's get to know you.</h2>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">First Name</label>
                    <input
                        type="text"
                        value={formData.firstName}
                        onChange={e => updateField('firstName', e.target.value)}
                        className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
                        placeholder="Jane"
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Last Name</label>
                    <input
                        type="text"
                        value={formData.lastName}
                        onChange={e => updateField('lastName', e.target.value)}
                        className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
                        placeholder="Doe"
                    />
                </div>
            </div>
            <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Email Address</label>
                <input
                    type="email"
                    value={formData.email}
                    onChange={e => updateField('email', e.target.value)}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
                    placeholder="jane@example.com"
                />
            </div>
            <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Phone Number</label>
                <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => updateField('phone', e.target.value)}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
                    placeholder="(555) 123-4567"
                />
            </div>
        </div>
    );

    const renderStep2 = () => (
        <div className="space-y-4 animate-fade-in">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Professional Details.</h2>
            <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">NMLS ID (Optional)</label>
                <input
                    type="text"
                    value={formData.nmls}
                    onChange={e => updateField('nmls', e.target.value)}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
                    placeholder="123456"
                />
            </div>
            <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Role</label>
                <select
                    value={formData.role}
                    onChange={e => updateField('role', e.target.value)}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white appearance-none"
                >
                    <option>Loan Officer</option>
                    <option>Recruiting Agent</option>
                    <option>Hybrid (LO + Agent)</option>
                    <option>Team Leader</option>
                </select>
            </div>
            <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Experience</label>
                <select
                    value={formData.experience}
                    onChange={e => updateField('experience', e.target.value)}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white appearance-none"
                >
                    <option>Less than 1 year</option>
                    <option>1-2 years</option>
                    <option>3-5 years</option>
                    <option>5+ years</option>
                </select>
            </div>
        </div>
    );

    const renderStep3 = () => (
        <div className="space-y-4 animate-fade-in">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Set your targets.</h2>
            <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Annual Income Goal</label>
                <select
                    value={formData.incomeGoal}
                    onChange={e => updateField('incomeGoal', e.target.value)}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white appearance-none"
                >
                    <option>$50,000 - $100,000</option>
                    <option>$100,000 - $250,000</option>
                    <option>$250,000 - $500,000</option>
                    <option>$500,000+</option>
                </select>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-900/50">
                <p className="text-sm text-blue-800 dark:text-blue-300">
                    "I am committed to following the Oaktree system to achieve my goals."
                </p>
                <div className="mt-3 flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="text-xs text-gray-600 dark:text-gray-400">I agree to the Oaktree Partner Agreement</span>
                </div>
            </div>
        </div>
    );

    const renderSuccess = () => (
        <div className="text-center space-y-6 animate-fade-in py-10">
            <div className="flex justify-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400">
                    <CheckCircle size={32} />
                </div>
            </div>
            <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome to Oaktree!</h2>
                <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-xs mx-auto">
                    Your application has been approved. Your profile is ready.
                </p>
            </div>
            <button
                onClick={() => navigate('/dashboard')}
                className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg shadow-blue-600/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
                Go to Command Center
                <ArrowRight size={18} />
            </button>
        </div>
    );

    if (step === 4) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-6">
                <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
                    {renderSuccess()}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col p-6 transition-colors duration-200">
            {/* Header */}
            <div className="flex items-center justify-between mb-8 max-w-md w-full mx-auto">
                <button onClick={handleBack} className="p-2 -ml-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                    <ArrowLeft size={20} />
                </button>
                <div className="flex gap-1">
                    {[1, 2, 3].map(i => (
                        <div key={i} className={`h-1.5 w-8 rounded-full transition-colors ${i <= step ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`} />
                    ))}
                </div>
                <div className="w-8" /> {/* Spacer */}
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col max-w-md w-full mx-auto">
                {/* Step Icon */}
                <div className="mb-6">
                    <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-sm">
                        {step === 1 && <User size={24} />}
                        {step === 2 && <Briefcase size={24} />}
                        {step === 3 && <Target size={24} />}
                    </div>
                </div>

                <div className="flex-1">
                    {step === 1 && renderStep1()}
                    {step === 2 && renderStep2()}
                    {step === 3 && renderStep3()}
                </div>

                {/* Footer Actions */}
                <div className="mt-8">
                    <button
                        onClick={handleNext}
                        disabled={loading}
                        className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg shadow-blue-600/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? <Loader2 className="animate-spin" size={20} /> : (
                            <>
                                {step === 3 ? 'Submit Application' : 'Continue'}
                                <ArrowRight size={18} />
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Apply;
