// src/types/index.ts

import { Cycle, InvestmentPackage } from "./investmentPackages";
import { Purchase } from "./purchase";
import { Referral } from "./referral.types";

export type DepositStatus =
    | "pending"
    | "rejected"
    | "approved"
    | "canceled"
    | "processing";
export type WithdrawalStatus =
    | "pending"
    | "approved"
    | "rejected"
    | "processing";
export type PurchaseStatus = "active" | "inactive" | "pending";
export type CommissionStatus = "active" | "inactive";
export type PixType = "CPF" | "EMAIL" | "PHONE";
export type SortDirection = "asc" | "desc";

export enum TransferMethod {
    PIX = "pix",
    TED = "ted",
    DOC = "doc",
    BOLETO = "boleto",
    INTERNAL = "internal",
    BITCOIN = "bitcoin",
    ETHEREUM = "ethereum",
    USDT = "usdt",
}

export namespace Chart {
    export interface Transaction {
        name: string;
        depositos: number;
        saques: number;
        investimentos: number;
    }
}

export interface SortState {
    field: string;
    direction: SortDirection;
}

export interface IpApi {
    ip: string;
}

export type PaginateArgs = {
    perPage: number;
    currentPage: number;
};

export interface Paginate<T> {
    current_page: number;
    from: number;
    to: number;
    total: number;
    data: T[];
    first_page_url: string | null;
    last_page: number;
    per_page: number;
    last_page_url: string | null;
    next_page_url: string | null;
    prev_page_url: string | null;
    path: string;
}

export interface Deposit {
    id: number;
    user_id: number;
    method_name: TransferMethod;
    address: string | null;
    transaction_id: string;
    order_id: string | null;
    amount: number;
    date: string | null;
    status: DepositStatus;
    created_at: string;
    updated_at: string;
    user?: UserData;
}

export interface Setting {
    id: number;
    comission_first_level: number;
    comission_second_level: number;
    comission_thirty_level: number;
    withdraw_charge: number;
    minimum_withdraw: number;
    minimum_deposit: number;
    maximum_deposit: number;
    deposit_fee_percentage?: number | null;
    deposit_bonus_percentage?: number | null;
    bonus_expiration_days?: number | null;
    registration_bonus?: number | null;
    total_member_register_reword?: number | null;
    total_member_register_reword_amount?: number | null;
    auto_approve_deposits: boolean;
    deposit_confirmation_time?: number | null;
    max_pending_time?: number | null;
    max_deposits_per_day?: number | null;
    require_kyc_for_deposit: boolean;
    deposit_limiter: boolean;
    deposit_days_allowed?: string[] | null;
    enabled_gateways?: string[] | null;
    deposit_terms_url?: string | null;
    deposit_alert_text?: string | null;
    deposit_support_link?: string | null;
    site_logo: string;
    site_name: string;
    maximum_withdraw: number;
    telegram_link: string;
    whatsapp_link: string;
    w_time_status: "active" | "inactive";
    checkin: number;
    dollar_value: number;
    dollar_with_iof: number;
    withdraw_start_time: string;
    withdraw_end_time: string;
}

export interface AllTransactions {
    transactions: {
        monthly: Chart.Transaction[];
        weekly: Chart.Transaction[];
    };
    comissions: UserLedger[];
    deposits: Deposit[];
    withdraws: Withdrawal[];
    ledgers: UserLedger[];
    purchases: Purchase[];
}

export interface User {
    user: UserData;
    token: string;
    withdraws: Withdrawal[];
    packages: InvestmentPackage;
}

export interface LoginPayload {
    phone: string;
    password: string;
}

export namespace Admin {
    export interface Data {
        id: number;
        balance: number;
        name: string;
        photo: string;
        email: number;
        email_verified_at: Date;
        salary_date: string;
        type: string;
        phone: string;
        address: string;
        remember_token: string;
    }
}

