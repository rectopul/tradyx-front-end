import { useUser } from "@/contexts/UserProvider";
import { formatCurrency } from "@/utils/helpers";
import { ScanFace } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function HeaderProfile() {
    const { user } = useUser();
    const navigate = useNavigate();

    return (
        <>
            <div className="p-4 font-space text-tradyx-900 ">
                <div className="shadow-bottom-xl shadow-tradyx-950 rounded-2xl">
                    <div className="w-full border border-tradyx-950 bg-white shadow-bottom-inset-xl shadow-gray-200 p-4 flex flex-col rounded-2xl">
                        <div className="flex justify-between">
                            <div className="flex items-center gap-1">
                                <h4 className="font-semibold -mt-1">
                                    Minha conta:
                                </h4>
                                <small className="text-xs">{user?.phone}</small>
                            </div>
                        </div>
                        <div className="font-semibold text-xl">
                            {formatCurrency(user?.balance ?? 0)}
                        </div>

                        <h2 className="font-semibold text-sm  text-center mt-3 flex items-center gap-2 w-full">
                            <ScanFace />
                            {user?.ref_id}
                        </h2>

                        <div className="w-full grid grid-cols-2 p-4 gap-3 border-t border-tradyx-950 mt-3">
                            <div className="">
                                <button
                                    className="bg-main-gradient w-full border border-tradyx-950 shadow-top-inset shadow-tradyx-100 rounded-lg px-3 py-1 text-tradyx-100 font-semibold"
                                    onClick={() => navigate("/deposit")}
                                >
                                    Depositar
                                </button>
                            </div>
                            <div className="">
                                <button
                                    className="bg-gradient-rose w-full border border-blush-700 shadow-top-inset shadow-tradyx-100 rounded-lg px-3 py-1 text-blush-950 font-semibold"
                                    onClick={() => navigate("/withdraw")}
                                >
                                    Sacar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
