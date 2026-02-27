"use client";

import { useState, useEffect } from "react";
import { columns } from "./columns";
import {
    Transaction,
    TransactionType,
    PaginatedData,
    TransactionStatus,
} from "@/types/transaction"; // Ajuste o caminho
import { DataTable } from "@/components/ui/data-table"; // Seu componente shadcn/tanstack Table
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Loader2, RotateCcw } from "lucide-react";
import { useMediaQuery } from "@uidotdev/usehooks";
import { TransactionCardList } from "./transaction-card-list";
import { fetchAllTransactions } from "@/services/transactionsService";
import { formatTransactionType } from "./transaction-helpers";

// Tipos disponíveis para o filtro
const ALL_TRANSACTION_TYPES: TransactionType[] = [
    "deposit",
    "withdraw",
    "commission",
    "purchase",
    "yield",
    "investment_withdrawal",
];

export function TransactionList() {
    const [data, setData] = useState<Transaction[]>([]);
    const [pagination, setPagination] = useState<
        Omit<PaginatedData<Transaction>, "data">
    >({
        current_page: 1,
        last_page: 1,
        total: 0,
        per_page: 10,
        from: 0,
        to: 0,
    } as any);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);

    // Estados para Filtros
    const [filterType, setFilterType] = useState<TransactionType | "all">(
        "all"
    );
    const [filterStatus, setFilterStatus] = useState<TransactionStatus | "all">(
        "all"
    );

    const fetchData = async (page: number) => {
        setLoading(true);
        try {
            const result = await fetchAllTransactions(
                page,
                filterType,
                filterStatus
            );
            setData(result.data);
            setPagination(result);
            setCurrentPage(result.current_page);
        } catch (error) {
            console.error("Erro ao buscar transações:", error);
            // Implementar toast.error aqui
        } finally {
            setLoading(false);
        }
    };

    // Efeito para buscar dados quando a página ou filtros mudarem
    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage, filterType, filterStatus]);

    // Função para resetar os filtros
    const handleResetFilters = () => {
        setFilterType("all");
        setFilterStatus("all");
        setCurrentPage(1); // Garante que a busca reinicie na página 1
    };

    // Handler para mudança de página (passado para o componente DataTable)
    const onPageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Detecta se a tela é desktop (maior ou igual ao breakpoint 'md': 768px)
    const isDesktop = useMediaQuery("(min-width: 768px)");

    return (
        <Card className="shadow-xl border border-ebony-clay-200 mb-20">
            <CardHeader className="bg-ebony-clay-50 border-b rounded-lg border-ebony-clay-100 p-4 sm:p-6">
                <CardTitle className="text-2xl font-extrabold text-ebony-clay-900">
                    Histórico de Transações
                </CardTitle>
                <CardDescription className="text-ebony-clay-700">
                    Aqui estão todas as suas movimentações recentes. Use os
                    filtros abaixo para refinar a busca.
                </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
                {/* Área de Filtros (Consistente) */}
                <div className="flex flex-wrap items-end gap-4 mb-6 p-4 border rounded-xl bg-ebony-clay-50">
                    {/* ... (Filtros por Tipo, Status e Botão Reset) ... */}

                    {/* Exemplo de Filtro por Tipo */}
                    <div className="flex flex-col space-y-1">
                        <label className="text-sm font-medium text-ebony-clay-800">
                            Tipo de Transação
                        </label>
                        <Select
                            value={filterType}
                            onValueChange={(value) => {
                                setFilterType(value as any);
                                setCurrentPage(1);
                            }}
                        >
                            {/* ... SelectTrigger e SelectContent ... */}
                            <SelectTrigger className="w-[180px] border-ebony-clay-300">
                                <SelectValue placeholder="Todos os Tipos" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">
                                    Todos os Tipos
                                </SelectItem>
                                {ALL_TRANSACTION_TYPES.map((tp, key) => (
                                    <SelectItem
                                        value={tp}
                                        key={`trans-type-${key}`}
                                    >
                                        {formatTransactionType(tp)}
                                    </SelectItem>
                                ))}
                                {/* Mapeamento dos tipos */}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Botão de Reset */}
                    <Button
                        variant="outline"
                        onClick={handleResetFilters}
                        className="bg-ebony-clay-50 text-ebony-clay-700 hover:bg-ebony-clay-100 border-ebony-clay-300"
                    >
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Resetar
                    </Button>
                </div>

                {/* Renderização Condicional */}
                {isDesktop ? (
                    /* VISÃO DESKTOP (Tabela) */
                    <DataTable
                        columns={columns}
                        data={data}
                        loading={loading}
                        pageCount={pagination.last_page}
                        currentPage={currentPage}
                        totalItems={pagination.total}
                        onPageChange={onPageChange}
                        perPage={pagination.per_page}
                    />
                ) : (
                    /* VISÃO MOBILE (Lista de Cards) */
                    <div className="relative">
                        {/* Indicador de Carregamento para Mobile */}
                        {loading && (
                            <div
                                className="absolute inset-0 z-10 flex items-center justify-center bg-white/70 rounded-lg"
                                style={{
                                    minHeight:
                                        data.length > 0 ? "auto" : "150px",
                                }}
                            >
                                <Loader2 className="h-8 w-8 animate-spin text-ebony-clay-600" />
                            </div>
                        )}
                        <TransactionCardList data={data} />
                    </div>
                )}

                {/* Paginação para Mobile (Simplificada) */}
                {/* Mostra apenas os botões Anterior/Próxima e o número da página no mobile */}
                {!isDesktop && pagination.last_page > 1 && (
                    <div className="flex items-center justify-between py-4 mt-4">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onPageChange(currentPage - 1)}
                            disabled={currentPage <= 1}
                        >
                            <ChevronLeft className="w-4 h-4 mr-1" /> Anterior
                        </Button>
                        <div className="text-sm font-medium text-ebony-clay-800">
                            Página {currentPage} de {pagination.last_page}
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onPageChange(currentPage + 1)}
                            disabled={currentPage >= pagination.last_page}
                        >
                            Próxima <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                    </div>
                )}

                {/* Informações de Paginação Resumidas no Footer */}
                <div className="text-sm text-gray-600 mt-4 pt-4 border-t border-ebony-clay-100">
                    Total de Transações: {pagination.total}
                </div>
            </CardContent>
        </Card>
    );
}
