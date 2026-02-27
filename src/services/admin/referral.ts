import { CreateReferralConfig, ReferralConfig } from "@/types/admin/referral";
import { adminApi } from "../adminApi";
import { ApiResponse } from "@/types/api";

/**
 * Listar configuração de referral
 * @param CreateReferralConfig[] - Dados do formulário
 * @returns ReferralConfig Dados Objeto de referral config
 */
export const fetchListReferralConfig = async (): Promise<ReferralConfig[]> => {
    try {
        const response = await adminApi.get<ApiResponse<ReferralConfig[]>>(
            "referral"
        );
        return response.data.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Cadastrar nova configuração de referral
 * @param CreateReferralConfig - Dados do formulário
 * @returns ReferralConfig Dados Objeto de referral config
 */
export const fetchStoreReferralConfig = async (
    data: CreateReferralConfig
): Promise<ReferralConfig> => {
    try {
        const response = await adminApi.post<ApiResponse<ReferralConfig>>(
            "referral",
            data
        );
        return response.data.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Listar configuração de referral
 * @param id - Id da config
 * @returns null Dados Objeto de referral config
 */
export const fetchDeleteReferralConfig = async (id: number): Promise<null> => {
    try {
        const response = await adminApi.delete<ApiResponse<null>>(
            `referral/${id}`
        );
        return response.data.data;
    } catch (error) {
        throw error;
    }
};
