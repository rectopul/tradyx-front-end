import { useState, useEffect } from "react";
import { AlertCircle, Check } from "lucide-react";
import { formatCurrency } from "@/utils/helpers";
import { useUser } from "@/contexts/UserProvider";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import {
    createWithdrawAccount,
    fetchUpdateWithdrawAccount,
} from "@/services/transactionsService";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
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
import { WithdrawnAccount, WithdrawnAccountPayload } from "@/types";
import { useNavigate } from "react-router-dom";

export function WithdrawAccountPage() {
    const { user, updateUser } = useUser();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const navigate = useNavigate();

    const { settings } = useUser();
    const {
        control, // Importe o 'control' do useForm
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<WithdrawnAccountPayload>();

    useEffect(() => {
        if (user && user.withdraw_account) {
            setValue("cpf", user.withdraw_account.cpf);
            setValue("full_name", user.withdraw_account.full_name);
            setValue("phone", user.withdraw_account.phone);
            setValue("pix_key", user.withdraw_account.pix_key);
            setValue("pix_key_type", user.withdraw_account.pix_key_type);
            setValue("status", user.withdraw_account.status);
            setValue("is_default", user.withdraw_account.is_default);
        }
    }, [user]);

    const handleWithdrawAccount: SubmitHandler<
        WithdrawnAccountPayload
    > = async (data) => {
        toast.loading("Processando...");
        try {
            let withdrawAccount: WithdrawnAccount | null = null;

            if (user && user.withdraw_account) {
                withdrawAccount = await fetchUpdateWithdrawAccount(
                    user.withdraw_account.id,
                    data
                );
            } else {
                withdrawAccount = await createWithdrawAccount(data);
            }

            if (user && withdrawAccount) {
                updateUser({
                    ...user,
                    withdraw_account: withdrawAccount,
                });
            }

            toast.dismiss();
            toast.success("Conta de saque registrada com sucesso!");
            navigate("/withdraw");
        } catch (error: any) {
            toast.dismiss();
            if (error instanceof AxiosError) {
                const apiError = ApiException.fromAxiosError(error);

                if (apiError.hasErrorFor("message")) {
                    toast.error("Erro no processamento", {
                        description: apiError.getErrorFor("message"),
                    });
                    return;
                } else {
                    toast.error("Erro registrar conta de saque", {
                        description: error?.response?.data.message,
                    });
                    return;
                }
            }
            // return toast.error(error.message);
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
        <form
            onSubmit={handleSubmit(handleWithdrawAccount)}
            className="w-full flex flex-col gap-1 font-avenir mb-12"
        >
            <div className="flex flex-col gap-1 relative mt-2">
                <span className="text-ebony-clay-300 font-semibold text-sm">
                    Nome completo
                </span>
                <Controller
                    name="full_name"
                    control={control}
                    rules={{
                        required: "O nome é obrigatório",
                    }}
                    render={({ field }) => (
                        <input
                            type="text"
                            placeholder="Nome completo do titular da conta"
                            {...field}
                            className="bg-ebony-clay-950/40 border border-ebony-clay-500 text-ebony-clay-300 text-sm rounded-md w-full h-10 px-4"
                        />
                    )}
                />
                {errors.full_name && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.full_name.message}
                    </p>
                )}
            </div>

            <div className="flex flex-col gap-1 relative mt-2">
                <span className="text-ebony-clay-300 font-semibold text-sm">
                    CPF
                </span>
                <Controller
                    name="cpf"
                    control={control}
                    rules={{
                        required: "O cpf é obrigatório",
                    }}
                    render={({ field }) => (
                        <input
                            type="text"
                            placeholder="CPF do titular da conta"
                            inputMode="numeric"
                            {...field}
                            className="bg-ebony-clay-950/40 border border-ebony-clay-500 text-ebony-clay-300 text-sm rounded-md w-full h-10 px-4"
                        />
                    )}
                />
                {errors.cpf && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.cpf.message}
                    </p>
                )}
            </div>

            <div className="flex flex-col gap-1 relative mt-2">
                <span className="text-ebony-clay-300 font-semibold text-sm">
                    Telefone para contato
                </span>
                <Controller
                    name="phone"
                    control={control}
                    rules={{
                        required: "O telefone de contato é obrigatório",
                    }}
                    render={({ field }) => (
                        <input
                            type="text"
                            placeholder="Telefone para contato"
                            inputMode="numeric"
                            {...field}
                            className="bg-ebony-clay-950/40 border border-ebony-clay-500 text-ebony-clay-300  text-sm rounded-md w-full h-10 px-4"
                        />
                    )}
                />
                {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.phone.message}
                    </p>
                )}
            </div>

            <div className="flex flex-col gap-1 relative mt-2">
                <span className="text-ebony-clay-300 font-semibold text-sm">
                    Tipo de chave
                </span>
                <Controller
                    name="pix_key_type"
                    control={control}
                    rules={{
                        required: "O tipo de chave PIX é obrigatório",
                    }}
                    render={({ field }) => {
                        return (
                            <Select
                                value={field.value || ""} // <-- use `value` aqui
                                onValueChange={field.onChange} // <-- atualiza o RHF
                            >
                                <SelectTrigger className="bg-ebony-clay-950/40 border border-ebony-clay-500 text-ebony-clay-300">
                                    <SelectValue placeholder="Selecione um tipo de chave" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="CPF">CPF</SelectItem>
                                    <SelectItem value="EMAIL">
                                        E-mail
                                    </SelectItem>
                                    <SelectItem value="PHONE">
                                        Telefone
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        );
                    }}
                />
                {errors.pix_key_type && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.pix_key_type.message}
                    </p>
                )}
            </div>

            <div className="flex flex-col gap-1 relative mt-2">
                <span className="text-ebony-clay-300 font-semibold text-sm">
                    Chave PIX
                </span>
                <Controller
                    name="pix_key"
                    control={control}
                    rules={{
                        required: "A chave PIX é obrigatória",
                    }}
                    render={({ field }) => (
                        <input
                            type="text"
                            placeholder="Chave PIX"
                            {...field}
                            className="bg-ebony-clay-950/40 border border-ebony-clay-500 text-ebony-clay-300 text-sm rounded-md w-full h-10 px-4"
                        />
                    )}
                />
                {errors.pix_key && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.pix_key.message}
                    </p>
                )}
            </div>

            <button
                type="submit"
                className="bg-gradient-to-r from-ebony-clay-950 to-bg-ebony-clay-800 border border-ebony-clay-300 mt-4 text-white font-semibold text-[16px] rounded-md px-4 py-3"
            >
                {user && user.withdraw_account
                    ? "Atualizar"
                    : "Cadastrar conta"}
            </button>

            <div className="w-full max-w-2xl mb-12 mt-4 mx-auto bg-white rounded-xl shadow-md border border-slate-200 p-4">
                {/* Cabeçalho */}
                <div className="flex items-center gap-2 mb-3">
                    <AlertCircle className="w-6 h-6 text-pacific-blue-500" />
                    <p className="text-slate-800 font-semibold">Lembrete:</p>
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
                            {formatCurrency(settings?.minimum_withdraw ?? 0)}
                        </span>
                        . Selecione um valor que corresponda ao valor do seu
                        saque, caso contrário, o valor não será transferido para
                        sua conta.
                    </p>

                    <p>
                        2.{" "}
                        <span className="text-red-500 font-semibold">
                            Nova solicitação de saque
                        </span>
                        : Sempre que fizer um saque, você deverá acessar a
                        plataforma {settings?.site_name ?? ""} e criar uma nova
                        solicitação de saque.
                    </p>

                    <p>
                        3.{" "}
                        <span className="text-red-500 font-semibold">
                            Recibo de saque
                        </span>
                        : Se o saldo da sua plataforma{" "}
                        {settings?.site_name ?? ""} não for debitado em 30
                        minutos, entre em contato com o Suporte pela plataforma
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
                            Sua solicitação de saque foi registrada com sucesso.
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
    );
}
