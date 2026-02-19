// tenantData.ts
// Mock data and service layer for the multi-tenant white-label system.
// Designed to be replaced by a real Supabase/Firebase backend in Phase E.

// ─── Interfaces ─────────────────────────────────────────────────────────────

export interface Company {
    id: string;
    name: string;
    slug: string;
    logoUrl: string;
    primaryColor: string;
    secondaryColor: string;
    domain?: string;
    plan: 'starter' | 'growth' | 'enterprise';
    createdAt: string;
}

export type PermissionKey =
    // Dashboard
    | 'view_dashboard' | 'view_earnings' | 'view_pipeline'
    // Production
    | 'view_production' | 'edit_deals' | 'view_all_deals'
    // Organization
    | 'view_org' | 'view_team_profiles'
    // Revenue Share
    | 'view_revshare' | 'view_revshare_detail'
    // Recruiting
    | 'send_referral' | 'view_recruit_pipeline'
    // Growth Hub
    | 'view_resources' | 'upload_resources'
    // Community
    | 'view_feed' | 'post_to_feed'
    // Leaderboard
    | 'view_leaderboard'
    // Admin
    | 'manage_users' | 'manage_roles' | 'edit_company_settings' | 'view_admin_dashboard';

export interface Permission {
    key: PermissionKey;
    label: string;
    category: string;
}

export interface TenantRole {
    id: string;
    companyId: string;
    name: string;
    description: string;
    permissions: PermissionKey[];
    isDefault: boolean;
    userCount: number;
}

export interface TenantUser {
    id: string;
    companyId: string;
    name: string;
    email: string;
    roleId: string;
    status: 'active' | 'invited' | 'deactivated';
    avatarUrl?: string;
    joinedAt: string;
}

// ─── Permission Catalog ──────────────────────────────────────────────────────

export const ALL_PERMISSIONS: Permission[] = [
    // Dashboard
    { key: 'view_dashboard', label: 'View Dashboard', category: 'Dashboard' },
    { key: 'view_earnings', label: 'View Earnings', category: 'Dashboard' },
    { key: 'view_pipeline', label: 'View Pipeline', category: 'Dashboard' },
    // Production
    { key: 'view_production', label: 'View Production Stats', category: 'Production' },
    { key: 'edit_deals', label: 'Edit Own Deals', category: 'Production' },
    { key: 'view_all_deals', label: 'View All Deals (Team)', category: 'Production' },
    // Organization
    { key: 'view_org', label: 'View Org Chart', category: 'Organization' },
    { key: 'view_team_profiles', label: 'View Team Profiles', category: 'Organization' },
    // Revenue Share
    { key: 'view_revshare', label: 'View RevShare', category: 'Revenue Share' },
    { key: 'view_revshare_detail', label: 'View RevShare Detail', category: 'Revenue Share' },
    // Recruiting
    { key: 'send_referral', label: 'Send Referral', category: 'Recruiting' },
    { key: 'view_recruit_pipeline', label: 'View Recruit Pipeline', category: 'Recruiting' },
    // Growth Hub
    { key: 'view_resources', label: 'View Resources', category: 'Growth Hub' },
    { key: 'upload_resources', label: 'Upload Resources', category: 'Growth Hub' },
    // Community
    { key: 'view_feed', label: 'View Feed', category: 'Community' },
    { key: 'post_to_feed', label: 'Post to Feed', category: 'Community' },
    // Leaderboard
    { key: 'view_leaderboard', label: 'View Leaderboard', category: 'Leaderboard' },
    // Admin
    { key: 'manage_users', label: 'Manage Users', category: 'Admin' },
    { key: 'manage_roles', label: 'Manage Roles', category: 'Admin' },
    { key: 'edit_company_settings', label: 'Edit Company Settings', category: 'Admin' },
    { key: 'view_admin_dashboard', label: 'View Admin Dashboard', category: 'Admin' },
];

// ─── Mock Company Data ───────────────────────────────────────────────────────

export const MOCK_COMPANY: Company = {
    id: 'company-oaktree',
    name: 'Oaktree Funding',
    slug: 'oaktree',
    logoUrl: '/icon-192.png',
    primaryColor: '#21A843',
    secondaryColor: '#004A99',
    domain: 'oaktree.buildu.com',
    plan: 'enterprise',
    createdAt: '2025-01-15',
};

// ─── Mock Roles ──────────────────────────────────────────────────────────────

const ALL_PERMS: PermissionKey[] = ALL_PERMISSIONS.map(p => p.key);

export const MOCK_TENANT_ROLES: TenantRole[] = [
    {
        id: 'role-super-admin',
        companyId: 'company-oaktree',
        name: 'Super Admin',
        description: 'Full access to all features and settings.',
        permissions: ALL_PERMS,
        isDefault: false,
        userCount: 1,
    },
    {
        id: 'role-branch-manager',
        companyId: 'company-oaktree',
        name: 'Branch Manager',
        description: 'Manages branch operations, users, and org visibility.',
        permissions: ALL_PERMS.filter(p => !(['manage_roles', 'edit_company_settings'] as PermissionKey[]).includes(p)),
        isDefault: false,
        userCount: 3,
    },
    {
        id: 'role-team-leader',
        companyId: 'company-oaktree',
        name: 'Team Leader',
        description: 'Leads a team with recruiting and production oversight.',
        permissions: ['view_dashboard', 'view_earnings', 'view_pipeline', 'view_production', 'edit_deals',
            'view_all_deals', 'view_org', 'view_team_profiles', 'view_revshare', 'send_referral',
            'view_recruit_pipeline', 'view_resources', 'view_feed', 'post_to_feed', 'view_leaderboard'],
        isDefault: false,
        userCount: 12,
    },
    {
        id: 'role-loan-officer',
        companyId: 'company-oaktree',
        name: 'Loan Officer',
        description: 'Standard loan officer access to personal production and community.',
        permissions: ['view_dashboard', 'view_earnings', 'view_pipeline', 'view_production', 'edit_deals',
            'view_revshare', 'send_referral', 'view_resources', 'view_feed', 'post_to_feed', 'view_leaderboard'],
        isDefault: true,
        userCount: 98,
    },
    {
        id: 'role-viewer',
        companyId: 'company-oaktree',
        name: 'Viewer',
        description: 'Read-only access to dashboard, leaderboard, and community.',
        permissions: ['view_dashboard', 'view_leaderboard', 'view_feed'],
        isDefault: false,
        userCount: 5,
    },
];

