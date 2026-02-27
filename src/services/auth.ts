import { Agrocash, LoginCredentials, Prisma } from "@/types/api";
import { api } from "./api";
import { ApiException } from "@/utils/api-errors";
import { toast } from "sonner";
import { RequestForgotFormData } from "@/components/auth/CryptoPasswordRecovery";
import { User } from "@/types";

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

export interface ResetPasswordRequest {
    email: string;
    token: string;
    password: string;
    password_confirmation: string;
}

export const authService = {
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        try {
            const { data } = await api.post<AuthResponse>(
                "/auth/login",
                credentials
            );

            console.log("Dados recebidos: ", data);

            if (!data.data.user) {
                throw new ApiException("Usuário não encontrado");
            }

            return data;
        } catch (error) {
            if (error instanceof ApiException) {
                throw new ApiException(error.message);
            }

            throw new ApiException(error as string);
        }
    },

    async getUser(): Promise<User> {
        try {
            const { data } = await api.get<User>("/user/get");

            return data;
        } catch (error) {
            if (error instanceof ApiException) {
                throw new ApiException(error.message);
            }

            throw new ApiException(error as string);
        }
    },

    async changePassword(
        userId: number,
        credentials: Prisma.UserUpdateInput
    ): Promise<Prisma.User> {
        const { data } = await api.put<Prisma.User>(
            "/auth/password" + userId,
            credentials
        );
        return data;
    },

    async clear(): Promise<string> {
        await api.get<string>("/fipe/info/clear");
        return "ok";
    },

    async requestPassword(data: RequestForgotFormData): Promise<string> {
        await api.post<string>("/password/forgot", data);
        return "ok";
    },

    async changePasswordForgot(data: ResetPasswordRequest): Promise<string> {
        await api.post<string>("/password/reset", data);
        return "ok";
    },

    async logout() {
        try {
            await api.post("/auth/logout");
        } catch (error) {
            toast.error("Erro ao realizar logout");
        }
    },

    async validateToken(): Promise<boolean> {
        try {
            await api.get("/auth/validate");
            return true;
        } catch {
            return false;
        }
    },
};

export const userProfileService = {
    async getUserProfile(): Promise<Agrocash.UserData> {
        const { data } = await api.get<Agrocash.UserData>("/user");
        return data;
    },

    async updatePassword(
        credentials: Prisma.UserUpdateInput
    ): Promise<Agrocash.User> {
        const { data } = await api.put<Agrocash.User>(
            "/auth/password",
            credentials
        );
        return data;
    },
};
