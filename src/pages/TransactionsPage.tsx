import { useUser } from "@/contexts/UserProvider";
import { Spinner } from "@/components/ui/spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingDown, TrendingUp } from "lucide-react";
import { formatCurrency, formatDate, getStatusColor } from "@/utils/helpers";
import { DepositStatus } from "@/types";

export function TransactionsPage() {
    const { user, deposits, withdraws } = useUser();

    if (!user) {
        return (
            <>
                <Spinner />
            </>
        );
    }

    return (
        <div className="w-full flex flex-col gap-1 font-avenir mb-12">
            <Tabs defaultValue="deposits" className="w-full">
                <TabsList className="w-full">
                    <TabsTrigger value="deposits" className="basis-1/2">
                        Depósitos
                    </TabsTrigger>
                    <TabsTrigger value="withdraws" className="basis-1/2">
                        Saques
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="deposits">
                    <div className="flex flex-col gap-1">
                        {deposits &&
                            deposits.map((dep, key) => (
                                <div
                                    key={`deposit-history-${key}`}
                                    className="w-full bg-pacific-blue-400/30 rounded-md py-2 px-4 flex items-center"
                                >
                                    <div className="w-12 h-10 flex items-center border-r border-pacific-blue-950/20">
                                        <div className="rounded-md flex justify-center items-center p-2 w-8 h-8 bg-pacific-blue-500">
                                            <TrendingUp className="w-6 h-6 text-white" />
                                        </div>
                                    </div>

                                    <div className="flex flex-col pl-2">
                                        <div className="font-semibold text-pacific-blue-950 text-xs">
                                            Depósito no valor de{" "}
                                            {formatCurrency(dep.amount)}
                                        </div>
                                        <div className="flex items-center text-xxs">
                                            <span>
                                                Data:{" "}
                                                {formatDate(dep.created_at)}
                                            </span>
                                            <div
                                                className={`${getStatusColor(
                                                    dep.status
                                                )} px-2 ml-2 rounded-sm`}
                                            >
                                                {dep.status}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </TabsContent>
                <TabsContent value="withdraws">
                    <div className="flex flex-col gap-1">
                        {withdraws &&
                            withdraws.map((wth, key) => (
                                <div
                                    key={`deposit-history-${key}`}
                                    className="w-full bg-red-500/20 rounded-md py-2 px-4 flex items-center"
                                >
                                    <div className="w-12 h-10 flex items-center border-r border-pacific-blue-950/20">
                                        <div className="rounded-md flex justify-center items-center p-2 w-8 h-8 bg-red-500">
                                            <TrendingDown className="w-6 h-6 text-white" />
                                        </div>
                                    </div>

                                    <div className="flex flex-col pl-2">
                                        <div className="font-semibold text-pacific-blue-950 text-xs">
                                            Saque no valor de{" "}
                                            {formatCurrency(wth.amount)}
                                        </div>
                                        <div className="flex items-center text-xxs">
                                            <span>
                                                Data:{" "}
                                                {formatDate(
                                                    wth.created_at ?? ""
                                                )}
                                            </span>
                                            <div
                                                className={`${getStatusColor(
                                                    wth.status as DepositStatus
                                                )} px-2 ml-2 rounded-sm`}
                                            >
                                                {wth.status}
                                            </div>
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
