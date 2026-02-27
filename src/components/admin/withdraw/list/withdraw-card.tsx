import {
    ChevronDown,
    ChevronUp,
    Check,
    CircleMinus,
    MoreVertical,
    DollarSign,
    Calendar,
    User,
    Smartphone,
    MapPin,
    CreditCard,
} from "lucide-react";
import { useState } from "react";
import { Withdrawal, WithdrawalStatus } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDateTime } from "@/utils/formatters"; // Assumindo que você tem esses utilitários
import { formatCurrency } from "@/utils/helpers";

// Função auxiliar para renderizar o Badge de Status (copiado do columns.tsx)
function BadgeType(status: WithdrawalStatus) {
    switch (status) {
        case "approved":
            return (
                <Badge
                    className="text-[10px] py-0 text-white"
                    variant="success"
                >
                    Aprovado
                </Badge>
            );
        case "pending":
            return (
                <Badge
                    className="text-[10px] py-0 text-white"
                    variant="pending"
                >
                    Pendente
                </Badge>
            );
        case "rejected":
            return (
                <Badge
                    className="text-[10px] py-0 text-white"
                    variant="destructive"
                >
                    Rejeitado
                </Badge>
            );
        case "processing":
            return (
                <Badge
                    className="text-[10px] py-0 text-white"
                    variant="processing"
                >
                    Processando
                </Badge>
            );
        default:
            return (
                <Badge
                    className="text-[10px] py-0 text-white"
                    variant="destructive"
                >
                    {status}
                </Badge>
            );
    }
}

// Props para o Cartão Mobile
type MobileWithdrawalCardProps = {
    withdrawal: Withdrawal;
    onApprove: (wId: number) => void;
    onReject: (wId: number) => void;
};

export function MobileWithdrawalCard({
    withdrawal,
    onApprove,
    onReject,
}: MobileWithdrawalCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const {
        status,
        name,
        amount,
        final_amount,
        created_at,
        cpf,
        pix_key,
        pix_type,
        user,
        address,
    } = withdrawal;

    // Dados do Usuário
    const isAffiliate = user ? Boolean(user.is_afiliate) : false;
    const balance = user ? user.balance : 0;
    const totalInvested = user ? user.total_invested_data : 0;

    return (
        <div className="border rounded-lg shadow-sm mb-3 bg-white">
            {/* Cabeçalho do Cartão (Sempre visível) */}
            <div
                className="p-3 flex items-center justify-between cursor-pointer "
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex-1 min-w-0 relative">
                    <div className="flex items-center gap-2">
                        {/* Nome do Usuário (Central) e ID */}
                        <User className="h-4 w-4 text-gray-500 flex-shrink-0" />
                        <h3 className="font-semibold text-sm truncate">
                            {name}
                        </h3>
                    </div>
                    {/* Status e ID logo abaixo */}
                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                        {BadgeType(status)}
                    </div>
                </div>

                {/* Valor Bruto (Destaque) */}
                <div className="text-right ml-4">
                    <p className="text-sm font-bold text-gray-700">
                        {formatCurrency(amount)}
                    </p>
                    <p className="text-xs text-gray-500">Valor Bruto</p>
                </div>

                {/* Toggle de Expansão */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 ml-2 flex-shrink-0"
                >
                    {isExpanded ? (
                        <ChevronUp className="h-4 w-4" />
                    ) : (
                        <ChevronDown className="h-4 w-4" />
                    )}
                </Button>

                {/* Ações (Menu Dropdown) - Manter acessível */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 ml-1 flex-shrink-0"
                        >
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[200px]">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={(e) => {
                                e.stopPropagation(); // Previne fechar o cartão
                                onApprove(withdrawal.id);
                            }}
                        >
                            <Check stroke="green" className="h-4 w-4 mr-2" />{" "}
                            Aprovar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={(e) => {
                                e.stopPropagation(); // Previne fechar o cartão
                                onReject(withdrawal.id);
                            }}
                        >
                            <CircleMinus
                                stroke="red"
                                className="h-4 w-4 mr-2"
                            />{" "}
                            Negar
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Corpo do Cartão (Detalhes Expansíveis) */}
            {isExpanded && (
                <div className="p-3 pt-0 border-t border-gray-100">
                    <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs">
                        {/* Linha 1: Valores */}
                        <DetailItem
                            icon={DollarSign}
                            label="Líquido"
                            value={formatCurrency(final_amount)}
                            color="text-indigo-600 font-medium"
                        />
                        <DetailItem
                            icon={Calendar}
                            label="Data"
                            value={formatDateTime(created_at as string)}
                        />

                        {/* Linha 2: Dados de PIX e Gateway */}
                        <DetailItem
                            icon={CreditCard}
                            label="Gateway"
                            value={address || "—"}
                        />
                        <DetailItem
                            icon={Smartphone}
                            label="Telefone"
                            value={user?.phone || "—"}
                        />

                        {/* Linha 3: PIX e Tipo de Usuário */}
                        <DetailItem
                            icon={CreditCard}
                            label="PIX Chave"
                            value={pix_key || "—"}
                        />
                        <DetailItem
                            icon={MapPin}
                            label="Tipo PIX"
                            value={pix_type || "—"}
                        />
                    </div>

                    <div className="my-3 border-t border-gray-100"></div>

                    {/* Dados Financeiros e de Perfil do Usuário */}
                    <div className="text-xs">
                        <h4 className="font-semibold mb-2 text-gray-700">
                            Detalhes do Usuário
                        </h4>
                        <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                            <DetailItem
                                label="Tipo"
                                value={isAffiliate ? "Afiliado" : "Comum"}
                                color={
                                    isAffiliate
                                        ? "text-indigo-600 font-medium"
                                        : "text-gray-600"
                                }
                            />
                            <DetailItem label="CPF" value={cpf || "—"} />
                            <DetailItem
                                label="Saldo"
                                value={formatCurrency(balance)}
                                color={
                                    balance > 0
                                        ? "text-emerald-600 font-medium"
                                        : balance < 0
                                        ? "text-red-600 font-medium"
                                        : "text-gray-600"
                                }
                            />
                            <DetailItem
                                label="Investido"
                                value={formatCurrency(totalInvested)}
                                color="text-green-500 font-medium"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// Componente auxiliar para formatar a linha de detalhe
interface DetailItemProps {
    icon?: any;
    label: string;
    value: string;
    color?: string;
}
const DetailItem = ({
    icon: Icon,
    label,
    value,
    color = "text-gray-700",
}: DetailItemProps) => (
    <div className="flex items-center gap-1">
        {Icon && <Icon className="h-3 w-3 text-gray-400" />}
        <span className="text-gray-500 mr-1">{label}:</span>
        <span className={`truncate ${color}`}>{value}</span>
    </div>
);
