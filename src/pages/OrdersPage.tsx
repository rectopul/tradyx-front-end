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
        <div className="w-full pb-16 mb-12">
            <Tabs defaultValue="actives" className="w-full">
                <TabsList className="w-full bg-transparent gap-1">
                    <TabsTrigger
                        value="actives"
                        className="basis-1/2 font-semibold !text-white py-3 rounded-lg border border-ebony-clay-400 mb-4 text-sm bg-gradient-to-r from-ebony-clay-950 to-ebony-clay-900 data-[state=inactive]:opacity-70"
                    >
                        Resumo de rendimentos
                    </TabsTrigger>
                    <TabsTrigger
                        value="reinvestments"
                        className="basis-1/2 font-semibold !text-white py-3 rounded-lg border border-ebony-clay-400 mb-4 text-sm bg-gradient-to-r from-ebony-clay-950 to-ebony-clay-900 data-[state=inactive]:opacity-70"
                    >
                        Reinvestimentos
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="actives">
                    <div className="flex flex-col gap-2">
                        {purchases.length === 0 ? (
                            <div className="text-pacific-blue-950 text-md font-normal font-avenir text-center">
                                Nenhum investimento!
                                <button
                                    onClick={() => navigate("/")}
                                    className="bg-pacific-blue-500 mx-auto rounded-md mt-3 text-white flex justify-center items-center px-2 py-1"
                                >
                                    Investir agora
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
                    <div className="flex flex-col gap-2">
                        {reinvestments.length === 0 ? (
                            <div className="text-pacific-blue-950 text-md font-normal font-avenir text-center">
                                Nenhum Reinvestimento!
                                <button
                                    onClick={() => navigate("/packages")}
                                    className="bg-pacific-blue-500 mx-auto rounded-md mt-3 text-white flex justify-center items-center px-2 py-1"
                                >
                                    Investir agora
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
