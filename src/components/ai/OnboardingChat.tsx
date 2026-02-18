import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Sparkles, X } from 'lucide-react';

interface Message {
    id: string;
    sender: 'ai' | 'user';
    text: string;
    options?: string[];
}

const OnboardingChat = ({ onClose }: { onClose: () => void }) => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            sender: 'ai',
            text: "Welcome to Oaktree! I'm your AI Performance Coach. Let's build your custom roadmap to success. First, what is your primary income goal for the next 12 months?",
            options: ['$50k - $100k', '$100k - $250k', '$250k+', 'Maximize RevShare']
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSendMessage = (text: string) => {
        if (!text.trim()) return;

        // Add user message
        const userMsg: Message = {
            id: Date.now().toString(),
            sender: 'user',
            text: text
        };
        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        setIsTyping(true);

        // Simulate AI thinking and response based on message count (simple state machine)
        setTimeout(() => {
            let aiMsg: Message | null = null;
            const history = [...messages, userMsg];
            const userResponseCount = history.filter(m => m.sender === 'user').length;

            if (userResponseCount === 1) {
                aiMsg = {
                    id: 'ai-2',
                    sender: 'ai',
                    text: "Great goal. To help you hit that, where are you primarily doing business? (City/State)",
                };
            } else if (userResponseCount === 2) {
                aiMsg = {
                    id: 'ai-3',
                    sender: 'ai',
                    text: "Got it. And how aggressively do you want to ramp up? Are you looking for a steady build or 'fast track' mode?",
                    options: ['Steady Build (Part-time)', 'Standard Ramp (Full-time)', 'Fast Track (All-in)']
                };
            } else if (userResponseCount === 3) {
                aiMsg = {
                    id: 'ai-4',
                    sender: 'ai',
                    text: "Perfect. I've analyzed your profile and goals. Here is your custom 30-60-90 Day Plan:",
                };
            }

            if (aiMsg) {
                setMessages(prev => [...prev, aiMsg!]);
            }
            setIsTyping(false);
        }, 1200);
    };

    const renderPlan = () => (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm"
        >
            <div className="flex items-center gap-2 mb-3 text-blue-600 dark:text-blue-400 font-bold">
                <Sparkles size={18} />
                <h3>Your 90-Day Roadmap</h3>
            </div>
            <div className="space-y-4 text-sm">
                <div className="relative pl-4 border-l-2 border-green-200 dark:border-green-900">
                    <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Days 1-30</span>
                    <p className="font-medium text-gray-900 dark:text-white">Foundation & Licensing</p>
                    <ul className="mt-1 space-y-1 text-gray-600 dark:text-gray-400 list-disc list-inside text-xs">
                        <li>Complete Oaktree Academy modules 1-3.</li>
                        <li>Set up your social media profiles.</li>
                        <li>Submit your first 3 leads.</li>
                    </ul>
                </div>
                <div className="relative pl-4 border-l-2 border-blue-200 dark:border-blue-900">
                    <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Days 31-60</span>
                    <p className="font-medium text-gray-900 dark:text-white">Momentum & Networking</p>
                    <ul className="mt-1 space-y-1 text-gray-600 dark:text-gray-400 list-disc list-inside text-xs">
                        <li>Host your first homebuyer webinar.</li>
                        <li>Connect with 10 local realtors.</li>
                        <li>Close your first 2 deals.</li>
                    </ul>
                </div>
                <div className="relative pl-4 border-l-2 border-purple-200 dark:border-purple-900">
                    <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-purple-500"></div>
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Days 61-90</span>
                    <p className="font-medium text-gray-900 dark:text-white">Scale & Recruit</p>
                    <ul className="mt-1 space-y-1 text-gray-600 dark:text-gray-400 list-disc list-inside text-xs">
                        <li>Hit Tier 2 production volume.</li>
                        <li>Recruit your first 2 junior agents.</li>
                        <li>Automate your follow-up campaigns.</li>
                    </ul>
                </div>
            </div>
            <button
                onClick={onClose}
                className="mt-4 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
                Start Executing Plan
            </button>
        </motion.div>
    );

    const isPlanReady = messages.some(m => m.id === 'ai-4');

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
            >
                {/* Header */}
                <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
                            <Sparkles className="text-white" size={20} />
                        </div>
                        <div>
                            <h2 className="font-bold text-gray-900 dark:text-white text-sm">Oaktree AI Coach</h2>
                            <p className="text-xs text-green-500 font-medium flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                Online
                            </p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                        <X size={20} />
                    </button>
                </div>

                {/* Chat Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 dark:bg-gray-900/50">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`
                                max-w-[80%] rounded-2xl p-3 text-sm
                                ${msg.sender === 'user'
                                    ? 'bg-blue-600 text-white rounded-br-none'
                                    : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-sm border border-gray-100 dark:border-gray-700 rounded-bl-none'}
                            `}>
                                <p>{msg.text}</p>
                                {msg.options && (
                                    <div className="mt-3 space-y-2">
                                        {msg.options.map(opt => (
                                            <button
                                                key={opt}
                                                onClick={() => handleSendMessage(opt)}
                                                className="block w-full text-left px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 text-xs font-medium transition-colors border border-gray-200 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800"
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}

                    {isTyping && (
                        <div className="flex justify-start">
                            <div className="bg-white dark:bg-gray-800 rounded-2xl p-3 shadow-sm border border-gray-100 dark:border-gray-700 rounded-bl-none flex gap-1">
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                            </div>
                        </div>
                    )}

                    {isPlanReady && renderPlan()}

                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area - Hide if plan is ready or using options */}
                {!isPlanReady && (
                    <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
                        <form
                            onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputValue); }}
                            className="flex items-center gap-2"
                        >
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Type your answer..."
                                className="flex-1 bg-gray-100 dark:bg-gray-900 border-0 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 dark:text-white"
                            />
                            <button
                                type="submit"
                                disabled={!inputValue.trim() || isTyping}
                                className="p-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <Send size={18} />
                            </button>
                        </form>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default OnboardingChat;
