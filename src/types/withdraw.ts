export type PixType = "cpf" | "email" | "phone" | "random";

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

export interface WithdrawFormData {
    full_name: string;
    cpf: string;
    phone: string;
    pix_key: string;
}