export interface UserCycle {
    id: number;
    user_id: number;
    plan_id: number;
    package_id: number;
    cycle: Cycle;
    cycle_id: number;
    start_date: string;
    investment_date: string;
    investment_amount: string;
    expected_end_date: string;
    completed_date: string;
    return_amount: string;
    status: string;
    payment_proof: any;
    notes: string;
    created_at: string;
    updated_at: string;
}

export interface UserData {
    id: number;
    ref_by: string;
    ref_id: string;
    name: string;
    investor: number;
    realname: string;
    available_to_withdraw: number;
    phone_code: string;
    phone: string;
    ip: string;
    username: string;
    email: string;
    email_verified_at: any;
    type: any;
    balance: number;
    profit_balance: number;
    blocked_balance: number;
    total_commission: number;
    total_invested_data: number;
    receive_able_amount: number;
    photo: any;
    gateway_method: string;
    pix_type: string;
    gateway_number: string;
    pix_key: string;
    withdraw_password: string;
    status: "active" | "inactive";
    ban_unban: "ban" | "unban";
    created_at: string;
    updated_at: string;
    active_member: number;
    profile_photo_url: string;
    is_afiliate: boolean;
    withdraw_account?: WithdrawnAccount;
    purchases: Purchase[];
    referrals: Referral[];
    referral_data: ReferralData;
}

export type ReferralData = {
    total_count: number;
    active_count: number;
    investor_count: number;
    level1_count: number;
    level2_count: number;
    level3_count: number;
};

export interface UserChallengeGoals {
    success: boolean;
    data: any;
}

export interface WithdrawnAccountPayload {
    full_name: string;
    cpf: string;
    phone: string;
    pix_key_type: PixType;
    pix_key: string;
    status: "active" | "inactive";
    is_default?: boolean;
}

export interface WithdrawnAccount {
    id: number;
    full_name: string;
    cpf: string;
    phone: string;
    pix_key_type: PixType;
    pix_key: string;
    status: "active" | "inactive";
    is_default: boolean;
    created_at: string;
    updated_at: string;
}

export interface WithdrawPayload {
    name: string;
    cpf: string;
    amount: number;
}

export interface DepositPayment {
    success: boolean;
    data: {
        deposit_id: number;
        idTransaction: string;
        payment_code: string;
        paymentCode: string;
    };
}

export interface DepositPayload {
    amount: number;
    cpf?: string;
}

export interface UserLedger {
    id: number;
    user_id: number;
    get_balance_from_user_id: number | null;
    reason: string;
    perticulation: string | null;
    amount: number;
    debit: number;
    credit: number;
    status: "pending" | "approved" | "rejected" | "default";
    date: string | null;
    step: number;
    created_at: string;
    updated_at: string;
}

export type Reinvestment = {
    id: number;
    user_id: number;
    purchase_id: number;
    amount: number;
    profit_percent: number;
    duration_days: number;
    status: "pending" | "completed" | "canceled";
    created_at: string;
    updated_at: string;
    completed_at: string | null;
};

export type Withdrawal = {
    id: number;
    user_id: number;
    name: string;
    cpf: string;
    pix_type: PixType;
    pix_key: string;
    transaction_id: string | null;
    method_name: string | null;
    oid: string | null;
    address: string | null;
    amount: number;
    charge: number;
    final_amount: number;
    status: WithdrawalStatus;
    created_at: string;
    updated_at: string;
    user?: UserData;
};

export interface PurchaseSimple {
    id: number;
    user_id: number;
    package_id: number;
    transaction_id: string;
    amount: number;
    daily_income: number;
    date: string;
    status: PurchaseStatus;
    validity: string | null;
    created_at: string | null;
    updated_at: string | null;
}

export interface Commission {
    id: number;
    user_id: number | null;
    task_id: number | null;
    amount: number;
    date: string | null;
    status: CommissionStatus;
    token: string | null;
    created_at: string | null;
    updated_at: string | null;
}

export interface TransactionSummary {
    totalDeposits: number;
    totalWithdrawals: number;
    totalPurchases: number;
    totalCommissions: number;
    activeInvestments: number;
    pendingTransactions: number;
}
