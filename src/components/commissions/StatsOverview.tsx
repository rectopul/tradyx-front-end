import React from "react";
import { formatCurrency } from "../../utils/formatters";
import { ArrowUpRight, Clock, CreditCard } from "lucide-react";

interface StatsOverviewProps {
    totalCommission: number;
    pendingCommission: number;
    paidCommission: number;
    totalReferrals: number;
    activeReferrals: number;
    investorReferrals: number;
}

const StatsOverview: React.FC<StatsOverviewProps> = ({
    totalCommission,
    pendingCommission,
    paidCommission,
    totalReferrals,
    investorReferrals,
}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-sm p-6 text-white transition-transform hover:translate-y-[-2px] duration-300">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm font-medium text-blue-100 mb-1">
                            Total de Comissões
                        </p>
                        <h3 className="text-2xl font-bold">
                            {formatCurrency(totalCommission)}
                        </h3>
                        <div className="mt-1 flex items-center">
                            <span className="flex items-center text-xs font-medium text-blue-100 bg-white/10 px-2 py-0.5 rounded">
                                <span>{totalReferrals} Indicados</span>
                                <ArrowUpRight size={12} className="ml-1" />
                            </span>
                        </div>
                    </div>
                    <div className="bg-white/20 p-3 rounded-full">
                        <CreditCard className="h-6 w-6 text-white" />
                    </div>
                </div>
                <div className="mt-4 pt-4 border-t border-blue-400/30">
                    <div className="flex justify-between text-sm">
                        <span className="text-blue-100">Taxa de Conversão</span>
                        <span className="font-medium">
                            {Math.round(
                                (investorReferrals / totalReferrals) * 100
                            )}
                            %
                        </span>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 p-6 transition-transform hover:translate-y-[-2px] duration-300">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm font-medium text-slate-500 mb-1">
                            Comissões Pendentes
                        </p>
                        <h3 className="text-2xl font-bold text-amber-600">
                            {formatCurrency(pendingCommission)}
                        </h3>
                        <div className="mt-1">
                            <span className="inline-flex items-center text-xs font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                                Em processamento
                            </span>
                        </div>
                    </div>
                    <div className="bg-amber-100 p-3 rounded-full">
                        <Clock className="h-6 w-6 text-amber-600" />
                    </div>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-200">
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-500">
                            Estimativa de pagamento
                        </span>
                        <span className="font-medium text-slate-700">
                            7 dias
                        </span>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 p-6 transition-transform hover:translate-y-[-2px] duration-300">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm font-medium text-slate-500 mb-1">
                            Comissões Pagas
                        </p>
                        <h3 className="text-2xl font-bold text-emerald-600">
                            {formatCurrency(paidCommission)}
                        </h3>
                        <div className="mt-1">
                            <span className="inline-flex items-center text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                                Finalizado
                            </span>
                        </div>
                    </div>
                    <div className="bg-emerald-100 p-3 rounded-full">
                        <CreditCard className="h-6 w-6 text-emerald-600" />
                    </div>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-200">
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Último pagamento</span>
                        <span className="font-medium text-slate-700">
                            15/06/2024
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatsOverview;
