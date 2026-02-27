import { UserChallengeGoals, UserData, WithdrawnAccount } from "@/types";
import { api } from "./api";
import { ApiResponse } from "@/types/api";
import { Challenge } from "@/types/challenges";

export const userProfileUpdate = async (
    data: Partial<UserData> & { update_type: string }
): Promise<UserData> => {
    const response = await api.put(`/user/profile`, data);
    return response.data;
};

export const userChallenges = async (): Promise<Challenge[]> => {
    const response = await api.get<ApiResponse<Challenge[]>>(
        `/user/challenge-goals`
    );
    return response.data.data;
};

export type IpFly = {
    ip: string;
};

export const ipflyIp = async (): Promise<IpFly> => {
    try {
        const req = await fetch("https://api.ipify.org/?format=json");

        const response = await req.json();

        if (!req.ok) {
            throw new Error("Erro ao pegar ip");
        }

        const res = response as IpFly;

        return res;
    } catch (error: any) {
        if (error.message) {
            throw new Error(error.message);
        }

        throw new Error(error);
    }
};

export const fetchClainBonus = async (payload: {
    challenge_goal_id: number;
}): Promise<UserChallengeGoals | any> => {
    const response = await api.post(
        `/user/challenge-goals/claim-bonus`,
        payload
    );
    return response.data;
};

export const userWalletUpdate = async (
    data: Partial<WithdrawnAccount>
): Promise<WithdrawnAccount> => {
    const response = await api.put(`/user/profile`, {
        ...data,
        update_type: "carteira",
    });
    return response.data;
};
