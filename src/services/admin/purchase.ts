import { ApiResponse } from "@/types/api";
import { adminApi } from "../adminApi";

export type PurchaseStatistics = {
    total_purchases: number;
    total_paids: number;
};

/**
 * Executa requisição para obter dados de estatisticas de compras de planos
 * @returns Estatisticas de compras de usuários
 */
export const fetchStatisticsPurchases =
    async (): Promise<PurchaseStatistics> => {
        try {
            const response = await adminApi.get<
                ApiResponse<PurchaseStatistics>
            >("purchase/statistics");
            return response.data.data;
        } catch (error) {
            throw error;
        }
    };
