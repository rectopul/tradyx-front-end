export interface ReferralConfig {
    id: number;
    level: number;
    bonus_percentage: number;
    created_at: string;
}

export interface CreateReferralConfig {
    level: number;
    bonus_percentage: number;
}
