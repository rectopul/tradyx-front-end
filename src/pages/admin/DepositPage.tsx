import { DataTableDeposits } from "@/components/admin/deposit/data-table";
import {
    fetchDepositsStatistics,
    fetchSearchDeposits,
    handleFetchDeposits,
    updateDepositStatus,
    WithdrawsStatics,
} from "@/services/adminServices";
import { Deposit, DepositStatus } from "@/types";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownToLine, ArrowUpToLine, Clock, XCircle } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download, Search } from "lucide-react";
import { Label } from "@/components/ui/label";
import { getColumns } from "@/components/admin/deposit/columns";
import { useAdmin } from "@/contexts/admin/admin-context";
import { AxiosError } from "axios";
import { ApiException } from "@/utils/api-errors";
import { useEffect, useState } from "react";
import { formatCurrency } from "@/utils/helpers";

function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
}

export function DepositPage() {
    const { updateDeposits } = useAdmin();
    const [deposits, setDeposits] = useState<Deposit[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchValue, setSearchValue] = useState("");
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
        pageCount: -1, // -1 para que o React-Table não mostre o número de páginas até que a API retorne
        totalCount: 0,
    });
    const [statistics, setDepositStatistics] = useState<WithdrawsStatics>({
        total_amount: 0,
        total_approved: 0,
        total_pending: 0,
        total_processing: 0,
        total_rejected: 0,
        total_amount_next_day: 0,
        total_count_next_day: 0,
    });

    const debouncedSearchValue = useDebounce(searchValue, 500);

    const handleGetStatistics = async () => {
        try {
            const depositStatistics = await fetchDepositsStatistics();

            setDepositStatistics(depositStatistics);
        } catch (error) {
            toast.error("Erro ao buscar estatisticas");
        }
    };

    useEffect(() => {
        const fetchDeposits = async () => {
            setLoading(true);
            try {
                let response;

                if (debouncedSearchValue) {
                    response = await fetchSearchDeposits(debouncedSearchValue);
                } else {
                    response = await handleFetchDeposits(
                        pagination.pageIndex + 1,
                        pagination.pageSize
                    );
                }

                setDeposits(response.deposits.data);
                setPagination((prev) => ({
                    ...prev,
                    pageCount: response.deposits.last_page,
                    totalCount: response.deposits.total,
                }));
            } catch (error) {
                console.error("Failed to fetch deposits:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDeposits();
        handleGetStatistics();
    }, [pagination.pageIndex, pagination.pageSize, debouncedSearchValue]);

    const handleStatusChange = async (
        depositId: number,
        newStatus: DepositStatus
    ) => {
        toast.loading("Aplicando alteraçoes");
        try {
            const response = await updateDepositStatus(depositId, newStatus);
            toast.dismiss();
            toast.success(response.message);

            const updated = deposits.map((d) =>
                d.id === depositId ? response.data : d
            );

            updateDeposits(updated);
        } catch (error) {
            toast.dismiss();

            if (error instanceof AxiosError) {
                const apiError = ApiException.fromAxiosError(error);

                if (apiError.hasErrorFor("minimum_withdraw")) {
                    toast.error("Erro ao atualizar mínimo de psaque", {
                        description: apiError.getErrorFor("minimum_withdraw"),
                    });
                    return;
                } else {
                    toast.error("Erro ao atualizar depósito", {
                        description: error.message,
                    });
                    return;
                }
            }

            toast.error("Erro ao atualizar depósito", {
                description: "Erro desconhecido",
            });

            return;
        } finally {
            toast.dismiss();
        }
    };

    const handlePaginationChange = (updater: any) => {
        setPagination((old) => {
            const newPagination =
                typeof updater === "function" ? updater(old) : updater;
            // Evita a busca desnecessária se os valores não mudarem
            if (
                newPagination.pageIndex !== old.pageIndex ||
                newPagination.pageSize !== old.pageSize
            ) {
                return newPagination;
            }
            return old;
        });
    };

    const columns = getColumns({ onStatusChange: handleStatusChange });

    return (
        <>
            {/* Cards de estatísticas */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5 mb-6">
                <Card className="shadow-md border border-gray-200">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            Volume total
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
            <div className="rounded-md border border-slate-200/70 p-4">
                <div className="w-full flex max-md:flex-col max-md:gap-3 max-md:items-start items-center py-3">
                    <span className="font-bold text-xl">Depósitos</span>

                    <div className="flex-1 flex max-md:flex-col justify-end gap-2 md:items-center md:ml-auto">
                        <div className="text-sm relative rounded-sm py-2 px-2 h-8 flex items-center border focus-within:ring-[1px] focus-visible:ring-[2px] border-slate-200 focus-within:ring-ring/30 focus-within:ring-offset-[1px] transition-colors">
                            <Label className="text-slate-400">
                                <Search size={17} />
                            </Label>
                            <Input
                                placeholder="Buscar"
                                onChange={(e) => setSearchValue(e.target.value)}
                                className="w-[200px] h-6 border-none outline-none focus-visible:outline-none focus-visible:border-none focus-visible:ring-ring/50 focus-visible:ring-0 focus-visible:ring-offset-0"
                            />
                        </div>

                        <Select>
                            <SelectTrigger className="w-[120px] focus:ring-0 rounded-sm focus:ring-offset-0 h-8">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent className="rounded-sm">
                                <SelectItem
                                    className="text-sm"
                                    value="transaction_id"
                                >
                                    Pendente
                                </SelectItem>
                                <SelectItem
                                    className="text-sm"
                                    value="transaction_id"
                                >
                                    Aprovado
                                </SelectItem>
                            </SelectContent>
                        </Select>

                        <Button
                            variant="outline"
                            size="sm"
                            className="h-8 px-2 rounded-sm gap-1"
                        >
                            <Download className="h-4 w-4" />
                            <span className="text-xs font-normal">
                                Exportar
                            </span>
                        </Button>
                    </div>
                </div>
                <DataTableDeposits
                    columns={columns}
                    data={deposits}
                    pagination={pagination}
                    setPagination={handlePaginationChange}
                    loading={loading}
                    pageCount={pagination.pageCount} // Passa o total de páginas
                />
            </div>
        </>
    );
}
