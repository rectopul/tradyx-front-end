import {
    Admin,
    Deposit,
    Paginate,
    PaginateArgs,
    Setting,
    UserData,
    Withdrawal,
} from "@/types";
import { adminApi } from "./adminApi";
import { WithdrawSettingsFormData } from "@/types/settings";
import { DepositSettingsFormData } from "@/pages/admin/deposits/Settings";
import { DepositSettingsResponse } from "@/types/depositSettings";
import { AxiosResponse } from "axios";
import { Package, PackageStatus } from "@/components/admin/packages/columns";
import { PackageFormData } from "@/components/admin/packages/PackageFormDrawer";
import { ApiResponse } from "@/types/api";

export const listCustommers = async (
    args: PaginateArgs
): Promise<Paginate<UserData>> => {
    try {
        const { data } = await adminApi.get<Paginate<UserData>>(
            `customer?page=${args.currentPage}&per_page=${args.perPage}`
        );

        return data;
    } catch (error) {
        throw error;
    }
};

export const searchCustomer = async (
    term: string
): Promise<Paginate<UserData>> => {
    try {
        const { data } = await adminApi.get<Paginate<UserData>>(
            `customer/search?query=${term}`
        );

        return data;
    } catch (error) {
        throw error;
    }
};

export type CustommerStatistics = {
    total: number;
    total_active: number;
    total_balance: number;
    total_comissions: number;
};

export const custommersStatistics = async (): Promise<CustommerStatistics> => {
    try {
        const { data } = await adminApi.get<CustommerStatistics>(
            `customer/statistics`
        );

        return data;
    } catch (error) {
        throw error;
    }
};

export interface IsAfiliated {
    success: boolean;
    user: UserData;
    message: string;
}

// Estatisticas de saque
export type WithdrawsStatics = {
    total_amount: number;
    total_approved: number;
    total_pending: number;
    total_processing: number;
    total_rejected: number;
    total_amount_next_day: number;
    total_count_next_day: number;
};

export const fetchWithdrawsStatistics = async (): Promise<WithdrawsStatics> => {
    try {
        const { data } = await adminApi.get<WithdrawsStatics>(
            `withdraw/statistics`
        );

        return data;
    } catch (error) {
        throw error;
    }
};

export const fetchDepositsStatistics = async (): Promise<WithdrawsStatics> => {
    try {
        const { data } = await adminApi.get<WithdrawsStatics>(
            `deposits/statistics`
        );

        return data;
    } catch (error) {
        throw error;
    }
};

export const isAfliliated = async (payload: {
    user_id: number;
    is_affiliate: boolean;
}): Promise<IsAfiliated> => {
    try {
        const { data } = await adminApi.post("is_afiliate", payload);

        return data;
    } catch (error) {
        throw error;
    }
};

export const fetchCustomerBanUnban = async (
    id: number
): Promise<IsAfiliated> => {
    try {
        const { data } = await adminApi.get("/customer/ban_unban/" + id);

        return data;
    } catch (error) {
        throw error;
    }
};

export const fetchIncrementBalanceCustomer = async (
    uid: number,
    payload: {
        amount: number;
    }
): Promise<UserData> => {
    try {
        const { data } = await adminApi.post<ApiResponse<UserData>>(
            `customer/balance_increment/${uid}`,
            payload
        );

        return data.data;
    } catch (error) {
        throw error;
    }
};

export const fetchCustomerChangePassword = async (payload: {
    user_id: number;
    new_password: string;
}): Promise<IsAfiliated> => {
    try {
        const { data } = await adminApi.post(
            `customer/rewnew_password/${payload.user_id}`,
            payload
        );

        return data;
    } catch (error) {
        throw error;
    }
};

export const getThemeSettings = async (): Promise<Setting> => {
    const response = await adminApi.get(`/settings`);
    return response.data;
};

// Autenticação:
export const adminLogin = async ({
    payload,
}: {
    payload: { email: string; password: string };
}): Promise<{
    status: boolean;
    message: string;
    token: string;
    data: Admin.Data;
}> => {
    await adminApi.get("sanctum/csrf-cookie");
    const { data } = await adminApi.post("login", payload);
    return data;
};

// Autenticação:
export const adminLogout = async (): Promise<{ success: boolean }> => {
    const { data } = await adminApi.post("logout");
    return data;
};

// Autenticação:
export const adminAuthCheck = async (): Promise<{
    status: boolean;
    message: string;
    token: string;
    data: {
        admin: Admin.Data;
    };
}> => {
    const { data } = await adminApi.get("check_login");
    return data;
};

export const fetchUpdateWithdrawnSettings = async (
    payload: WithdrawSettingsFormData
): Promise<{
    status: boolean;
    message: string;
    data: Setting;
}> => {
    const { data } = await adminApi.put("settings/withdraw", payload);
    return data;
};

// Withdraws
export const listWithdraws = async (): Promise<Withdrawal[]> => {
    const { data } = await adminApi.get("withdraws");
    return data;
};

