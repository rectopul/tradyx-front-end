import { useUser } from "@/contexts/UserProvider";
import { asset, formatCurrency } from "@/utils/helpers";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

export function SummaryBar() {
    const { user } = useUser();
    const navigate = useNavigate();

    return (
        <div className="relative w-full bg-white rounded-[40px] p-8 shadow-sm overflow-hidden flex items-center justify-between">
            <div className="relative z-10 flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <span className="text-gray-400 text-base font-medium">Saldo Disponível</span>
                    <h2 className="text-4xl font-bold text-gray-900">
                        {formatCurrency(user?.balance ?? 0)}
                    </h2>
                </div>

                <Button
                    onClick={() => navigate("/deposit")}
                    className="bg-brand hover:bg-brand/90 text-gray-900 font-bold rounded-2xl px-8 py-6 text-lg w-fit shadow-lg shadow-brand/20 transition-all hover:scale-105"
                >
                    Recarregar
                </Button>
            </div>

            <div className="absolute right-0 top-1/2 -translate-y-1/2 h-full w-1/2 pointer-events-none">
                 <img
                    src={asset("/assets/images/icons/money-wallet.svg")}
                    alt="illustration"
                    className="w-full h-full object-contain opacity-20 scale-125 rotate-12"
                />
            </div>

            {/* Added a subtle floating circle decoration similar to the image */}
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-brand/10 rounded-full blur-2xl"></div>
        </div>
    );
}
