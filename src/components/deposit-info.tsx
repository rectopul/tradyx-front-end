import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/utils/helpers";

export function DepositInfo({ settings }: { settings: any }) {
    return (
        <div
            className={cn(
                "w-full max-w-2xl mx-auto my-8 rounded-2xl shadow-lg border border-ebony-clay-200 overflow-hidden",
                "bg-gradient-to-br from-ebony-clay-50 via-white to-ebony-clay-100"
            )}
        >
            {/* Header */}
            <div className="flex items-center gap-2 px-5 py-4 bg-ebony-clay-900 text-white">
                <div className="bg-ebony-clay-700 p-2 rounded-full">
                    <AlertCircle className="w-5 h-5 text-pacific-blue-400" />
                </div>
                <h2 className="text-base sm:text-lg font-semibold tracking-wide">
                    Lembretes importantes
                </h2>
            </div>

            {/* Content */}
            <div className="p-5 text-sm sm:text-base text-ebony-clay-900 space-y-5">
                <div className="border-l-4 border-pacific-blue-500 pl-4">
                    <p>
                        <strong className="text-ebony-clay-800">
                            1. Valor mínimo do depósito:
                        </strong>{" "}
                        <span className="text-pacific-blue-700 font-semibold">
                            {formatCurrency(settings?.minimum_deposit ?? 0)}
                        </span>
                        . Escolha um valor correspondente ao depósito real, caso
                        contrário o valor não será creditado.
                    </p>
                </div>

                <div className="border-l-4 border-pacific-blue-400 pl-4">
                    <p>
                        <strong className="text-ebony-clay-800">
                            2. Nova solicitação de depósito:
                        </strong>{" "}
                        Sempre que fizer um novo depósito, acesse a plataforma{" "}
                        <span className="font-semibold text-ebony-clay-900">
                            {settings?.site_name ?? ""}
                        </span>{" "}
                        e registre uma nova solicitação.
                    </p>
                </div>

                <div className="border-l-4 border-pacific-blue-300 pl-4">
                    <p>
                        <strong className="text-ebony-clay-800">
                            3. Recibo de depósito:
                        </strong>{" "}
                        Se o saldo não for creditado em até{" "}
                        <span className="text-ebony-clay-800 font-semibold">
                            30 minutos
                        </span>
                        , contate o suporte pela plataforma{" "}
                        <span className="font-semibold text-ebony-clay-900">
                            {settings?.site_name ?? ""}
                        </span>
                        .
                    </p>
                </div>

                <div className="border-l-4 border-pacific-blue-200 pl-4">
                    <p>
                        <strong className="text-ebony-clay-800">
                            4. Método de pagamento:
                        </strong>{" "}
                        Caso o método atual não funcione, altere para outro. Os
                        depósitos devem ser feitos apenas pela plataforma{" "}
                        <span className="font-semibold text-ebony-clay-900">
                            {settings?.site_name ?? ""}
                        </span>{" "}
                        — outros meios não são processados.
                    </p>
                </div>
            </div>
        </div>
    );
}