export const fetchSearchDeposits = async (
    term: string
): Promise<{
    success: boolean;
    deposits: Paginate<Deposit>;
}> => {
    try {
        const { data } = await adminApi.get(`deposits/search?query=${term}`);

        return data;
    } catch (error) {
        throw error;
    }
};

export const deposits = async (): Promise<{
    success: boolean;
    deposits: Deposit[];
}> => {
    const { data } = await adminApi.get("deposits");
    return data;
};

export const fetchListPackages = async (): Promise<Package[]> => {
    const { data } = await adminApi.get("packages");
    return data.packages;
};

export const handleFetchDeposits = async (
    page: number,
    perPage: number
): Promise<{
    success: boolean;
    deposits: Paginate<Deposit>;
}> => {
    // Adicione os parâmetros de paginação na URL da requisição
    const { data } = await adminApi.get(
        `deposits?page=${page}&per_page=${perPage}`
    );
    return data;
};

/**
 * Busca depósitos pelo nome ou telefone
 * @param query Nome ou telefone
 * @param page página
 * @param perPage resultados por página
 * @returns Paginate<Deposit>
 */
export const handleSearchDeposits = async (
    query: string,
    page: number,
    perPage: number
): Promise<{
    success: boolean;
    deposits: Paginate<Deposit>;
}> => {
    const { data } = await adminApi.get(
        `deposits/search?query=${query}&page=${page}&per_page=${perPage}`
    );
    return data;
};

export const updateDepositStatus = async (
    depositId: number,
    status: string
): Promise<{
    success: boolean;
    message: string;
    data: Deposit;
}> => {
    const requestData = { status };
    const { data } = await adminApi.patch<ApiResponse<Deposit>>(
        `deposits/${depositId}/status`,
        requestData
    );
    return data;
};

/**
 * Atualiza as configurações de depósito
 * @param data - Dados das configurações de depósito
 * @returns Promise com a resposta da API
 */
export const fetchUpdateDepositSettings = async (
    data: DepositSettingsFormData
): Promise<AxiosResponse<DepositSettingsResponse>> => {
    try {
        // Preparar dados para envio - remover valores null/undefined se necessário
        const cleanData: Partial<DepositSettingsFormData> = {};

        // Sempre incluir campos obrigatórios
        cleanData.minimum_deposit = data.minimum_deposit;
        cleanData.maximum_deposit = data.maximum_deposit;
        cleanData.auto_approve_deposits = data.auto_approve_deposits;
        cleanData.require_kyc_for_deposit = data.require_kyc_for_deposit;
        cleanData.deposit_limiter = data.deposit_limiter;

        // Incluir campos opcionais apenas se tiverem valor
        if (
            data.deposit_fee_percentage !== null &&
            data.deposit_fee_percentage !== undefined
        ) {
            cleanData.deposit_fee_percentage = data.deposit_fee_percentage;
        }

        if (
            data.deposit_bonus_percentage !== null &&
            data.deposit_bonus_percentage !== undefined
        ) {
            cleanData.deposit_bonus_percentage = data.deposit_bonus_percentage;
        }

        if (
            data.bonus_expiration_days !== null &&
            data.bonus_expiration_days !== undefined
        ) {
            cleanData.bonus_expiration_days = data.bonus_expiration_days;
        }

        if (
            data.deposit_confirmation_time !== null &&
            data.deposit_confirmation_time !== undefined
        ) {
            cleanData.deposit_confirmation_time =
                data.deposit_confirmation_time;
        }

        if (
            data.max_pending_time !== null &&
            data.max_pending_time !== undefined
        ) {
            cleanData.max_pending_time = data.max_pending_time;
        }

        if (
            data.max_deposits_per_day !== null &&
            data.max_deposits_per_day !== undefined
        ) {
            cleanData.max_deposits_per_day = data.max_deposits_per_day;
        }

        if (data.deposit_days_allowed && data.deposit_days_allowed.length > 0) {
            cleanData.deposit_days_allowed = data.deposit_days_allowed;
        }

        if (data.enabled_gateways && data.enabled_gateways.length > 0) {
            cleanData.enabled_gateways = data.enabled_gateways;
        }

        if (data.deposit_terms_url && data.deposit_terms_url.trim()) {
            cleanData.deposit_terms_url = data.deposit_terms_url.trim();
        }

        if (data.deposit_alert_text && data.deposit_alert_text.trim()) {
            cleanData.deposit_alert_text = data.deposit_alert_text.trim();
        }

        if (data.deposit_support_link && data.deposit_support_link.trim()) {
            cleanData.deposit_support_link = data.deposit_support_link.trim();
        }

        const response = await adminApi.put<DepositSettingsResponse>(
            "settings/deposits", // Ajuste a URL conforme sua API
            cleanData
        );

        return response;
    } catch (error) {
        console.error("Erro ao atualizar configurações de depósito:", error);
        throw error;
    }
};

/**
 * Busca as configurações atuais de depósito
 * @returns Promise com as configurações de depósito
 */
export const fetchDepositSettings = async (): Promise<
    AxiosResponse<DepositSettingsResponse>
> => {
    try {
        const response = await adminApi.get<ApiResponse<Setting>>(
            "settings/deposits"
        );
        return response;
    } catch (error) {
        console.error("Erro ao buscar configurações de depósito:", error);
        throw error;
    }
};

