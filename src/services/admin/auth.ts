import { ApiResponse } from "@/types/api";
import { adminApi } from "../adminApi";
import { adminAuthCheck, adminLogin, adminLogout } from "../adminServices";
import { Admin } from "@/types";

/**
 * Verifica se o admin está autenticado
 * @returns Informaçoes sobre o administrador
 */
export const authAdminCheck = async (): Promise<ApiResponse<any>> => {
    try {
        const response = await adminApi.get<ApiResponse<any>>("check_login");
        return response.data.data;
    } catch (error) {
        throw error;
    }
};

export const adminService = {
    checkLogin: async (): Promise<Admin.Data> => {
        const adminData = await adminAuthCheck();
        return adminData.data.admin;
    },
    login: async (payload: { email: string; password: string }) => {
        return await adminLogin({ payload });
    },
    logout: async () => {
        return await adminLogout();
    },
    me: async () => {
        return await adminApi.get<ApiResponse<Admin.Data>>("/admin/me");
    },
};
