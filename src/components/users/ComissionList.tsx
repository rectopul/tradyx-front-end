import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/utils/helpers";
import { UserLedger } from "@/types";

const CommissionList = ({ commissions }: { commissions: UserLedger[] }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Histórico de Comissões</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {commissions
                        .filter((com) => com.reason === "commission")
                        .map((commission) => (
                            <div
                                key={commission.id}
                                className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-semibold">
                                            {commission.perticulation}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            Nível: {commission.step}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold">
                                            R$ {commission.amount}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {commission.date &&
                                                formatDate(commission.date)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default CommissionList;
