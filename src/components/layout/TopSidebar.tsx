import { asset, formatCurrency } from "@/utils/helpers";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { fetchProcessCheckin } from "@/services/checkins";
import { useUser } from "@/contexts/UserProvider";
import { AxiosError } from "axios";
import { ApiException } from "@/utils/api-errors";
import { motion } from "framer-motion";
import { CheckCircle2, Check } from "lucide-react";

export function TopSidebar() {
    const navigate = useNavigate();
    const { updateUser, user, checkinData } = useUser();

    const handleCheckin = async () => {
        toast.loading("Processando checkin!");
        try {
            if (user) {
                const processCheckin = await fetchProcessCheckin();

                const updatedBalance = {
                    ...user,
                    balance: user.balance + processCheckin.reward_amount,
                };
                updateUser(updatedBalance);

                toast.dismiss();

                toast.success(
                    `Parabéns voce recebeu ${formatCurrency(
                        processCheckin.reward_amount
                    )} ao realizar checkin`
                );
            }
        } catch (error) {
            toast.dismiss();

            if (error instanceof AxiosError) {
                const apiError = ApiException.fromAxiosError(error);

                if (apiError.hasErrorFor("message")) {
                    toast.error("Falha no checkin", {
                        description: apiError.getErrorFor("message"),
                    });
                    return;
                } else {
                    toast.error("Erro ao realizar checkin", {
                        description: error.message,
                    });
                    return;
                }
            }
            return toast.error("Erro ao processar checkin!");
        } finally {
            toast.dismiss();
        }
    };

    return (
        <div className="w-full grid grid-cols-5 font-avenir">
            <div
                className="flex flex-col gap-1 text-black text-xs justify-center items-center"
                onClick={() => navigate("deposit")}
            >
                <span
                    className="w-[48px] h-[48px] bg-cover bg-no-repeat bg-center"
                    style={{
                        backgroundImage: `url(${asset(
                            "/assets/images/icons/deposit.png"
                        )})`,
                    }}
                ></span>
                Recarregar
            </div>

            <div
                className="flex flex-col gap-1 text-black text-xs justify-center items-center"
                onClick={() => navigate("/withdraw")}
            >
                <span
                    className="w-[48px] h-[48px] bg-cover bg-no-repeat bg-center"
                    style={{
                        backgroundImage: `url(${asset(
                            "/assets/images/icons/withdraw.png"
                        )})`,
                    }}
                ></span>
                Sacar
            </div>

            <div
                className="flex flex-col gap-1 text-black text-xs justify-center items-center"
                onClick={() => navigate("withdraw_account")}
            >
                <span
                    className="w-[48px] h-[48px] bg-cover bg-no-repeat bg-center"
                    style={{
                        backgroundImage: `url(${asset(
                            "/assets/images/icons/account.png"
                        )})`,
                    }}
                ></span>
                Conta
            </div>

            <button
                disabled={checkinData?.has_checked_in_today}
                className={`flex flex-col gap-1 text-xs justify-center items-center transition ${
                    checkinData?.has_checked_in_today
                        ? "text-gray-500 cursor-not-allowed"
                        : "text-black hover:scale-105"
                }`}
                onClick={handleCheckin}
            >
                {checkinData?.has_checked_in_today ? (
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex flex-col items-center"
                    >
                        <div className="w-[48px] h-[48px] rounded-lg bg-green-100 flex justify-center items-center border-2 border-green-500 shadow-inner">
                            <CheckCircle2 className="w-[28px] h-[28px] text-green-600" />
                        </div>
                        <span className="text-green-600 font-medium text-xxs">
                            Checkin feito
                        </span>
                    </motion.div>
                ) : (
                    <motion.div
                        whileTap={{ scale: 0.9 }}
                        className="flex flex-col items-center"
                    >
                        <div className="w-[48px] h-[48px] rounded-lg bg-pacific-blue-300/20 flex justify-center items-center border border-pacific-blue-400">
                            <Check className="w-[28px] h-[28px] text-pacific-blue-600" />
                        </div>
                        <span className="text-pacific-blue-600">Checkin</span>
                    </motion.div>
                )}
            </button>

            <div
                className="flex flex-col gap-1 text-black text-xs justify-center items-center"
                onClick={() => navigate("support")}
            >
                <span
                    className="w-[48px] h-[48px] bg-cover bg-no-repeat bg-center"
                    style={{
                        backgroundImage: `url(${asset(
                            "/assets/images/icons/services.png"
                        )})`,
                    }}
                ></span>
                Serviço
            </div>
        </div>
    );
}
