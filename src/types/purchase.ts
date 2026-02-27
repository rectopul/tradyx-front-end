import { Package } from "@/components/admin/packages/columns";
import { UserData } from ".";

export type Purchase = {
    id: number; // Id da compra
    user_id: number; // Id do usuario
    package_id: number; // Id do pacote comprado
    transaction_id: string; // Id de transação
    amount: number; // Valor pago pela compra
    daily_income: number; // Valor já recebido do investimento
    date: string; // Data de pagamento do proximo rendimento
    status: string; // Status do rendimento
    validity: string; // Validade (Quando o rendimento para de pagar)
    package: Package; // Objeto do pacote
    user: UserData | null; // Dados do usuario que fez o investimento
    created_at: string;
    updated_at: string;
};

export type PurchaseStatistics = {
    investiments_amount: number;
    investiments_count: number;
    investiments_paid: number;
};
