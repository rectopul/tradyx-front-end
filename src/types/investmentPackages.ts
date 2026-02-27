// types/investmentPackages.ts

export interface Cycle {
    id: number;
    package_id: number;
    description: string;
    sequence: number;
    requirements: string[];
    status: string;
    created_at: string;
    updated_at: string;
    plans: Plan[];
}

export type PlanStatus = "active" | "pending" | "completed" | "cancelled";
export type FrequencyUnit = "hour" | "day" | "week" | "month";

export interface Plan {
    id: number;
    cycle_id: number;
    duration_days: number;
    investment_amount: number;
    return_percentage: number;
    return_amount: number;
    status: PlanStatus;
    sequence: number;
    created_at: string;
    updated_at: string;
}

export interface InvestmentPackage {
    id: number;
    name: string;
    title: string;
    description: string;
    photo: string;
    featured: number;
    status: "active" | "inactive";
    frequency_unit: FrequencyUnit;
    total_duration: number;
    commission_percentage: number;
    total_investment: number;
    return_amount: number;
    created_at: string;
    updated_at: string;
    cycles: Cycle[];
}

export interface PurchaseResult {
    success: boolean;
    message: string;
    newBalance?: number;
}

export interface UserBalance {
    id: number;
    user_id: number;
    balance: number;
    created_at: string;
    updated_at: string;
}
