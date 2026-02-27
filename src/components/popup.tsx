import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { useUser } from "@/contexts/UserProvider";
import { asset, formatCurrency } from "@/utils/helpers";
import { X } from "lucide-react";
import { useState } from "react";
import { Separator } from "./ui/separator";
import { Whatsapp } from "./icons/lib";

export function Popup() {
    const [open, setOpen] = useState(true);
    const { settings } = useUser();

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <AlertDialog onOpenChange={setOpen} open={open}>
            <AlertDialogContent className="p-0 border-none max-w-[85%] sm:max-w-md shadow-4xl rounded-3xl text-white">
                <AlertDialogHeader className="relative flex flex-col px-6 items-center justify-center bg-white rounded-t-4xl pt-10 pb-3 text-center">
                    <button
                        className="absolute right-3 top-6 z-10 bg-orange-gradient shadow shadow-tradyx-500 border border-orange-500 flex justify-center items-center h-6 w-6 text-white rounded-lg transition-all duration-200"
                        onClick={handleClose}
                    >
                        <X className="w-5 h-5" strokeWidth={2.5} />
                    </button>

                    <div className="absolute -top-9">
                        <img
                            src={asset("/assets/images/gold-riborn.png")}
                            alt="gold-riborn"
                        />
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                        <div className="flex justify-center items-center">
                            <Separator />
                        </div>

                        <div className="">
                            <img
                                src={asset("/assets/images/icons/medal.svg")}
                                alt="Bem vindo"
                                className="w-20 h-auto mb-4"
                            />
                        </div>

                        <div className="flex justify-center items-center">
                            <Separator />
                        </div>
                    </div>

                    <h2 className="text-[15px] font-medium text-gray-400 px-6">
                        Bém vindo ao time{" "}
                        <span className="font-bold">
                            {settings?.site_name ?? ""}
                        </span>
                    </h2>
                </AlertDialogHeader>

                <div className="px-6 pb-6 py-0 text-center space-y-4 text-gray-400 font-space">
                    <div className="flex gap-2 text-sm font-normal text-center">
                        <div
                            className="w-5 h-5 bg-contain bg-center bg-no-repeat"
                            style={{
                                backgroundImage: `url(${asset(
                                    "/assets/images/icons/calendar.svg",
                                )})`,
                            }}
                        ></div>
                    </div>

                    <div className="flex gap-2 text-sm font-normal text-center">
                        <div
                            className="w-6 h-6 bg-contain bg-center bg-no-repeat"
                            style={{
                                backgroundImage: `url(${asset(
                                    "/assets/images/icons/gift.svg",
                                )})`,
                            }}
                        ></div>
                        <div className="text-start">
                            Receba{" "}
                            <span className="text-[16px] font-bold">
                                {formatCurrency(
                                    settings?.registration_bonus ?? 0,
                                )}
                            </span>{" "}
                            de{" "}
                            <strong className="font-semibold">
                                Bônus de inscrição:
                            </strong>
                        </div>
                    </div>

                    <div className="flex gap-2 text-sm font-normal text-center">
                        <div
                            className="w-6 h-6 bg-contain bg-center bg-no-repeat"
                            style={{
                                backgroundImage: `url(${asset(
                                    "/assets/images/icons/comission-money.svg",
                                )})`,
                            }}
                        ></div>
                        <div className="text-start w-4/5">
                            <strong>Comissão de</strong> 23% para usuários da
                            Equipe 1, 2% nível 2 e 1% para nível 3
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 mt-6">
                        <a
                            href={settings?.whatsapp_link ?? ""}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-1 bg-gradient-rose shadow-gradient-[#fed7e6,#b7436d] hover:bg-green-600 text-white py-3 !rounded-2xl font-medium transition-all duration-200 shadow-md"
                        >
                            <Whatsapp className="text-white w-6 h-6" />
                            Grupo do WhatsApp
                        </a>
                    </div>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    );
}
