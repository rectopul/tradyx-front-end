import { useEffect, useState } from "react";
import { TaskTable } from "@/admin/task/TaskTable";
import { TaskFilters } from "@/admin/task/TaskFilters";
import { fetchGetGatewayBalance } from "@/services/admin/settings";
import { formatCurrency } from "@/utils/helpers";
import { toast } from "sonner";
import {
    Card,
    CardHeader,
    CardContent,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { useAdminWithdraws } from "@/hooks/admin/withdraw";
import { Spinner } from "../ui/spinner";
import { Withdrawal } from "@/types";

export function AdminDashboard() {
    const [__, setSortBy] = useState("dueDate");
    const [gatewayBalance, setGatewayBalance] = useState<number>(0);
    const [loadingBalance, setLoadingBalance] = useState<boolean>(false);
    const { withdraws, isLoading } = useAdminWithdraws();
    const [pendingWithdraws, setPendingWithdraws] =
        useState<Withdrawal[]>(withdraws);

    const handleFetchGatewayBalance = async () => {
        try {
            setLoadingBalance(true);
            const balanceGate = await fetchGetGatewayBalance();
            setGatewayBalance(balanceGate.balance);
        } catch (error) {
            toast.error("Erro ao buscar saldo do gateway");
        } finally {
            setLoadingBalance(false);
        }
    };

    useEffect(() => {
        handleFetchGatewayBalance();
    }, []);

    useEffect(() => {
        setPendingWithdraws(withdraws);
    }, [isLoading]);

    const filtredWithdraws = pendingWithdraws.filter(
        (task) => task.status === "pending"
    );
    const rejectedWithdraws = pendingWithdraws.filter(
        (task) => task.status === "rejected"
    );

    return (
        <>
            {isLoading ? (
                <div className="">
                    <Spinner />
                </div>
            ) : (
                <div className="w-full space-y-6 p-4 md:p-6">
                    {/* Header principal */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-semibold text-slate-800">
                                Painel Administrativo
                            </h1>
                            <p className="text-sm text-slate-500">
                                Acompanhe o saldo do gateway e as tarefas do
                                sistema.
                            </p>
                        </div>

                        <Button
                            onClick={handleFetchGatewayBalance}
                            variant="outline"
                            className="flex items-center gap-2"
                            disabled={loadingBalance}
                        >
                            <RefreshCcw
                                className={`w-4 h-4 ${
                                    loadingBalance ? "animate-spin" : ""
                                }`}
                            />
                            Atualizar saldo
                        </Button>
                    </div>

                    {/* Card do saldo */}
                    <Card className="border border-slate-200 shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-slate-700">
                                Saldo do Gateway
                            </CardTitle>
                            <CardDescription>
                                Valor total disponível atualmente.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-blue-600">
                                {loadingBalance
                                    ? "Carregando..."
                                    : formatCurrency(gatewayBalance)}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Filtros */}
                    <Card className="border border-slate-200 shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-slate-700">
                                Filtros e Ordenação
                            </CardTitle>
                            <CardDescription>
                                Gerencie como as tarefas são exibidas.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <TaskFilters onSortChange={setSortBy} />
                        </CardContent>
                    </Card>

                    {/* Tabelas */}
                    <div className="space-y-6">
                        {filtredWithdraws.length > 0 && (
                            <Card className="border border-slate-200 shadow-sm">
                                <CardHeader>
                                    <CardTitle className="text-slate-700">
                                        Saques Pendentes
                                    </CardTitle>
                                    <CardDescription>
                                        Saques aguardando ação.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <TaskTable
                                        tasks={withdraws}
                                        section="todo"
                                    />
                                </CardContent>
                            </Card>
                        )}

                        {rejectedWithdraws.length > 0 && (
                            <Card className="border border-slate-200 shadow-sm">
                                <CardHeader>
                                    <CardTitle className="text-slate-700">
                                        Saques Rejeitados
                                    </CardTitle>
                                    <CardDescription>
                                        Saques que foram rejeitados.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <TaskTable
                                        tasks={rejectedWithdraws}
                                        section="active"
                                    />
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
