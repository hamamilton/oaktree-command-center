
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchResourceById } from '../services/mockData';
import type { Resource } from '../services/mockData';
import { ArrowLeft, Share2, Bookmark, PlayCircle, FileText, Link as LinkIcon } from 'lucide-react';

const ResourceDetail = () => {
    const { resourceId } = useParams<{ resourceId: string }>();
    const navigate = useNavigate();
    const [resource, setResource] = useState<Resource | undefined>(undefined);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            if (resourceId) {
                const data = await fetchResourceById(resourceId);
                setResource(data);
            }
            setLoading(false);
        };

        loadData();
    }, [resourceId]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full min-h-[50vh]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    if (!resource) {
        return (
            <div className="flex flex-col items-center justify-center h-full gap-4">
                <p className="text-gray-500">Resource not found</p>
                <button onClick={() => navigate(-1)} className="text-primary-600 hover:underline">Go Back</button>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                    <ArrowLeft size={20} className="text-gray-600 dark:text-gray-300" />
                </button>
                <div className="flex gap-2">
                    <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300">
                        <Bookmark size={20} />
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300">
                        <Share2 size={20} />
                    </button>
                </div>
            </div>

            <div className="flex-1 space-y-4">
                <span className="text-sm font-medium text-primary-600 dark:text-primary-400">{resource.category}</span>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">{resource.title}</h1>

                {/* Content Viewer Placeholder */}
                <div className="w-full aspect-video bg-gray-900 rounded-2xl flex flex-col items-center justify-center text-white relative overflow-hidden shadow-lg group cursor-pointer">
                    {resource.thumbnailUrl ? (
                        <>
                            <img src={resource.thumbnailUrl} alt="" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                                    {resource.type === 'Video' ? <PlayCircle size={32} fill="white" /> :
                                        resource.type === 'PDF' ? <FileText size={32} /> : <LinkIcon size={32} />}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center gap-2">
                            <PlayCircle size={48} />
                            <span className="text-sm font-medium">Click to Open {resource.type}</span>
                        </div>
                    )}
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Description</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                        This is a placeholder description for the resource. In a real application, this would contain a summary, key takeaways, and potential action items related to the content displayed above.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ResourceDetail;
