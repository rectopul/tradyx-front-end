import { asset, formatCurrency } from "@/utils/helpers";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { purchasePackage } from "@/services/transactionsService";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { ApiException } from "@/utils/api-errors";
import { useUser } from "@/contexts/UserProvider";
import { Package } from "../admin/packages/columns";

interface PackageCardProps {
    pkg: Package;
}

export const PackageCard = ({ pkg }: PackageCardProps) => {
    const [isBuying, setIsBuying] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const dailyReturn =
        pkg.total_investment * (pkg.commission_percentage / 100);
    const { purchases, addPurchase } = useUser();

    const countPurchased = purchases.filter((pc) => pc.package_id === pkg.id);

    // calculo de dias
    const duration = pkg.total_duration;
    const unit = pkg.frequency_unit;

    let durationInDays = 0;

    switch (unit) {
        case "hour":
            durationInDays = duration / 24; //
            break;
        case "day":
            durationInDays = duration; // já está em dias
            break;
        case "week":
            durationInDays = duration * 7; // semanas * 7 dias
            break;
        case "month":
            durationInDays = duration * 30; // meses * ~30 dias (pode trocar por 28-31)
            break;
    }

    const handleBuyPackage = async () => {
        setIsBuying(true);
        toast.loading("Processando investimento!");
        try {
            const purchase = await purchasePackage(pkg.id);

            if (purchase) {
                toast.dismiss();
                toast.success("Investimento realizado com sucesso!");
                setOpen(false);
                addPurchase(purchase.purchase);
            }
        } catch (error) {
            toast.dismiss();
            if (error instanceof AxiosError) {
                const apiError = ApiException.fromAxiosError(error);

                if (apiError.hasErrorFor("message")) {
                    toast.error("Erro ao processar investimento", {
                        description: apiError.getErrorFor("message"),
                    });
                    return;
                } else {
                    toast.error("Erro ao processar investimento", {
                        description: error.message,
                    });
                    return;
                }
            }
            toast.error("Erro no processamento!");
        } finally {
            setIsBuying(false);
        }
    };

    return (
        <>
            <div
                className="rounded-xl py-4 flex flex-col h-[193px] font-avenir bg-top bg-cover bg-no-repeat shadow-md"
                style={{
                    backgroundImage: `url(${asset("/" + pkg.photo)})`,
                }}
            >
                <div className="w-full flex items-center px-4">
                    <div className="h-6  flex items-center  text-sm px-2 bg-pacific-blue-950 rounded-md text-white font-medium">
                        {formatCurrency(pkg.total_investment)}
                    </div>

                    <div
                        className="bg-cover flex pl-2 font-bold items-center bg-no-repeat bg-center text-white text-sm w-[49px] ml-4"
                        style={{
                            backgroundImage: `url(${asset(
                                "/assets/images/limitbg.png"
                            )})`,
                        }}
                    >
                        {countPurchased.length}/∞
                    </div>
                </div>

                <div className="w-full h-7 px-4 text-[16px] mt-9 items-center flex justify-between text-white font-bold bg-gradient-to-r from-black from-10% to-transparent to-80%">
                    <div className="">{pkg.name}</div>

                    <div className="bg-white text-orange-500 text-sm flex h-full items-center justify-center leading-tight rounded-md px-2">
                        {durationInDays} dias/
                        <span className="text-pacific-blue-950 font-light">
                            Ciclo
                        </span>
                    </div>
                </div>

                <div className="w-full h-28 px-4 text-[16px] relative gap-1 justify-center mt-5 flex flex-col text-white font-bold bg-gradient-to-r from-black from-10% to-transparent to-80%">
                    <div className="text-yellow-400 text-sm font-semibold">
                        {formatCurrency(dailyReturn)}{" "}
                        <span className="text-white font-normal">
                            / Renda diária
                        </span>
                    </div>

                    <div className="text-yellow-400 text-sm font-semibold">
                        {formatCurrency(pkg.return_amount)}{" "}
                        <span className="text-white font-normal">
                            / Renda total
                        </span>
                    </div>

                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger className="bg-transparent" asChild>
                            <button
                                className="absolute bg-transparent top-1/2 right-4 -translate-y-1/2 w-[110px] h-[29px] bg-cover bg-no-repeat bg-center"
                                style={{
                                    backgroundImage: `url(${asset(
                                        "/assets/images/bg-btn-invest.png"
                                    )})`,
                                }}
                            ></button>
                        </SheetTrigger>
                        <SheetContent
                            side="bottom"
                            className="h-[380px] bg-pacific-blue-500/20 border-t border-pacific-blue-700 backdrop-blur-md rounded-t-2xl font-avenir text-white"
                        >
                            <SheetHeader>
                                <SheetTitle className="text-white font-normal">
                                    Investimento em {pkg.name}
                                </SheetTitle>
                                <SheetDescription className="text-white font-normal">
                                    Confirme se as informações abaixo estão
                                    corretas para confirmar sua compra
                                </SheetDescription>
                            </SheetHeader>
                            <>
                                <div className="flex py-4 gap-2">
                                    <div className="w-3/6 pr-2">
                                        <figure className="w-full rounded-lg overflow-hidden">
                                            <img
                                                src={asset("/" + pkg.photo)}
                                                className="w-full h-auto"
                                                alt=""
                                            />
                                        </figure>
                                    </div>

                                    <div className="flex-1 flex flex-col gap-1">
                                        <div className="text-white text-sm">
                                            Valor do investimento:{" "}
                                            <span className="text-pacific-blue-400 font-bold">
                                                {formatCurrency(
                                                    pkg.total_investment
                                                )}
                                            </span>
                                        </div>
                                        <div className="text-white text-sm">
                                            Retorno diário:{" "}
                                            <span className="text-pacific-blue-400 font-bold">
                                                {formatCurrency(dailyReturn)}
                                            </span>
                                        </div>
                                        <div className="text-white text-sm">
                                            Ciclos:{" "}
                                            <span className="text-yellow-400 font-bold">
                                                {durationInDays} dias
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-2 mt-4"></div>
                            </>
                            <SheetFooter className="grid grid-cols-2 gap-2 mt-4">
                                <button
                                    className="bg-pacific-blue-400 rounded-md text-white text-sm uppercase h-10 flex items-center justify-center disabled:opacity-70"
                                    onClick={handleBuyPackage}
                                    disabled={isBuying}
                                >
                                    {isBuying ? (
                                        <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                                    ) : (
                                        "Investir"
                                    )}
                                </button>

                                <button
                                    className="bg-red-500 rounded-md text-white text-sm uppercase h-10 flex items-center justify-center"
                                    onClick={() => setOpen(false)}
                                >
                                    Cancelar
                                </button>
                            </SheetFooter>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </>
    );
};
