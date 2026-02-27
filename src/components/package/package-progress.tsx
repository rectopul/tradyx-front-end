import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { asset, formatCurrency } from "@/utils/helpers";
import { toast } from "sonner";
import { investmentService } from "@/services/investment";
import { AxiosError } from "axios";
import { ApiException } from "@/utils/api-errors";
import { useUser } from "@/contexts/UserProvider";
import { ReinvestModal } from "./reinvestment-modal";
import { Purchase } from "@/types/purchase";

export interface PackageProgressProps {
    purchase: Purchase;
}

export function PackageProgress({ purchase }: PackageProgressProps) {
    const { created_at, validity } = purchase;
    const { updatePurchase, updateUser, user } = useUser();
    const [isReinvestModalOpen, setIsReinvestModalOpen] = useState(false); // Estado para controlar o modal
    const [isRedeeming, setIsRedeeming] = useState(false); // Estado para o botão de resgate

    useEffect(() => {
        if (purchase.daily_income > 0) {
            setIsRedeeming(true); // Fecha o modal se total_paid for 0 ou menos
        } else {
            setIsRedeeming(false);
        }
    }, [purchase]);

    const handleRedeen = async () => {
        toast.loading("Resgatando investimento...");
        try {
            if (!isRedeeming) {
                toast.dismiss();
                toast.warning(
                    "Nenhum valor disponível para resgate no momento."
                );
            }

            const purchaseRedeem = await investmentService.redeenInvestment(
                purchase.id
            );

            updatePurchase(purchaseRedeem.data);

            if (user) {
                const newBalance = user.balance + purchase.daily_income;
                updateUser({ ...user, balance: newBalance });
            }

            toast.dismiss();

            toast.success("Resgate realizado com sucesso!", {
                description: purchaseRedeem.message,
            });
        } catch (error) {
            toast.dismiss();

            if (error instanceof AxiosError) {
                const apiError = ApiException.fromAxiosError(error);

                if (apiError.hasErrorFor("message")) {
                    toast.error("Erro ao resgatar saldo", {
                        description: apiError.getErrorFor("message"),
                    });
                    return;
                } else {
                    toast.error("Erro ao resgatar saldo", {
                        description: error.message,
                    });
                    return;
                }
            }

            toast.error("Erro interno", {
                description: "Erro desconhecido",
            });

            return;
        }
    };

    const { progress, daysTotal, daysPassed } = useMemo(() => {
        const start = new Date(created_at);
        const end = new Date(validity);
        const now = new Date();

        const totalMs = end.getTime() - start.getTime();
        const elapsedMs = now.getTime() - start.getTime();

        const percentage = Math.min(
            100,
            Math.max(0, (elapsedMs / totalMs) * 100)
        );

        const daysTotal = Math.ceil(totalMs / (1000 * 60 * 60 * 24));
        const daysPassed = Math.floor(elapsedMs / (1000 * 60 * 60 * 24));
        const daysRemaining = Math.max(daysTotal - daysPassed, 0);

        return { progress: percentage, daysTotal, daysPassed, daysRemaining };
    }, [created_at, validity]);

    // **Variável de controle para habilitar o botão de Reinvestir**
    const canReinvest = purchase.daily_income > 0;

    return (
        <>
            {/* 1. O Novo Modal de Reinvestimento */}
            <ReinvestModal
                purchase={purchase}
                isOpen={isReinvestModalOpen}
                onOpenChange={setIsReinvestModalOpen}
            />

            {/* 2. O Componente de Progresso Original */}
            <div className="w-full rounded-[32px] bg-white p-6 border border-gray-100 shadow-sm">
                <div className="flex items-start gap-5 mb-6">
                    <figure className="w-20 h-20 shrink-0">
                        <img
                            src={asset(
                                purchase.package
                                    ? purchase.package.photo
                                    : "https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=400"
                            )}
                            onError={(e) => {
                                e.currentTarget.src =
                                    "https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=400";
                            }}
                            alt={purchase.package?.name}
                            className="w-full h-full object-cover rounded-2xl border border-gray-100"
                        />
                    </figure>

                    <div className="flex flex-col flex-1 min-w-0">
                        <h2 className="text-gray-900 text-lg font-bold truncate">
                            {purchase.package?.name ?? "Plano de Investimento"}
                        </h2>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Lucro Atual</span>
                            <span className="text-emerald-600 font-extrabold text-base">
                                + {formatCurrency(purchase.daily_income)}
                            </span>
                        </div>
                    </div>
                </div>

                {purchase.package && (
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex justify-between items-end">
                                <span className="text-xs font-bold text-gray-400">
                                    Ciclo: <span className="text-gray-900">{daysPassed} de {daysTotal} dias</span>
                                </span>
                                <span className="text-sm font-extrabold text-gray-900">
                                    {progress.toFixed(1)}%
                                </span>
                            </div>

                            <div className="relative w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{
                                        duration: 1.2,
                                        ease: "easeInOut",
                                    }}
                                    className="absolute top-0 left-0 h-full bg-brand rounded-full"
                                />
                            </div>
                        </div>

                        <div className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-2xl border border-gray-100/50">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Rendimento Diário</span>
                            <span className="text-sm font-extrabold text-gray-900">{formatCurrency(purchase.daily_income)}</span>
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button
                                className={`flex-1 py-4 px-4 rounded-2xl transition-all font-bold text-sm shadow-lg active:scale-[0.98] ${
                                    canReinvest
                                        ? "bg-brand text-gray-900 shadow-brand/20"
                                        : "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none"
                                }`}
                                onClick={() =>
                                    canReinvest && setIsReinvestModalOpen(true)
                                }
                                disabled={!canReinvest}
                            >
                                Reinvestir
                            </button>

                            <button
                                className="flex-1 py-4 px-4 rounded-2xl bg-gray-900 text-white font-bold text-sm shadow-lg shadow-gray-200 active:scale-[0.98] disabled:opacity-50"
                                onClick={handleRedeen}
                                disabled={!isRedeeming}
                            >
                                Resgatar
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
