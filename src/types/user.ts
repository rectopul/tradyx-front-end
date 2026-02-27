import { Purchase } from "./purchase";

export interface WithdrawnAccount {
    id: number;
    account_name: string;
    account_number: string;
    bank_name: string;
}

export interface Plan {
    id: number;
    name: string;
    price: number;
    duration: number;
}

export interface Cycle {
    id: number;
    cycle_number: number;
    status: string;
    created_at: string;
}

export interface UserCycle {
    id: number;
    user_id: number;
    cycle_id: number;
    status: string;
}

export interface UserData {
    id: number;
    ref_by: string;
    ref_id: string;
    name: string;
    investor: number;
    realname: string;
    phone_code: string;
    phone: string;
    ip: string;
    username: string;
    email: string;
    email_verified_at: any;
    type: any;
    balance: number;
    profit_balance: number;
    blocked_balance: number;
    total_commission: number;
    receive_able_amount: number;
    photo: any;
    gateway_method: string;
    pix_type: string;
    gateway_number: string;
    pix_key: string;
    withdraw_password: string;
    status: string;
    ban_unban: string;
    created_at: string;
    updated_at: string;
    active_member: number;
    profile_photo_url: string;
    is_afiliate: boolean;
    withdraw_account?: WithdrawnAccount | null;
    purchases: Purchase[];
    plans: Plan[] | null;
    cycles: Cycle[];
    purchase_cycles: UserCycle[];
    referral: {
        active_count: number;
        investor_count: number;
        level1_count: number;
        level2_count: number;
        level3_count: number;
        referrals: any[];
        total_count: number;
    };
}

export interface UserFilters {
    status?: string;
    ban_unban?: string;
    is_afiliate?: boolean;
    investor?: number;
    dateRange?: {
        from?: Date;
        to?: Date;
    };
}
