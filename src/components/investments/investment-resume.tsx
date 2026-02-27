import { Purchase } from "@/types/purchase";
import { formatDate } from "@/utils/helpers";
import { usePurchaseIncomeTracker } from "@/utils/usePurchaseIncomeTracker";
import clock3D from "@/assets/icons/clock3d.svg";

interface InvestmentResumeProps {
    p: Purchase;
}

export function InvestmentResume({ p }: InvestmentResumeProps) {
    const { formatTime, timeLeftMs } = usePurchaseIncomeTracker(p);

    return (
        <div className="w-full gap-1 grid grid-cols-[50px_auto_100px] bg-secondary-gradient shadow-top-inset shadow-tradyx-400 h-[50px] rounded-lg p-1 border border-tradyx-900">
            <figure>
                <img
                    src={p.package.photo}
                    alt={p.package.name}
                    className="object-cover rounded-lg w-full border border-tradyx-800"
                    onError={(e) => {
                        e.currentTarget.src =
                            "https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=400"; // caminho local ou padrão
                    }}
                />
            </figure>
            <div className="flex flex-col text-tradyx-200">
                <div className="text-sm">Plano: {p.package.name}</div>
                <div className="text-xs">
                    Compra: {formatDate(p.created_at)}
                </div>
            </div>
            <div className="flex justify-center items-center h-10 gap-1 text-xs bg-orange-gradient shadow-top-inset shadow-cream-can-100 rounded-lg border border-cream-can-900 p-2 font-black text-cream-can-800">
                <div className="">
                    <img src={clock3D} alt="clock-plan" className="w-6 h-6" />
                </div>
                <div className="">{formatTime(timeLeftMs)}</div>
            </div>
        </div>
    );
}
