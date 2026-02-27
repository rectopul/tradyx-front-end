export namespace Checkin {
    export interface CheckinData {
        checkin_reward: number;
        potential_reward: number;
        has_checked_in_today: boolean;
        last_checkin: {
            checkin_date: string;
            created_at: string;
            updated_at: string;
            status: string;
            reward_amount: number;
        };
        consecutive_days: number;
        current_month_checkins: string[];
    }

    export interface CheckinResponse {
        success: string;
        consecutive_days: number;
        reward_amount: number;
    }
}
