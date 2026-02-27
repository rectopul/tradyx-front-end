import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
    ArrowUpRight,
    ArrowDownRight,
    Clock,
    ShoppingCart,
    Award,
    SortDesc,
    SortAsc,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ApiException } from "@/utils/api-errors";
import { DepositStatus } from "@/types";
import { formatDateTime } from "@/utils/formatters";
import { TransactionSummary } from "./transactionSummary";
import { useUser } from "@/contexts/UserProvider";

// Tipo de transação genérica para o componente
export type TransactionType =
    | "deposit"
    | "withdrawal"
    | "purchase"
    | "commission";

export interface RecentTransaction {
    id: string;
    type: TransactionType;
    description: string | null;
    amount: number;
    date: string;
    status: string | DepositStatus;
    rawDate?: Date | null;
}

// Função para ordenar por valor
const sortTransactionsByAmount = (
    transactions: RecentTransaction[],
    direction: "asc" | "desc"
) => {
    return [...transactions].sort((a, b) => {
        // Garante que os valores sejam números
        const amountA = typeof a.amount === "number" ? a.amount : 0;
        const amountB = typeof b.amount === "number" ? b.amount : 0;

        return direction === "desc"
            ? amountB - amountA // Maior para menor
            : amountA - amountB; // Menor para maior
    });
};

// Função para ordenar por tipo de transação
const sortTransactionsByType = (
    transactions: RecentTransaction[],
    direction: "asc" | "desc"
) => {
    return [...transactions].sort((a, b) => {
        // Definir uma ordem para os tipos de transação
        const typeOrder = {
            deposit: 1,
            withdrawal: 2,
            commission: 3,
            purchase: 4,
        };

        // Obter o valor numérico para cada tipo
        const typeValueA = typeOrder[a.type] || 999; // Valor alto para tipos desconhecidos
        const typeValueB = typeOrder[b.type] || 999;

        // Ordenar com base na direção
        return direction === "desc"
            ? typeValueB - typeValueA
            : typeValueA - typeValueB;
    });
};

// Função original para ordenar por data (com correções)
const sortTransactionsByDate = (
    transactions: RecentTransaction[],
    direction: "asc" | "desc"
) => {
    return [...transactions].sort((a, b) => {
        let dateA, dateB;

        // Tenta usar rawDate primeiro
        if (a.rawDate) {
            dateA = a.rawDate;
        } else {
            // Tenta converter a string de data
            try {
                dateA = new Date(a.date.replace(" ", "T"));
            } catch (e) {
                dateA = new Date(0); // Data mínima em caso de erro
            }
        }

        if (b.rawDate) {
            dateB = b.rawDate;
        } else {
            try {
                dateB = new Date(b.date.replace(" ", "T"));
            } catch (e) {
                dateB = new Date(0);
            }
        }

        // Verifica se as datas são válidas
        if (isNaN(dateA.getTime())) dateA = new Date(0);
        if (isNaN(dateB.getTime())) dateB = new Date(0);

        return direction === "desc"
            ? dateB.getTime() - dateA.getTime()
            : dateA.getTime() - dateB.getTime();
    });
};

// Função para obter ícone baseado no tipo de transação
function getTransactionIcon(type: TransactionType) {
    switch (type) {
        case "deposit":
            return <ArrowUpRight className="h-4 w-4 text-green-500" />;
        case "withdrawal":
            return <ArrowDownRight className="h-4 w-4 text-red-500" />;
        case "purchase":
            return <ShoppingCart className="h-4 w-4 text-blue-500" />;
        case "commission":
            return <Award className="h-4 w-4 text-purple-500" />;
    }
}

// Função geral para ordenar com base no critério selecionado
const sortTransactions = (
    transactions: RecentTransaction[],
    sortCriteria: "date" | "amount" | "type",
    direction: "asc" | "desc"
) => {
    switch (sortCriteria) {
        case "amount":
            return sortTransactionsByAmount(transactions, direction);
        case "type":
            return sortTransactionsByType(transactions, direction);
        case "date":
        default:
            return sortTransactionsByDate(transactions, direction);
    }
};

