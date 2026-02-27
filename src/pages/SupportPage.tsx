import { Telegram, Whatsapp } from "@/components/icons/lib";
import { useUser } from "@/contexts/UserProvider";
import { ChevronRight } from "lucide-react";

export function SupportPage() {
    const { settings } = useUser();
    const openInNewTab = (url: string) => {
        window.open(url, "_blank", "noopener,noreferrer");
    };

    return (
        <div className="w-full flex flex-col font-sans px-2 mb-24">
            <div className="mt-6 flex flex-col gap-1 mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Central de Ajuda</h2>
                <p className="text-sm text-gray-400 font-medium">
                    Nossa equipe está aqui para apoiá-lo 24 horas por dia, 7 dias por semana.
                </p>
            </div>

            <div className="flex flex-col gap-4">
                <button
                    onClick={() => openInNewTab(settings?.whatsapp_link ?? "")}
                    className="w-full bg-white rounded-3xl p-6 flex items-center justify-between border border-gray-100 shadow-sm transition-all hover:shadow-md active:scale-[0.98]"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center text-green-500">
                            <Whatsapp className="w-8 h-8" />
                        </div>
                        <div className="flex flex-col items-start">
                            <span className="font-bold text-gray-900 text-lg">Suporte via WhatsApp</span>
                            <span className="text-xs text-gray-400 font-medium">Resposta instantânea</span>
                        </div>
                    </div>
                    <ChevronRight className="w-6 h-6 text-gray-300" />
                </button>

                <button
                    onClick={() => openInNewTab(settings?.telegram_link ?? "")}
                    className="w-full bg-white rounded-3xl p-6 flex items-center justify-between border border-gray-100 shadow-sm transition-all hover:shadow-md active:scale-[0.98]"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500">
                            <Telegram className="w-8 h-8" />
                        </div>
                        <div className="flex flex-col items-start">
                            <span className="font-bold text-gray-900 text-lg">Comunidade Telegram</span>
                            <span className="text-xs text-gray-400 font-medium">Entre em nosso grupo</span>
                        </div>
                    </div>
                    <ChevronRight className="w-6 h-6 text-gray-300" />
                </button>
            </div>
        </div>
    );
}
