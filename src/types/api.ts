export type ApiResponse<T> = {
    success: boolean;
    message: string;
    data: T;
}

export interface ApiError {
    message: string;
    errors?: Record<string, string[]>;
    statusCode?: number;
}

export interface LoginCredentials {
    phone: string;
    password: string;
}

export interface ApiFipe {
    status: string;
    "API Full": string;
    dados: ApiFipeData[];
    placa?: string;
}

export interface ApiFipeData {
    valor: number;
    codigoFipe: string;
    anoModelo: number;
    anoFabricacao: number;
    mesReferencia: string;
    marca: string;
    modelo: string;
    url: string;
    principal: boolean;
}

export interface DataOrder {
    value: number;
    valueWithDiscount: number;
    placa: string;
    percent: number;
    id: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface OrderPayload {
    value: number;
    valueWithDiscount: number;
    placa: string;
    percent: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}

export interface OrderResponse {
    success: boolean;
    payment: {
        qr_code: string;
        qr_code_text: string;
        amount: number;
        expires_at: string;
        payment_id: string;
        is_Gate: boolean;
        status: string;
    };
}

export namespace Prisma {
    export interface User {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        email: string;
    }

    export interface UserUpdateInput {
        name?: string;
        email?: string;
        currentPassword: string;
        newPassword: string;
        confirmPassword: string;
    }

    export interface Pix {
        name: string;
        id: number;
        city: string;
        cep: string;
        key: string;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
    }

    export interface Qrcode {
        id: number;
        value: number;
        payment_id: string;
        createdAt: Date;
        updatedAt: Date;
    }

    export interface Visits {
        ip: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }

    export interface PixCreateInput {
        name: string;
        city: string;
        cep: string;
        key: string;
        createdAt?: Date | string;
        updatedAt?: Date | string;
    }

    export interface Order {
        id: number;
        name: string | null;
        value: number;
        valueWithDiscount: number;
        placa: string;
        percent: number;
        createdAt: Date;
        updatedAt: Date;
    }
}

export namespace Agrocash {
    export interface UserData {
        user: User;
        transactions: {
            deposits: Transaction[];
            payouts: Transaction[];
        };
    }

    export interface PayoutPayload {
        balance_type: "profit" | "balance";
        amount: number;
        tnx: string;
        payout_method_id: number;
    }

    export interface User {
        id: number;
        firstname: string;
        lastname: string;
        username: string;
        referral_id: string | null;
        rank_id: string | null;
        badge_status: number;
        last_level: string | null;
        language_id: string | null;
        email: string;
        cpf: string;
        country_code: string;
        country: string;
        phone_code: string;
        phone: string;
        balance: number | null;
        profit_balance: number | null;
        total_invest: number | null;
        total_profit: number | null;
        total_deposit: number | null;
        plan_invest: number | null;
        project_invest: number | null;
        plan_profit: number | null;
        project_profit: number | null;
        total_commission: string;
        image: string | null;
        image_driver: string | null;
        state: string | null;
        city: string | null;
        zip_code: string | null;
        address_one: string | null;
        address_two: string | null;
        provider: string | null;
        provider_id: string | null;
        status: number;
        identity_verify: string | null;
        address_verify: string | null;
        two_fa: number;
        two_fa_verify: number;
        two_fa_code: string | null;
        email_verification: number;
        sms_verification: number;
        verify_code: string | null;
        sent_at: string | null;
        last_login: string;
        last_seen: string;
        time_zone: string | null;
        email_verified_at: string | null;
        github_id: string | null;
        google_id: string | null;
        facebook_id: string | null;
        created_at: string;
        updated_at: string;
        deleted_at: string | null;
        syncpay_key: string;
        syncpay_type: string;
        "last-seen-activity": boolean;
        fullname: string;
    }

    export interface Transaction {
        id: number;
        transactional_id: number;
        transactional_type: string;
        user_id: number;
        amount: number;
        balance: string;
        charge: string;
        trx_type: string;
        remarks: string;
        trx_id: string;
        wallet_type: string;
        created_at: string;
        updated_at: string;
    }

    export interface InvestPayload {
        balance_type: "balance" | "profit";
        amount: number;
        project_id: number;
        unit: number;
    }

    export interface InvestResponse {
        success: boolean;
        error: boolean;
        message: string;
    }
    // Detalhes do projeto
    interface ProjectDetails {
        id: number;
        project_id: number;
        language_id: number;
        title: string;
        slug: string;
        short_description: string;
        description: string;
        created_at: string;
        updated_at: string;
    }

    // Projeto individual
    export interface Project {
        id: number;
        location: string;
        total_units: number;
        project_duration: number | null;
        project_duration_type: string | null;
        return: string;
        return_type: string;
        return_period: number;
        return_period_type: string;
        number_of_return: number;
        minimum_invest: number | null;
        maximum_invest: number | null;
        fixed_invest: string;
        thumbnail_image: string;
        images: string[];
        start_date: string;
        expiry_date: string | null;
        amount_has_fixed: number;
        project_duration_has_unlimited: number;
        number_of_return_has_unlimited: number;
        status: number;
        available_units: number;
        maturity: string;
        capital_back: number;
        invest_last_date: string;
        created_at: string;
        updated_at: string;
        details: ProjectDetails;
        base_currency: string;
        currency_symbol: string;
    }

    // Resposta da API
    export interface ApiProjectResponse {
        status: string;
        data: Project[];
    }
}
