import {
    InvestmentPackage,
    PurchaseResult,
    UserBalance,
} from "@/types/investmentPackages";
import { api } from "./api";
import { ApiResponse } from "@/types/api";
import { Reinvestment } from "@/types";
import { Purchase } from "@/types/purchase";

export const investmentService = {
    // Buscar um pacote específico por ID
    getPackageById: async (id: number): Promise<InvestmentPackage> => {
        const response = await api.get(`/investment-packages/${id}`);
        return response.data;
    },

    purchaseCycle: async (cycleId: number): Promise<PurchaseResult> => {
        try {
            const response = await api.post("/investment-purchases", {
                cycle_id: cycleId,
            });
            return {
                success: true,
                message: "Ciclo adquirido com sucesso!",
                newBalance: response.data.new_balance,
            };
        } catch (error: any) {
            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    "Erro ao adquirir o ciclo.",
            };
        }
    },
    // Obter o saldo do usuário
    getUserBalance: async (): Promise<UserBalance> => {
        const response = await api.get("/user/balance");
        return response.data;
    },

    // Obter o saldo do usuário
    redeenInvestment: async (pId: number): Promise<ApiResponse<Purchase>> => {
        const response = await api.post<ApiResponse<Purchase>>(
            `/user/investiment/${pId}/withdraw`
        );
        return response.data;
    },

    // Reinvestir o rendimento
    reinvestment: async ({
        amount,
        purchase_id,
    }: {
        purchase_id: number;
        amount: number;
    }): Promise<ApiResponse<Reinvestment>> => {
        const response = await api.post<ApiResponse<Reinvestment>>(
            `/user/investiment/reinvestment`,
            {
                purchase_id,
                amount,
            }
        );
        return response.data;
    },

    // Reinvestir o rendimento
    reinvestmentsList: async (): Promise<ApiResponse<Reinvestment[]>> => {
        const response = await api.get<ApiResponse<Reinvestment[]>>(
            `/user/investiment/reinvestment`
        );
        return response.data;
    },
};
