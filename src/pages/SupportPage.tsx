import { Telegram, Whatsapp } from "@/components/icons/lib";
import { useUser } from "@/contexts/UserProvider";
import { ChevronRight } from "lucide-react";

export function SupportPage() {
    const { settings } = useUser();
    const openInNewTab = (url: string) => {
        window.open(url, "_blank", "noopener,noreferrer");
    };

    return (
        <div className="w-full flex flex-col gap-4 font-avenir text-sm font-semibold">
            <div
                className="grid grid-cols-[40px_auto_40px] gap-2 items-center"
                onClick={() => openInNewTab(settings?.whatsapp_link ?? "")}
            >
                <span className="text-white bg-green-600 flex justify-center items-center rounded-md h-[40px]">
                    <Whatsapp className="w-7 h-7" />
                </span>
                <div className="text-pacific-blue-700">
                    Contate o suporte via whatsapp
                </div>
                <span className="text-black flex justify-center items-center rounded-md h-[40px]">
                    <ChevronRight className="w-7 h-7" />
                </span>
            </div>

            <div
                className="grid grid-cols-[40px_auto_40px] gap-2 items-center"
                onClick={() => openInNewTab(settings?.whatsapp_link ?? "")}
            >
                <span className="text-white bg-pacific-blue-400 flex justify-center items-center rounded-md h-[40px]">
                    <Telegram className="w-7 h-7" />
                </span>
                <div className="text-pacific-blue-700">
                    Contate o suporte via Telegram
                </div>
                <span className="text-black flex justify-center items-center rounded-md h-[40px]">
                    <ChevronRight className="w-7 h-7" />
                </span>
            </div>
        </div>
    );
}
