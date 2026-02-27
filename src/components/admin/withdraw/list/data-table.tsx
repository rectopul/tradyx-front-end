"use client";

import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table";
import { MobileWithdrawalCard } from "./withdraw-card";
import { useMediaQuery } from "@uidotdev/usehooks";

import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    ChevronFirst,
    ChevronLast,
    ChevronLeft,
    ChevronRight,
    Columns,
    Download,
    Filter,
    RotateCcw,
    Search,
    X,
} from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Withdrawal, WithdrawalStatus } from "@/types";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    onApprove: (wId: number) => void;
    onReject: (wId: number) => void;
}

const STATUS_OPTIONS: {
    value: WithdrawalStatus;
    label: string;
    variant: "default" | "secondary" | "destructive" | "outline";
}[] = [
    { value: "pending", label: "Pendente", variant: "outline" },
    { value: "processing", label: "Processando", variant: "secondary" },
    { value: "approved", label: "Aprovado", variant: "default" },
    { value: "rejected", label: "Rejeitado", variant: "destructive" },
];

export function WithdrawsDataTable<TData, TValue>({
    data,
    columns,
    onApprove,
    onReject,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [selectedColumn, setSelectedColumn] = useState("name");
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
        {}
    );
    const [pageSize, setPageSize] = useState(10);
    const [pageIndex, setPageIndex] = useState(0);
    const [selectedStatuses, setSelectedStatuses] = useState<
        WithdrawalStatus[]
    >([]);

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onPaginationChange: (updater) => {
            const newState =
                typeof updater === "function"
                    ? updater(table.getState().pagination)
                    : updater;

            setPageSize(newState.pageSize);
            setPageIndex(newState.pageIndex);
        },
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            pagination: {
                pageSize,
                pageIndex,
            },
        },
        filterFns: {
            inArray: (row, columnId, filterValue) => {
                const value = row.getValue(columnId);
                return filterValue.includes(value);
            },
        },
    });

    // Obtenha todas as colunas filtráveis
    const filterableColumns = table
        .getAllColumns()
        .filter((column) => column.getCanFilter())
        .map((column) => ({
            id: column.id,
            name:
                column.id.charAt(0).toUpperCase() +
                column.id.slice(1).replace(/_/g, " "),
        }));

    // Função para atualizar a coluna e limpar o filtro anterior
    const handleColumnChange = (columnId: string) => {
        // Limpe o filtro da coluna anterior
        if (selectedColumn) {
            table.getColumn(selectedColumn)?.setFilterValue("");
        }

        // Atualize a coluna selecionada
        setSelectedColumn(columnId);
    };

    // Função para aplicar filtro de status
    const handleStatusFilter = (statuses: WithdrawalStatus[]) => {
        setSelectedStatuses(statuses);

        // Obter a coluna de status
        const statusColumn = table.getColumn("status");

        if (statusColumn) {
            if (statuses.length === 0) {
                // Se nenhum status está selecionado, remova o filtro
                statusColumn.setFilterValue(undefined);
            } else {
                // Aplique o filtro personalizado para verificar se o status
                // da linha está na lista de statuses selecionados
                statusColumn.setFilterValue(statuses);
            }
        }
    };

    // Função para alternar um status específico
    const toggleStatus = (status: WithdrawalStatus) => {
        const newStatuses = selectedStatuses.includes(status)
            ? selectedStatuses.filter((s) => s !== status)
            : [...selectedStatuses, status];

        handleStatusFilter(newStatuses);
    };

    // Função para limpar filtro de status
    const clearStatusFilter = () => {
        handleStatusFilter([]);
    };

    // Opções para o tamanho da página
    const pageSizeOptions = [5, 10, 20, 50, 100];

    // Calcular o número total de páginas
    const pageCount = table.getPageCount();

    // Função para navegar para a página anterior
    const handlePreviousPage = () => {
        if (pageIndex > 0) {
            setPageIndex(pageIndex - 1);
        }
    };

    // Função para navegar para a próxima página
    const handleNextPage = () => {
        if (pageIndex < pageCount - 1) {
            setPageIndex(pageIndex + 1);
        }
    };

    // Função para ir para a primeira página
    const handleFirstPage = () => {
        setPageIndex(0);
    };

    // Função para ir para a última página
    const handleLastPage = () => {
        setPageIndex(pageCount - 1);
    };

    // Função para ir para uma página específica
    const handleGoToPage = (page: number) => {
        setPageIndex(page);
    };

    // Gerar array de páginas para navegação
    const generatePaginationRange = () => {
        const totalPages = pageCount;

        // Se tivermos 7 ou menos páginas, mostrar todas
        if (totalPages <= 7) {
            return Array.from({ length: totalPages }, (_, i) => i);
        }

        // Caso contrário, mostrar os 3 anteriores e 3 próximos
        const rangeStart = Math.max(0, pageIndex - 3);
        const rangeEnd = Math.min(totalPages - 1, pageIndex + 3);

        const pages = [];

        // Adicionar primeira página
        if (rangeStart > 0) {
            pages.push(0);
            if (rangeStart > 1) {
                pages.push(-1); // Indicador de ellipsis "..."
            }
        }

        // Adicionar páginas no range
        for (let i = rangeStart; i <= rangeEnd; i++) {
            pages.push(i);
        }

        // Adicionar última página
        if (rangeEnd < totalPages - 1) {
            if (rangeEnd < totalPages - 2) {
                pages.push(-2); // Indicador de ellipsis "..."
            }
            pages.push(totalPages - 1);
        }

        return pages;
    };

    const isMobile = useMediaQuery("(max-width: 768px)");

    return (
        <>
            <div className="flex flex-wrap items-center gap-2 mb-4">
                {/* Filtro por coluna - agrupado em uma única unidade visual */}
                <div className="flex items-center border rounded-md overflow-hidden shadow-sm">
                    <div className="px-2 py-1 bg-gray-50 border-r flex items-center">
                        <Search className="h-4 w-4 text-gray-400 mr-1" />
                        <Select
                            value={selectedColumn}
                            onValueChange={handleColumnChange}
                        >
                            <SelectTrigger className="h-7 w-[120px] border-0 bg-transparent focus:ring-0 focus:ring-offset-0 p-0">
                                <SelectValue placeholder="Coluna" />
                            </SelectTrigger>
                            <SelectContent>
                                {filterableColumns.map((column) => (
                                    <SelectItem
                                        key={column.id}
                                        value={column.id}
                                        className="text-sm"
                                    >
                                        {column.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <Input
                        placeholder={`Filtrar...`}
                        value={
                            (table
                                .getColumn(selectedColumn)
                                ?.getFilterValue() as string) ?? ""
                        }
                        onChange={(event) =>
                            table
                                .getColumn(selectedColumn)
                                ?.setFilterValue(event.target.value)
                        }
                        className="h-7 border-0 outline-none rounded-none bg-transparent focus:bg-transparent focus-visible:outline-none focus-visible:ring-0 focus:ring-0 focus:ring-offset-0 w-[180px]"
                    />

                    {/* Botão de limpar filtro - só aparece quando tem valor */}
                    {(table
                        .getColumn(selectedColumn)
                        ?.getFilterValue() as string) && (
                        <button
                            onClick={() =>
                                table
                                    .getColumn(selectedColumn)
                                    ?.setFilterValue("")
                            }
                            className="px-2 text-gray-400 hover:text-gray-600"
                        >
                            <X className="h-3 w-3" />
                        </button>
                    )}
                </div>

                {/* Filtro de Status */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="outline"
                            size="sm"
                            className="h-9 rounded-lg px-2 gap-1 relative"
                        >
                            <Filter className="h-4 w-4" />
                            <span className="text-xs font-normal">Status</span>
                            {selectedStatuses.length > 0 && (
                                <Badge
                                    variant="secondary"
                                    className="ml-1 px-1 py-0 text-xs h-4 min-w-[16px] flex items-center justify-center"
                                >
                                    {selectedStatuses.length}
                                </Badge>
                            )}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-56">
                        <DropdownMenuLabel className="text-xs">
                            Filtrar por Status
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        {STATUS_OPTIONS.map((option) => (
                            <DropdownMenuCheckboxItem
                                key={option.value}
                                checked={selectedStatuses.includes(
                                    option.value
                                )}
                                onCheckedChange={() =>
                                    toggleStatus(option.value)
                                }
                                className="text-sm"
                            >
                                <div className="flex items-center gap-2">
                                    <Badge
                                        variant={option.variant}
                                        className="text-xs"
                                    >
                                        {option.label}
                                    </Badge>
                                </div>
                            </DropdownMenuCheckboxItem>
                        ))}

                        {selectedStatuses.length > 0 && (
                            <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    className="text-xs justify-center text-gray-500"
                                    onClick={clearStatusFilter}
                                >
                                    <X className="h-3 w-3 mr-1" />
                                    Limpar filtros
                                </DropdownMenuItem>
                            </>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Status ativos - mostrar badges dos status selecionados */}
                {selectedStatuses.length > 0 && (
                    <div className="flex items-center gap-1 flex-wrap">
                        {selectedStatuses.map((status) => {
                            const statusOption = STATUS_OPTIONS.find(
                                (opt) => opt.value === status
                            );
                            return (
                                <Badge
                                    key={status}
                                    variant={statusOption?.variant || "outline"}
                                    className="text-xs flex items-center gap-1 pr-1"
                                >
                                    {statusOption?.label}
                                    <button
                                        onClick={() => toggleStatus(status)}
                                        className="ml-1 hover:bg-black/10 rounded-full p-0.5"
                                    >
                                        <X className="h-2.5 w-2.5" />
                                    </button>
                                </Badge>
                            );
                        })}
                    </div>
                )}

                {/* Espaçador que empurra o seletor de colunas para a direita */}
                <div className="flex-grow"></div>

                {/* Menu de visualização de colunas */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="outline"
                            size="sm"
                            className="h-7 px-2 gap-1"
                        >
                            <Columns className="h-4 w-4" />
                            <span className="text-xs font-normal">Colunas</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuLabel className="text-xs">
                            Visibilidade das colunas
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize text-sm"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                );
                            })}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="text-xs justify-center text-gray-500"
                            onClick={() => {
                                // Reset all columns to visible
                                table.getAllColumns().forEach((col) => {
                                    if (col.getCanHide())
                                        col.toggleVisibility(true);
                                });
                            }}
                        >
                            <RotateCcw className="h-3 w-3 mr-1" />
                            Restaurar padrão
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Opcionalmente, botão de exportação */}
                <Button variant="outline" size="sm" className="h-7 px-2 gap-1">
                    <Download className="h-4 w-4" />
                    <span className="text-xs font-normal">Exportar</span>
                </Button>
            </div>
            {isMobile ? (
                // VISÃO MOBILE: Renderiza a lista de cartões
                <div className="mt-4">
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <MobileWithdrawalCard
                                key={row.id}
                                withdrawal={row.original as Withdrawal}
                                onApprove={onApprove} // Passe as ações
                                onReject={onReject} // Passe as ações
                            />
                        ))
                    ) : (
                        <div className="h-24 text-center flex items-center justify-center border rounded-lg">
                            Nenhum resultado encontrado.
                        </div>
                    )}
                </div>
            ) : (
                // VISÃO DESKTOP: Renderiza a tabela completa (seu código original)
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            {/* ... Seu código de TableHeader existente ... */}
                        </TableHeader>
                        <TableBody>
                            {/* ... Seu código de TableBody existente ... */}
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={
                                            row.getIsSelected() && "selected"
                                        }
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                <span className="pl-6">
                                                    {flexRender(
                                                        cell.column.columnDef
                                                            .cell,
                                                        cell.getContext()
                                                    )}
                                                </span>
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            )}
            <div className="flex items-center justify-between space-x-2 py-4 flex-col md:flex-row">
                <div className="flex items-center space-x-2">
                    <p className="text-sm text-muted-foreground">
                        Mostrando
                        <span className="px-1 font-medium">
                            {table.getRowModel().rows.length}
                        </span>
                        de
                        <span className="px-1 font-medium">
                            {table.getFilteredRowModel().rows.length}
                        </span>
                        resultados
                    </p>
                    <Select
                        value={pageSize.toString()}
                        onValueChange={(value) => {
                            const size = Number(value);
                            setPageSize(size);
                        }}
                    >
                        <SelectTrigger className="h-8 w-[80px]">
                            <SelectValue placeholder={pageSize} />
                        </SelectTrigger>
                        <SelectContent>
                            {pageSizeOptions.map((size) => (
                                <SelectItem key={size} value={size.toString()}>
                                    {size}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">por página</p>
                </div>

                {/* Navegação por páginas */}
                <div className="flex items-center space-x-2">
                    {/* Botão Primeira Página */}
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 p-0 max-md:hidden"
                        onClick={handleFirstPage}
                        disabled={pageIndex === 0}
                    >
                        <span className="sr-only">Primeira página</span>
                        <ChevronFirst className="h-4 w-4" />
                    </Button>

                    {/* Botão Página Anterior */}
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 p-0"
                        onClick={handlePreviousPage}
                        disabled={pageIndex === 0}
                    >
                        <span className="sr-only">Página anterior</span>
                        <ChevronLeft className="h-4 w-4" />
                    </Button>

                    {/* Números das Páginas */}
                    <div className="flex items-center flex-wrap max-md:mt-3">
                        {generatePaginationRange().map((pageIdx, i) => {
                            // Renderizar ellipsis
                            if (pageIdx < 0) {
                                return (
                                    <span
                                        key={i}
                                        className="px-2 text-muted-foreground"
                                    >
                                        ...
                                    </span>
                                );
                            }

                            // Renderizar número da página
                            const isCurrentPage = pageIdx === pageIndex;
                            return (
                                <Button
                                    key={i}
                                    variant={
                                        isCurrentPage ? "default" : "outline"
                                    }
                                    className={`h-8 w-8 p-0 mx-1 ${
                                        isCurrentPage
                                            ? "pointer-events-none"
                                            : ""
                                    }`}
                                    onClick={() => handleGoToPage(pageIdx)}
                                >
                                    <span>{pageIdx + 1}</span>
                                </Button>
                            );
                        })}
                    </div>

                    {/* Botão Próxima Página */}
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 p-0"
                        onClick={handleNextPage}
                        disabled={pageIndex >= pageCount - 1}
                    >
                        <span className="sr-only">Próxima página</span>
                        <ChevronRight className="h-4 w-4" />
                    </Button>

                    {/* Botão Última Página */}
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 p-0 max-md:hidden"
                        onClick={handleLastPage}
                        disabled={pageIndex >= pageCount - 1}
                    >
                        <span className="sr-only">Última página</span>
                        <ChevronLast className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </>
    );
}
