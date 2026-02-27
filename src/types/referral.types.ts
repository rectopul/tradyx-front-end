export interface Referral {
    id: number;
    name: string;
    realname: string | null;
    email: string;
    username?: string | null;
    created_at: string;
    active_member: number;
    investor: number;
    investments_count: number;
    investments_sum_amount: number;
    commissions_sum_amount: number;
    level: number;
}

export interface ReferralStats {
    total_count: number;
    active_count: number;
    investor_count: number;
    level1_count: number;
    level2_count: number;
    level3_count: number;
    referrals: Referral[];
}

export interface MonthlyData {
    month: string;
    total: number;
}

export interface CommissionStats {
    total_commission: number;
    pending_commission: number;
    paid_commission: number;
    monthly_data: MonthlyData[];
}

export interface ReferralLink {
    ref_id: string;
    referral_link: string;
}
