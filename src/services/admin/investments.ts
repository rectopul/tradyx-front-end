import { ApiResponse } from "@/types/api";
import { adminApi } from "../adminApi";
import { Package, PackageStatus } from "@/components/admin/packages/columns";
import { PackageFormData } from "@/components/admin/packages/PackageFormDrawer";
import { InvestmentPackage } from "@/types/admin/investments";
import { Paginate } from "@/types";
import { Purchase, PurchaseStatistics } from "@/types/purchase";

/**
 * Prepara dados do formulário para envio à API
 * @param formData - Dados do formulário
 * @returns Dados preparados para API
 */
export const fetchStoreInvestmentPackage = async (
    formData: PackageFormData
): Promise<Package> => {
    try {
        const response = await adminApi.post<ApiResponse<Package>>(
            "investments",
            formData,
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

/**
 * Prepara dados do formulário para envio à API
 * @param formData - Dados do formulário
 * @returns Dados preparados para API
 */
export const fetchInvestmentPackage = async (): Promise<
    InvestmentPackage[]
> => {
    try {
        const response = await adminApi.get<ApiResponse<InvestmentPackage[]>>(
            `investments`
        );
        return response.data.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Alterar status de um pacote
 * @param packageId - ID do pacote
 * @param status - Novo status do pacote ("active" ou "inactive" ou "draft")
 * @returns Package - Dados preparados para API
 */
export const fetchChangeStatusPackage = async (
    packageId: number,
    status: PackageStatus
): Promise<Package> => {
    try {
        const response = await adminApi.patch<ApiResponse<Package>>(
            `packages/${packageId}/status`,
            { status }
        );

        return response.data.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Adicionar ou remover um pacote dos destaques
 * @param packageId - ID do pacote
 * @returns Package - Dados preparados para API
 */
export const fetchToogleFeaturedPackage = async (
    packageId: number
): Promise<Package> => {
    try {
        const response = await adminApi.patch<ApiResponse<Package>>(
            `packages/${packageId}/featured`
        );

        return response.data.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Excluir um pacote dos destaques
 * @param packageId - ID do pacote
 * @returns Package - Dados preparados para API
 */
export const fetchDeletePackage = async (
    packageId: number
): Promise<boolean> => {
    try {
        const response = await adminApi.delete<ApiResponse<null>>(
            `packages/${packageId}`
        );

        return response.data.success;
    } catch (error) {
        throw error;
    }
};

export interface InvestimentsApiResponse {
    investments: Paginate<Purchase>;
    statistics: PurchaseStatistics;
}

/**
 * Lista os investimentos e estatisticas
 * @returns Package - Dados preparados para API
 */
export const fetchListInvestiments = async (): Promise<
    ApiResponse<InvestimentsApiResponse>
> => {
    try {
        const response = await adminApi.get<
            ApiResponse<InvestimentsApiResponse>
        >(`investments`);

        return response.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Lista os investimentos e estatisticas
 * @returns Package - Dados preparados para API
 */
export const fetchSearchInvestiments = async (): Promise<{
    success: boolean;
    investments: Paginate<Purchase>;
}> => {
    try {
        const response = await adminApi.get<{
            success: boolean;
            investments: Paginate<Purchase>;
        }>(`investments`);

        return response.data;
    } catch (error) {
        throw error;
    }
};
