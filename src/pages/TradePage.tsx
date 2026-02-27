import React from "react";
import CandleChart from "@/components/CandleChart";
import TradePanel from "@/components/TradePanel";
import TradeHistory from "@/components/TradeHistory";
import { useChartData } from "@/hooks/useChartData";
import { useTrade } from "@/contexts/TradeContext";

const TradePage: React.FC = () => {
    const chartData = useChartData();
    const { balance } = useTrade();

    return (
        <div className="flex flex-col min-h-screen p-4 md:p-8 lg:p-12">
            <header className="mb-6 flex justify-between items-center">
                <h1 className="text-3xl font-bold text-green-500">
                    Binary Trader
                </h1>
                <div className="text-right">
                    <p className="text-sm text-gray-400">Saldo Atual</p>
                    <p className="text-xl font-bold text-white">
                        R$ {balance.toFixed(2)}
                    </p>
                </div>
            </header>

            <main className="flex flex-col lg:flex-row flex-1 space-y-8 lg:space-y-0 lg:space-x-8">
                <div className="flex-1 min-h-[400px] lg:min-h-0 bg-gray-800 rounded-lg shadow-lg">
                    <CandleChart data={chartData} />
                </div>
                <div className="w-full lg:w-1/3">
                    <TradePanel />
                </div>
            </main>

            <div className="mt-8">
                <TradeHistory />
            </div>
        </div>
    );
};

export default TradePage;
