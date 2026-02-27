import { useUser } from "@/contexts/UserProvider";
import { asset, formatCurrency } from "@/utils/helpers";
import { Separator } from "./ui/separator";

export function SummaryBar() {
    const { user } = useUser();

    return (
        <div className="shadow-bottom-xl shadow-tradyx-950 font-space rounded-2xl">
            <div className="w-full bg-white shadow-bottom-inset-xl shadow-gray-200 rounded-2xl flex flex-col p-4">
                <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col items-center justify-center">
                        <img
                            src={asset("/assets/images/icons/money-wallet.svg")}
                            alt="money-wallet"
                            className="w-9 h-9"
                        />
                        <span className="mt-2 text-sm text-gray-600">
                            Saldo Disponível
                        </span>

                        <p className="text-xl text-black font-bold">
                            {formatCurrency(user?.balance ?? 0)}
                        </p>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                        <img
                            src={asset("/assets/images/icons/referrals.svg")}
                            alt="money-wallet"
                            className="w-9 h-9"
                        />
                        <span className="mt-2 text-sm text-gray-600">
                            Meus indicados
                        </span>

                        <p className="text-xl text-black font-bold">
                            {user?.referral_data.total_count ?? 0}
                        </p>
                    </div>
                </div>

                <Separator className="my-2" />

                <div className="flex justify-center items-center py-3 text-blue-600 font-bold font-sm">
                    Meus indicados
                </div>
            </div>
        </div>
    );
}
