import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
    Loader2,
    AlertCircle,
    Clock,
    Wallet,
    PiggyBank,
    ArrowRight,
    CheckCircle2,
} from "lucide-react";
import { Pix } from "@/assets/icons/Check";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useForm, SubmitHandler } from "react-hook-form";
import { Agrocash } from "@/types/api";

interface Balance {
    available: number;
    pending: number;
    total: number;
}

interface BalanceType {
    wallet: Balance;
    profit: Balance;
}

interface PreviewData {
    amount: number;
    fee: number;
    total: number;
    estimatedTime: string;
}

const PayoutRequestForm = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [amount, setAmount] = useState<string>("");
    const [balanceType, setBalanceType] = useState<"wallet" | "profit">(
        "wallet"
    );
    const [previewData, setPreviewData] = useState<PreviewData | null>(null);
    const [lastTransactions, setLastTransactions] = useState<number[]>([
        1500, 2000, 800,
    ]);
    const { register, handleSubmit } = useForm<Agrocash.PayoutPayload>();
    const { userProfile } = useUserProfile();

    // Simulated balance data
    const balances: BalanceType = {
        wallet: {
            available:
                userProfile && userProfile.user.balance
                    ? userProfile.user.balance
                    : 0,
            pending: 300.0,
            total: 1800.0,
        },
        profit: {
            available:
                userProfile && userProfile.user.profit_balance
                    ? userProfile.user.profit_balance
                    : 0,
            pending: 150.0,
            total: 900.0,
        },
    };

    const formatCurrency = (value: number): string => {
        const valorFormatado = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(value);
        return valorFormatado;
    };

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setAmount(value);
        if (parseFloat(value) > 0) {
            calculatePreview(parseFloat(value));
        } else {
            setPreviewData(null);
        }
    };

    const calculatePreview = (value: number) => {
        setPreviewData({
            amount: value,
            fee: 0,
            total: value,
            estimatedTime: "< 1 minuto",
        });
    };

    const onSubmit: SubmitHandler<Agrocash.PayoutPayload> = () => {
        setLoading(true);
        console.log(`formulário submetido`);
        setTimeout(() => {
            setLoading(false);
            // Simular sucesso
        }, 1500);
    };

    useEffect(() => {
        if (userProfile) {
            setLastTransactions(
                userProfile.transactions.payouts
                    .slice(-3)
                    .map((vl) => vl.amount)
            );
        }
    }, [userProfile]);

    const selectedBalance =
        balanceType === "wallet" ? balances.wallet : balances.profit;

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Main Form Section */}
                <div className="md:col-span-2">
                    <Card className="w-full">
                        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
                            {/* Header */}
                            <div className="flex items-center space-x-4 mb-8">
                                <div className="bg-gradient-to-br from-green-400 to-green-600 p-3 rounded-xl shadow-lg">
                                    <Pix size={20} fill="#FFFFFF" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">
                                        Saque via PIX
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        Transferência instantânea 24/7
                                    </p>
                                </div>
                            </div>

                            {/* Balance Selection */}
                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <button
                                    onClick={() => setBalanceType("wallet")}
                                    type="button"
                                    className={`p-4 rounded-xl border-2 transition-all ${
                                        balanceType === "wallet"
                                            ? "border-green-500 bg-green-50"
                                            : "border-gray-200 hover:border-green-200"
                                    }`}
                                >
                                    <Wallet
                                        className={`w-5 h-5 mb-2 ${
                                            balanceType === "wallet"
                                                ? "text-green-500"
                                                : "text-gray-400"
                                        }`}
                                    />
                                    <div className="text-sm font-medium">
                                        Saldo em Carteira
                                    </div>
                                    <div className="text-lg font-bold">
                                        {formatCurrency(
                                            balances.wallet.available
                                        )}
                                    </div>
                                </button>
                                <button
                                    onClick={() => setBalanceType("profit")}
                                    type="button"
                                    className={`p-4 rounded-xl border-2 transition-all ${
                                        balanceType === "profit"
                                            ? "border-green-500 bg-green-50"
                                            : "border-gray-200 hover:border-green-200"
                                    }`}
                                >
                                    <PiggyBank
                                        className={`w-5 h-5 mb-2 ${
                                            balanceType === "profit"
                                                ? "text-green-500"
                                                : "text-gray-400"
                                        }`}
                                    />
                                    <div className="text-sm font-medium">
                                        Saldo em Lucros
                                    </div>
                                    <div className="text-lg font-bold">
                                        {formatCurrency(
                                            balances.profit.available
                                        )}
                                    </div>
                                </button>
                            </div>

                            {/* Amount Input */}
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label className="text-base">
                                        Valor do Saque
                                    </Label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                                            $
                                        </div>
                                        <Input
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            max={selectedBalance.available}
                                            placeholder="0,00"
                                            value={amount}
                                            className="pl-10 text-lg h-12"
                                            {...register("amount", {
                                                onChange: (e) =>
                                                    handleAmountChange(e),
                                            })}
                                        />
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        Saldo disponível:{" "}
                                        {formatCurrency(
                                            selectedBalance.available
                                        )}
                                    </div>
                                </div>

                                {/* Preview Card */}
                                {previewData && (
                                    <Card className="bg-gray-50">
                                        <div className="p-4 space-y-3">
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-600">
                                                    Valor do Saque:
                                                </span>
                                                <span className="font-medium">
                                                    {formatCurrency(
                                                        previewData.amount
                                                    )}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-600">
                                                    Taxa:
                                                </span>
                                                <span className="font-medium text-green-600">
                                                    Grátis
                                                </span>
                                            </div>
                                            <div className="border-t pt-3">
                                                <div className="flex justify-between items-center">
                                                    <span className="font-medium">
                                                        Total a Receber:
                                                    </span>
                                                    <span className="font-bold text-lg text-green-600">
                                                        {formatCurrency(
                                                            previewData.total
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                )}

                                <Button
                                    type="submit"
                                    className="w-full h-12 text-lg bg-green-600 hover:bg-green-700"
                                    disabled={
                                        !amount ||
                                        loading ||
                                        parseFloat(amount) >
                                            selectedBalance.available
                                    }
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                            Processando...
                                        </>
                                    ) : (
                                        "Solicitar Saque via PIX"
                                    )}
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>

                {/* Side Information Panel */}
                <div className="space-y-6">
                    {/* Quick Info Card */}
                    <Card>
                        <div className="p-4">
                            <h4 className="font-semibold mb-4">
                                Informações do Saque
                            </h4>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <Clock className="w-5 h-5 text-green-500 mt-1" />
                                    <div>
                                        <p className="font-medium">
                                            Processamento Instantâneo
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Disponível 24 horas por dia, 7 dias
                                            por semana
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-1" />
                                    <div>
                                        <p className="font-medium">Sem Taxas</p>
                                        <p className="text-sm text-gray-500">
                                            Transferências PIX são gratuitas
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <AlertCircle className="w-5 h-5 text-green-500 mt-1" />
                                    <div>
                                        <p className="font-medium">
                                            Limite Diário
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Até $ 10.000,00 por transação
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Last Transactions */}
                    <Card>
                        <div className="p-4">
                            <h4 className="font-semibold mb-4">
                                Últimos Saques
                            </h4>
                            <div className="space-y-3">
                                {lastTransactions.map((value, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between p-2 rounded-lg bg-gray-50"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                                                <ArrowRight className="w-4 h-4 text-green-600" />
                                            </div>
                                            <span className="font-medium">
                                                PIX
                                            </span>
                                        </div>
                                        <span>{formatCurrency(value)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>

                    {/* Additional Info */}
                    <Alert className="bg-blue-50 border-blue-200">
                        <AlertCircle className="w-4 h-4 text-blue-600" />
                        <AlertDescription className="text-sm text-blue-600">
                            Para sua segurança, mantenha seus dados PIX sempre
                            atualizados.
                        </AlertDescription>
                    </Alert>
                </div>
            </div>
        </div>
    );
};

export default PayoutRequestForm;
