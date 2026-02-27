import { fetchTransactionsStatistics } from "@/services/transactionsService";
import { TransactionsStatistics } from "@/types/transaction";
import { formatCurrency } from "@/utils/helpers";
import { useEffect, useState } from "react";

export function HeaderTransactions() {
    const [data, setData] = useState<TransactionsStatistics>();

    const fetchData = async () => {
        try {
            const statistics = await fetchTransactionsStatistics();
            setData(statistics);
        } catch (error) {
            console.error("Erro ao buscar transações:", error);
            // Implementar toast.error aqui
        }
    };

    // Efeito para buscar dados quando a página ou filtros mudarem
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            {data && (
                <div className="p-4 font-sans text-ebony-clay-300">
                    <div className="w-full border border-ebony-clay-700 shadow-sm shadow-ebony-clay-700 bg-gradient-to-r from-ebony-clay-950 to-ebony-clay-900 p-4 flex flex-col rounded-xl">
                        <div className="flex justify-between">
                            <div className="flex flex-col">
                                <h4 className="font-semibold">Entradas</h4>
                                <small className="text-xs">
                                    {formatCurrency(data.total_entradas)}
                                </small>
                            </div>

                            <div className="flex flex-col">
                                <h4 className="font-semibold">Saídas</h4>
                                <small className="text-xs">
                                    -{formatCurrency(data.total_saidas)}
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
