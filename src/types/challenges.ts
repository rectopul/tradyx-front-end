export interface Challenge {
    id: number;
    title: string;
    description: string;
    required_investment: number;
    bonus_amount: number;
    bonus_type: "fixed" | "percentage";
    current_investment: number;
    progress_percentage: number;
    remaining_amount: number;
    is_completed: boolean;
    completed_at: any;
    bonus_claimed: boolean;
    can_claim_bonus: boolean;
}
