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
        <div className="w-full flex flex-col gap-6 font-sans mb-12">
            <Tabs defaultValue="deposits" className="w-full">
                <TabsList className="w-full bg-gray-100/50 p-1 rounded-2xl h-14">
                    <TabsTrigger value="deposits" className="basis-1/2 rounded-xl h-12 data-[state=active]:bg-white data-[state=active]:shadow-sm font-bold">
                        Depósitos
                    </TabsTrigger>
                    <TabsTrigger value="withdraws" className="basis-1/2 rounded-xl h-12 data-[state=active]:bg-white data-[state=active]:shadow-sm font-bold">
                        Saques
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="deposits" className="mt-6">
                    <div className="flex flex-col gap-3">
                        {deposits &&
                            deposits.map((dep, key) => (
                                <div
                                    key={`deposit-history-${key}`}
                                    className="w-full bg-white rounded-3xl p-4 flex items-center justify-between border border-gray-100 shadow-sm"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-brand/10 flex items-center justify-center text-brand">
                                            <TrendingUp className="w-6 h-6" />
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="font-bold text-gray-900 text-sm">
                                                Depósito Recebido
                                            </div>
                                            <div className="text-[11px] text-gray-400 font-medium">
                                                {formatDate(dep.created_at)}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-end gap-1">
                                        <div className="font-bold text-gray-900">
                                            +{formatCurrency(dep.amount)}
                                        </div>
                                        <div
                                            className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                                                dep.status === 'approved' ? 'bg-green-100 text-green-600' :
                                                dep.status === 'pending' ? 'bg-brand/10 text-brand' : 'bg-red-100 text-red-600'
                                            }`}
                                        >
                                            {formatStatus(dep.status)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </TabsContent>
                <TabsContent value="withdraws" className="mt-6">
                    <div className="flex flex-col gap-3">
                        {withdraws &&
                            withdraws.map((wth, key) => (
                                <div
                                    key={`withdraw-history-${key}`}
                                    className="w-full bg-white rounded-3xl p-4 flex items-center justify-between border border-gray-100 shadow-sm"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-500">
                                            <TrendingDown className="w-6 h-6" />
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="font-bold text-gray-900 text-sm">
                                                Saque Solicitado
                                            </div>
                                            <div className="text-[11px] text-gray-400 font-medium">
                                                {formatDate(wth.created_at ?? "")}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-end gap-1">
                                        <div className="font-bold text-gray-900">
                                            -{formatCurrency(wth.amount)}
                                        </div>
                                        <div
                                            className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                                                wth.status === 'approved' ? 'bg-green-100 text-green-600' :
                                                wth.status === 'pending' ? 'bg-brand/10 text-brand' : 'bg-red-100 text-red-600'
                                            }`}
                                        >
                                            {formatStatus(wth.status as any)}
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
