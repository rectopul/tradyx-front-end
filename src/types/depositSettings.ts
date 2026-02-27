// types/settings.ts - Adicione estas tipagens ao seu arquivo existente

import { Setting } from ".";

export interface DepositSettingsFormData {
    minimum_deposit: number;
    maximum_deposit: number;
    deposit_fee_percentage?: number | null;
    deposit_bonus_percentage?: number | null;
    bonus_expiration_days?: number | null;
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
}

// Interface para resposta da API
export interface DepositSettingsResponse {
    success: boolean;
    message: string;
    data: Setting;
}

// Enum para dias da semana
export enum DayOfWeek {
    SUNDAY = "sunday",
    MONDAY = "monday",
    TUESDAY = "tuesday",
    WEDNESDAY = "wednesday",
    THURSDAY = "thursday",
    FRIDAY = "friday",
    SATURDAY = "saturday",
}

// Enum para gateways de pagamento
export enum PaymentGateway {
    PIX = "pix",
    CREDIT_CARD = "credit_card",
    BANK_TRANSFER = "bank_transfer",
    CRYPTO = "crypto",
    PAYPAL = "paypal",
    MERCADO_PAGO = "mercado_pago",
}

// Interface para configurações completas do admin (estenda sua interface existente)
export interface AdminSettings {
    // ... suas configurações existentes ...

    // Configurações de depósito
    minimum_deposit: number;
    maximum_deposit: number;
    deposit_fee_percentage?: number | null;
    deposit_bonus_percentage?: number | null;
    bonus_expiration_days?: number | null;
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

    // Configurações de saque (suas existentes)
    withdraw_charge?: number;
    minimum_withdraw?: number;
    maximum_withdraw?: number;
    w_time_status?: boolean;
    withdraw_start_time?: string;
    withdraw_end_time?: string;
}

// Interface para validação de formulário
export interface DepositFormValidation {
    minimum_deposit: {
        required: boolean;
        min: number;
    };
    maximum_deposit: {
        required: boolean;
        min: number;
        gte: string; // referência ao campo minimum_deposit
    };
    deposit_fee_percentage: {
        min: number;
        max: number;
        nullable: boolean;
    };
    deposit_bonus_percentage: {
        min: number;
        max: number;
        nullable: boolean;
    };
    bonus_expiration_days: {
        min: number;
        nullable: boolean;
    };
    deposit_confirmation_time: {
        min: number;
        nullable: boolean;
    };
    max_pending_time: {
        min: number;
        nullable: boolean;
    };
    max_deposits_per_day: {
        min: number;
        nullable: boolean;
    };
    deposit_days_allowed: {
        validValues: DayOfWeek[];
        nullable: boolean;
    };
    enabled_gateways: {
        validValues: PaymentGateway[];
        nullable: boolean;
    };
    deposit_terms_url: {
        format: "url";
        nullable: boolean;
    };
    deposit_support_link: {
        format: "url";
        nullable: boolean;
    };
}

// Interface para opções de formulário
export interface FormSelectOption {
    id: string;
    label: string;
    value: string;
}

// Constantes para opções de formulário
export const DAYS_OF_WEEK_OPTIONS: FormSelectOption[] = [
    { id: "sunday", label: "Domingo", value: "sunday" },
    { id: "monday", label: "Segunda-feira", value: "monday" },
    { id: "tuesday", label: "Terça-feira", value: "tuesday" },
    { id: "wednesday", label: "Quarta-feira", value: "wednesday" },
    { id: "thursday", label: "Quinta-feira", value: "thursday" },
    { id: "friday", label: "Sexta-feira", value: "friday" },
    { id: "saturday", label: "Sábado", value: "saturday" },
];

export const PAYMENT_GATEWAY_OPTIONS: FormSelectOption[] = [
    { id: "pix", label: "PIX", value: "pix" },
    { id: "credit_card", label: "Cartão de Crédito", value: "credit_card" },
    {
        id: "bank_transfer",
        label: "Transferência Bancária",
        value: "bank_transfer",
    },
    { id: "crypto", label: "Criptomoedas", value: "crypto" },
    { id: "paypal", label: "PayPal", value: "paypal" },
    { id: "mercado_pago", label: "Mercado Pago", value: "mercado_pago" },
];

