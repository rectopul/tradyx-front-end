import { siteUrl } from "@/services/api";
import { purchaseCheck, purchasePackage } from "@/services/transactionsService";
import { DepositStatus } from "@/types";
import { toast } from "sonner";

const formatToMoney = (value: number) => {
    const money = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(value);

    return money;
};

const formatToDate = (data: Date) => {
    const converted = new Date(data);

    const day = String(converted.getDate()).padStart(2, "0");
    const month = String(converted.getMonth() + 1).padStart(2, "0"); // Janeiro é 0
    const year = converted.getFullYear();
    const hours = String(converted.getHours()).padStart(2, "0");
    const minutes = String(converted.getMinutes()).padStart(2, "0");

    const formated = `${day}/${month}/${year} ${hours}:${minutes}`;

    return formated;
};

const formatToPercentage = (value: number, decimalPlaces?: number) => {
    return new Intl.NumberFormat("pt-BR", {
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces,
    }).format(value);
};

interface UseTransactionIdReturn {
    generatedTransactionId: string;
}

const useTransactionId = (): UseTransactionIdReturn => {
    // Get current timestamp in milliseconds
    const timestamp = Date.now();

    // Convert timestamp to base36 string (more compact)
    const timeComponent = timestamp.toString(36);

    // Generate 8 random characters
    const randomComponent = Array.from({ length: 8 }, () =>
        Math.floor(Math.random() * 36).toString(36)
    ).join("");

    // Generate a random number between 1000-9999
    const sequenceNumber = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);

    // Combine all components
    const transactionId =
        `TX${timeComponent}${randomComponent}${sequenceNumber}`.toUpperCase();

    return {
        generatedTransactionId: transactionId,
    };
};

export const formatDate = (dateString: string, showHorus = true) => {
    if (!showHorus) {
        return new Date(dateString).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    }
    return new Date(dateString).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

export const formatHours = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
    });
};

export const formatStatus = (status: DepositStatus) => {
    const statusMap = {
        approved: "Aprovado",
        pending: "Pendente",
        rejected: "Rejeitado",
        canceled: "Cancelado",
        processing: "Processando",
    };
    return statusMap[status] || status;
};

export const getStatusColor = (status: DepositStatus) => {
    const colorMap = {
        approved: "bg-green-100 text-green-800",
        pending: "bg-yellow-100 text-yellow-800",
        rejected: "bg-red-100 text-red-800",
        canceled: "bg-gray-100 text-gray-800",
        processing: "bg-gray-100 text-gray-800",
    };
    return colorMap[status] || "bg-gray-100 text-gray-800";
};

export function maskString(str: string): string {
    const len = str.length;

    if (len < 7) {
        // Se a string for muito curta, só retorna ela
        return str;
    }

    return str
        .split("")
        .map((char, i) => {
            if (
                i === 3 || // 3º caractere
                i === 4 || // 4º caractere
                i === 5 || // 5º caractere
                i >= len - 2 // 2 últimos caracteres
            ) {
                return char;
            }
            return "*";
        })
        .join("");
}

export const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(value);
};

const getTokenFormLocalStorage = (): string => {
    const token = localStorage.getItem("auth_token");

    return token as string;
};

const handlePurchase = async (id: number) => {
    toast.loading("Processando compra");
    try {
        const check = await purchaseCheck(id);

        if (!check.success) {
            toast.dismiss();
            toast.error(check.message);
        }

        const planPurchase = await purchasePackage(id);
        toast.dismiss();
        toast.success(
            `Compra realizada com sucesso: ${planPurchase.purchase.transaction_id}`
        );
    } catch (error: any) {
        toast.dismiss();
        toast.error(error.response.data.message);
    }
};

function asset(input: string): string {
    if (import.meta.env.VITE_APP_MODE == "production") {
        return siteUrl + "/public/" + input;
    }

    return siteUrl + input;
}

/**
 * Formata a string de telefone, adicionando a máscara (XX) XXXXX-XXXX.
 * @param value A string contendo apenas dígitos.
 * @returns A string formatada com a máscara.
 */
const formatPhone = (value: string): string => {
    // 1. Limpa todos os não-dígitos
    let cleaned = value.replace(/\D/g, "");

    // 2. Limita a 11 dígitos (máximo para telefone celular + DDD)
    cleaned = cleaned.substring(0, 11);

    // 3. Aplica a máscara
    if (cleaned.length > 2 && cleaned.length <= 7) {
        // (XX) XXXX
        return cleaned.replace(/^(\d{2})(\d{1,5})$/, "($1) $2");
    } else if (cleaned.length === 8) {
        // (XX) XXXX-XXXX (Para fixo antigo ou DDD de 2 dígitos)
        return cleaned.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3");
    } else if (cleaned.length > 7) {
        // (XX) XXXXX-XXXX (Celular)
        return cleaned.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
    }

    return cleaned;
};

/**
 * Gera um array de números de página (índices baseados em 0) para exibição na paginação.
 * Usa um valor negativo (-1) para representar as reticências (...).
 * * @param pageIndex O índice da página atual (base 0).
 * @param pageCount O número total de páginas.
 * @param maxVisiblePages O número máximo de botões de página a serem exibidos (incluindo a página atual).
 * @returns Um array de números de página ou -1 (para '...').
 */
const generatePaginationRange = (
    pageIndex: number,
    pageCount: number,
    maxVisiblePages: number = 5 // Defina o número máximo de botões visíveis (ajuste conforme necessário)
): (number | -1)[] => {
    if (pageCount <= maxVisiblePages) {
        // Se o total de páginas for menor ou igual ao limite, mostra todas.
        return Array.from({ length: pageCount }, (_, i) => i);
    }

    const range = [];
    const sidePages = 1; // Páginas sempre visíveis nas extremidades (ex: 1 e última)
    const middlePages = maxVisiblePages - 2 * sidePages - 1; // Páginas no meio (incluindo a atual)

    // Adiciona a primeira página
    range.push(0);

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

    let hasLeadingEllipsis = start > sidePages;
    let hasTrailingEllipsis = end < pageCount - sidePages - 1;

    // Adiciona reticências à esquerda (se necessário)
    if (hasLeadingEllipsis) {
        range.push(-1); // Representa "..."
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
        range.push(-1); // Representa "..."
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

export {
    formatToMoney,
    formatToDate,
    formatToPercentage,
    useTransactionId,
    getTokenFormLocalStorage,
    handlePurchase,
    asset,
    formatPhone,
    generatePaginationRange,
};
