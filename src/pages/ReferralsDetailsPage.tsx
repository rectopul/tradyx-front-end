import { Spinner } from "@/components/ui/spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "@/contexts/UserProvider";
import { getReferrals } from "@/services/referralService";
import { Referral } from "@/types/referral.types";
import { formatCurrency } from "@/utils/helpers";
import { User } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface ReferralsDetailsPageProps {
    nivel: number;
    onClose: () => void;
}

export function ReferralsDetailsPage({
    nivel,
    onClose,
}: ReferralsDetailsPageProps) {
    const { comissions, user } = useUser();
    const [referrals, setReferrals] = useState<Referral[]>([]);

    const handleGetReferrals = async () => {
        if (user) {
            try {
                const referralsData = await getReferrals();
                setReferrals(referralsData.referrals);
            } catch (error) {
                toast.error("Erro ao buscar membros");
            }
        }
    };

    useEffect(() => {
        handleGetReferrals();
    }, [user]);

    if (!referrals) {
        return <Spinner />;
    }

    const referralsFromLevel = referrals.filter((reff) => reff.level == nivel);

    return (
        <div className="w-full">
            <Tabs defaultValue="members" className="w-full">
                <TabsList className="w-full">
                    <TabsTrigger value="members" className="basis-1/2">
                        Membros
                    </TabsTrigger>
                    <TabsTrigger value="comissions" className="basis-1/2">
                        Comissões
                    </TabsTrigger>
                </TabsList>
                <div className="w-full mt-2">
                    <button
                        onClick={onClose}
                        className="h-8 px-2 rounded-md bg-gray-300 font-semibold text-xs flex items-center justify-center w-full"
                    >
                        Voltar
                    </button>
                </div>
                <TabsContent value="members">
                    <div className="flex flex-col gap-2 pb-12">
                        {referralsFromLevel.map((reffe, key) => (
                            <div
                                className="w-full bg-pacific-blue-400 rounded-md p-3 flex items-center gap-2 text-white"
                                key={`referral-item-${key}`}
                            >
                                <span className="flex justify-center items-center w-7 h-7 rounded-md bg-pacific-blue-800">
                                    <User className="w-4 h-4" />
                                </span>

                                <div className="flex flex-col pl-2 ml-2 border-l border-pacific-blue-800/20">
                                    <div className="text-sm font-semibold">
                                        {reffe.name}
                                    </div>
                                    <div className="text-xs font-semibold">
                                        Valor investido:{" "}
                                        {formatCurrency(
                                            reffe.investments_sum_amount
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="comissions">
                    <div className="flex flex-col gap-2 pb-12">
                        {comissions.map((commss, key) => (
                            <div
                                className="w-full bg-yellow-100 rounded-md p-3 flex items-center gap-2 text-black"
                                key={`referral-item-${key}`}
                            >
                                <span className="flex justify-center items-center w-7 h-7 rounded-md bg-yellow-500">
                                    <User className="w-4 h-4" />
                                </span>

                                <div className="flex-1 flex flex-col pl-2 ml-2 border-l border-pacific-blue-800/20">
                                    <div className="font-semibold text-xs">
                                        {commss.perticulation}
                                    </div>
                                    <div className="text-xs font-semibold">
                                        Valor: {formatCurrency(commss.amount)}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
