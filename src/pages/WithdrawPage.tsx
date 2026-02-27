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
        control, // Importe o 'control' do useForm
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
            <>
                <Spinner />
            </>
        );
    }

    return (
        <>
            <form
                onSubmit={handleSubmit(handleWithdraw)}
                className="w-full flex flex-col gap-1 font-avenir"
            >
                <p className="text-ebony-clay-300 text-sm flex items-center gap-2 mt-2">
                    <Wallet className="!w-4 !h-4" />
                    Saque mínimo{" "}
                    {formatCurrency(settings?.minimum_withdraw ?? 0)}
                </p>

                <div className="flex items-center bg-ebony-clay-300/50 rounded-md relative mt-2">
                    <span className="text-pacific-blue-950 absolute top-1/2 left-4 -translate-y-1/2 z-10">
                        <Coin className="!w-5 !h-5" />
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
                                    value={value} // valor do RHF
                                    type="text"
                                    inputMode="numeric"
                                    className="w-full h-12 placeholder:text-ebony-clay-950 pl-12 bg-transparent text-ebony-clay-950 font-semibold border-0 p-4 rounded-md text-sm focus:outline-none"
                                    placeholder="Informe o valor do saque"
                                    prefix="R$ "
                                    decimalSeparator=","
                                    thousandSeparator="."
                                    decimalScale={2}
                                    fixedDecimalScale
                                    onValueChange={(values) => {
                                        // envia apenas o número puro
                                        onChange(values.floatValue ?? 0);
                                    }}
                                />
                            );
                        }}
                    />
                </div>

                {errors.amount && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.amount.message}
                    </p>
                )}

                <button
                    type="submit"
                    className="bg-secondary-gradient shadow-top-inset shadow-tradyx-500 border flex gap-2 items-center justify-center border-tradyx-900 mt-4 text-white font-semibold text-[16px] rounded-md px-4 py-3"
                >
                    <Pix /> Sacar
                </button>

                <div className="w-full max-w-2xl mb-20 mt-4 mx-auto bg-white rounded-xl shadow-md border border-slate-200 p-4 pb-8">
                    {/* Cabeçalho */}
                    <div className="flex items-center gap-2 mb-3">
                        <AlertCircle className="w-6 h-6 text-pacific-blue-500" />
                        <p className="text-slate-800 font-semibold">
                            Lembrete:
                        </p>
                    </div>

                    {/* Conteúdo */}
                    <div className="text-sm leading-relaxed text-slate-700 space-y-4">
                        <p>
                            1.{" "}
                            <span className="text-red-500 font-semibold">
                                Valor mínimo de saque
                            </span>
                            :
                            <span className="text-red-500 font-semibold">
                                {formatCurrency(
                                    settings?.minimum_withdraw ?? 0
                                )}
                            </span>
                            . Selecione um valor que corresponda ao valor do seu
                            saque, caso contrário, o valor não será transferido
                            para sua conta.
                        </p>

                        <p>
                            2.{" "}
                            <span className="text-red-500 font-semibold">
                                Nova solicitação de saque
                            </span>
                            : Sempre que fizer um saque, você deverá acessar a
                            plataforma {settings?.site_name ?? ""} e criar uma
                            nova solicitação de saque.
                        </p>

                        <p>
                            3.{" "}
                            <span className="text-red-500 font-semibold">
                                Recibo de saque
                            </span>
                            : Se o saldo da sua plataforma{" "}
                            {settings?.site_name ?? ""} não for debitado em 30
                            minutos, entre em contato com o Suporte pela
                            plataforma
                            {settings?.site_name ?? ""}.
                        </p>

                        <p>
                            4.{" "}
                            <span className="text-red-500 font-semibold">
                                Método de pagamento
                            </span>
                            : O método de pagamentos padrão da plataforma{" "}
                            {settings?.site_name ?? ""} será sempre via PIX.
                        </p>
                    </div>
                </div>

                {/* Modal de Confirmação de Saque - Mobile First */}
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent className="w-[90%] max-w-sm rounded-2xl p-5 shadow-lg">
                        {/* Header */}
                        <DialogHeader className="text-center space-y-2">
                            <div className="flex items-center justify-center">
                                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-pacific-blue-100 text-pacific-blue-600">
                                    <Check className="w-8 h-8" />
                                </div>
                            </div>
                            <DialogTitle className="text-lg font-semibold text-pacific-blue-700">
                                Saque registrado!
                            </DialogTitle>
                            <DialogDescription className="text-sm text-slate-600">
                                Sua solicitação de saque foi registrada com
                                sucesso.
                            </DialogDescription>
                        </DialogHeader>

                        {/* Mensagem de Confirmação */}
                        <div className="text-center mt-4 space-y-2">
                            <p className="text-sm text-slate-700">
                                Os saques são processados no prazo de:
                            </p>
                            <p className="text-base font-semibold text-pacific-blue-600">
                                20 minutos até 1 hora
                            </p>
                            <p className="text-[12px] text-slate-500">
                                Você receberá a confirmação no seu painel e por
                                e-mail.
                            </p>
                        </div>

                        {/* Botão de Fechar */}
                        <div className="mt-6 flex justify-center">
                            <Button
                                onClick={() => setIsDialogOpen(false)}
                                className="w-full bg-pacific-blue-500 hover:bg-pacific-blue-600 text-white rounded-md py-2 text-sm"
                            >
                                Entendido
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </form>
        </>
    );
}
