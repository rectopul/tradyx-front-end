import { useState, useEffect } from "react";
import { AlertCircle, Check, Wallet } from "lucide-react";
import { formatCurrency } from "@/utils/helpers";
import { useUser } from "@/contexts/UserProvider";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import {
    createWithdrawal,
    getUserIp,
    WithdrawnPayload,
} from "@/services/transactionsService";
import { NumericFormat } from "react-number-format";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AxiosError } from "axios";
import { ApiException } from "@/utils/api-errors";
import { Spinner } from "@/components/ui/spinner";
import { Coin } from "@/components/icons/lib";
import { Pix } from "@/assets/icons/Check";

export function WithdrawPage() {
    const { user } = useUser();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const { settings } = useUser();
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<WithdrawnPayload>();

    const handleSetIp = async () => {
        try {
            const user_ip = await getUserIp();

            if (user_ip.ip) {
                setValue("ip_address", user_ip.ip);
            }
        } catch (error) {
            toast.dismiss();
            toast.error("Erro ao obter dados");
        }
    };

    useEffect(() => {
        handleSetIp();
    }, []);

    const handleWithdraw: SubmitHandler<WithdrawnPayload> = async (data) => {
        if (user && data.amount && user.available_to_withdraw < data.amount) {
            toast.dismiss();
            return toast.error(
                "O valor ultrapassa o saldo disponível para saque"
            );
        }

        toast.loading("Processando...");

        try {
            await createWithdrawal(data);
            setIsDialogOpen(true);

            toast.dismiss();
        } catch (error: any) {
            toast.dismiss();
            if (error instanceof AxiosError) {
                const apiError = ApiException.fromAxiosError(error);

                if (apiError.hasErrorFor("amount")) {
                    toast.error("Erro no saldo", {
                        description: apiError.getErrorFor("amount"),
                    });
                    return;
                } else if (apiError.hasErrorFor("message")) {
                    toast.error("Erro ao solicitar saque", {
                        description: apiError.getErrorFor("message"),
                    });
                    return;
                } else {
                    toast.error("Erro ao solicitar saque", {
                        description: error?.response?.data.message,
                    });
                    return;
                }
            }
            return toast.error("Erro desconhecido");
        }
    };

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Spinner />
            </div>
        );
    }

    return (
        <div className="w-full flex flex-col font-sans px-2 mb-24">
            <div className="mt-6 flex flex-col gap-1">
                <h2 className="text-2xl font-bold text-gray-900">Withdraw Funds</h2>
                <p className="text-sm text-gray-400 font-medium">
                    Available to withdraw: <span className="text-gray-900 font-bold">{formatCurrency(user.available_to_withdraw)}</span>
                </p>
            </div>

            <form
                onSubmit={handleSubmit(handleWithdraw)}
                className="w-full flex flex-col gap-6 mt-8"
            >
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-900 ml-1">Withdraw Amount</label>
                    <div className="flex items-center bg-white border-2 border-gray-100 rounded-2xl relative focus-within:border-brand transition-colors overflow-hidden">
                        <span className="absolute left-5 text-gray-400 font-bold text-xl">
                            R$
                        </span>
                        <Controller
                            name="amount"
                            control={control}
                            rules={{
                                required: "O valor é obrigatório",
                                min: {
                                    value: settings?.minimum_withdraw ?? 0,
                                    message: "Valor mínimo de saque não atingido.",
                                },
                            }}
                            render={({ field }) => {
                                const { onChange, value } = field;
                                return (
                                    <NumericFormat
                                        value={value}
                                        type="text"
                                        inputMode="numeric"
                                        className="w-full h-16 pl-14 pr-4 bg-transparent text-gray-900 font-bold text-2xl focus:outline-none placeholder:text-gray-200"
                                        placeholder="0,00"
                                        decimalSeparator=","
                                        thousandSeparator="."
                                        decimalScale={2}
                                        fixedDecimalScale
                                        onValueChange={(values) => {
                                            onChange(values.floatValue ?? 0);
                                        }}
                                    />
                                );
                            }}
                        />
                    </div>
                </div>

                {errors.amount && (
                    <p className="text-red-500 text-xs font-medium ml-1">
                        {errors.amount.message}
                    </p>
                )}

                <div className="bg-brand/5 border border-brand/10 rounded-2xl p-4 flex items-start gap-3">
                    <Wallet className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                    <p className="text-xs text-brand/80 font-medium leading-relaxed">
                        Minimum withdraw amount is {formatCurrency(settings?.minimum_withdraw ?? 0)}.
                    </p>
                </div>

                <button
                    type="submit"
                    className="bg-brand hover:bg-brand/90 text-gray-900 font-bold text-lg rounded-2xl py-5 shadow-lg shadow-brand/20 transition-all active:scale-95 flex items-center justify-center gap-3"
                >
                    <Pix className="w-6 h-6" /> Withdraw with Pix
                </button>

                <div className="w-full bg-white rounded-3xl shadow-sm border border-gray-100 p-6 space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                            <AlertCircle className="w-6 h-6" />
                        </div>
                        <h3 className="text-gray-900 font-bold">Important Information</h3>
                    </div>

                    <div className="space-y-4">
                        <div className="flex gap-3">
                            <span className="text-brand font-bold">01.</span>
                            <p className="text-xs text-gray-500 leading-relaxed">
                                Ensure your withdrawal amount is correct. Withdrawals below the minimum
                                <span className="text-gray-900 font-bold"> ({formatCurrency(settings?.minimum_withdraw ?? 0)}) </span>
                                will not be processed.
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <span className="text-brand font-bold">02.</span>
                            <p className="text-xs text-gray-500 leading-relaxed">
                                Always create a new withdrawal request in the {settings?.site_name} platform for each transaction.
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <span className="text-brand font-bold">03.</span>
                            <p className="text-xs text-gray-500 leading-relaxed">
                                Withdrawals are typically processed within 20 minutes to 1 hour. If not received after 3 hours, contact support.
                            </p>
                        </div>
                    </div>
                </div>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent className="w-[90%] max-w-sm rounded-2xl p-5 shadow-lg">
                        <DialogHeader className="text-center space-y-2">
                            <div className="flex items-center justify-center">
                                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-brand/10 text-brand">
                                    <Check className="w-8 h-8" />
                                </div>
                            </div>
                            <DialogTitle className="text-lg font-semibold text-gray-900">
                                Saque registrado!
                            </DialogTitle>
                            <DialogDescription className="text-sm text-slate-600">
                                Sua solicitação de saque foi registrada com
                                sucesso.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="text-center mt-4 space-y-2">
                            <p className="text-sm text-slate-700">
                                Os saques são processados no prazo de:
                            </p>
                            <p className="text-base font-semibold text-brand">
                                20 minutos até 1 hora
                            </p>
                            <p className="text-[12px] text-slate-500">
                                Você receberá a confirmação no seu painel e por
                                e-mail.
                            </p>
                        </div>

                        <div className="mt-6 flex justify-center">
                            <Button
                                onClick={() => setIsDialogOpen(false)}
                                className="w-full bg-brand hover:bg-brand/90 text-gray-900 rounded-xl py-2 text-sm font-bold"
                            >
                                Entendido
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </form>
        </div>
    );
}
