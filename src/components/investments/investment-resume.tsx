import { Purchase } from "@/types/purchase";
import { formatDate } from "@/utils/helpers";
import { usePurchaseIncomeTracker } from "@/utils/usePurchaseIncomeTracker";
import clock3D from "@/assets/icons/clock3d.svg";

interface InvestmentResumeProps {
    p: Purchase;
}

import { Star } from "lucide-react";

export function InvestmentResume({ p }: InvestmentResumeProps) {
    const { formatTime, timeLeftMs } = usePurchaseIncomeTracker(p);

    return (
        <div className="w-full bg-white rounded-3xl p-4 flex items-center justify-between border border-gray-100 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gray-50 p-2 flex items-center justify-center overflow-hidden border border-gray-100">
                    <img
                        src={p.package.photo}
                        alt={p.package.name}
                        className="w-full h-full object-cover rounded-lg"
                        onError={(e) => {
                            e.currentTarget.src =
                                "https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=400";
                        }}
                    />
                </div>
                <div className="flex flex-col gap-0.5">
                    <h4 className="font-bold text-gray-900 text-base">
                        {p.package.name}
                    </h4>
                    <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-brand text-brand" />
                        <span className="text-xs text-gray-400 font-bold">4.5</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-end">
                <span className="text-xs font-bold text-brand uppercase tracking-wider">
                    {formatTime(timeLeftMs)}
                </span>
                <span className="text-[10px] text-gray-300 font-medium">Remaining</span>
            </div>
        </div>
    );
}
