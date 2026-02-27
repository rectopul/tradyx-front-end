import { WithdrawsDataTable } from "./list/data-table";
import { getWithdawsColumns } from "./list/columns";
import { toast } from "sonner";
import {
    fetchApproveWithdraw,
    fetchRejectWithdraw,
} from "@/services/admin/withdraw";
import { formatCurrency } from "@/utils/helpers";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownToLine, ArrowUpToLine, Clock, XCircle } from "lucide-react";
import {
    fetchWithdrawsStatistics,
    WithdrawsStatics,
} from "@/services/adminServices";
import {
    updateWithdrawalCache,
    useAdminWithdraws,
} from "@/hooks/admin/withdraw";
import { useQueryClient } from "@tanstack/react-query";
import { Withdrawal } from "@/types";
import { AxiosError } from "axios";
import { ApiException } from "@/utils/api-errors";

export function Withdraws() {
    const queryClient = useQueryClient();
    const { withdraws, isLoading } = useAdminWithdraws();
    const [statistics, setStatistics] = useState<WithdrawsStatics>({
        total_amount: 0,
        total_approved: 0,
        total_pending: 0,
        total_processing: 0,
        total_rejected: 0,
        total_amount_next_day: 0,
        total_count_next_day: 0,
    });

    const handleGetStatistics = async () => {
        try {
            const statistics = await fetchWithdrawsStatistics();
            setStatistics(statistics);
        } catch (error) {
            toast.error("Erro ao carregar estatísticas");
        }
    };

    useEffect(() => {
        handleGetStatistics();
    }, []);

    // Atualiza um registro de saque
    const updateWithdraw = (updated: Withdrawal) => {
        updateWithdrawalCache(queryClient, updated);
    };

    const handleApproveWithdraw = async (wId: number) => {
        toast.loading("Aprovando saque: " + wId);
        try {
            const withdraw = await fetchApproveWithdraw(wId);
            toast.dismiss();

            updateWithdraw(withdraw);

            // Recarrega as estatísticas após a ação
            await handleGetStatistics();

            toast.success(
                `Saque no valor de ${formatCurrency(
                    withdraw.final_amount
                )} aprovado com sucesso!`,
                {
                    action: {
                        label: "Fechar",
                        onClick: console.log,
                    },
                }
            );
        } catch (error) {
            toast.dismiss();
            if (error instanceof AxiosError) {
                const apiError = ApiException.fromAxiosError(error);

                if (apiError.hasErrorFor("amount")) {
                    toast.error("Erro ao autorizar saque", {
                        description: apiError.getErrorFor("amount"),
                        action: {
                            label: "Fechar",
                            onClick: console.log,
                        },
                    });
                    return;
                } else if (apiError.hasErrorFor("details")) {
                    toast.error("Erro ao autorizar saque", {
                        description: apiError.getErrorFor("details"),
                        action: {
                            label: "Fechar",
                            onClick: console.log,
                        },
                    });
                    return;
                } else if (apiError.hasErrorFor("message")) {
                    toast.error("Erro ao autorizar saque", {
                        description: apiError.getErrorFor("message"),
                        action: {
                            label: "Fechar",
                            onClick: console.log,
                        },
                    });
                    return;
                } else {
                    toast.error("Erro Aprovar saque", {
                        description: error.message,
                        action: {
                            label: "Fechar",
                            onClick: console.log,
                        },
                    });
                    return;
                }
            }

            toast.error("Erro ao aprovar saque");
            return;
        }
    };

    const handleRejectWithdraw = async (wId: number) => {
        toast.loading("Rejeitando saque: " + wId);
        try {
            const withdraw = await fetchRejectWithdraw(wId);
            toast.dismiss();

            updateWithdraw(withdraw);

            // Recarrega as estatísticas após a ação
            await handleGetStatistics();

            return toast.success(
                `Saque no valor de ${formatCurrency(
                    withdraw.final_amount
                )} foi rejeitado com sucesso o saldo do usuário foi devolvido!`
            );
        } catch (error) {
            toast.dismiss();
            toast.error("Erro ao rejeitar saque");
        }
    };

    const columns = getWithdawsColumns({
        onApprove: handleApproveWithdraw,
        onReject: handleRejectWithdraw,
    });

    return (
        <>
            <div className="w-full max-w-full overflow-x-auto">
                {/* Cards de estatísticas */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5 mb-6">
                    <Card className="shadow-md border border-gray-200">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Saques
                            </CardTitle>
                            <ArrowDownToLine className="h-4 w-4 text-gray-500" />
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">
                                {formatCurrency(statistics.total_amount)}
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="shadow-md border border-gray-200">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">
                                Aprovados
                            </CardTitle>
                            <ArrowUpToLine className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold text-green-600">
                                {formatCurrency(statistics.total_approved)}
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="shadow-md border border-gray-200">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">
                                Pendentes
                            </CardTitle>
                            <Clock className="h-4 w-4 text-yellow-500" />
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold text-yellow-600">
                                {formatCurrency(statistics.total_pending)}
                            </p>
                            <small className="text-yellow-600 text-xxs leading-3">
                                Estimativa para o próximo dia:{" "}
                                {formatCurrency(
                                    statistics.total_amount_next_day
                                )}{" "}
                                | ( {statistics.total_count_next_day} saques)
                            </small>
                        </CardContent>
                    </Card>

                    <Card className="shadow-md border border-gray-200">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">
                                Processando
                            </CardTitle>
                            <Clock className="h-4 w-4 text-blue-500" />
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold text-blue-600">
                                {formatCurrency(statistics.total_processing)}
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="shadow-md border border-gray-200">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">
                                Rejeitados
                            </CardTitle>
                            <XCircle className="h-4 w-4 text-red-500" />
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold text-red-600">
                                {formatCurrency(statistics.total_rejected)}
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Tabela de Withdraws */}
                {isLoading ? (
                    <div className="flex items-center justify-center h-[300px]">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                        <span className="ml-2 text-gray-600">
                            Carregando...
                        </span>
                    </div>
                ) : (
                    <WithdrawsDataTable
                        columns={columns}
                        data={withdraws}
                        onApprove={handleApproveWithdraw}
                        onReject={handleRejectWithdraw}
                    />
                )}
            </div>
        </>
    );
}
