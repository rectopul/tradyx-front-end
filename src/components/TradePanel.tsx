import React, { useState } from "react";
import { useTrade } from "@/contexts/TradeContext";

const TradePanel: React.FC = () => {
    const { balance, addTrade } = useTrade();
    const [amount, setAmount] = useState<number>(100);
    const [selectedExpiration, setSelectedExpiration] = useState<number>(60);

    const handleTrade = (direction: "CALL" | "PUT") => {
        if (amount <= 0 || amount > balance) {
            alert("Valor inválido ou saldo insuficiente!");
            return;
        }
        addTrade({ amount, direction, expiration: selectedExpiration });
    };

    const expirations = [
        { label: "1 min", value: 60 },
        { label: "5 min", value: 300 },
        { label: "15 min", value: 900 },
    ];

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Painel de Operações</h2>
            <div className="mb-4">
                <label
                    htmlFor="amount"
                    className="block text-sm font-medium text-gray-400"
                >
                    Valor do Investimento (R$)
                </label>
                <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-green-500 focus:ring-green-500"
                />
            </div>

            <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-400 mb-2">
                    Tempo de Expiração
                </h3>
                <div className="flex space-x-2">
                    {expirations.map((exp) => (
                        <button
                            key={exp.value}
                            onClick={() => setSelectedExpiration(exp.value)}
                            className={`flex-1 py-2 px-4 rounded-md transition-colors ${
                                selectedExpiration === exp.value
                                    ? "bg-blue-600 hover:bg-blue-700"
                                    : "bg-gray-700 hover:bg-gray-600"
                            }`}
                        >
                            {exp.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex space-x-4">
                <button
                    onClick={() => handleTrade("CALL")}
                    className="flex-1 py-3 px-6 rounded-full bg-green-500 hover:bg-green-600 transition-colors font-bold"
                >
                    Compra (CALL)
                </button>
                <button
                    onClick={() => handleTrade("PUT")}
                    className="flex-1 py-3 px-6 rounded-full bg-red-500 hover:bg-red-600 transition-colors font-bold"
                >
                    Venda (PUT)
                </button>
            </div>
        </div>
    );
};

export default TradePanel;