/**
 * Valida se uma URL é válida
 * @param url - URL para validar
 * @returns boolean indicando se a URL é válida
 */
export const validateURL = (url: string): boolean => {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};

/**
 * Valida se os dias da semana são válidos
 * @param days - Array de dias para validar
 * @returns boolean indicando se todos os dias são válidos
 */
export const validateDaysOfWeek = (days: string[]): boolean => {
    const validDays = [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
    ];
    return days.every((day) => validDays.includes(day));
};

/**
 * Valida se os gateways de pagamento são válidos
 * @param gateways - Array de gateways para validar
 * @returns boolean indicando se todos os gateways são válidos
 */
export const validatePaymentGateways = (gateways: string[]): boolean => {
    const validGateways = [
        "pix",
        "credit_card",
        "bank_transfer",
        "crypto",
        "paypal",
        "mercado_pago",
    ];
    return gateways.every((gateway) => validGateways.includes(gateway));
};

/**
 * Formata dados de configuração para exibição
 * @param settings - Configurações de depósito
 * @returns Objeto com dados formatados
 */
export const formatDepositSettingsForDisplay = (
    settings: DepositSettingsFormData
) => {
    return {
        ...settings,
        minimum_deposit_formatted: new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(settings.minimum_deposit),
        maximum_deposit_formatted: new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(settings.maximum_deposit),
        deposit_fee_formatted: settings.deposit_fee_percentage
            ? `${settings.deposit_fee_percentage}%`
            : "Não configurado",
        deposit_bonus_formatted: settings.deposit_bonus_percentage
            ? `${settings.deposit_bonus_percentage}%`
            : "Não configurado",
        bonus_expiration_formatted: settings.bonus_expiration_days
            ? `${settings.bonus_expiration_days} dias`
            : "Não expira",
        confirmation_time_formatted: settings.deposit_confirmation_time
            ? `${settings.deposit_confirmation_time} minutos`
            : "Imediato",
        max_pending_formatted: settings.max_pending_time
            ? `${settings.max_pending_time} minutos`
            : "Sem limite",
        max_deposits_formatted: settings.max_deposits_per_day
            ? `${settings.max_deposits_per_day} por dia`
            : "Ilimitado",
    };
};

/**
 * Prepara dados do formulário para envio à API
 * @param formData - Dados do formulário
 * @returns Dados preparados para API
 */
export const prepareDepositDataForAPI = (
    formData: DepositSettingsFormData
): DepositSettingsFormData => {
    // Converter strings vazias para null onde apropriado
    const preparedData = { ...formData };

    // Campos que devem ser null se estiverem vazios
    const nullableFields: (keyof DepositSettingsFormData)[] = [
        "deposit_fee_percentage",
        "deposit_bonus_percentage",
        "bonus_expiration_days",
        "deposit_confirmation_time",
        "max_pending_time",
        "max_deposits_per_day",
        "deposit_terms_url",
        "deposit_alert_text",
        "deposit_support_link",
    ];

    nullableFields.forEach((field) => {
        if (preparedData[field] === "" || preparedData[field] === undefined) {
            (preparedData[field] as any) = null;
        }
    });

    // Limpar arrays vazios
    if (preparedData.deposit_days_allowed?.length === 0) {
        preparedData.deposit_days_allowed = null;
    }

    if (preparedData.enabled_gateways?.length === 0) {
        preparedData.enabled_gateways = null;
    }

    return preparedData;
};

/**
 * Prepara dados do formulário para envio à API
 * @param formData - Dados do formulário
 * @returns Dados preparados para API
 */
export const fetchStorePackage = async (
    formData: PackageFormData
): Promise<Package> => {
    try {
        const response = await adminApi.post<ApiResponse<Package>>(
            "packages",
            formData
        );
        return response.data.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Alterar status de um pacote
 * @param packageId - ID do pacote
 * @param status - Novo status do pacote ("active" ou "inactive" ou "draft")
 * @returns Package - Dados preparados para API
 */
export const fetchChangeStatusPackage = async (
    packageId: number,
    status: PackageStatus
): Promise<Package> => {
    try {
        const response = await adminApi.patch<ApiResponse<Package>>(
            `packages/${packageId}/status`,
            { status }
        );

        return response.data.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Adicionar ou remover um pacote dos destaques
 * @param packageId - ID do pacote
 * @returns Package - Dados preparados para API
 */
export const fetchToogleFeaturedPackage = async (
    packageId: number
): Promise<Package> => {
    try {
        const response = await adminApi.patch<ApiResponse<Package>>(
            `packages/${packageId}/featured`
        );

        return response.data.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Excluir um pacote dos destaques
 * @param packageId - ID do pacote
 * @returns Package - Dados preparados para API
 */
export const fetchDeletePackage = async (
    packageId: number
): Promise<boolean> => {
    try {
        const response = await adminApi.delete<ApiResponse<null>>(
            `packages/${packageId}`
        );

        return response.data.success;
    } catch (error) {
        throw error;
    }
};
