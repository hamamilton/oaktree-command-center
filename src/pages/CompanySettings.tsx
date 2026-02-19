import { useState, useEffect } from 'react';
import { fetchCompany, updateCompanySettings } from '../services/tenantData';
import type { Company } from '../services/tenantData';
import { ArrowLeft, Save, Upload, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CompanySettings = () => {
    const navigate = useNavigate();
    const [company, setCompany] = useState<Company | null>(null);
    const [form, setForm] = useState({ name: '', primaryColor: '', secondaryColor: '' });
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        fetchCompany().then(c => {
            setCompany(c);
            setForm({ name: c.name, primaryColor: c.primaryColor, secondaryColor: c.secondaryColor });
        });
    }, []);

    const handleSave = async () => {
        if (!company) return;
        setSaving(true);
        await updateCompanySettings(form);
        setSaving(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    };

    if (!company) return (
        <div className="flex items-center justify-center h-full min-h-[50vh]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
    );

    return (
        <div className="space-y-6 animate-fade-in max-w-xl">
            {/* Header */}
            <div className="flex items-center gap-3">
                <button onClick={() => navigate('/admin-portal')} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <ArrowLeft size={20} />
                </button>
                <div>
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">Company Settings</h1>
                    <p className="text-sm text-gray-500">Configure your company's branding and appearance</p>
                </div>
            </div>

            {/* Logo Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 space-y-4 shadow-sm">
                <h2 className="font-semibold text-gray-900 dark:text-white text-sm uppercase tracking-wider">Logo</h2>
                <div className="flex items-center gap-4">
                    <img
                        src={company.logoUrl}
                        alt={company.name}
                        className="w-16 h-16 rounded-xl object-cover border border-gray-200 dark:border-gray-700"
                    />
                    <div>
                        <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">{company.name}</p>
                        <p className="text-xs text-gray-400 mb-2">Recommended: 512×512 PNG</p>
                        <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline">
                            <Upload size={14} />
                            Upload new logo
                            <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    const url = URL.createObjectURL(file);
                                    setCompany(prev => prev ? { ...prev, logoUrl: url } : prev);
                                }
                            }} />
                        </label>
                    </div>
                </div>
            </div>

            {/* Company Name */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 space-y-4 shadow-sm">
                <h2 className="font-semibold text-gray-900 dark:text-white text-sm uppercase tracking-wider">Identity</h2>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company Name</label>
                    <input
                        type="text"
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Portal Domain</label>
                    <div className="flex items-center rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 overflow-hidden">
                        <span className="px-3 py-2 text-sm text-gray-400 border-r border-gray-200 dark:border-gray-700">app.buildu.com/</span>
                        <input
                            type="text"
                            defaultValue={company.slug}
                            className="flex-1 px-3 py-2 bg-transparent text-gray-900 dark:text-white text-sm focus:outline-none"
                            readOnly
                        />
                    </div>
                </div>
            </div>

            {/* Brand Colors */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 space-y-4 shadow-sm">
                <h2 className="font-semibold text-gray-900 dark:text-white text-sm uppercase tracking-wider">Brand Colors</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Primary Color</label>
                        <div className="flex items-center gap-2">
                            <input
                                type="color"
                                value={form.primaryColor}
                                onChange={e => setForm(f => ({ ...f, primaryColor: e.target.value }))}
                                className="w-10 h-10 rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer p-0.5"
                            />
                            <input
                                type="text"
                                value={form.primaryColor}
                                onChange={e => setForm(f => ({ ...f, primaryColor: e.target.value }))}
                                className="flex-1 px-2 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-sm font-mono focus:outline-none focus:ring-1 focus:ring-primary-500"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Secondary Color</label>
                        <div className="flex items-center gap-2">
                            <input
                                type="color"
                                value={form.secondaryColor}
                                onChange={e => setForm(f => ({ ...f, secondaryColor: e.target.value }))}
                                className="w-10 h-10 rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer p-0.5"
                            />
                            <input
                                type="text"
                                value={form.secondaryColor}
                                onChange={e => setForm(f => ({ ...f, secondaryColor: e.target.value }))}
                                className="flex-1 px-2 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-sm font-mono focus:outline-none focus:ring-1 focus:ring-primary-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Live Preview */}
                <div>
                    <p className="text-xs text-gray-400 mb-2 uppercase tracking-wider font-medium">Preview</p>
                    <div className="flex items-center gap-3">
                        <button
                            style={{ backgroundColor: form.primaryColor }}
                            className="px-4 py-2 rounded-lg text-white text-sm font-semibold shadow-sm"
                        >Primary Button</button>
                        <button
                            style={{ backgroundColor: form.secondaryColor }}
                            className="px-4 py-2 rounded-lg text-white text-sm font-semibold shadow-sm"
                        >Secondary</button>
                        <div
                            className="px-3 py-1 rounded-full text-white text-xs font-medium"
                            style={{ backgroundColor: form.primaryColor + 'cc' }}
                        >Badge</div>
                    </div>
                </div>
            </div>

            {/* Plan Badge */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 flex items-center justify-between shadow-sm">
                <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Current Plan</p>
                    <p className="text-xs text-gray-400">Manage billing and plan features</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400 text-xs font-bold uppercase tracking-wider capitalize">
                    {company.plan}
                </span>
            </div>

            {/* Save */}
            <button
                onClick={handleSave}
                disabled={saving}
                className="w-full py-3 rounded-xl bg-primary-600 hover:bg-primary-700 disabled:opacity-60 text-white font-semibold flex items-center justify-center gap-2 shadow-sm transition-all"
            >
                {saved ? <><CheckCircle size={18} />Saved!</> : saving ? 'Saving...' : <><Save size={18} />Save Changes</>}
            </button>
        </div>
    );
};

export default CompanySettings;
