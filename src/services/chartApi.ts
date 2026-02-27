import { ChartData } from "@/types/trade";
import { api } from "./api";

export const getChartData = async (): Promise<ChartData[]> => {
    try {
        const response = await api.get<ChartData[]>("/v1/market/chart");
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar dados do gráfico:", error);
        return [];
    }
};
