export interface SettingsProps {
    id?: number;
    site_name: string;
    active_signup?: Boolean;
    twilio_acount_id?: string;
    twilio_token?: string;
    color_primary: string;
    color_secondary: string;
    text_color_primary: string;
    text_color_secondary: string;
    referralBonusRate?: number; // Taxa de bônus de indicação em porcentagem
    minimumWithdrawal?: number; // Valor mínimo para saque
    maintenanceFee?: number; // Taxa de manutenção do sistema
    createdAt: Date;
    updatedAt: Date;
}

declare global {
    interface Window {
        Laravel: {
            appUrl: string;
            csrfToken: string;
            [key: string]: any; // se quiser permitir outras chaves também
        };
    }
}

export interface WithdrawSettingsFormData {
    withdraw_charge: number;
    withdraw_start_time?: string | null | undefined; // "HH:mm" vindo do input time (pode completar com ":00")
    withdraw_end_time?: string | null | undefined; // "HH:mm"
    minimum_withdraw: number; // string com máscara dinheiro "50,00"
    maximum_withdraw: number; // string com máscara dinheiro "10000,00"
    w_time_status: "active" | "inactive";
}
