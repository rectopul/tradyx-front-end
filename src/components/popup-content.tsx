import { useUser } from "@/contexts/UserProvider";
import { Send } from "lucide-react";
import { Whatsapp } from "./icons/lib";

export function PopupContent() {
    const { settings } = useUser();

    return (
        <div className="space-y-5 max-h-[400px] overflow-y-auto text-center px-4 pb-6">
            {/* Título */}
            <h2 className="text-xl font-bold text-pacific-blue-600 leading-snug text-center">
                Bem-vindo à plataforma PEP ROBOT
            </h2>

            {/* Benefícios resumidos */}
            <div className="space-y-3 mt-4">
                {/* Lucro Diário */}
                <div className="flex items-center gap-2 text-sm bg-pacific-blue-50 rounded-lg py-2 px-3">
                    Data de lançamento: 22 de setembro de 2025
                </div>
                <div className="flex items-center gap-2 text-sm bg-pacific-blue-50 rounded-lg py-2 px-3">
                    Bônus de inscrição: R$ 10.
                </div>
                <div className="flex items-center gap-2 text-sm bg-pacific-blue-50 rounded-lg py-2 px-3">
                    Reembolsos de alta comissão: 23% para usuários da Equipe 1,
                    2 % para usuários da Equipe 2 e 1% para usuários da Equipe 3
                </div>

                {/* Observação */}
                <div className="flex items-center gap-2 text-sm bg-pacific-blue-50 rounded-lg py-2 px-3">
                    <span>
                        🌍 Acesse de qualquer lugar do mundo, sem complicações.
                    </span>
                </div>

                {/* Grupo Oficial */}
                <div className="flex flex-col gap-2 text-sm bg-pacific-blue-100 border border-pacific-blue-300 rounded-lg py-3 px-4 text-center">
                    <span className="font-semibold text-pacific-blue-600">
                        📢 Nosso Grupo Oficial:
                    </span>
                </div>
            </div>

            {/* Botão Investir */}
            <a
                href={settings?.whatsapp_link} // coloque aqui o link do seu grupo
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full border border-pacific-blue-500 text-pacific-blue-600 font-semibold py-3 rounded-xl transition hover:bg-pacific-blue-50"
            >
                <Whatsapp className="w-5 h-5" />
                Entrar no grupo do Whatsapp
            </a>

            {/* Botão Telegram */}
            <a
                href={settings?.telegram_link} // coloque aqui o link do seu grupo
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full border border-pacific-blue-500 text-pacific-blue-600 font-semibold py-3 rounded-xl transition hover:bg-pacific-blue-50"
            >
                <Send className="w-5 h-5" />
                Entrar no grupo do Telegram
            </a>
        </div>
    );
}
