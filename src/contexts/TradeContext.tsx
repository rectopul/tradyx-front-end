import { createContext, useState, useContext, ReactNode } from "react";
import { Trade } from "@/types/trade";
import { UTCTimestamp } from "lightweight-charts";

interface TradeContextProps {
    balance: number;
    trades: Trade[];
    addTrade: (
        trade: Omit<Trade, "id" | "openTime" | "closeTime" | "status">
    ) => void;
    updateTradeStatus: (
        tradeId: string,
        status: "won" | "lost" | "draw"
    ) => void;
}

const TradeContext = createContext<TradeContextProps | undefined>(undefined);

export const TradeProvider = ({ children }: { children: ReactNode }) => {
    const [balance, setBalance] = useState<number>(1000); // Saldo inicial mockado
    const [trades, setTrades] = useState<Trade[]>([]);

    const addTrade = (
        newTrade: Omit<Trade, "id" | "openTime" | "closeTime" | "status">
    ) => {
        const tradeId = Math.random().toString(36).substr(2, 9);
        const openTime = Math.floor(Date.now() / 1000) as UTCTimestamp;
        const closeTime = openTime + newTrade.expiration;

        setTrades((prevTrades) => [
            ...prevTrades,
            {
                ...newTrade,
                id: tradeId,
                openTime,
                closeTime,
                status: "pending",
            },
        ]);

        // Reduz o saldo ao abrir a operação
        setBalance((prevBalance) => prevBalance - newTrade.amount);
    };

    const updateTradeStatus = (
        tradeId: string,
        status: "won" | "lost" | "draw"
    ) => {
        setTrades((prevTrades) => {
            return prevTrades.map((trade) => {
                if (trade.id === tradeId && trade.status === "pending") {
                    // Lógica de atualização de saldo com base no resultado
                    if (status === "won") {
                        setBalance(
                            (prevBalance) => prevBalance + trade.amount * 1.8
                        ); // Exemplo de payout de 80%
                    } else if (status === "draw") {
                        setBalance((prevBalance) => prevBalance + trade.amount); // Reembolsa o valor
                    }
                    return { ...trade, status };
                }
                return trade;
            });
        });
    };

    return (
        <TradeContext.Provider
            value={{ balance, trades, addTrade, updateTradeStatus }}
        >
            {children}
        </TradeContext.Provider>
    );
};

export const useTrade = () => {
    const context = useContext(TradeContext);
    if (context === undefined) {
        throw new Error("useTrade must be used within a TradeProvider");
    }
    return context;
};
