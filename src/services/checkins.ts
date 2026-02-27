import { Checkin } from "@/types/checkin";
import { api } from "./api";

export const getCheckinStore = async (): Promise<Checkin.CheckinData> => {
    const response = await api.get(`/checkin`);
    return response.data;
};

export const fetchProcessCheckin =
    async (): Promise<Checkin.CheckinResponse> => {
        const response = await api.post(`/checkin`);
        return response.data;
    };
