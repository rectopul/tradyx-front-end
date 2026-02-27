import { adminApi } from "./adminApi";
import { Admin } from "@/types";
import { adminAuthCheck } from "./adminServices";

export interface AuthResponse {
    status: string;
    message: string;
    data: {
        user: {
            id: string;
            email: string;
            name: string;
        };
        token: string;
    };
}

export const adminAuthService = {
    async validateToken(): Promise<boolean> {
        try {
            await adminAuthCheck();
            return true;
        } catch {
            return false;
        }
    },
};

export const adminProfileService = {
    async getAdminProfile(): Promise<Admin.Data> {
        const { data } = await adminApi.get<Admin.Data>("/profile");
        return data;
    },
};
