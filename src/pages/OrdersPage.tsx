import { PackageProgress } from "@/components/package/package-progress";
import { ReinvestmentCard } from "@/components/package/reinvestment-card";
import { Spinner } from "@/components/ui/spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "@/contexts/UserProvider";
import { investmentService } from "@/services/investment";
import { Reinvestment } from "@/types";
import { Purchase } from "@/types/purchase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function OrdersPage() {
    const { purchases, refreshPurchases } = useUser();
    const [activePurchases, setActivePurchases] = useState<Purchase[]>([]);
    const [_, setInactivePurchases] = useState<Purchase[]>([]);
    const [reinvestments, setReinvestments] = useState<Reinvestment[]>([]);
    const navigate = useNavigate();

    const handleGetReinvestments = async () => {
        try {
            const reinvestments = await investmentService.reinvestmentsList();
            setReinvestments(reinvestments.data);
        } catch (error) {
            toast.error("Erro ao carregar os reinvestimentos.");
        }
    };

    useEffect(() => {
        const activePurchases = purchases.filter(
            (pch) => pch.status === "active"
        );
        const inactivePurchases = purchases.filter(
            (pch) => pch.status !== "active"
        );

        setInactivePurchases(inactivePurchases);

        setActivePurchases(activePurchases);
    }, [purchases]);

    useEffect(() => {
        refreshPurchases();
        handleGetReinvestments();
    }, []);

    if (!purchases) {
        return <Spinner />;
    }

    return (
        <div className="w-full flex flex-col font-sans px-2 mb-24">
            <div className="mt-6 flex flex-col gap-1 mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Meus Investimentos</h2>
                <p className="text-sm text-gray-400 font-medium">
                    Acompanhe seus planos ativos e reinvestimentos.
                </p>
            </div>

            <Tabs defaultValue="actives" className="w-full">
                <TabsList className="w-full bg-gray-100/50 p-1 rounded-2xl h-14 mb-6">
                    <TabsTrigger
                        value="actives"
                        className="basis-1/2 rounded-xl h-12 data-[state=active]:bg-white data-[state=active]:shadow-sm font-bold"
                    >
                        Planos Ativos
                    </TabsTrigger>
                    <TabsTrigger
                        value="reinvestments"
                        className="basis-1/2 rounded-xl h-12 data-[state=active]:bg-white data-[state=active]:shadow-sm font-bold"
                    >
                        Reinvestimentos
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="actives">
                    <div className="flex flex-col gap-4">
                        {purchases.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 bg-white rounded-[32px] border border-gray-100 shadow-sm px-6 text-center">
                                <div className="w-16 h-16 rounded-full bg-brand/10 flex items-center justify-center text-brand mb-4">
                                    <TrendingUp className="w-8 h-8" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900">Nenhum investimento ativo</h3>
                                <p className="text-sm text-gray-400 mt-2 mb-6">Comece a aumentar seu patrimônio escolhendo um plano.</p>
                                <button
                                    onClick={() => navigate("/")}
                                    className="bg-brand hover:bg-brand/90 text-gray-900 font-bold rounded-2xl px-8 py-3 shadow-lg shadow-brand/20 transition-all"
                                >
                                    Investir Agora
                                </button>
                            </div>
                        ) : (
                            activePurchases.map((purch, key) => (
                                <PackageProgress
                                    purchase={purch}
                                    key={`pkg-prog-${key}`}
                                />
                            ))
                        )}
                    </div>
                </TabsContent>
                <TabsContent value="reinvestments">
                    <div className="flex flex-col gap-4">
                        {reinvestments.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 bg-white rounded-[32px] border border-gray-100 shadow-sm px-6 text-center">
                                <div className="w-16 h-16 rounded-full bg-brand/10 flex items-center justify-center text-brand mb-4">
                                    <RotateCcw className="w-8 h-8" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900">Nenhum reinvestimento</h3>
                                <p className="text-sm text-gray-400 mt-2 mb-6">Reinvista seus lucros para maximizar seus retornos.</p>
                                <button
                                    onClick={() => navigate("/")}
                                    className="bg-brand hover:bg-brand/90 text-gray-900 font-bold rounded-2xl px-8 py-3 shadow-lg shadow-brand/20 transition-all"
                                >
                                    Ver Planos
                                </button>
                            </div>
                        ) : (
                            reinvestments.map((reinv, key) => (
                                <ReinvestmentCard
                                    reinvestment={reinv}
                                    key={`reinvest-item-${key}`}
                                />
                            ))
                        )}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
