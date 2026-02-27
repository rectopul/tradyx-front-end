import { TrendingUp, Wallet } from "lucide-react";

interface Props {
    totalInvested: number;
    totalProfit: number;
}

export default function InvestmentSummaryCard({
    totalInvested,
    totalProfit,
}: Props) {
    return (
        <div className="p-4">
            <div className="w-full max-w-md mx-auto p-6 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-lg flex items-center justify-between">
                {/* Coluna 1 - Total Investido */}
                <div className="flex flex-col items-center flex-1">
                    <div className="flex items-center gap-2 text-ebony-clay-100">
                        <Wallet className="w-5 h-5 text-emerald-400" />
                        <span className="text-sm font-medium">
                            Total Investido
                        </span>
                    </div>
                    <p className="text-2xl font-semibold text-white mt-1">
                        R${" "}
                        {totalInvested.toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                        })}
                    </p>
                </div>

                {/* Divisória */}
                <div className="h-12 w-px bg-white/30 mx-4" />

                {/* Coluna 2 - Total de Lucros */}
                <div className="flex flex-col items-center flex-1">
                    <div className="flex items-center gap-2 text-ebony-clay-100">
                        <TrendingUp className="w-5 h-5 text-amber-400" />
                        <span className="text-sm font-medium">
                            Total de Lucros
                        </span>
                    </div>
                    <p className="text-2xl font-semibold text-emerald-400 mt-1">
                        R${" "}
                        {totalProfit.toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                        })}
                    </p>
                </div>
            </div>
        </div>
    );
}
