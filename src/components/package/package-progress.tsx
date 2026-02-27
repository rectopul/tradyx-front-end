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
            <div className="w-full rounded-xl bg-white p-4 grid grid-cols-[80px_auto] gap-3 shadow-lg">
                {/* 1. Imagem do Pacote (w-20 fixo) */}
                <figure className="w-[80px] h-[80px] self-start">
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
                        className="w-full h-full object-cover rounded-lg border border-gray-200"
                    />
                </figure>

                {/* 2. Conteúdo Principal (Texto e Ações) */}
                <div className="flex flex-col justify-between">
                    {/* A. Título e Lucro */}
                    <div className="flex flex-col mb-2">
                        <h2 className="text-ebony-clay-950 text-base font-bold truncate">
                            {purchase.package?.name ?? "Pacote de Investimento"}
                        </h2>
                        <span className="text-green-600 font-extrabold text-lg mt-0.5">
                            + {formatCurrency(purchase.daily_income)}
                        </span>
                    </div>

                    {/* B. Barra de Progresso e Detalhes */}
                    {purchase.package && (
                        <div className="space-y-1 mb-3">
                            <div className="text-xs text-ebony-clay-500 font-medium flex justify-between">
                                <span>
                                    Ciclo: **{daysPassed} / {daysTotal} dias**
                                </span>
                                <span className="text-emerald-600 font-bold">
                                    {progress.toFixed(1)}%
                                </span>
                            </div>

                            <div className="relative w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{
                                        duration: 1.2,
                                        ease: "easeInOut",
                                    }}
                                    className="absolute top-0 left-0 h-full bg-emerald-500 rounded-full"
                                />
                            </div>

                            <div className="text-xs text-ebony-clay-400 mt-1">
                                Rendimento Diário: **
                                {formatCurrency(purchase.daily_income)}**
                            </div>
                        </div>
                    )}

                    {/* C. Botões de Ação (Linha Dedicada) */}
                    <div className="flex gap-2 justify-end pt-2 border-t border-gray-100">
                        {/* Botão de Reinvestir (MAIOR DESTAQUE) */}
                        <button
                            className={`flex-1 py-1.5 px-3 rounded-md transition-colors text-white text-xs font-semibold ${
                                canReinvest
                                    ? "bg-pacific-blue-600 hover:bg-pacific-blue-500"
                                    : "bg-gray-400 cursor-not-allowed"
                            }`}
                            onClick={() =>
                                canReinvest && setIsReinvestModalOpen(true)
                            }
                            disabled={!canReinvest}
                        >
                            Reinvestir
                        </button>

                        {/* Botão de Resgate */}
                        <button
                            className="flex-1 py-1.5 px-3 rounded-md bg-ebony-clay-800 hover:bg-ebony-clay-700 text-ebony-clay-200 text-xs font-semibold disabled:opacity-70"
                            onClick={handleRedeen}
                            disabled={!isRedeeming}
                        >
                            Resgatar
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
