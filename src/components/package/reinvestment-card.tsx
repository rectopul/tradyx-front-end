import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { formatCurrency } from "@/utils/helpers"; // Importe a função de formatação
import { Reinvestment } from "@/types"; // Assumindo que o tipo está em '@/types'

// Definição da Interface de Props
export interface ReinvestmentCardProps {
    reinvestment: Reinvestment;
}

// Componente Card de Reinvestimento
export const ReinvestmentCard: React.FC<ReinvestmentCardProps> = ({
    reinvestment,
}) => {
    const {
        amount,
        profit_percent,
        duration_days,
        status,
        created_at,
        completed_at,
    } = reinvestment;

    // 1. Lógica de Cálculo de Progresso
    const { progress, daysPassed } = useMemo(() => {
        if (!completed_at)
            return { progress: 0, daysPassed: 0, daysRemaining: duration_days };

        const start = new Date(created_at);
        const end = new Date(completed_at);
        const now = new Date();
        const totalMs = end.getTime() - start.getTime();

        // Verifica se o investimento ainda não começou (improvável, mas seguro)
        if (now.getTime() < start.getTime())
            return { progress: 0, daysPassed: 0, daysRemaining: duration_days };

        // Se já terminou
        if (now.getTime() >= end.getTime()) {
            return {
                progress: 100,
                daysPassed: duration_days,
                daysRemaining: 0,
            };
        }

        // Em andamento
        const elapsedMs = now.getTime() - start.getTime();
        const percentage = Math.min(
            100,
            Math.max(0, (elapsedMs / totalMs) * 100)
        );

        const msInDay = 1000 * 60 * 60 * 24;
        const totalDays = Math.ceil(totalMs / msInDay);
        const passedDays = Math.floor(elapsedMs / msInDay);
        const remainingDays = Math.max(totalDays - passedDays, 0);

        return {
            progress: percentage,
            daysPassed: passedDays,
            daysRemaining: remainingDays,
        };
    }, [created_at, completed_at, duration_days]);

    // 2. Determinar Estilos de Status
    const statusClasses = {
        pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
        completed: "bg-green-100 text-green-800 border-green-300",
        canceled: "bg-red-100 text-red-800 border-red-300",
    };

    const statusText = {
        pending: "Em Progresso",
        completed: "Concluído",
        canceled: "Cancelado",
    };

    // 3. Renderização do Componente
    return (
        <div className="w-full bg-white rounded-xl shadow-lg p-4 border border-gray-100 mb-4">
            {/* Cabeçalho */}
            <div className="flex justify-between items-start border-b pb-2 mb-3">
                <h3 className="text-ebony-clay-950 text-base font-extrabold">
                    Reinvestimento #{reinvestment.id}
                </h3>
                <span
                    className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${statusClasses[status]}`}
                >
                    {statusText[status]}
                </span>
            </div>

            {/* Detalhes Principais */}
            <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm">
                {/* Valor Reinvestido */}
                <DetailItem
                    label="Valor Inicial"
                    value={formatCurrency(amount)}
                    valueClass="text-pacific-blue-600 font-bold"
                />

                {/* Lucro Estimado */}
                <DetailItem
                    label="Lucro Estimado"
                    value={`${profit_percent}%`}
                    valueClass="text-green-600 font-bold"
                />

                {/* Duração */}
                <DetailItem
                    label="Duração Total"
                    value={`${duration_days} dias`}
                    valueClass="text-ebony-clay-800 font-semibold"
                />

                {/* Início */}
                <DetailItem
                    label="Iniciado em"
                    value={new Date(created_at).toLocaleDateString()}
                    valueClass="text-ebony-clay-600"
                />
            </div>

            {/* Progresso (Visível se não for Cancelado) */}
            {status !== "canceled" && (
                <div className="mt-4 pt-3 border-t border-gray-100 space-y-2">
                    <div className="flex justify-between text-xs text-ebony-clay-500 font-medium">
                        <span>
                            **{daysPassed} de {duration_days} dias**
                        </span>
                        <span className="text-emerald-600 font-bold">
                            {progress.toFixed(1)}% Concluído
                        </span>
                    </div>

                    {/* Barra de Progresso */}
                    <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 1.2, ease: "easeInOut" }}
                            className="absolute top-0 left-0 h-full bg-emerald-500 rounded-full"
                        />
                    </div>

                    {/* Data de Conclusão */}
                    {completed_at && (
                        <div className="text-xs text-ebony-clay-400 text-right">
                            Previsão de Conclusão: **
                            {new Date(completed_at).toLocaleDateString()}**
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

// Componente auxiliar para Detalhes (pode ser reutilizado do seu código anterior)
interface DetailItemProps {
    label: string;
    value: string | number;
    valueClass: string;
}

const DetailItem: React.FC<DetailItemProps> = ({
    label,
    value,
    valueClass,
}) => (
    <div className="flex flex-col">
        <span className="text-ebony-clay-500 text-xs uppercase">{label}</span>
        <span className={`text-sm mt-0.5 ${valueClass}`}>{value}</span>
    </div>
);
