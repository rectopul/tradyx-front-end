import { useState, useEffect } from "react";
import { getChartData } from "@/services/chartApi";
import { ChartData } from "@/types/trade";

export const useChartData = () => {
    const [data, setData] = useState<ChartData[]>([]);

    useEffect(() => {
        const fetchAndSetData = async () => {
            const chartData = await getChartData();
            setData(chartData);
        };

        fetchAndSetData();
        const interval = setInterval(fetchAndSetData, 3000); // Atualiza a cada 5 segundos

        return () => clearInterval(interval);
    }, []);

    return data;
};
