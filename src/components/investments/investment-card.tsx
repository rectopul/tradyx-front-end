import { asset, formatCurrency } from "@/utils/helpers";

import { Package } from "../admin/packages/columns";
import { PurchaseConfirmation } from "./purchase-confirmation";

interface PackageCardProps {
    pkg: Package;
    onBuy: (pkg: Package) => void;
}

export function PackageCard({ pkg, onBuy }: PackageCardProps) {
    return (
        <div className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-gray-100 h-full flex flex-col">
            <div className="relative aspect-[4/3] w-full">
                <img
                    src={asset("/assets/images/icons/tradyx-money.svg")}
                    alt={pkg.name}
                    className="w-full h-full object-cover p-4 opacity-80"
                />
                <div className="absolute top-4 left-4 bg-brand/90 backdrop-blur-sm text-gray-900 text-xs font-bold px-3 py-1.5 rounded-full">
                    {pkg.featured ? "VIP" : "Popular"}
                </div>
            </div>

            <div className="p-4 flex flex-col flex-1 gap-2">
                <h3 className="text-lg font-bold text-gray-900 leading-tight">
                    {pkg.name}
                </h3>

                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-brand flex items-center justify-center text-[10px] font-bold">
                        $
                    </div>
                    <span className="text-xs text-gray-400 font-medium">
                        by Tradyx Investment
                    </span>
                </div>

                <div className="mt-auto flex items-center justify-between pt-2">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Return</span>
                        <span className="text-base font-bold text-gray-900">
                            {formatCurrency(pkg.return_amount)}
                        </span>
                    </div>

                    <PurchaseConfirmation investment={pkg} />
                </div>
            </div>
        </div>
    );
}
