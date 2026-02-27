"use client";

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"; // Seus componentes de tabela do shadcn/ui

import { Button } from "@/components/ui/button";
import {
    ChevronFirst,
    ChevronLast,
    ChevronLeft,
    ChevronRight,
    Loader2,
} from "lucide-react"; // Vamos criar esta função auxiliar

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    loading: boolean;
    // Props de Paginação
    pageCount: number; // Total de páginas (last_page do Laravel)
    currentPage: number; // Página atual (current_page do Laravel)
    onPageChange: (page: number) => void; // Função para mudar a página
    totalItems: number;
    perPage: number;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    loading,
    pageCount,
    currentPage,
    onPageChange,
    totalItems,
}: DataTableProps<TData, TValue>) {
    // Configuração básica do TanStack Table
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    // Calcula o índice base zero para o TanStack (embora a lógica de fetch use currentPage - 1)
    const pageIndex = currentPage - 1;

    // Ocultar a paginação se houver apenas uma página
    const shouldShowPagination = pageCount > 1;

    // Função para tratar clique na paginação (recebe índice base 0)
    const goToPage = (pageNumber: number) => {
        // Envia o número da página base 1 para a função de fetch
        onPageChange(pageNumber + 1);
    };

    return (
        <div className="space-y-4">
            {/* Indicador de Carregamento (Overlay) */}
            <div className="relative">
                {loading && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70 backdrop-blur-sm rounded-lg">
                        <Loader2 className="h-8 w-8 animate-spin text-ebony-clay-600" />
                    </div>
                )}

                {/* Tabela */}
                <div className="rounded-md border overflow-x-auto">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow
                                    key={headerGroup.id}
                                    className="bg-ebony-clay-50 hover:bg-ebony-clay-100/80"
                                >
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead
                                                key={header.id}
                                                className="text-ebony-clay-900 font-bold text-sm whitespace-nowrap"
                                            >
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                          header.column
                                                              .columnDef.header,
                                                          header.getContext()
                                                      )}
                                            </TableHead>
                                        );
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={
                                            row.getIsSelected() && "selected"
                                        }
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell
                                                key={cell.id}
                                                className="py-3"
                                            >
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
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
                                        Nenhum resultado encontrado.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* Paginação */}
            {shouldShowPagination && (
                <div className="flex items-center justify-end space-x-2 py-4">
                    {/* Exibição resumida dos itens (Opcional) */}
                    <div className="flex-1 text-sm text-muted-foreground">
                        Total: {totalItems} itens ({pageCount} páginas)
                    </div>

                    {/* Controles de Navegação */}
                    <div className="flex items-center gap-2">
                        {/* Primeira Página */}
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 p-0"
                            onClick={() => goToPage(0)}
                            disabled={pageIndex <= 0}
                        >
                            <ChevronFirst className="h-4 w-4" />
                        </Button>

                        {/* Página Anterior */}
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 p-0"
                            onClick={() => goToPage(pageIndex - 1)}
                            disabled={pageIndex <= 0}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>

                        {/* Números das Páginas (Lógica do Range) */}
                        <div className="flex items-center flex-wrap">
                            {/* Usa a função que criamos anteriormente para gerar o range de páginas */}
                            {generatePaginationRange(
                                pageIndex,
                                pageCount,
                                5
                            ).map((pageIdx, i) => {
                                if (pageIdx === -1) {
                                    return (
                                        <span
                                            key={i}
                                            className="px-1 text-muted-foreground"
                                        >
                                            ...
                                        </span>
                                    );
                                }

                                const isCurrentPage = pageIdx === pageIndex;
                                return (
                                    <Button
                                        key={i}
                                        variant={
                                            isCurrentPage
                                                ? "default"
                                                : "outline"
                                        }
                                        className={`h-8 w-8 p-0 mx-1 ${
                                            isCurrentPage
                                                ? "pointer-events-none bg-ebony-clay-600 hover:bg-ebony-clay-700"
                                                : ""
                                        }`}
                                        onClick={() => goToPage(pageIdx)}
                                    >
                                        <span>{pageIdx + 1}</span>
                                    </Button>
                                );
                            })}
                        </div>

                        {/* Próxima Página */}
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 p-0"
                            onClick={() => goToPage(pageIndex + 1)}
                            disabled={pageIndex >= pageCount - 1}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>

                        {/* Última Página */}
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 p-0"
                            onClick={() => goToPage(pageCount - 1)}
                            disabled={pageIndex >= pageCount - 1}
                        >
                            <ChevronLast className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

// Lógica de Paginação (copiada e ligeiramente ajustada do seu pedido anterior)
/**
 * Gera um array de números de página (índices baseados em 0) para exibição na paginação.
 * Usa um valor negativo (-1) para representar as reticências (...).
 */
export const generatePaginationRange = (
    pageIndex: number,
    pageCount: number,
    maxVisiblePages: number = 5
): (number | -1)[] => {
    if (pageCount <= maxVisiblePages) {
        return Array.from({ length: pageCount }, (_, i) => i);
    }

    const range: (number | -1)[] = [];
    const sidePages = 1;
    const middlePages = maxVisiblePages - 2 * sidePages - 1;

    let start = pageIndex - Math.floor(middlePages / 2);
    let end = pageIndex + Math.ceil(middlePages / 2);

    // Ajusta o intervalo para que não ultrapasse os limites
    if (start < sidePages + 1) {
        start = sidePages;
        end = maxVisiblePages - sidePages - 1;
    } else if (end > pageCount - sidePages - 1) {
        end = pageCount - sidePages - 1;
        start = pageCount - maxVisiblePages + sidePages;
    }

    // Adiciona a primeira página
    range.push(0);

    let hasLeadingEllipsis = start > sidePages;
    let hasTrailingEllipsis = end < pageCount - sidePages - 1;

    // Adiciona reticências à esquerda (se necessário)
    if (hasLeadingEllipsis) {
        range.push(-1);
    }

    // Adiciona as páginas do meio
    for (let i = start; i < end; i++) {
        // Garantir que não haja duplicidade com a primeira página ou a última
        if (i > 0 && i < pageCount - 1) {
            range.push(i);
        }
    }

    // Adiciona reticências à direita (se necessário)
    if (hasTrailingEllipsis) {
        range.push(-1);
    }

    // Adiciona a última página
    if (pageCount > 1 && !range.includes(pageCount - 1)) {
        range.push(pageCount - 1);
    }

    // Remove duplicatas e garante a ordem
    return Array.from(new Set(range.filter((p) => p >= 0 || p === -1))).sort(
        (a, b) => {
            if (a === -1) return b === -1 ? 0 : b === 0 ? 1 : -1;
            if (b === -1) return a === -1 ? 0 : a === 0 ? -1 : 1;
            return (a as number) - (b as number);
        }
    );
};
