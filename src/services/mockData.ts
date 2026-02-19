
export interface UserProfile {
    id: string;
    name: string;
    role: string;
    tier: string; // e.g., 'Senior Loan Officer'
    avatarUrl?: string;
}

export interface EarningsData {
    monthToDate: number;
    yearToDate: number;
    lastMonth: number;
    projected: number;
    revShare: number;
}

export interface PipelineStage {
    id: string;
    name: string; // e.g., 'Application', 'Processing', 'Underwriting'
    count: number;
    volume: number;
}

export interface Deal {
    id: string;
    borrowerName: string;
    loanAmount: number;
    stage: string;
    loanType: string; // e.g., 'Purchase', 'Refinance'
    closeDate: string;
    address: string;
    state: string;
}

export interface ProductionMetric {
    label: string;
    value: string | number;
    trend?: {
        value: number; // percentage
        direction: 'up' | 'down' | 'neutral';
    };
}

export interface ProductionHistoryItem {
    month: string;
    volume: number;
    units: number;
}

export interface ProductionStats {
    totalVolumeYTD: number;
    totalUnitsYTD: number;
    avgLoanSize: number;
    avgCycleTime: number; // days
}

export interface CompanyStats {
    totalVolumeYTD: number;
    totalUnitsYTD: number;
    activeLOs: number;
    revShareLiability: number;
    newRecruitsMTD: number;
    recruitmentTrend: number[]; // last 6 months
}

export interface LeaderboardEntry {
    rank: number;
    id: string;
    name: string;
    volume: number;
    units: number;
    avatarUrl?: string;
    change: 'up' | 'down' | 'same';
}

export interface OrgNode {
    id: string;
    name: string;
    role: string;
    status: 'Active' | 'Dormant';
    mtdProduction: number;
    revShareContribution: number;
    children?: OrgNode[];
    avatarUrl?: string;
}

export interface TierRequirement {
    description: string;
    current: number;
    target: number;
    type: 'volume' | 'units' | 'recruits' | 'org_volume';
}

export interface Tier {
    level: number;
    name: string;
    status: 'locked' | 'active' | 'completed';
    earnings: number;
    commissionBps: number; // e.g., 100 = 1%
    requirements: TierRequirement[];
    nextUnlock?: string;
}

export interface AISuggestion {
    id: string;
    type: 'recruiting' | 'production' | 'org_health';
    text: string;
    action?: string;
    priority: 'high' | 'medium' | 'low';
}

export interface CommunityPost {
    id: string;
    type: 'win' | 'announcement';
    author: {
        name: string;
        avatarUrl?: string;
    };
    content: string;
    timestamp: string;
    likes: number;
}

export interface Resource {
    id: string;
    title: string;
    category: 'Training' | 'Marketing' | 'Scripts';
    type: 'Video' | 'PDF' | 'Link';
    url: string;
    thumbnailUrl?: string;
}

/* --- MOCK DATA CONSTANTS --- */

export const MOCK_USER: UserProfile = {
    id: 'u1',
    name: 'Alex Morgan',
    role: 'Loan Officer',
    tier: 'Senior Partner',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};

export const MOCK_EARNINGS: EarningsData = {
    monthToDate: 12500,
    yearToDate: 145000,
    lastMonth: 18200,
    projected: 22000,
    revShare: 1500,
};

export const MOCK_PIPELINE: PipelineStage[] = [
    { id: '1', name: 'Leads', count: 12, volume: 0 },
    { id: '2', name: 'Application', count: 5, volume: 2500000 },
    { id: '3', name: 'Processing', count: 3, volume: 1200000 },
    { id: '4', name: 'Underwriting', count: 2, volume: 850000 },
    { id: '5', name: 'Clear to Close', count: 1, volume: 450000 },
];

export const MOCK_DEALS: Deal[] = [
    { id: 'd1', borrowerName: 'Smith, John', loanAmount: 450000, stage: 'Clear to Close', loanType: 'Purchase', closeDate: '2026-03-15', address: '123 Oak St', state: 'TX' },
    { id: 'd2', borrowerName: 'Johnson, Emily', loanAmount: 320000, stage: 'Underwriting', loanType: 'Refinance', closeDate: '2026-03-20', address: '456 Maple Ave', state: 'CA' },
    { id: 'd3', borrowerName: 'Williams, Michael', loanAmount: 550000, stage: 'Underwriting', loanType: 'Purchase', closeDate: '2026-03-22', address: '789 Pine Rd', state: 'FL' },
    { id: 'd4', borrowerName: 'Brown, Sarah', loanAmount: 280000, stage: 'Processing', loanType: 'Purchase', closeDate: '2026-04-01', address: '101 Cedar Ln', state: 'TX' },
    { id: 'd5', borrowerName: 'Davis, David', loanAmount: 600000, stage: 'Processing', loanType: 'Purchase', closeDate: '2026-04-05', address: '202 Birch Blvd', state: 'AZ' },
    { id: 'd6', borrowerName: 'Miller, Jennifer', loanAmount: 350000, stage: 'Processing', loanType: 'Refinance', closeDate: '2026-04-10', address: '303 Elm St', state: 'WA' },
    { id: 'd7', borrowerName: 'Wilson, Robert', loanAmount: 420000, stage: 'Application', loanType: 'Purchase', closeDate: '2026-04-15', address: '404 Spruce Dr', state: 'CO' },
    { id: 'd8', borrowerName: 'Moore, Elizabeth', loanAmount: 380000, stage: 'Application', loanType: 'Purchase', closeDate: '2026-04-20', address: '505 Willow Way', state: 'TX' },
    { id: 'd9', borrowerName: 'Taylor, Anderson', loanAmount: 500000, stage: 'Application', loanType: 'Refinance', closeDate: '2026-04-25', address: '606 Aspen Ct', state: 'FL' },
    { id: 'd10', borrowerName: 'Anderson, Thomas', loanAmount: 750000, stage: 'Application', loanType: 'Purchase', closeDate: '2026-04-30', address: '707 Redwood Pl', state: 'CA' },
    { id: 'd11', borrowerName: 'Thomas, Jackson', loanAmount: 450000, stage: 'Application', loanType: 'Purchase', closeDate: '2026-05-05', address: '808 Magnolia Ln', state: 'GA' },
];

