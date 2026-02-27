import { ApiResponse } from "@/types/api";
import { adminApi } from "../adminApi";
import { Package, PackageStatus } from "@/components/admin/packages/columns";
import { PackageFormData } from "@/components/admin/packages/PackageFormDrawer";

/**
 * Prepara dados do formulário para envio à API
 * @param formData - Dados do formulário
 * @returns Dados preparados para API
 */
export const fetchStorePackage = async (
    formData: PackageFormData
): Promise<Package> => {
    try {
        const response = await adminApi.post<ApiResponse<Package>>(
            "packages",
            formData
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
export const fetchInsertPackageToUser = async (
    Uid: number,
    Pid: number
): Promise<Package> => {
    try {
        const response = await adminApi.post<ApiResponse<Package>>(
            `packages/insert_user/${Uid}/${Pid}`
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
export const fetchUpdatePackage = async (
    packageId: number,
    formData: PackageFormData
): Promise<Package> => {
    try {
        const response = await adminApi.put<ApiResponse<Package>>(
            `packages/${packageId}`,
            formData
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
