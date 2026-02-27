import {
    CommissionStats,
    ReferralLink,
    ReferralStats,
} from "../types/referral.types";
import { Setting, User } from "@/types";
import { api } from "./api";

export const getReferrals = async (): Promise<ReferralStats> => {
    const response = await api.get(`/referrals`);
    return response.data.data;
};

export const getCommissionStats = async (): Promise<CommissionStats> => {
    const response = await api.get(`/referrals/stats`);
    return response.data.data;
};

export const generateReferralLink = async (): Promise<ReferralLink> => {
    const response = await api.post(`/referrals/generate-link`, {});
    return response.data.data;
};

export const getThemeSetting = async (): Promise<Setting> => {
    const response = await api.get(`/settings`);
    return response.data;
};

export const getUserData = async (): Promise<User> => {
    const response = await api.get(`/user/get`);
    return response.data;
};
