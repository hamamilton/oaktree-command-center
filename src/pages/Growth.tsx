
import { useEffect, useState } from 'react';
import { fetchResources } from '../services/mockData';
import type { Resource } from '../services/mockData';
import { PlayCircle, FileText, Link as LinkIcon, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Growth = () => {
    const [resources, setResources] = useState<Resource[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState<string>('All');
    const navigate = useNavigate();

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchResources();
                setResources(data);
            } catch (error) {
                console.error("Failed to load resources", error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    const filteredResources = activeCategory === 'All'
        ? resources
        : resources.filter(r => r.category === activeCategory);

    const categories = ['All', 'Training', 'Marketing', 'Scripts'];

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full min-h-[50vh]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Growth Hub</h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Tools and training to scale your business.</p>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {categories.map(category => (
                    <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`
              px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors
              ${activeCategory === category
                                ? 'bg-blue-600 text-white'
                                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}
            `}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredResources.map((resource) => (
                    <div
                        key={resource.id}
                        onClick={() => navigate(`/growth/${resource.id}`)}
                        className="group bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
                    >
                        <div className="flex gap-4">
                            <div className="w-20 h-20 rounded-xl bg-gray-100 dark:bg-gray-700 flex-shrink-0 overflow-hidden relative">
                                {resource.thumbnailUrl ? (
                                    <img src={resource.thumbnailUrl} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        {resource.type === 'Video' ? <PlayCircle size={24} /> :
                                            resource.type === 'PDF' ? <FileText size={24} /> : <LinkIcon size={24} />}
                                    </div>
                                )}
                                <div className="absolute top-1 left-1 bg-black/50 text-white text-[10px] px-1.5 py-0.5 rounded backdrop-blur-sm">
                                    {resource.type}
                                </div>
                            </div>

                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <span className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-1 block">{resource.category}</span>
                                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2 leading-snug">{resource.title}</h3>
                                </div>
                                <div className="flex justify-end mt-2">
                                    <button className="p-2 rounded-full bg-gray-50 dark:bg-gray-700/50 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        <Download size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Growth;
