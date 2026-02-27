import { ApiResponse } from "@/types/api";
import { adminApi } from "../adminApi";
import { Withdrawal } from "@/types";


/**
 * Aprova um saque
 * @returns Informaçoes sobre o saque
 */
export const fetchApproveWithdraw = async (
    wId: number
): Promise<Withdrawal> => {
    try {
        const response = await adminApi.put<ApiResponse<Withdrawal>>(
            "withdraw/approve/" + wId
        );
        return response.data.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Aprova um saque
 * @returns Informaçoes sobre o saque
 */
export const fetchRejectWithdraw = async (wId: number): Promise<Withdrawal> => {
    try {
        const response = await adminApi.put<ApiResponse<Withdrawal>>(
            "withdraw/reject/" + wId
        );
        return response.data.data;
    } catch (error) {
        throw error;
    }
};