export const MOCK_PRODUCTION_HISTORY: ProductionHistoryItem[] = [
    { month: 'Jan', volume: 1200000, units: 3 },
    { month: 'Feb', volume: 1800000, units: 5 },
    { month: 'Mar', volume: 1500000, units: 4 },
    { month: 'Apr', volume: 2200000, units: 6 },
    { month: 'May', volume: 2800000, units: 8 },
    { month: 'Jun', volume: 2400000, units: 7 },
];

export const MOCK_PRODUCTION_STATS: ProductionStats = {
    totalVolumeYTD: 11900000,
    totalUnitsYTD: 33,
    avgLoanSize: 360606,
    avgCycleTime: 24,
};

export const MOCK_COMPANY_STATS: CompanyStats = {
    totalVolumeYTD: 145000000,
    totalUnitsYTD: 420,
    activeLOs: 120,
    revShareLiability: 580000,
    newRecruitsMTD: 8,
    recruitmentTrend: [4, 6, 5, 8, 10, 8]
};

export const MOCK_LEADERBOARD: LeaderboardEntry[] = [
    { rank: 1, id: 'u2', name: 'Sarah Jenkins', volume: 4500000, units: 12, change: 'same', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
    { rank: 2, id: 'u3', name: 'Michael Chen', volume: 4200000, units: 10, change: 'up', avatarUrl: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
    { rank: 3, id: 'u1', name: 'Alex Morgan', volume: 3800000, units: 9, change: 'down', avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
    { rank: 4, id: 'u4', name: 'Jessica Wu', volume: 3500000, units: 8, change: 'up', avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
    { rank: 5, id: 'u5', name: 'David Miller', volume: 3100000, units: 7, change: 'down' },
];

export const MOCK_ORG_TREE: OrgNode = {
    id: 'u1',
    name: 'Alex Morgan',
    role: 'Branch Manager',
    status: 'Active',
    mtdProduction: 1250000,
    revShareContribution: 0,
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    children: [
        {
            id: 'u6',
            name: 'Emily Davis',
            role: 'Loan Officer',
            status: 'Active',
            mtdProduction: 850000,
            revShareContribution: 425,
            avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            children: [
                {
                    id: 'u8',
                    name: 'James Wilson',
                    role: 'Loan Officer',
                    status: 'Dormant',
                    mtdProduction: 0,
                    revShareContribution: 0,
                }
            ]
        },
        {
            id: 'u7',
            name: 'Ryan Thompson',
            role: 'Loan Officer',
            status: 'Active',
            mtdProduction: 1100000,
            revShareContribution: 550,
            children: []
        }
    ]
};

export const MOCK_TIERS: Tier[] = [
    {
        level: 1,
        name: 'Associate',
        status: 'completed',
        earnings: 2500,
        commissionBps: 100,
        requirements: [
            { description: 'Personal Volume', current: 1000000, target: 500000, type: 'volume' }
        ]
    },
    {
        level: 2,
        name: 'Partner',
        status: 'completed',
        earnings: 4500,
        commissionBps: 110,
        requirements: [
            { description: 'Recruits', current: 3, target: 2, type: 'recruits' },
            { description: 'Org Volume', current: 2000000, target: 1500000, type: 'org_volume' }
        ]
    },
    {
        level: 3,
        name: 'Senior Partner',
        status: 'active',
        earnings: 0,
        commissionBps: 125,
        nextUnlock: 'Tier 3 Bonus Pool',
        requirements: [
            { description: 'Personal Volume', current: 1250000, target: 1500000, type: 'volume' },
            { description: 'Recruits', current: 4, target: 5, type: 'recruits' }
        ]
    },
    {
        level: 4,
        name: 'Director',
        status: 'locked',
        earnings: 0,
        commissionBps: 140,
        requirements: [
            { description: 'Org Volume', current: 3500000, target: 5000000, type: 'org_volume' }
        ]
    }
];

export const MOCK_AI_SUGGESTIONS: AISuggestion[] = [
    {
        id: 's1',
        type: 'recruiting',
        text: 'Recruiting should be your focus this week to hit Tier 3.',
        action: 'View Recruit List',
        priority: 'high'
    },
    {
        id: 's2',
        type: 'org_health',
        text: 'James Wilson hasn\'t closed a deal in 60 days. Give him a call.',
        action: 'Call James',
        priority: 'medium'
    }
];

export const MOCK_COMMUNITY_FEED: CommunityPost[] = [
    {
        id: 'p1',
        type: 'win',
        author: { name: 'Sarah Jenkins', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
        content: 'Just funded my biggest deal yet! $1.2M Purchase in Austin. Huge thanks to the processing team! 🚀',
        timestamp: '2 hours ago',
        likes: 24
    },
    {
        id: 'p2',
        type: 'announcement',
        author: { name: 'BuildU Corporate' },
        content: '🚀 New "Jumbo Elite" product is live! Rates as low as 6.125%. Check the resource hub for guidelines.',
        timestamp: '5 hours ago',
        likes: 45
    },
    {
        id: 'p3',
        type: 'win',
        author: { name: 'Michael Chen', avatarUrl: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
        content: 'Welcome our newest LO, David Miller, to the team! Let\'s go! 💪',
        timestamp: '1 day ago',
        likes: 18
    }
];

export const MOCK_RESOURCES: Resource[] = [
    {
        id: 'r1',
        title: 'Jumbo Elite Product Guidelines',
        category: 'Training',
        type: 'PDF',
        url: '#',
    },
    {
        id: 'r2',
        title: 'How to close 5 extra deals a month',
        category: 'Training',
        type: 'Video',
        url: '#',
        thumbnailUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
        id: 'r3',
        title: 'New Homebuyer Seminar Script',
        category: 'Scripts',
        type: 'PDF',
        url: '#'
    },
    {
        id: 'r4',
        title: 'Social Media Templates - Spring 2026',
        category: 'Marketing',
        type: 'Link',
        url: '#',
        thumbnailUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    }
];

/* --- FETCH FUNCTIONS --- */

export const fetchEarnings = async (): Promise<EarningsData> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(MOCK_EARNINGS), 500);
    });
};

export const fetchPipeline = async (): Promise<PipelineStage[]> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(MOCK_PIPELINE), 500);
    });
};