// Interface para mensagens de erro customizadas
export interface DepositFormErrors {
    minimum_deposit?: string;
    maximum_deposit?: string;
    deposit_fee_percentage?: string;
    deposit_bonus_percentage?: string;
    bonus_expiration_days?: string;
    auto_approve_deposits?: string;
    deposit_confirmation_time?: string;
    max_pending_time?: string;
    max_deposits_per_day?: string;
    require_kyc_for_deposit?: string;
    deposit_limiter?: string;
    deposit_days_allowed?: string;
    enabled_gateways?: string;
    deposit_terms_url?: string;
    deposit_alert_text?: string;
    deposit_support_link?: string;
}

// Utilitário para formatação de valores
export interface CurrencyFormatter {
    format: (value: number | string) => string;
    parse: (value: string) => number;
}

// Utilitário para validação de URLs
export interface URLValidator {
    isValid: (url: string) => boolean;
    sanitize: (url: string) => string;
}

// Interface para estado do formulário
export interface DepositFormState {
    isLoading: boolean;
    isSubmitting: boolean;
    hasChanges: boolean;
    errors: DepositFormErrors;
    lastSaved?: Date;
}

// Configurações padrão para novos formulários
export const DEFAULT_DEPOSIT_SETTINGS: DepositSettingsFormData = {
    minimum_deposit: 20,
    maximum_deposit: 10000,
    deposit_fee_percentage: null,
    deposit_bonus_percentage: null,
    bonus_expiration_days: null,
    auto_approve_deposits: false,
    deposit_confirmation_time: null,
    max_pending_time: null,
    max_deposits_per_day: null,
    require_kyc_for_deposit: false,
    deposit_limiter: false,
    deposit_days_allowed: null,
    enabled_gateways: null,
    deposit_terms_url: null,
    deposit_alert_text: null,
    deposit_support_link: null,
};

// Mensagens de erro em português
export const DEPOSIT_ERROR_MESSAGES = {
    minimum_deposit: {
        required: "O valor mínimo de depósito é obrigatório.",
        numeric: "O valor mínimo de depósito deve ser numérico.",
        min: "O valor mínimo de depósito não pode ser negativo.",
    },
    maximum_deposit: {
        required: "O valor máximo de depósito é obrigatório.",
        numeric: "O valor máximo de depósito deve ser numérico.",
        min: "O valor máximo de depósito não pode ser negativo.",
        gte: "O valor máximo deve ser maior ou igual ao valor mínimo de depósito.",
    },
    deposit_fee_percentage: {
        numeric: "A taxa de depósito deve ser numérica.",
        min: "A taxa de depósito não pode ser negativa.",
        max: "A taxa de depósito não pode ser maior que 100%.",
    },
    deposit_bonus_percentage: {
        numeric: "O bônus de depósito deve ser numérico.",
        min: "O bônus de depósito não pode ser negativo.",
        max: "O bônus de depósito não pode ser maior que 100%.",
    },
    bonus_expiration_days: {
        integer: "Os dias de expiração devem ser um número inteiro.",
        min: "Os dias de expiração não podem ser negativos.",
    },
    auto_approve_deposits: {
        boolean: "A aprovação automática deve ser verdadeira ou falsa.",
    },
    deposit_confirmation_time: {
        integer: "O tempo de confirmação deve ser um número inteiro.",
        min: "O tempo de confirmação não pode ser negativo.",
    },
    max_pending_time: {
        integer: "O tempo máximo pendente deve ser um número inteiro.",
        min: "O tempo máximo pendente não pode ser negativo.",
    },
    max_deposits_per_day: {
        integer: "O limite de depósitos por dia deve ser um número inteiro.",
        min: "O limite de depósitos por dia não pode ser negativo.",
    },
    require_kyc_for_deposit: {
        boolean: "A exigência de KYC deve ser verdadeira ou falsa.",
    },
    deposit_limiter: {
        boolean: "O limitador de depósitos deve ser verdadeiro ou falso.",
    },
    deposit_days_allowed: {
        array: "Os dias permitidos devem ser uma lista.",
        invalid_day: "Dia da semana inválido.",
    },
    enabled_gateways: {
        array: "Os gateways habilitados devem ser uma lista.",
        invalid_gateway: "Gateway de pagamento inválido.",
    },
    deposit_terms_url: {
        url: "A URL dos termos deve ser válida.",
    },
    deposit_support_link: {
        url: "O link de suporte deve ser uma URL válida.",
    },
} as const;