// ─── Mock Users ──────────────────────────────────────────────────────────────

export const MOCK_TENANT_USERS: TenantUser[] = [
    { id: 'u-1', companyId: 'company-oaktree', name: 'Hamilton Marty', email: 'hamilton@oaktree.com', roleId: 'role-super-admin', status: 'active', joinedAt: '2025-01-15', avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
    { id: 'u-2', companyId: 'company-oaktree', name: 'Sarah Jenkins', email: 'sarah.jenkins@oaktree.com', roleId: 'role-branch-manager', status: 'active', joinedAt: '2025-02-01', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
    { id: 'u-3', companyId: 'company-oaktree', name: 'Michael Chen', email: 'michael.chen@oaktree.com', roleId: 'role-team-leader', status: 'active', joinedAt: '2025-02-15', avatarUrl: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
    { id: 'u-4', companyId: 'company-oaktree', name: 'Jessica Wu', email: 'jessica.wu@oaktree.com', roleId: 'role-loan-officer', status: 'active', joinedAt: '2025-03-01', avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
    { id: 'u-5', companyId: 'company-oaktree', name: 'David Miller', email: 'david.miller@oaktree.com', roleId: 'role-loan-officer', status: 'active', joinedAt: '2025-03-10' },
    { id: 'u-6', companyId: 'company-oaktree', name: 'Emily Torres', email: 'emily.torres@oaktree.com', roleId: 'role-loan-officer', status: 'invited', joinedAt: '2026-01-20' },
    { id: 'u-7', companyId: 'company-oaktree', name: 'Robert Hayes', email: 'robert.hayes@oaktree.com', roleId: 'role-viewer', status: 'deactivated', joinedAt: '2025-04-01' },
];

// ─── Fetch Functions ─────────────────────────────────────────────────────────

export const fetchCompany = async (): Promise<Company> => {
    return new Promise(resolve => setTimeout(() => resolve(MOCK_COMPANY), 300));
};

export const fetchTenantRoles = async (): Promise<TenantRole[]> => {
    return new Promise(resolve => setTimeout(() => resolve(MOCK_TENANT_ROLES), 400));
};

export const fetchTenantUsers = async (): Promise<TenantUser[]> => {
    return new Promise(resolve => setTimeout(() => resolve(MOCK_TENANT_USERS), 400));
};

// Mocked mutations (will be real API calls in Phase E)
export const updateCompanySettings = async (updates: Partial<Company>): Promise<Company> => {
    Object.assign(MOCK_COMPANY, updates);
    return new Promise(resolve => setTimeout(() => resolve(MOCK_COMPANY), 500));
};

export const createRole = async (role: Omit<TenantRole, 'id' | 'companyId' | 'userCount'>): Promise<TenantRole> => {
    const newRole: TenantRole = {
        ...role,
        id: `role-${Date.now()}`,
        companyId: 'company-oaktree',
        userCount: 0,
    };
    MOCK_TENANT_ROLES.push(newRole);
    return new Promise(resolve => setTimeout(() => resolve(newRole), 500));
};

export const updateRole = async (id: string, updates: Partial<TenantRole>): Promise<TenantRole> => {
    const idx = MOCK_TENANT_ROLES.findIndex(r => r.id === id);
    if (idx !== -1) Object.assign(MOCK_TENANT_ROLES[idx], updates);
    return new Promise(resolve => setTimeout(() => resolve(MOCK_TENANT_ROLES[idx]), 500));
};

export const deleteRole = async (id: string): Promise<void> => {
    const idx = MOCK_TENANT_ROLES.findIndex(r => r.id === id);
    if (idx !== -1) MOCK_TENANT_ROLES.splice(idx, 1);
    return new Promise(resolve => setTimeout(resolve, 400));
};

export const inviteUser = async (user: Omit<TenantUser, 'id' | 'companyId' | 'status' | 'joinedAt'>): Promise<TenantUser> => {
    const newUser: TenantUser = {
        ...user,
        id: `u-${Date.now()}`,
        companyId: 'company-oaktree',
        status: 'invited',
        joinedAt: new Date().toISOString().split('T')[0],
    };
    MOCK_TENANT_USERS.push(newUser);
    return new Promise(resolve => setTimeout(() => resolve(newUser), 500));
};

export const updateUserRole = async (userId: string, roleId: string): Promise<void> => {
    const user = MOCK_TENANT_USERS.find(u => u.id === userId);
    if (user) user.roleId = roleId;
    return new Promise(resolve => setTimeout(resolve, 300));
};

export const deactivateUser = async (userId: string): Promise<void> => {
    const user = MOCK_TENANT_USERS.find(u => u.id === userId);
    if (user) user.status = 'deactivated';
    return new Promise(resolve => setTimeout(resolve, 300));
};
