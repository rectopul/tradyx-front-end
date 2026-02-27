import React from "react";
import { useTrade } from "@/contexts/TradeContext";
import { Trade } from "@/types/trade";

const TradeHistory: React.FC = () => {
    const { trades, updateTradeStatus } = useTrade();

    const getStatusColor = (status: Trade["status"]) => {
        switch (status) {
            case "won":
                return "text-green-500";
            case "lost":
                return "text-red-500";
            case "draw":
                return "text-yellow-500";
            default:
                return "text-gray-400";
        }
    };

    return (
        <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Histórico de Operações</h2>
            <ul className="space-y-4">
                {trades.length === 0 ? (
                    <p className="text-gray-400 text-center">
                        Nenhuma operação realizada ainda.
                    </p>
                ) : (
                    trades.map((trade) => (
                        <li
                            key={trade.id}
                            className="p-4 bg-gray-700 rounded-lg flex items-center justify-between"
                        >
                            <div>
                                <span className="font-bold text-lg">
                                    {trade.direction}
                                </span>
                                <span className="ml-2 text-sm text-gray-400">
                                    R$ {trade.amount}
                                </span>
                                <span className="ml-2 text-sm text-gray-400">
                                    Expira em{" "}
                                    {Math.ceil(
                                        (trade.closeTime * 1000 - Date.now()) /
                                            1000
                                    )}
                                    s
                                </span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span
                                    className={`font-semibold ${getStatusColor(
                                        trade.status
                                    )}`}
                                >
                                    {trade.status.toUpperCase()}
                                </span>
                                {trade.status === "pending" && (
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() =>
                                                updateTradeStatus(
                                                    trade.id,
                                                    "won"
                                                )
                                            }
                                            className="text-green-500 hover:text-green-400"
                                        >
                                            Ganhou
                                        </button>
                                        <button
                                            onClick={() =>
                                                updateTradeStatus(
                                                    trade.id,
                                                    "lost"
                                                )
                                            }
                                            className="text-red-500 hover:text-red-400"
                                        >
                                            Perdeu
                                        </button>
                                        <button
                                            onClick={() =>
                                                updateTradeStatus(
                                                    trade.id,
                                                    "draw"
                                                )
                                            }
                                            className="text-yellow-500 hover:text-yellow-400"
                                        >
                                            Empate
                                        </button>
                                    </div>
                                )}
                            </div>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default TradeHistory;
