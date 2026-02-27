import { useState, useRef, useCallback, useEffect } from "react";
import { Copy, MessageSquareWarning, QrCode } from "lucide-react";
import { formatCurrency } from "@/utils/helpers";
import { useUser } from "@/contexts/UserProvider";
import { SubmitHandler, useForm, Controller } from "react-hook-form"; // Importe o Controller
import { DepositPayload, DepositPayment } from "@/types";
import { toast } from "sonner";
import { checkDeposit, createDeposit } from "@/services/transactionsService";
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
import { QRCodeCanvas } from "qrcode.react";
import { DepositInfo } from "@/components/deposit-info";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";
import { Coin } from "@/components/icons/lib";
import { Pix } from "@/assets/icons/Check";

const defsRecharge = [100, 200, 500];

export function DepositPage() {
    const [selectedRecharge, setSelectedRecharge] = useState(defsRecharge[0]);
    const [depositData, setDepositData] = useState<DepositPayment | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [qrcodeUrl, setQrCodeUrl] = useState<string | null>(null);
    const pixCodeRef = useRef<HTMLInputElement>(null);
    const intervalRef = useRef<number | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { settings } = useUser();
    const {
        control, // Importe o 'control' do useForm
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<DepositPayload>({
        defaultValues: {
            amount: defsRecharge[0],
        },
    });

    // Função de polling otimizada com useCallback
    const checkDepositStatus = useCallback(async () => {
        if (!depositData?.data.deposit_id) return;

        try {
            const status = await checkDeposit(depositData?.data.deposit_id);
            // Verifica o status do depósito.
            // Ajuste a condição de acordo com a sua API.
            if (status.success) {
                toast.success("Depósito creditado com sucesso!");
                // Limpa o polling quando o depósito for confirmado
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                }
                setIsDialogOpen(false); // Fecha o modal
            }
        } catch (error) {
            console.error("Erro ao verificar status do depósito:", error);
            // Limpa o polling em caso de erro
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }
    }, [depositData]);

    // Efeito para iniciar e limpar o polling
    useEffect(() => {
        // Se o modal estiver aberto e houver dados de depósito, inicia o polling
        if (isDialogOpen && depositData?.data.deposit_id) {
            // Limpa qualquer intervalo anterior para evitar duplicações
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            // Inicia o polling a cada 10 segundos (10000 ms)
            intervalRef.current = window.setInterval(checkDepositStatus, 10000);
        }

        // Função de limpeza
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isDialogOpen, depositData, checkDepositStatus]);

    const handleButtonClick = (amount: number) => {
        setSelectedRecharge(amount);
        setValue("amount", amount);
    };

    const handleDeposit: SubmitHandler<DepositPayload> = async (data) => {
        toast.loading("Processando...");
        setIsLoading(true);
        try {
            // remove "R$" e espaços
            const semRS = String(data.amount).replace("R$", "").trim();

            // troca ponto de milhar e vírgula decimal
            const normalizado = semRS.replace(/\./g, "").replace(",", ".");

            // transforma em número float
            const numero = parseFloat(normalizado);

            console.log("number of send", numero);
            const deposit = await createDeposit({ ...data, amount: numero });
            setDepositData(deposit);
            setIsDialogOpen(true);

            setQrCodeUrl(deposit.data.payment_code);
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
                } else {
                    toast.error("Erro ao realizar depósito", {
                        description: error.message,
                    });
                    return;
                }
            }
            // return toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const copyPixCode = async () => {
        try {
            const code = pixCodeRef.current?.value;

            if (!code) {
                toast.error("Código Pix não encontrado!");
                return;
            }

            // Usa a API moderna se disponível
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(code);
            } else {
                // Fallback para navegadores antigos
                const textArea = document.createElement("textarea");
                textArea.value = code;
                textArea.style.position = "fixed";
                textArea.style.top = "-1000px";
                textArea.style.left = "-1000px";
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                document.execCommand("copy");
                document.body.removeChild(textArea);
            }

            toast.success("Código Pix copiado com sucesso!");
        } catch (error) {
            console.error(error);
            toast.error("Não foi possível copiar o código Pix.");
        }
    };

    return (
        <form
            onSubmit={handleSubmit(handleDeposit)}
            className="w-full flex flex-col gap-6 mb-24 font-sans px-2"
        >
            <div className="flex flex-col mt-6 gap-6">
                <div className="flex flex-col gap-1">
                    <h2 className="text-2xl font-bold text-gray-900">Recarregar</h2>
                    <p className="text-sm text-gray-400 font-medium">
                        Selecione um valor predefinido ou digite um valor personalizado.
                    </p>
                </div>

                <div className="grid grid-cols-3 gap-3 w-full">
                    {defsRecharge.map((df, key) => {
                        const isSelected = df === selectedRecharge;
                        return (
                            <button
                                key={key}
                                type="button"
                                onClick={() => handleButtonClick(df)}
                                className={`
                                    relative
                                    flex
                                    flex-col
                                    gap-1
                                    font-bold
                                    justify-center
                                    items-center
                                    w-full
                                    py-4
                                    rounded-2xl
                                    transition-all
                                    duration-200
                                    border-2
                                    ${
                                        isSelected
                                            ? "bg-brand/10 border-brand text-gray-900 shadow-lg shadow-brand/10"
                                            : "bg-white border-gray-100 text-gray-300 hover:border-gray-200"
                                    }
                                `}
                            >
                                <span className="text-lg">
                                    {df}
                                </span>
                                <span className="text-[10px] uppercase tracking-tighter opacity-60">BRL</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-900 ml-1">Valor Personalizado</label>
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
                                value: settings?.minimum_deposit ?? 0,
                                message: "Valor mínimo de depósito não atingido.",
                            },
                        }}
                        render={({ field }) => (
                            <NumericFormat
                                {...field}
                                type="text"
                                inputMode="numeric"
                                className="w-full h-16 pl-14 pr-4 bg-transparent text-gray-900 font-bold text-2xl focus:outline-none placeholder:text-gray-200"
                                placeholder="0,00"
                                decimalSeparator=","
                                thousandSeparator="."
                                decimalScale={2}
                                fixedDecimalScale
                                onValueChange={(values) => {
                                    field.onChange(values.floatValue);
                                    setSelectedRecharge(values.floatValue || 0);
                                }}
                            />
                        )}
                    />
                </div>
            </div>

            {errors.amount && (
                <p className="text-red-500 text-xs font-medium ml-1">
                    {errors.amount.message}
                </p>
            )}

            <div className="bg-brand/5 border border-brand/10 rounded-2xl p-4 flex items-start gap-3">
                <MessageSquareWarning className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                <p className="text-xs text-brand/80 font-medium leading-relaxed">
                    O valor mínimo para recarga é {formatCurrency(settings?.minimum_deposit ?? 0)}.
                    Os fundos são creditados automaticamente após a confirmação do Pix.
                </p>
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="bg-brand hover:bg-brand/90 text-gray-900 font-bold text-lg rounded-2xl py-5 shadow-lg shadow-brand/20 transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50"
            >
                {isLoading ? (
                    <Spinner size="sm" />
                ) : (
                    <>
                        Continuar via Pix <Pix className="w-6 h-6" />
                    </>
                )}
            </button>

            <div className="mt-4">
                <DepositInfo settings={settings} />
            </div>

            {/* Modal de Pagamento Pix - Mobile First */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent
                    className={cn(
                        "w-[95%] max-w-sm rounded-2xl overflow-hidden border border-ebony-clay-400 shadow-xl",
                        "bg-gradient-to-br from-ebony-clay-50 via-white to-ebony-clay-100 p-0 gap-0"
                    )}
                >
                    {/* Header */}
                    <DialogHeader className="text-center space-y-1 bg-ebony-clay-900 text-white py-3 rounded-t-2xl">
                        <div className="flex items-center justify-center gap-2">
                            <QrCode className="w-5 h-5 text-pacific-blue-400" />
                            <DialogTitle className="text-base sm:text-lg font-semibold tracking-wide">
                                Depósito via Pix
                            </DialogTitle>
                        </div>
                        <DialogDescription className="text-xs text-ebony-clay-100">
                            Pague escaneando ou copiando o código abaixo
                        </DialogDescription>
                    </DialogHeader>

                    {/* Body */}
                    <div className="p-5 space-y-5 text-ebony-clay-900 text-sm bg-gradient-to-b from-ebony-clay-950 to-ebony-clay-600">
                        {/* QR Code */}
                        <div className="flex flex-col items-center">
                            <div className="flex w-[220px] h-[220px] items-center justify-center p-2 border-2 border-dashed border-pacific-blue-400 rounded-xl bg-white">
                                {qrcodeUrl && (
                                    <QRCodeCanvas
                                        value={qrcodeUrl}
                                        size={190}
                                        level="H"
                                        className="rounded-md"
                                    />
                                )}
                            </div>
                            <p className="text-[11px] text-white mt-2">
                                Escaneie com o app do seu banco
                            </p>
                        </div>

                        {/* Código Pix Copia e Cola */}
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-semibold text-white">
                                Copia e Cola:
                            </label>
                            <div className="relative flex rounded-lg overflow-hidden border border-ebony-clay-200 shadow-sm">
                                <input
                                    ref={pixCodeRef}
                                    type="text"
                                    readOnly
                                    value={depositData?.data.payment_code || ""}
                                    className="flex-1 text-center px-2 py-2 text-[11px] sm:text-xs truncate bg-ebony-clay-50 text-ebony-clay-900 focus:outline-none"
                                />
                                <Button
                                    type="button"
                                    size="sm"
                                    className="rounded-none bg-pacific-blue-600 hover:bg-pacific-blue-700 text-white px-3 flex items-center gap-1 text-xs"
                                    onClick={copyPixCode}
                                >
                                    <Copy className="w-3 h-3" />
                                    Copiar
                                </Button>
                            </div>
                        </div>

                        {/* Instruções */}
                        <div className="bg-ebony-clay-50 border border-ebony-clay-200 rounded-xl p-3 space-y-2 shadow-inner">
                            <h4 className="text-xs font-semibold text-pacific-blue-700 uppercase tracking-wide">
                                Instruções
                            </h4>
                            <ul className="list-disc list-inside text-[11px] text-ebony-clay-800 space-y-1">
                                <li>Acesse o app do seu banco.</li>
                                <li>
                                    Selecione{" "}
                                    <span className="font-semibold">
                                        Pix → Pagar
                                    </span>
                                    .
                                </li>
                                <li>Escaneie ou cole o código acima.</li>
                                <li>
                                    Confirme os dados e finalize o pagamento.
                                </li>
                            </ul>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </form>
    );
}
