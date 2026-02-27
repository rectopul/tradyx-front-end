import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ReferralConfigForm } from "@/components/admin/referral/referral-config-form";
import { ReferralConfigTable } from "@/components/admin/referral/referral-config-table";
import { CreateReferralConfig } from "@/types/admin/referral";
import { Settings, TrendingUp, Users, Percent } from "lucide-react";
import { useAdmin } from "@/contexts/admin/admin-context";
import {
    fetchDeleteReferralConfig,
    fetchStoreReferralConfig,
} from "@/services/admin/referral";

export function ReferralConfigDashboard() {
    const [_, setLoading] = useState(false);
    const { referralConfigs, addReferralConfig, deleteReferralConfig } =
        useAdmin();

    const handleCreateConfig = async (data: CreateReferralConfig) => {
        setLoading(true);

        const newConfig = await fetchStoreReferralConfig(data);

        addReferralConfig(newConfig);
        setLoading(false);
    };

    const handleDeleteConfig = async (id: number) => {
        setLoading(true);
        // Simular API call
        await fetchDeleteReferralConfig(id);

        deleteReferralConfig(id);

        setLoading(false);
    };

    const existingLevels = referralConfigs.map((config) => config.level);
    const totalConfigs = referralConfigs.length;
    const avgBonus =
        referralConfigs.reduce(
            (sum, config) => sum + config.bonus_percentage,
            0
        ) / totalConfigs || 0;
    const maxLevel = Math.max(
        ...referralConfigs.map((config) => config.level),
        0
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">
                        Configurações de Referral
                    </h2>
                    <p className="text-muted-foreground">
                        Gerencie os níveis e percentuais de bônus do seu sistema
                        de referrals
                    </p>
                </div>
                <ReferralConfigForm
                    onSubmit={handleCreateConfig}
                    existingLevels={existingLevels}
                />
            </div>

            {/* Metrics Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total de Configurações
                        </CardTitle>
                        <Settings className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalConfigs}</div>
                        <p className="text-xs text-muted-foreground">
                            {totalConfigs === 1
                                ? "configuração ativa"
                                : "configurações ativas"}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Bônus Médio
                        </CardTitle>
                        <Percent className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {avgBonus.toFixed(2)}%
                        </div>
                        <p className="text-xs text-muted-foreground">
                            percentual médio de bônus
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Nível Máximo
                        </CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{maxLevel}</div>
                        <p className="text-xs text-muted-foreground">
                            níveis de profundidade
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Status
                        </CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">
                            Ativo
                        </div>
                        <p className="text-xs text-muted-foreground">
                            sistema funcionando
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content */}
            <Card>
                <CardHeader>
                    <CardTitle>Configurações por Nível</CardTitle>
                    <CardDescription>
                        Lista de todas as configurações de bônus organizadas por
                        nível
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ReferralConfigTable
                        configs={referralConfigs}
                        onDelete={handleDeleteConfig}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
