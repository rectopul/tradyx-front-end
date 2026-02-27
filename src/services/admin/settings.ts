import { ApiResponse } from "@/types/api";
import { adminApi } from "../adminApi";
import { Setting } from "@/types";
import { AdminSettingsFormData } from "@/pages/admin/Settings";

/**
 * Atualizar configuraçoes gerais
 * @param settingsData - ID do pacote
 * @returns Package - Dados preparados para API
 */
export const fetchUpdateGeneralSettings = async (
    settingsData: Partial<AdminSettingsFormData>
): Promise<Setting> => {
    try {
        const data = new FormData();

        // Preenche o FormData com os campos do objeto
        Object.entries(settingsData).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                // Se for array (como `enabled_gateways` ou `dias_permitidos`)
                if (Array.isArray(value)) {
                    value.forEach((item) => data.append(`${key}[]`, item));
                } else {
                    data.append(key, value as any);
                }
            }
        });
        const response = await adminApi.post<ApiResponse<Setting>>(
            `settings/general`,
            data,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return response.data.data;
    } catch (error) {
        throw error;
    }
};

export type GatewayBalance = {
    balance: number;
};

/**
 * Buscar saldo disponível no gateway
 * @returns GatewayBalance - Dados preparados para API
 */
export const fetchGetGatewayBalance = async (): Promise<GatewayBalance> => {
    try {
        const response = await adminApi.get<ApiResponse<GatewayBalance>>(
            `settings/balance`
        );

        return response.data.data;
    } catch (error) {
        throw error;
    }
};