export const fetchDeals = async (): Promise<Deal[]> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(MOCK_DEALS), 500);
    });
};

export const fetchUser = async (): Promise<UserProfile> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(MOCK_USER), 300);
    });
};

export const fetchUserById = async (id: string): Promise<UserProfile | null> => {
    return new Promise((resolve) => {
        // Simple mock lookup
        const userFromLeaderboard = MOCK_LEADERBOARD.find(u => u.id === id);
        if (userFromLeaderboard) {
            resolve({
                id: userFromLeaderboard.id,
                name: userFromLeaderboard.name,
                role: 'Loan Officer', // Default role for now
                tier: 'Partner', // Default tier
                avatarUrl: userFromLeaderboard.avatarUrl,
            });
            return;
        }
        if (id === 'u1') {
            resolve(MOCK_USER);
            return;
        }
        // Fallback for org-only users not in leaderboard
        resolve({
            id,
            name: 'Unknown User',
            role: 'Associate',
            tier: 'Associate',
        });
    });
};

export const fetchProductionHistory = async (): Promise<ProductionHistoryItem[]> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(MOCK_PRODUCTION_HISTORY), 600);
    });
};

export const fetchProductionStats = async (): Promise<ProductionStats> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(MOCK_PRODUCTION_STATS), 400);
    });
};

export const fetchCompanyStats = async (): Promise<CompanyStats> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(MOCK_COMPANY_STATS), 500);
    });
}

export const fetchLeaderboard = async (): Promise<LeaderboardEntry[]> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(MOCK_LEADERBOARD), 700);
    });
};

export const fetchOrgTree = async (): Promise<OrgNode> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(MOCK_ORG_TREE), 800);
    });
};

export const fetchTiers = async (): Promise<Tier[]> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(MOCK_TIERS), 600);
    });
};

export const fetchAISuggestions = async (): Promise<AISuggestion[]> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(MOCK_AI_SUGGESTIONS), 400);
    });
};

export const fetchCommunityFeed = async (): Promise<CommunityPost[]> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(MOCK_COMMUNITY_FEED), 600);
    });
};

export const fetchResources = async (): Promise<Resource[]> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(MOCK_RESOURCES), 500);
    });
};

export const fetchResourceById = async (id: string): Promise<Resource | undefined> => {
    return new Promise((resolve) => {
        const resource = MOCK_RESOURCES.find(r => r.id === id);
        setTimeout(() => resolve(resource), 300);
    });
};


export const submitReferral = async (): Promise<boolean> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(true), 1000);
    });
}

// Helper to update user for Onboarding Simulation
export const updateUserProfile = (userData: Partial<UserProfile>) => {
    Object.assign(MOCK_USER, userData);
};

