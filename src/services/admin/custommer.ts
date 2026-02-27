import { ApiResponse } from "@/types/api";
import { adminApi } from "../adminApi";
import { UserData } from "@/types";
import { UserEditFormData } from "@/schemas/user-schema";

/**
 * Aprova um saque
 * @returns Informaçoes sobre o saque
 */
export const fetchUpdateCustomer = async (
    data: UserEditFormData,
    cId: number
): Promise<UserData> => {
    try {
        const response = await adminApi.put<ApiResponse<UserData>>(
            "customer/" + cId,
            data
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
export const fetchRenewPasswordCustomer = async (
    uId: number,
    data: { new_password: string }
): Promise<UserData> => {
    try {
        const response = await adminApi.post<ApiResponse<UserData>>(
            "customer/rewnew_password/" + uId,
            data
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
export const fetchBalanceIncrementCustomer = async (
    uId: number,
    data: { amount: string }
): Promise<UserData> => {
    try {
        const response = await adminApi.post<ApiResponse<UserData>>(
            "customer/balance_increment/" + uId,
            data
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
export const fetchLoginCustomer = async (uId: number): Promise<UserData> => {
    try {
        const response = await adminApi.get<ApiResponse<UserData>>(
            "customer/login/" + uId
        );
        return response.data.data;
    } catch (error) {
        throw error;
    }
};
