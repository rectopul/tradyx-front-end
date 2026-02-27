import { DollarSign, TrendingUp, UserCheck, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/utils/helpers";
import { toast } from "sonner";
import { fetchListInvestiments } from "@/services/admin/investments";
import { useEffect, useState } from "react";
import { useAdmin } from "@/contexts/admin/admin-context";
import { PurchaseStatistics } from "@/types/purchase";
import { getInvestmentsColumns } from "@/components/admin/investiments/columns";
import { InvestmentsTable } from "@/components/admin/investiments/data-table";
import { Input } from "@/components/ui/input";

export function InvestimentsPage() {
    const { setInvestimentsList, investments } = useAdmin();
    const [statistics, setStatistics] = useState<PurchaseStatistics>({
        investiments_amount: 0,
        investiments_count: 0,
        investiments_paid: 0,
    });

    const handleGetInvestments = async () => {
        try {
            const investments = await fetchListInvestiments();
            setInvestimentsList(investments.data.investments.data);
            setStatistics(investments.data.statistics);
        } catch (error) {
            console.log(error);
            toast.error("Erro ao listar investimentos");
        }
    };

    useEffect(() => {
        handleGetInvestments();
    }, []);

    const columns = getInvestmentsColumns({
        onStatusChange: console.log,
    });

    return (
        <div className="p-4 flex flex-col gap-4">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight mb-1">
                        Gerenciamento de Investimentos
                    </h1>
                    <p className="text-muted-foreground">
                        Gerencie os investimentos de seus usuarios
                    </p>
                </div>
            </div>

            {/* Estatísticas */}
            <div className="grid grid-cols-1 mt-6 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Quantidade de investimentos
                        </CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {statistics.investiments_count}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            100 ativos
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Valor total investido
                        </CardTitle>
                        <UserCheck className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {formatCurrency(statistics.investiments_amount)}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {(100).toFixed(1)}% do total
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total de rendimentos pagos
                        </CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {formatCurrency(statistics.investiments_paid)}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Soma de todos os saldos
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Rendimentos pagos Hoje
                        </CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {formatCurrency(250)}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Total de comissões pagas
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Busca */}
            <div className="flex flex-col gap-2">
                <h2>Buscar investimentos de usuário</h2>
                <Input placeholder="Digite o Telefone, Email ou Nome do usuário" />
            </div>

            {/* Tabela */}
            <InvestmentsTable columns={columns} data={investments} />
        </div>
    );
}
