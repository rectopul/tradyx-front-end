import { asset, formatCurrency } from "@/utils/helpers";

import { Package } from "../admin/packages/columns";
import { PurchaseConfirmation } from "./purchase-confirmation";

interface PackageCardProps {
    pkg: Package;
    onBuy: (pkg: Package) => void;
}

export function PackageCard({ pkg, onBuy }: PackageCardProps) {
    return (
        <div className="">
            <div className="w-full relative pb-14 flex flex-col p-3 gap-2 rounded-xl bg-secondary-gradient shadow-top-inset shadow-tradyx-100 border border-tradyx-950">
                <div className="font-semibold text-sm text-tradyx-200 text-center">
                    {pkg.name}
                </div>
                <div className="rounded-xl w-20 h-14 mx-auto bg-orange-gradient shadow-top-inset shadow-cream-can-100 border border-cream-can-600 p-2 flex justify-center items-center text-2xl font-black font-poppins text-cream-can-900 text-shadow text-shadow-size-sm text-shadow-color-cream-can-200">
                    {parseInt(String(pkg.commission_percentage))}%
                </div>

                <div className="flex flex-col gap-1 mt-2">
                    <div className="grid grid-cols-[15px_auto] gap-2 text-xs text-tradyx-200">
                        <div className="">
                            <img
                                src={asset("/assets/images/icons/clock.svg")}
                                alt=""
                            />
                        </div>
                        Duração de {pkg.total_duration} dias
                    </div>

                    <div className="grid grid-cols-[15px_auto] gap-2 text-xs text-tradyx-200">
                        <div className="">
                            <img
                                src={asset(
                                    "/assets/images/icons/comission-money.svg"
                                )}
                                alt=""
                            />
                        </div>
                        Retorno
                        {formatCurrency(pkg.return_amount)}
                    </div>
                    <div
                        className="grid grid-cols-[15px_auto] gap-2 text-xs text-tradyx-200"
                        onClick={() => onBuy(pkg)}
                    >
                        <div className="">
                            <img
                                src={asset("/assets/images/icons/calendar.svg")}
                                alt=""
                            />
                        </div>
                        {formatCurrency(pkg.return_amount / pkg.total_duration)}{" "}
                        por dia
                    </div>
                </div>
                <PurchaseConfirmation investment={pkg} />
            </div>
        </div>
    );
}
