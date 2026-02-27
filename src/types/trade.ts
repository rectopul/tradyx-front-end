import { UTCTimestamp } from "lightweight-charts";

export interface ChartData {
    time: UTCTimestamp;
    open: number;
    high: number;
    low: number;
    close: number;
}

export interface Trade {
    id: string;
    amount: number;
    direction: "CALL" | "PUT";
    expiration: number;
    status: "pending" | "won" | "lost" | "draw";
    openTime: UTCTimestamp;
    closeTime: number;
}

export interface MarkerData {
    time: number;
    position: "aboveBar" | "belowBar" | "inBar";
    color: string;
    shape: "circle" | "square" | "arrowUp" | "arrowDown";
    text: string;
}
