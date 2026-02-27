import { Package } from "@/components/admin/packages/columns";
import { Plan } from "@/types/user";
import { Purchase as PurchaseData } from "@/types/purchase";

export namespace Purchase {
    export interface Payload {
        id: number;
        transaction_id: string;
    }

    export interface Confirmation {
        message: string;
        success: boolean;
        purchase: PurchaseData;
    }

    export interface Data {
        user_id: number;
        transaction_id: string;
        package_id: number;
        amount: number;
        daily_income: number;
        date: string;
        validity: string;
        status: string;
        updated_at: string;
        created_at: string;
        package?: Package;
        totalPaid?: number;
        plans: Plan | null;
        early_withdraw_penalty_percent: number;
        total_paid: number;
        id: number;
    }
}