// Função para obter badge de status
function getStatusBadge(status: string) {
    switch (status) {
        case "approved":
        case "active":
            return (
                <Badge
                    variant="outline"
                    className="bg-green-50 text-green-600 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-800"
                >
                    Concluído
                </Badge>
            );
        case "pending":
        case "process":
            return (
                <Badge
                    variant="outline"
                    className="bg-yellow-50 text-yellow-600 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-400 dark:border-yellow-800"
                >
                    Pendente
                </Badge>
            );
        case "rejected":
        case "inactive":
            return (
                <Badge
                    variant="outline"
                    className="bg-red-50 text-red-600 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800"
                >
                    Rejeitado
                </Badge>
            );
        case "paid":
            return (
                <Badge
                    variant="outline"
                    className="bg-green-50 text-green-600 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-800"
                >
                    Pago
                </Badge>
            );
        default:
            return <Badge variant="outline">Desconhecido</Badge>;
    }
}

export function RecentTransactions() {
    const [recentTransactions, setRecentTransactions] = useState<
        RecentTransaction[]
    >([]);
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
    const [isLoading, setIsLoading] = useState(true);
    const { deposits, withdraws, ledgers, purchases } = useUser();
    const [sortCriteria, setSortCriteria] = useState<
        "date" | "amount" | "type"
    >("date");

    const handleGetDeposits = async () => {
        try {
            setRecentTransactions((prev) => {
                const existingIds = new Set(prev.map((t) => t.id)); // Coleta IDs já existentes

                const newTransactions = deposits
                    .map((dp) => ({
                        amount: dp.amount,
                        date: dp.created_at
                            ? formatDateTime(dp.created_at)
                            : "Data indisponível",
                        rawDate: dp.created_at ? new Date(dp.created_at) : null, // Adicione a data original
                        description: "Depósito via PIX",
                        status: dp.status || "Desconhecido",
                        id: String(dp.transaction_id ?? `dep_${Math.random()}`),
                        type: "deposit" as TransactionType,
                    }))
                    .filter((transaction) => !existingIds.has(transaction.id)); // Remove IDs duplicados

                const withdrawsTransactions = withdraws
                    .map((wd) => ({
                        amount: wd.amount,
                        date: wd.created_at
                            ? formatDateTime(wd.created_at)
                            : "Saque via pix",
                        rawDate: wd.created_at ? new Date(wd.created_at) : null, // Adicione a data original
                        description: "Saque via PIX",
                        status: wd.status || "Desconhecido",
                        id: String(wd.transaction_id ?? `dep_${Math.random()}`),
                        type: "withdrawal" as TransactionType,
                    }))
                    .filter((transaction) => !existingIds.has(transaction.id)); // Remove IDs duplicados

                const comissionsTransactions = ledgers
                    .filter(
                        (transaction) => transaction.reason === "commission"
                    )
                    .map((ld) => ({
                        amount: ld.amount,
                        date: ld.created_at
                            ? formatDateTime(ld.created_at)
                            : "Data indisponível",
                        rawDate: ld.created_at ? new Date(ld.created_at) : null,
                        description: "Comissão",
                        status: "paid",
                        id: String(`leadger_${ld.id}`),
                        type: "commission" as TransactionType,
                    }))
                    .filter((transaction) => !existingIds.has(transaction.id)); // Remove IDs duplicados

                const purchasesTransactions = purchases
                    .map((pc) => ({
                        amount: pc.amount,
                        date: pc.created_at
                            ? formatDateTime(pc.created_at)
                            : "Data indisponível",
                        rawDate: pc.created_at ? new Date(pc.created_at) : null,
                        description: "Investimento Premium",
                        status: pc.status,
                        id: pc.transaction_id, // Garante que ID seja string
                        type: "purchase" as TransactionType,
                    }))
                    .filter((transaction) => !existingIds.has(transaction.id)); // Remove IDs duplicados

                // Combina transações existentes com novas
                const combinedTransactions = [
                    ...prev,
                    ...newTransactions,
                    ...withdrawsTransactions,
                    ...comissionsTransactions,
                    ...purchasesTransactions,
                ];

                return sortTransactions(
                    combinedTransactions,
                    sortCriteria,
                    sortDirection
                );
            });
        } catch (error) {
            console.log(`erro ao buscar depositos`);
            if (error instanceof ApiException) {
                toast.error(error.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    // Modifique a função toggleSortDirection para usar o novo critério
    const toggleSortDirection = () => {
        const newDirection = sortDirection === "desc" ? "asc" : "desc";
        setSortDirection(newDirection);
        setRecentTransactions(
            sortTransactions(recentTransactions, sortCriteria, newDirection)
        );
    };

    // Adicione uma função para mudar o critério de ordenação
    const changeSortCriteria = (criteria: "date" | "amount" | "type") => {
        setSortCriteria(criteria);
        setRecentTransactions(
            sortTransactions(recentTransactions, criteria, sortDirection)
        );
    };

    useEffect(() => {
        handleGetDeposits().then(() => {
            console.log(`ultimas transaçoes: `, recentTransactions);
        });
    }, [deposits, withdraws, ledgers, purchases]);

    return (
        <>
            {!isLoading && (
                <TransactionSummary transactions={recentTransactions} />
            )}
            <Card className="mt-5">
                <CardHeader className="flex max-md:flex-col flex-row items-center justify-between">
                    <div>
                        <CardTitle>Transações Recentes</CardTitle>
                        <CardDescription>
                            Suas últimas movimentações na plataforma
                        </CardDescription>
                    </div>
                    <div className="flex gap-2 max-md:pt-4">
                        <span className="my-auto mr-2 max-md:hidden">
                            Ordenar:
                        </span>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => changeSortCriteria("date")}
                            className={
                                sortCriteria === "date"
                                    ? "bg-primary text-primary-foreground"
                                    : ""
                            }
                        >
                            Por Data
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => changeSortCriteria("amount")}
                            className={
                                sortCriteria === "amount"
                                    ? "bg-primary text-primary-foreground"
                                    : ""
                            }
                        >
                            Por Valor
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => changeSortCriteria("type")}
                            className={
                                sortCriteria === "type"
                                    ? "bg-primary text-primary-foreground"
                                    : ""
                            }
                        >
                            Por Tipo
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={toggleSortDirection}
                            title={`Ordenar ${
                                sortCriteria === "date"
                                    ? "por data"
                                    : sortCriteria === "amount"
                                    ? "por valor"
                                    : "por tipo"
                            } (${
                                sortDirection === "desc"
                                    ? sortCriteria === "date"
                                        ? "mais recente primeiro"
                                        : sortCriteria === "amount"
                                        ? "maior valor primeiro"
                                        : "A-Z"
                                    : sortCriteria === "date"
                                    ? "mais antiga primeiro"
                                    : sortCriteria === "amount"
                                    ? "menor valor primeiro"
                                    : "Z-A"
                            })`}
                        >
                            {sortDirection === "desc" ? (
                                <SortDesc className="h-4 w-4" />
                            ) : (
                                <SortAsc className="h-4 w-4" />
                            )}
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="flex justify-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        </div>
                    ) : recentTransactions.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            Nenhuma transação encontrada
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {recentTransactions.map((transaction) => (
                                <div
                                    key={transaction.id}
                                    className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/30"
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                                            {getTransactionIcon(
                                                transaction.type
                                            )}
                                        </div>

                                        <div>
                                            <p className="font-medium">
                                                {transaction.description}
                                            </p>
                                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                <Clock className="h-3 w-3" />
                                                <span>{transaction.date}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-end gap-1">
                                        <span
                                            className={`font-medium ${
                                                transaction.type ===
                                                    "withdrawal" ||
                                                transaction.type === "purchase"
                                                    ? "text-red-500"
                                                    : "text-green-500"
                                            }`}
                                        >
                                            {transaction.type ===
                                                "withdrawal" ||
                                            transaction.type === "purchase"
                                                ? "-"
                                                : "+"}
                                            ${" "}
                                            {transaction.amount.toLocaleString(
                                                "pt-BR",
                                                { minimumFractionDigits: 2 }
                                            )}
                                        </span>
                                        {getStatusBadge(transaction.status)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </>
    );
}
