import {
    CommissionStats,
    ReferralLink,
    ReferralStats,
} from "@/types/referral.types";
import { siteUrl } from "../api";

// Mock data for development - in a real app, these would be API calls
export const getReferrals = async (): Promise<ReferralStats> => {
    return {
        total_count: 24,
        active_count: 18,
        investor_count: 12,
        level1_count: 2,
        level2_count: 2,
        level3_count: 2,
        referrals: [
            {
                id: 1,
                name: "João Silva",
                realname: "João Carlos Silva",
                email: "joao@example.com",
                created_at: "2024-01-15T10:30:00Z",
                level: 1,
                active_member: 1,
                investor: 1,
                investments_count: 3,
                investments_sum_amount: 15000,
                commissions_sum_amount: 750,
            },
            {
                id: 2,
                name: "Maria Oliveira",
                realname: "Maria José Oliveira",
                email: "maria@example.com",
                created_at: "2024-02-22T14:20:00Z",
                level: 1,
                active_member: 1,
                investor: 1,
                investments_count: 2,
                investments_sum_amount: 8000,
                commissions_sum_amount: 400,
            },
            {
                id: 3,
                name: "Carlos Souza",
                realname: null,
                email: "carlos@example.com",
                created_at: "2024-03-05T09:15:00Z",
                level: 2,
                active_member: 1,
                investor: 0,
                investments_count: 0,
                investments_sum_amount: 0,
                commissions_sum_amount: 0,
            },
        ],
    };
};

export const getCommissionStats = async (): Promise<CommissionStats> => {
    return {
        total_commission: 5250,
        pending_commission: 750,
        paid_commission: 4500,
        monthly_data: [
            { month: "2023-10", total: 500 },
            { month: "2023-11", total: 750 },
            { month: "2023-12", total: 800 },
            { month: "2024-01", total: 1000 },
            { month: "2024-02", total: 1200 },
            { month: "2024-03", total: 1000 },
        ],
    };
};

export const generateReferralLink = async (): Promise<ReferralLink> => {
    return {
        ref_id: "INV7892",
        referral_link: `${siteUrl}?ref=`,
    };
};
