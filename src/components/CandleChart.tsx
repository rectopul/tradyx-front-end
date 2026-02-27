import React, { useRef, useEffect } from "react";
import {
    createChart,
    ISeriesApi,
    IChartApi,
    CandlestickSeries,
    createSeriesMarkers,
    UTCTimestamp,
    SeriesMarkerShape,
    SeriesMarkerBar,
    Time,
} from "lightweight-charts";
import { useTrade } from "@/contexts/TradeContext";
import { ChartData } from "@/types/trade";

interface CandleChartProps {
    data: ChartData[];
}

const CandleChart: React.FC<CandleChartProps> = ({ data }) => {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<IChartApi | null>(null);
    const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
    const { trades } = useTrade();

    useEffect(() => {
        if (chartContainerRef.current) {
            chartRef.current = createChart(chartContainerRef.current, {
                layout: {
                    background: { color: "#111827" },
                    textColor: "#cbd5e1",
                },
                grid: {
                    vertLines: { color: "#374151" },
                    horzLines: { color: "#374151" },
                },
                timeScale: {
                    timeVisible: true,
                    secondsVisible: true,
                },
            });

            seriesRef.current = chartRef.current.addSeries(CandlestickSeries, {
                upColor: "#16a34a",
                downColor: "#dc2626",
                borderVisible: false,
                wickUpColor: "#16a34a",
                wickDownColor: "#dc2626",
            });
        }

        return () => {
            if (chartRef.current) {
                chartRef.current.remove();
            }
        };
    }, []);

    useEffect(() => {
        if (seriesRef.current && data.length) {
            seriesRef.current.setData(data);
        }
    }, [data]);

    useEffect(() => {
        if (seriesRef.current && trades.length) {
            const markers: SeriesMarkerBar<Time>[] = trades.map((trade) => ({
                time: trade.openTime as UTCTimestamp, // garante o formato certo
                position: "aboveBar" as const,
                color: trade.direction === "CALL" ? "#22c55e" : "#ef4444",
                shape:
                    trade.direction === "CALL"
                        ? ("arrowUp" as SeriesMarkerShape)
                        : ("arrowDown" as SeriesMarkerShape),
                text: `${trade.direction} R$${trade.amount}`,
            }));

            createSeriesMarkers(seriesRef.current!, markers);
        }
    }, [trades]);

    return <div ref={chartContainerRef} className="w-full h-full" />;
};

export default CandleChart;
