import { useUser } from "@/contexts/UserProvider";
import { formatCurrency, maskString } from "@/utils/helpers";
import { Receive } from "../icons/lib";
import { Pix } from "@/assets/icons/Check";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function WithdrawnHeader() {
    const { user } = useUser();
    const [showData, setShowData] = useState(false);
    const navigate = useNavigate();

    // Buscar ultimo crédito

    return (
        <>
            <div className="p-4">
                <div className="w-full bg-ebony-clay-500/30 rounded-3xl p-2 flex flex-col">
                    <div className="flex relative flex-col text-center gap-2 items-center bg-ebony-clay-400 rounded-3xl p-4 text-ebony-clay-950">
                        <button
                            className="flex w-7 h-7 absolute justify-center items-center right-4 top-4 text-ebony-clay-950 bg-none"
                            onClick={() => setShowData(!showData)}
                        >
                            {showData ? (
                                <EyeOff className="w-5 h-5" strokeWidth={2} />
                            ) : (
                                <Eye className="w-5 h-5" strokeWidth={2} />
                            )}
                        </button>
                        <h5 className="font-semibold text-sm">BRL</h5>
                        {user && (
                            <small className="text-xs">
                                {showData
                                    ? user?.withdraw_account?.pix_key
                                    : maskString(
                                          user?.withdraw_account?.pix_key ?? ""
                                      )}
                            </small>
                        )}
                        <h2 className="font-semibold text-3xl">
                            {formatCurrency(user?.balance ?? 0)}
                        </h2>
                        <p className="font-semibold text-xs text-ebony-clay-100">
                            {formatCurrency(user?.available_to_withdraw ?? 0)}{" "}
                            disponíveis para saque
                        </p>
                    </div>

                    <div className="grid grid-cols-3 text-white p-4 text-xs">
                        <div
                            className="flex flex-col items-center gap-1"
                            onClick={() => navigate("/transactions")}
                        >
                            <Receive className="w-6 h-6 rotate-180" />
                            Débitos
                        </div>

                        <div
                            className="flex flex-col items-center gap-1 border-separate border-x px-2 border-white"
                            onClick={() => navigate("/withdraw_account/setup")}
                        >
                            <Pix className="w-6 h-6" />
                            Conta
                        </div>

                        <div
                            className="flex flex-col items-center gap-1"
                            onClick={() => navigate("/transactions")}
                        >
                            <Receive className="w-6 h-6" />
                            Créditos
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
