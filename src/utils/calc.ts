import { FrequencyUnit } from "@/types/investmentPackages";

export function formatCurrencyBRL(value: number): string {
    return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
}

export function calcEstimatedReturn(
    amount: number,
    returnPercent: number
): number {
    return +(amount * (1 + returnPercent / 100)).toFixed(2);
}

export function calcCompound(
    amount: number,
    dailyPercent: number,
    days: number
): number {
    return +(amount * Math.pow(1 + dailyPercent / 100, days)).toFixed(2);
}

export function parseCurrencyInput(value: string): number {
    const cleaned = value.replace(/[^\d,.-]/g, "").replace(",", ".");
    return parseFloat(cleaned) || 0;
}

export function formatDuration(value: number, unit: FrequencyUnit): string {
    const unitMap = {
        hour: value === 1 ? "hora" : "horas",
        day: value === 1 ? "dia" : "dias",
        week: value === 1 ? "semana" : "semanas",
        month: value === 1 ? "mês" : "meses",
    };

    return `${value} ${unitMap[unit]}`;
}

export function unitDuration(unit: FrequencyUnit): string {
    const unitMap = {
        hour: "hora",
        day: "dia",
        week: "semana",
        month: "mes",
    };

    return `${unitMap[unit]}`;
}

export function getDurationInDays(
    value: number,
    unit: "hours" | "days" | "weeks" | "months"
): number {
    const multipliers = {
        hours: 1 / 24,
        days: 1,
        weeks: 7,
        months: 30,
    };

    return value * multipliers[unit];
}
