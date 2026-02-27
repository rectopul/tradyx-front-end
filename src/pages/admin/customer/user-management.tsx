import { useState, useEffect } from "react";
import {
    Plus,
    Download,
    Users,
    DollarSign,
    TrendingUp,
    UserCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserFiltersComponent } from "./user-filters";
import { UsersTable } from "./users-table";
import { UserEditDialog } from "./user-edit-dialog";
import { UserFilters } from "@/types/user";
import { UserEditFormData } from "@/schemas/user-schema";
import { toast } from "sonner";
import { UserData } from "@/types";
import { useAdmin } from "@/contexts/admin/admin-context";
import { fetchUpdateCustomer } from "@/services/admin/custommer";
import {
    custommersStatistics,
    CustommerStatistics,
    listCustommers,
    searchCustomer,
} from "@/services/adminServices";

// Função para debounce
function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
}

export function UserManagement() {
    const { customers } = useAdmin();
    const [users, setUsers] = useState<UserData[]>([]);
    const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [statistics, setStatistics] = useState<CustommerStatistics>({
        total: 0,
        total_active: 0,
        total_balance: 0,
        total_comissions: 0,
    });
    const [searchValue, setSearchValue] = useState("");
    const [filters, setFilters] = useState<UserFilters>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
        pageCount: -1,
        totalCount: 0,
    });

    const debouncedSearchValue = useDebounce(searchValue, 500);

    // Unifica a lógica de busca e paginação em um único useEffect
    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                let response;
                if (debouncedSearchValue) {
                    response = await searchCustomer(debouncedSearchValue);
                } else {
                    response = await listCustommers({
                        currentPage: pagination.pageIndex + 1,
                        perPage: pagination.pageSize,
                    });
                }

                setUsers(response.data);
                setPagination((prev) => ({
                    ...prev,
                    pageCount: response.last_page,
                    totalCount: response.total,
                }));
            } catch (error) {
                console.error("Failed to fetch users:", error);
                toast.error("Erro ao buscar usuários");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [pagination.pageIndex, pagination.pageSize, debouncedSearchValue]);

    const handleGetStatistis = async () => {
        try {
            const statistics = await custommersStatistics();

            setStatistics(statistics);
        } catch (error) {
            toast.error("Erro ao buscar estatisticas");
        }
    };

    useEffect(() => {
        handleGetStatistis();
    }, []);

    useEffect(() => {
        if (customers && customers.length > 0) {
            setUsers(customers);
        }
    }, [customers]);

    const handleEditUser = (user: UserData) => {
        setSelectedUser(user);
        setEditDialogOpen(true);
    };

    const handleViewUser = (user: UserData) => {
        setSelectedUser(user);
        setEditDialogOpen(true);
    };

    const handleSaveUser = async (data: UserEditFormData) => {
        if (!selectedUser) return;
        toast.loading("Atualizando dados");
        try {
            const userUpdated = await fetchUpdateCustomer(
                data,
                selectedUser.id
            );

            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === selectedUser.id
                        ? { ...user, ...userUpdated }
                        : user
                )
            );

            toast.dismiss();

            toast.success("Usuário atualizado", {
                description:
                    "As informações do usuário foram salvas com sucesso.",
            });
        } catch (error) {
            toast.dismiss();
            toast.error("Erro ao atualizar usuário");
        }
    };

    const handleToggleBan = (user: UserData) => {
        const newBanStatus = user.ban_unban === "ban" ? "unban" : "ban";

        setUsers((prevUsers) =>
            prevUsers.map((u) =>
                u.id === user.id ? { ...u, ban_unban: newBanStatus } : u
            )
        );

        toast.success(
            newBanStatus === "ban" ? "Usuário banido" : "Usuário desbanido",
            {
                description: `${user.name} foi ${
                    newBanStatus === "unban" ? "banido" : "desbanido"
                } com sucesso.`,
            }
        );
    };

    const handleDeleteUser = (user: UserData) => {
        setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));

        toast.success("Usuário excluído", {
            description: `${user.name} foi removido do sistema.`,
        });
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(value);
    };

    // Removido `filteredUsers` useMemo, pois a busca é feita no servidor

    return (
        <div className="container mx-auto py-8 space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Gerenciamento de Usuários
                    </h1>
                    <p className="text-muted-foreground">
                        Gerencie usuários, visualize estatísticas e configure
                        permissões
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Exportar
                    </Button>
                    <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Novo Usuário
                    </Button>
                </div>
            </div>

            {/* Estatísticas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total de Usuários
                        </CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {statistics.total}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {statistics.total_active} ativos
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Usuários Ativos
                        </CardTitle>
                        <UserCheck className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {statistics.total_active}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {(
                                (statistics.total / statistics.total_active) *
                                100
                            ).toFixed(1)}
                            % do total
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Saldo Total
                        </CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {formatCurrency(statistics.total_balance)}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Soma de todos os saldos
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Comissões Totais
                        </CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {formatCurrency(statistics.total_comissions)}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Total de comissões pagas
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Filtros */}
            <UserFiltersComponent
                filters={filters}
                onFiltersChange={setFilters}
                searchValue={searchValue}
                onSearchChange={setSearchValue}
            />

            {/* Tabela */}
            <div className="space-y-4">
                <UsersTable
                    setPagination={setPagination}
                    pagination={pagination}
                    loading={loading}
                    users={users} // Usa a lista de usuários diretamente da API
                    onEditUser={handleEditUser}
                    onViewUser={handleViewUser}
                    onToggleBan={handleToggleBan}
                    onDeleteUser={handleDeleteUser}
                />
            </div>

            {/* Dialog de edição */}
            <UserEditDialog
                user={selectedUser}
                open={editDialogOpen}
                onOpenChange={setEditDialogOpen}
                onSave={handleSaveUser}
            />
        </div>
    );
}
