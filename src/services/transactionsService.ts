import {
    AllTransactions,
    Commission,
    Deposit,
    DepositPayload,
    DepositPayment,
    IpApi,
    TransactionSummary,
    UserData,
    UserLedger,
    Withdrawal,
    WithdrawnAccount,
    WithdrawnAccountPayload,
} from "@/types";
import { Purchase } from "@/namespaces/purchase";
import { api } from "./api";
import { useTransactionId } from "@/utils/helpers";
import { SignupFormData, SignupResponse } from "@/pages/Signup";
import { ExchangeFormData } from "@/components/users/ExchangeForm";
import { DepositUSDTResponse } from "@/types/deposit.types";
import { ApiResponse } from "@/types/api";
import {
    PaginatedData,
    Transaction,
    TransactionsStatistics,
    TransactionStatus,
    TransactionType,
} from "@/types/transaction";
import { ipflyIp } from "./userService";
import { Package } from "@/components/admin/packages/columns";

// Exchange
export const userExchange = async (
    formData: ExchangeFormData
): Promise<UserData> => {
    const { data } = await api.post("user/exchange", formData);

    return data;
};

// Signup
export const userSignup = async (
    data: SignupFormData
): Promise<SignupResponse> => {
    const response = await api.post("/signin", data);

    if (response.data) {
        await api.get("/sanctum/csrf-cookie");
    }
    return response.data;
};
// Packages
export const purchasePackage = async (
    id: number
): Promise<Purchase.Confirmation> => {
    const { generatedTransactionId } = useTransactionId();

    const payload: Purchase.Payload = {
        id,
        transaction_id: generatedTransactionId,
    };

    const response = await api.post("/user/purchase", payload);
    return response.data;
};

export interface DefaultCheckRequest {
    success: boolean;
    message: string;
}

export const purchaseCheck = async (
    id: number
): Promise<DefaultCheckRequest> => {
    const response = await api.get("/user/purchase/check/" + id);
    return response.data;
};

export const fetchPurchases = async (): Promise<Purchase.Data[]> => {
    const response = await api.get("/user/purchases");
    return response.data;
};

export const fetchUserLedgers = async (): Promise<UserLedger[]> => {
    const response = await api.get("/user/ledgers");
    return response.data;
};

// Funções para buscar dados das transações
export const fetchPackages = async (): Promise<Package[]> => {
    const response = await api.get("/packages");
    return response.data;
};

export const fetchDeposits = async (): Promise<Deposit[]> => {
    const response = await api.get("/user/deposits");
    return response.data;
};

export const fetchWithdrawals = async (): Promise<Withdrawal[]> => {
    const response = await api.get("/user/withdrawals");
    return response.data.data;
};

export const fetchCommissions = async (): Promise<Commission[]> => {
    const response = await api.get("/user/commissions");
    return response.data.data;
};

export const fetchAllTransactions = async (
    page: number,
    type: TransactionType | "all",
    status: TransactionStatus | "all"
): Promise<PaginatedData<Transaction>> => {
    const response = await api.get<PaginatedData<Transaction>>(
        `/transaction/all?page=${page}&type=${type}&status=${status}`
    );
    return response.data;
};

export const fetchTransactionsStatistics =
    async (): Promise<TransactionsStatistics> => {
        const response = await api.get<TransactionsStatistics>(
            `/transaction/statistics`
        );
        return response.data;
    };

export const fetchTransactionSummary =
    async (): Promise<TransactionSummary> => {
        const response = await api.get("/user/transaction-summary");
        return response.data;
    };

export const getUserIp = async (): Promise<IpApi> => {
    try {
        const data = await ipflyIp();

        return data;
    } catch (error) {
        throw error;
    }
};

// Funções para criar novas transações
export const createDeposit = async (
    depositData: DepositPayload
): Promise<DepositPayment> => {
    const response = await api.post("/user/deposit", depositData);
    return response.data;
};

export interface DepositCheckData {
    success: boolean;
}

// Funções para criar novas transações
export const checkDeposit = async (
    depositId: number
): Promise<DepositCheckData> => {
    const response = await api.get<DepositCheckData>(
        `/user/deposit/check/${depositId}`
    );
    return response.data;
};

export type PixData = {
    pix_key: string;
    pix_key_type: string;
};

/**
 * Validar chave pix
 * @param pixPayload
 * @returns PixData
 */
export const validateWithdrawAccount = async (pixPayload: {
    pix_key: string;
}): Promise<PixData> => {
    const response = await api.post<ApiResponse<PixData>>(
        "/user/verify_pix_key",
        pixPayload
    );
    return response.data.data;
};

/**
 * Cadastrar conta de saque
 * @param accountOPayload
 * @returns
 */
export const createWithdrawAccount = async (
    accountOPayload: WithdrawnAccountPayload
): Promise<WithdrawnAccount> => {
    const response = await api.post<ApiResponse<WithdrawnAccount>>(
        "/user/withdrawal-accounts",
        accountOPayload
    );
    return response.data.data;
};

export const fetchUpdateWithdrawAccount = async (
    wId: number,
    accountOPayload: WithdrawnAccountPayload
): Promise<WithdrawnAccount> => {
    const response = await api.put<ApiResponse<WithdrawnAccount>>(
        `/user/withdrawal-accounts/${wId}`,
        accountOPayload
    );
    return response.data.data;
};

export type WithdrawnPayload = Partial<Withdrawal> & {
    ip_address: string;
    method: "pix" | "usdt";
    withdrawn_address?: string;
};

export const createWithdrawal = async (
    withdrawalData: WithdrawnPayload
): Promise<Withdrawal> => {
    const response = await api.post("/user/withdraw", withdrawalData);
    return response.data;
};

export const generateUsdtDeposit = async (
    amount: number
): Promise<DepositUSDTResponse> => {
    const response = await api.post("/user/usdt/deposit", { amount });
    return response.data;
};

export const listAllTransactionTypes = async (): Promise<AllTransactions> => {
    const response = await api.get("/user/transactions");
    return response.data;
};
