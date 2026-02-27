import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import {
    Download,
    Search,
    Filter,
    TrendingUp,
    DollarSign,
    Star,
    Eye,
    EyeOff,
    MoreHorizontal,
    RefreshCw,
} from "lucide-react";
import {
    getPackageColumns,
    Package,
    PackageStatus,
} from "@/components/admin/packages/columns";
import { useAdmin } from "@/contexts/admin/admin-context";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import PackageFormDrawer from "@/components/admin/packages/PackageFormDrawer";
import {
    fetchChangeStatusPackage,
    fetchDeletePackage,
    fetchToogleFeaturedPackage,
} from "@/services/adminServices";
import PackageFormDrawerUpdate from "@/components/admin/packages/packageUdateDrawer";
import {
    fetchStatisticsPurchases,
    PurchaseStatistics,
} from "@/services/admin/purchase";
import { Spinner } from "@/components/ui/spinner";
import { formatCurrency } from "@/utils/helpers";
import { DataTablePackages } from "./data-table";

export function PackagesPage() {
    const { packages, deletePackage, updatePackage } = useAdmin();
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [isLoading, setIsLoading] = useState(false);
    const [editingPackage, setEditingPackage] = useState<Package | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [statistics, setStatistics] = useState<PurchaseStatistics | null>(
        null
    );

    // Estatísticas dos pacotes
    const stats = {
        total: packages?.length || 0,
        active: packages?.filter((pkg) => pkg.status === "active")?.length || 0,
        featured: packages?.filter((pkg) => pkg.featured)?.length || 0,
        totalInvested:
            packages?.reduce(
                (sum, pkg) => sum + (pkg.total_investment || 0),
                0
            ) || 0,
    };

    const handleEdit = (pkg: Package) => {
        setEditingPackage(pkg);
        setIsEditModalOpen(true);
    };

    const handleCloseEdit = () => {
        setEditingPackage(null);
        setIsEditModalOpen(false);
    };

    const handleRefresh = async () => {
        setIsLoading(true);
        // Simular carregamento
        setTimeout(() => setIsLoading(false), 1000);
        toast.success("Dados atualizados com sucesso!");
    };

    const handleExport = () => {
        toast.info("Exportando dados...");
        // Lógica de exportação
    };

    const handleGetStatisticsPurchases = async () => {
        try {
            const statistics = await fetchStatisticsPurchases();
            return setStatistics(statistics);
        } catch (error) {
            return toast.error("Erro ao obter estatisticas de compras");
        }
    };

    const handleToogleFeaturted = async (pkgId: number) => {
        toast.loading("Alterando destaque do pacote...");
        try {
            const newPackage = await fetchToogleFeaturedPackage(pkgId);
            toast.dismiss();
            updatePackage(newPackage);
            toast.success(
                `Pacote ${newPackage.name} ${
                    newPackage.featured ? "Adicionado" : "Removido"
                } dos destaques`
            );
        } catch (error) {
            toast.dismiss();
            toast.error("Erro ao alterar destaque do pacote");
            return;
        }
    };

    const handleDelete = async (pkgId: number) => {
        toast.loading("Alterando destaque do pacote...");
        try {
            await fetchDeletePackage(pkgId);
            toast.dismiss();
            deletePackage(pkgId);
            toast.success(`Pacote excluído com sucesso!`);
        } catch (error) {
            toast.dismiss();
            toast.error("Erro ao excluir pacote");
            return;
        } finally {
            return toast.dismiss();
        }
    };

    const handleToogleStatus = async (pkgId: number, status: PackageStatus) => {
        toast.loading("Alterando status do pacote...");
        try {
            const newStatus =
                status === PackageStatus.active
                    ? PackageStatus.inactive
                    : PackageStatus.active;

            const newPackage = await fetchChangeStatusPackage(pkgId, newStatus);
            toast.dismiss();
            updatePackage(newPackage);
            toast.success(
                `Status do pacote ${newPackage.name} alterado para ${newStatus}`
            );
        } catch (error) {
            toast.dismiss();
            toast.error("Erro ao alterar status do pacote");
            return;
        }
    };

    const columns = getPackageColumns({
        onDelete: handleDelete,
        onEdit: handleEdit,
        onToggleFeatured: handleToogleFeaturted,
        onToggleStatus: handleToogleStatus,
        onView: (pkg) => {
            toast.info(`Visualizando detalhes do pacote: ${pkg}`);
        },
    });

    useEffect(() => {
        handleGetStatisticsPurchases();
    }, []);

    if (!statistics) {
        return <Spinner />;
    }

    return (
        <div className="space-y-6">
            {/* Header com estatísticas */}
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">
                            Gestão de Pacotes
                        </h1>
                        <p className="text-sm text-slate-600 mt-1">
                            Gerencie pacotes de investimento, rentabilidades e
                            disponibilidade
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleRefresh}
                            disabled={isLoading}
                            className="gap-2"
                        >
                            <RefreshCw
                                className={`h-4 w-4 ${
                                    isLoading ? "animate-spin" : ""
                                }`}
                            />
                            Atualizar
                        </Button>

                        <PackageFormDrawer />
                    </div>
                </div>

                {/* Cards de estatísticas */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card className="border-slate-200">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-slate-600">
                                Total de Pacotes
                            </CardTitle>
                            <TrendingUp className="h-4 w-4 text-slate-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-slate-900">
                                {stats.total}
                            </div>
                            <p className="text-xs text-slate-500 mt-1">
                                {stats.active} ativos
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-slate-200">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-slate-600">
                                Pacotes Ativos
                            </CardTitle>
                            <Eye className="h-4 w-4 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">
                                {stats.active}
                            </div>
                            <p className="text-xs text-slate-500 mt-1">
                                Disponíveis para investimento
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-slate-200">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-slate-600">
                                Em Destaque
                            </CardTitle>
                            <Star className="h-4 w-4 text-yellow-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-yellow-600">
                                {stats.featured}
                            </div>
                            <p className="text-xs text-slate-500 mt-1">
                                Pacotes destacados
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-slate-200">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-slate-600">
                                Volume Total
                            </CardTitle>
                            <DollarSign className="h-4 w-4 text-blue-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-600">
                                {formatCurrency(statistics.total_purchases)}
                            </div>
                            <p className="text-xs text-slate-500 mt-1">
                                Total de rendimentos pagos:{" "}
                                <span className="text-green-500 font-medium">
                                    {formatCurrency(statistics.total_paids)}
                                </span>
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
            {editingPackage && (
                <PackageFormDrawerUpdate
                    defaultData={editingPackage}
                    isEdit={true}
                    opening={isEditModalOpen}
                    onClose={handleCloseEdit}
                />
            )}
            {/* Tabela de pacotes */}
            <Card className="border-slate-200">
                <CardHeader className="pb-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <CardTitle className="text-lg">
                                Lista de Pacotes
                            </CardTitle>
                            <Badge variant="secondary" className="text-xs">
                                {packages?.length || 0} pacotes
                            </Badge>
                        </div>

                        {/* Filtros e ações */}
                        <div className="flex flex-col sm:flex-row gap-2">
                            {/* Busca */}
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <Input
                                    placeholder="Buscar pacotes..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    className="pl-9 w-full sm:w-[240px] h-9 focus-visible:ring-blue-500/20"
                                />
                            </div>

                            {/* Filtro de status */}
                            <Select
                                value={statusFilter}
                                onValueChange={setStatusFilter}
                            >
                                <SelectTrigger className="w-full sm:w-[140px] h-9 focus:ring-blue-500/20">
                                    <Filter className="h-4 w-4 mr-2" />
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Todos</SelectItem>
                                    <SelectItem value="active">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-green-500 rounded-full" />
                                            Ativo
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="inactive">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-red-500 rounded-full" />
                                            Inativo
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="draft">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-gray-500 rounded-full" />
                                            Rascunho
                                        </div>
                                    </SelectItem>
                                </SelectContent>
                            </Select>

                            {/* Menu de ações */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="h-9 gap-2"
                                    >
                                        <MoreHorizontal className="h-4 w-4" />
                                        Ações
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    align="end"
                                    className="w-48"
                                >
                                    <DropdownMenuLabel>
                                        Ações em lote
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={handleExport}>
                                        <Download className="h-4 w-4 mr-2" />
                                        Exportar dados
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Eye className="h-4 w-4 mr-2" />
                                        Ativar selecionados
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <EyeOff className="h-4 w-4 mr-2" />
                                        Desativar selecionados
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <Star className="h-4 w-4 mr-2" />
                                        Destacar selecionados
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="p-4">
                    <DataTablePackages
                        columns={columns}
                        data={packages || []}
                        searchTerm={searchTerm}
                        // statusFilter={statusFilter}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
