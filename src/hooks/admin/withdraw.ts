import { useQuery, QueryClient } from "@tanstack/react-query";
import { getErrorMessage } from "@/utils/api-errors";
import { listWithdraws } from "@/services/adminServices";
import { Withdrawal } from "@/types";

export function useAdminWithdraws() {
    const {
        isLoading,
        isError,
        data: withdraws,
        error,
    } = useQuery<Withdrawal[], Error>({
        queryKey: ["admin_withdraws"],
        queryFn: listWithdraws,

        // CRÍTICO: Configurações para evitar refetches durante navegação
        staleTime: Infinity, // Dados NUNCA ficam stale até invalidação manual
        gcTime: Infinity, // Mantém no cache PARA SEMPRE (até logout)

        refetchOnMount: false, // NÃO refetch ao montar componente
        refetchOnWindowFocus: false, // NÃO refetch ao focar janela
        refetchOnReconnect: false, // NÃO refetch ao reconectar

        retry: 1, // Tenta apenas 1 vez em caso de erro

        // Mantém dados anteriores enquanto revalida (se necessário)
        placeholderData: (previousData) => previousData,
    });

    return {
        withdraws: withdraws ?? [],
        isLoading,
        isError,
        error,
        getErrorMessage: () => (error ? getErrorMessage(error) : undefined),
    };
}

/**
 * Atualiza um saque específico dentro do cache.
 * Use esta função após mutações bem-sucedidas (aprovar/rejeitar).
 */
export function updateWithdrawalCache(
    queryClient: QueryClient,
    updatedWithdrawal: Withdrawal
) {
    queryClient.setQueryData<Withdrawal[]>(["admin_withdraws"], (oldData) => {
        if (!oldData) return [updatedWithdrawal];

        return oldData.map((w) =>
            w.id === updatedWithdrawal.id ? updatedWithdrawal : w
        );
    });
}

/**
 * Adiciona um novo saque ao cache.
 */
export function addWithdrawalToCache(
    queryClient: QueryClient,
    newWithdrawal: Withdrawal
) {
    queryClient.setQueryData<Withdrawal[]>(["admin_withdraws"], (oldData) => {
        if (!oldData) return [newWithdrawal];
        return [newWithdrawal, ...oldData];
    });
}

/**
 * Remove um saque do cache.
 */
export function removeWithdrawalFromCache(
    queryClient: QueryClient,
    withdrawalId: number
) {
    queryClient.setQueryData<Withdrawal[]>(["admin_withdraws"], (oldData) => {
        if (!oldData) return [];
        return oldData.filter((w) => w.id !== withdrawalId);
    });
}

/**
 * Força um refetch manual dos saques.
 * Use APENAS quando realmente necessário (ex: após ações externas).
 */
export function refetchWithdrawals(queryClient: QueryClient) {
    return queryClient.invalidateQueries({
        queryKey: ["admin_withdraws"],
        exact: true,
    });
}

/**
 * Limpa o cache de saques (útil no logout, se necessário).
 */
export function clearWithdrawalsCache(queryClient: QueryClient) {
    queryClient.removeQueries({
        queryKey: ["admin_withdraws"],
        exact: true,
    });
}
