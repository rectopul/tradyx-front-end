import { useUser } from "@/contexts/UserProvider";
import { Challenge } from "@/types/challenges";

interface VipDetailsProps {
    challeng: Challenge;
    step: number;
}

export function VipDetails({ challeng, step }: VipDetailsProps) {
    const { user, purchases } = useUser();
    console.log(challeng);
    if (step === 2) {
        return (
            <>
                <div className="w-full flex flex-col border-2 border-silver-300/50 gap-1 bg-gradient-to-r from-silver-300 to-silver-200 p-4 rounded-lg">
                    <h2 className="text-xl font-semibold text-silver-600">
                        VIP {step}
                    </h2>
                    <div className="flex flex-col text-[13px] text-silver-600 gap-2 font-semibold">
                        <div className="flex items-center">
                            Possuir item Nv{step}{" "}
                            <span className="ml-auto">
                                ({purchases.length}/{10 * step})
                            </span>
                        </div>
                        <div className="flex items-center">
                            Convidar usuários{" "}
                            <span className="ml-auto">
                                ({user?.referral_data.level1_count}/{20 * step})
                            </span>
                        </div>
                        <div className="flex items-center">
                            Amigo possui item Nv1{" "}
                            <span className="ml-auto">
                                ({user?.referral_data.level2_count}/{5 * step})
                            </span>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="w-full flex flex-col border-2 border-harvest-gold-300/50 gap-1 bg-gradient-to-r from-harvest-gold-300 to-harvest-gold-200 p-4 rounded-lg">
                <h2 className="text-xl font-semibold text-harvest-gold-600">
                    VIP {step}
                </h2>
                <div className="flex flex-col text-[13px] text-harvest-gold-600 gap-2 font-semibold">
                    <div className="flex items-center">
                        Possuir item Nv{step}{" "}
                        <span className="ml-auto">
                            ({purchases.length}/{5 * step})
                        </span>
                    </div>
                    <div className="flex items-center">
                        Convidar usuários{" "}
                        <span className="ml-auto">
                            ({user?.referral_data.level1_count}/{20 * step})
                        </span>
                    </div>
                    <div className="flex items-center">
                        Amigo possui item Nv{step}{" "}
                        <span className="ml-auto">
                            ({user?.referral_data.level2_count}/{2 * step})
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}
