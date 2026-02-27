import { PackageUnit } from "@/components/admin/packages/columns";
import { Purchase } from "@/types/purchase";
import { useEffect, useState } from "react";

const MILLISECONDS_IN_SECOND = 1000;
const SECONDS_IN_MINUTE = 60;
const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAY = 24;
const DAYS_IN_WEEK = 7;
// 30 dias é usado como uma aproximação para 'month'
const DAYS_IN_MONTH = 30;
const RENDER_INTERVAL_MS = 100; // Atualiza o estado a cada 100ms para precisão visual

/**
 * Calcula a duração de um ciclo de pagamento em milissegundos.
 * @param unit A unidade de frequência ('hour', 'day', 'week', 'month').
 * @returns Duração do ciclo em milissegundos.
 */
const getCycleDurationMs = (unit: PackageUnit): number => {
    switch (unit) {
        case "hour":
            return MILLISECONDS_IN_SECOND * SECONDS_IN_MINUTE * MINUTES_IN_HOUR;
        case "day":
            return (
                MILLISECONDS_IN_SECOND *
                SECONDS_IN_MINUTE *
                MINUTES_IN_HOUR *
                HOURS_IN_DAY
            );
        case "week":
            return (
                MILLISECONDS_IN_SECOND *
                SECONDS_IN_MINUTE *
                MINUTES_IN_HOUR *
                HOURS_IN_DAY *
                DAYS_IN_WEEK
            );
        case "month":
            return (
                MILLISECONDS_IN_SECOND *
                SECONDS_IN_MINUTE *
                MINUTES_IN_HOUR *
                HOURS_IN_DAY *
                DAYS_IN_MONTH
            );
        default:
            return MILLISECONDS_IN_SECOND * 60 * 60 * 24; // Padrão: 1 dia
    }
};

/**
 * Interface dos valores retornados pelo hook.
 */
interface IncomeTracker {
    /** Tempo restante para o próximo pagamento em milissegundos. */
    timeLeftMs: number;
    /** Valor acumulado no ciclo atual (rendimento do próximo pagamento) em tempo real. */
    accumulatedCurrentCycle: number;
    /** Valor total a ser pago em um ciclo (diário, semanal, etc.). */
    cyclePayoutAmount: number;
    /** Rendimento total já recebido + o valor acumulado em tempo real. */
    totalIncome: number;
    /** Função para formatar milissegundos em HH:MM:SS. */
    formatTime: (ms: number) => string;
    /** Porcentagem total de conclusão do plano (baseado em ciclos). */
    totalCompletionPercentage: number;
}

/**
 * Hook customizado para calcular o tempo restante e o rendimento acumulado em tempo real.
 * @param purchase O objeto de compra com os dados do pacote e do rendimento.
 * @returns Um objeto com todos os valores de rastreamento e funções formatadoras.
 */
export const usePurchaseIncomeTracker = (purchase: Purchase): IncomeTracker => {
    const nextPaymentDate = new Date(purchase.date).getTime();

    // Calcula o valor fixo de rendimento por ciclo com base na nova fórmula
    const cyclePayoutAmount =
        purchase.package.total_investment *
        (purchase.package.commission_percentage / 100);

    // Calcula a duração total de um ciclo de pagamento em milissegundos
    const paymentCycleDurationMs = getCycleDurationMs(
        purchase.package.frequency_unit
    );

    // Valor de rendimento por milissegundo
    const incomePerMs = cyclePayoutAmount / paymentCycleDurationMs;

    // Estados
    const [timeLeftMs, setTimeLeftMs] = useState<number>(
        nextPaymentDate - Date.now()
    );
    const [accumulatedCurrentCycle, setAccumulatedCurrentCycle] =
        useState<number>(0);

    // Efeito para o contador e cálculo de rendimento em tempo real
    useEffect(() => {
        // Assume que o pagamento anterior ocorreu exatamente um ciclo antes.
        // Se a data de 'purchase.date' for o próximo pagamento, o último foi:
        const lastPaymentTime = nextPaymentDate - paymentCycleDurationMs;

        const interval = setInterval(() => {
            const now = Date.now();

            // 1. Lógica do Countdown
            const newTimeLeftMs = nextPaymentDate - now;
            setTimeLeftMs(newTimeLeftMs);

            // 2. Lógica de Acumulação do Rendimento
            const timeElapsedSinceLastPaymentMs = now - lastPaymentTime;

            // Valor acumulado = tempo decorrido * rendimento por milissegundo
            const accumulated = timeElapsedSinceLastPaymentMs * incomePerMs;

            // Limita a acumulação ao valor máximo do ciclo (cyclePayoutAmount)
            const finalAccumulated = Math.min(accumulated, cyclePayoutAmount);

            setAccumulatedCurrentCycle(finalAccumulated);

            // Ação ao finalizar o contador
            if (newTimeLeftMs <= 0) {
                clearInterval(interval);
                setTimeLeftMs(0);
                setAccumulatedCurrentCycle(cyclePayoutAmount); // Garante que o valor final é exato
                console.log(
                    "Tempo esgotado! Próximo rendimento pronto para ser pago."
                );
            }
        }, RENDER_INTERVAL_MS);

        // Função de limpeza
        return () => clearInterval(interval);
    }, [
        nextPaymentDate,
        paymentCycleDurationMs,
        incomePerMs,
        cyclePayoutAmount,
    ]);

    // Função para formatar o tempo restante em HH:MM:SS
    const formatTime = (ms: number): string => {
        if (ms < 0) return "00:00:00";

        const totalSeconds = Math.floor(ms / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        // Formatação do tempo: adiciona os milissegundos para maior precisão visual
        // const msDisplay = Math.floor((ms % 1000) / 100).toString(); // Exibe a dezena do ms

        const pad = (num: number) => num.toString().padStart(2, "0");

        // Exibe os segundos com a dezena de milissegundo (ex: 45.3s)
        return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    };

    // Cálculo final do total recebido (base + acumulado)
    const totalIncome = purchase.daily_income + accumulatedCurrentCycle;
    // --- Lógica do Progresso Total (Porcentagem) ---
    const totalCycles = purchase.package.total_duration;
    let totalCompletionPercentage = 0;

    if (cyclePayoutAmount > 0 && totalCycles > 0) {
        // 1. Ciclos totalmente pagos (baseado no rendimento já recebido)
        const cyclesCompletedBase = purchase.daily_income / cyclePayoutAmount;

        // 2. Progresso do ciclo atual (fração)
        const cycleProgressFraction =
            accumulatedCurrentCycle / cyclePayoutAmount;

        // 3. Progresso total em termos de ciclos
        const totalProgressCycles = cyclesCompletedBase + cycleProgressFraction;

        // 4. Porcentagem total
        totalCompletionPercentage = (totalProgressCycles / totalCycles) * 100;

        // Garante que não ultrapasse 100%
        totalCompletionPercentage = Math.min(totalCompletionPercentage, 100);
    }

    return {
        timeLeftMs,
        accumulatedCurrentCycle: parseFloat(accumulatedCurrentCycle.toFixed(2)), // Arredonda para 2 casas decimais
        cyclePayoutAmount: parseFloat(cyclePayoutAmount.toFixed(2)),
        totalIncome: parseFloat(totalIncome.toFixed(2)), // Arredonda para 2 casas decimais
        totalCompletionPercentage: parseFloat(
            totalCompletionPercentage.toFixed(2)
        ),
        formatTime,
    };
};
