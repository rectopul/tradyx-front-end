import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ArrowRightLeft } from "lucide-react";
import { useUser } from "@/contexts/UserProvider";
import { toast } from "sonner";
import { userExchange } from "@/services/transactionsService";

export interface ExchangeFormData {
    wallet_type: "profit" | "balance";
    amount: number;
}

// Função para formatar valor para Real brasileiro
const formatCurrency = (value: number | string): string => {
    if (!value) return "";

    // Converte para número se for string
    const numberValue =
        typeof value === "string"
            ? Number(value.replace(/\D/g, "")) / 100
            : value;

    // Formata para real brasileiro
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(numberValue);
};

// // Função para converter valor formatado para número
// const parseCurrency = (value: string): number => {
//     if (!value) return 0;

//     // Remove tudo que não for dígito e converte para número
//     const numericValue = value.replace(/\D/g, "");
//     return Number(numericValue) / 100;
// };

const ExchangeForm = () => {
    const { user, updateUser } = useUser();
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [displayValue, setDisplayValue] = useState("");

    const {
        control,
        handleSubmit,
        watch,
        formState: { errors },
        setValue,
        reset,
    } = useForm<ExchangeFormData>({
        defaultValues: {
            wallet_type: "profit",
            amount: 0,
        },
    });

    if (!user) return;

    const selectedWalletType = watch("wallet_type");
    const amount = watch("amount");

    const getDestinationWallet = () => {
        return selectedWalletType === "profit"
            ? "Saldo Principal"
            : "Saldo de Lucro";
    };

    const getSourceWalletBalance = () => {
        return selectedWalletType === "profit"
            ? user.profit_balance
            : user.balance;
    };

    const onSubmit = async (data: ExchangeFormData) => {
        setIsLoading(true);
        try {
            await userExchange(data);
            if (data.wallet_type === "profit") {
                const userUpdated = {
                    ...user,
                    profit_balance: user.profit_balance - data.amount,
                    balance: user.balance + data.amount,
                };
                updateUser(userUpdated);
            } else {
                const userUpdated = {
                    ...user,
                    profit_balance: user.profit_balance + data.amount,
                    balance: user.balance - data.amount,
                };
                updateUser(userUpdated);
            }

            toast.success("Sucesso!", {
                description: `Transferência de ${formatCurrency(
                    data.amount
                )} realizada com sucesso.`,
            });

            setOpen(false);
            reset();
            setDisplayValue("");
        } catch (error: any) {
            toast.error("Erro", {
                description:
                    error.response?.data?.message ||
                    "Ocorreu um erro ao processar sua solicitação.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const validateAmount = (value: number) => {
        if (!value || value <= 0) return "O valor deve ser maior que zero";
        if (value < 1) return "O valor mínimo é de $ 1,00";

        const sourceBalance =
            selectedWalletType === "profit"
                ? user.profit_balance
                : user.balance;
        if (sourceBalance < value) return "Saldo insuficiente";

        return true;
    };

    const handleCurrencyInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const inputValue = e.target.value;

        // Remove formatação existente
        const rawValue = inputValue.replace(/\D/g, "");

        // Converte para número (divide por 100 para considerar os centavos)
        const numericValue = rawValue ? Number(rawValue) / 100 : 0;

        // Atualiza o valor no formulário
        setValue("amount", numericValue);

        // Formata e atualiza o display
        setDisplayValue(rawValue ? formatCurrency(numericValue) : "");
    };

    return (
        <Popover
            open={open}
            onOpenChange={(newOpen) => {
                setOpen(newOpen);
                if (!newOpen) {
                    reset();
                    setDisplayValue("");
                }
            }}
        >
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className="flex mt-3 items-center gap-2 text-black"
                >
                    <ArrowRightLeft className="h-4 w-4" />
                    <span className="text-black">Transferir Saldo</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <h4 className="font-medium text-lg ">
                        Transferir entre carteiras
                    </h4>

                    <div className="space-y-2">
                        <Label htmlFor="wallet_type">Origem</Label>
                        <Controller
                            name="wallet_type"
                            control={control}
                            rules={{ required: "Este campo é obrigatório" }}
                            render={({ field }) => (
                                <Select
                                    value={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <SelectTrigger id="wallet_type">
                                        <SelectValue placeholder="Selecione a carteira" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="profit">
                                            Saldo de Lucro (
                                            {formatCurrency(
                                                user.profit_balance
                                            )}
                                            )
                                        </SelectItem>
                                        <SelectItem value="balance">
                                            Saldo Principal (
                                            {formatCurrency(user.balance)})
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.wallet_type && (
                            <p className="text-sm text-red-500">
                                {errors.wallet_type.message}
                            </p>
                        )}
                    </div>

                    <div className="py-2 text-center text-sm text-gray-500">
                        Transferindo para:{" "}
                        <span className="font-medium">
                            {getDestinationWallet()}
                        </span>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <Label htmlFor="amount">Valor</Label>
                            <span className="text-sm text-gray-500">
                                Disponível:{" "}
                                {formatCurrency(getSourceWalletBalance())}
                            </span>
                        </div>
                        <Controller
                            name="amount"
                            control={control}
                            rules={{
                                required: "Este campo é obrigatório",
                                validate: validateAmount,
                            }}
                            render={() => (
                                <div className="relative">
                                    <Input
                                        id="amount"
                                        type="text"
                                        inputMode="numeric"
                                        placeholder="$ 0,00"
                                        value={displayValue}
                                        onChange={handleCurrencyInputChange}
                                        className={
                                            errors.amount
                                                ? "border-red-500"
                                                : ""
                                        }
                                    />
                                </div>
                            )}
                        />
                        {errors.amount && (
                            <p className="text-sm text-red-500">
                                {errors.amount.message}
                            </p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isLoading || !amount || amount < 1}
                    >
                        {isLoading
                            ? "Processando..."
                            : "Confirmar Transferência"}
                    </Button>
                </form>
            </PopoverContent>
        </Popover>
    );
};

export default ExchangeForm;
