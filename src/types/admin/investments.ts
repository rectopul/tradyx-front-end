export interface InvestmentPackage {
    id: number;
    name: string;
    symbol: string;
    image: string;
    min_return_rate: number;
    max_return_rate: number;
    minimum_amount: number;
    min_withdrawal_days: number;
    duration_days: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface CreateInvestmentPackage {
    name: string;
    symbol: string;
    image: string;
    min_return_rate: number;
    max_return_rate: number;
    minimum_amount: number;
    min_withdrawal_days: number;
    duration_days: number;
    is_active: boolean;
}
