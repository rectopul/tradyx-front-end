import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import {
    MoreHorizontal,
    Edit,
    Shield,
    ShieldOff,
    Eye,
    Trash2,
    DollarSign,
    Users,
    CheckCircle,
    XCircle,
    Clock,
    AlertTriangle,
    ArrowUpDown,
    ArrowUp,
    ArrowDown,
    ChevronLeft,
    ChevronRight,
    KeySquare,
    CircleDollarSign,
    User,
    ChevronFirst,
    ChevronLast,
    Package,
} from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { UserData } from "@/types";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
    fetchLoginCustomer,
    fetchRenewPasswordCustomer,
} from "@/services/admin/custommer";
import { fetchIncrementBalanceCustomer } from "@/services/adminServices";
import { useAdmin } from "@/contexts/admin/admin-context";
import { Spinner } from "@/components/ui/spinner";
import { generatePaginationRange } from "@/utils/helpers";
import { IncrementPackageCard } from "../packages/increment-package-card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface UsersTableProps {
    users: UserData[];
    onEditUser: (user: UserData) => void;
    onViewUser: (user: UserData) => void;
    onToggleBan: (user: UserData) => void;
    onDeleteUser: (user: UserData) => void;
    loading: boolean;
    pagination: {
        pageIndex: number;
        pageSize: number;
        pageCount: number;
        totalCount: number;
    };
    setPagination: (updater: {
        pageIndex: number;
        pageSize: number;
        pageCount: number;
        totalCount: number;
    }) => void;
}

type SortField = keyof UserData | "referral.total_count";
type SortOrder = "asc" | "desc";

export function UsersTable({
    users,
    onEditUser,
    onViewUser,
    onToggleBan,
    onDeleteUser,
    loading,
    setPagination,
    pagination,
}: UsersTableProps) {
    const [sortBy, setSortBy] = useState<SortField>("created_at");
    const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
    const [userKeyId, setUserKeyId] = useState<number | null>(null);
    const [newPassword, setUsesetNewPassword] = useState<string | null>(null);
    const [userBalanceId, setUserBalanceId] = useState<number | null>(null);
    const [balanceToAdd, setBalanceToAdd] = useState<number | null>(null);
    const { updateCustomer, packages } = useAdmin();
    const [showPackages, setShowPackages] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

    const handleSort = (field: SortField) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortBy(field);
            setSortOrder("asc");
        }
        setPagination({
            ...pagination,
            pageIndex: 0, // Reset to the first page on sort change
        });
    };

    const handleShowPackages = (user: UserData) => {
        setShowPackages(!showPackages);
        setSelectedUser(user);
    };

    // Adicionar saldo
    const handleSetUserToAddBalance = (userId: number) =>
        setUserBalanceId(userId);

    const onChangeUserBalance = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = event.target.value;
        setBalanceToAdd(+value);
    };

    const handleAcessCustomerAccount = async (Uid: number) => {
        toast.loading("Acessando conta de usuário");
        try {
            const user = await fetchLoginCustomer(Uid);

            toast.dismiss();
            toast.success(
                "Conta de usuário " + user.phone + " Acessada com sucesso"
            );

            window.open("/", "_blank");
        } catch (error) {
            toast.dismiss();
            toast.error("Erro ao acessar conta do usuário");
        }
    };

    const handleAddBalance = async () => {
        toast.loading("Adicionando saldo");
        try {
            if (balanceToAdd && userBalanceId) {
                const user = await fetchIncrementBalanceCustomer(
                    userBalanceId,
                    {
                        amount: balanceToAdd,
                    }
                );

                setUserBalanceId(null);
                setBalanceToAdd(null);
                updateCustomer(user);

                toast.dismiss();
                toast.success("Saldo adicionado com sucesso!");
            }
        } catch (error) {
            toast.error("Erro ao adicionar saldo");
        }
    };

    // Trocar senha
    const handleSetUserToChangePassword = (userId: number) =>
        setUserKeyId(userId);

    const onChangeUserPass = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setUsesetNewPassword(value);
    };

    const handleRenewPassword = async () => {
        toast.loading("Alterando senha");
        try {
            if (newPassword && userKeyId) {
                await fetchRenewPasswordCustomer(userKeyId, {
                    new_password: newPassword,
                });

                setUserKeyId(null);
                setUsesetNewPassword(null);

                toast.dismiss();
                toast.success("Senha alterada com sucesso!");
            }
        } catch (error) {
            toast.error("Erro ao trocar senha do usuário");
        }
    };

    const getSortIcon = (field: SortField) => {
        if (sortBy !== field) {
            return <ArrowUpDown className="w-4 h-4" />;
        }
        return sortOrder === "asc" ? (
            <ArrowUp className="w-4 h-4" />
        ) : (
            <ArrowDown className="w-4 h-4" />
        );
    };

    const getStatusBadge = (status: string) => {
        const statusMap = {
            active: {
                label: "Ativo",
                variant: "default" as const,
                icon: CheckCircle,
            },
            inactive: {
                label: "Inativo",
                variant: "secondary" as const,
                icon: XCircle,
            },
            pending: {
                label: "Pendente",
                variant: "outline" as const,
                icon: Clock,
            },
            suspended: {
                label: "Suspenso",
                variant: "destructive" as const,
                icon: AlertTriangle,
            },
        };

        const config = statusMap[status as keyof typeof statusMap] || {
            label: status,
            variant: "secondary" as const,
            icon: XCircle,
        };

        const Icon = config.icon;

        return (
            <Badge variant={config.variant} className="flex items-center gap-1">
                <Icon className="w-3 h-3" />
                {config.label}
            </Badge>
        );
    };

    const getBanBadge = (banStatus: string) => {
        if (banStatus === "banned") {
            return (
                <Badge
                    variant="destructive"
                    className="flex items-center gap-1"
                >
                    <ShieldOff className="w-3 h-3" />
                    Banido
                </Badge>
            );
        }
        return (
            <Badge variant="outline" className="flex items-center gap-1">
                <Shield className="w-3 h-3" />
                Normal
            </Badge>
        );
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(value);
    };

    const formatDate = (dateString: string) => {
        return format(new Date(dateString), "dd/MM/yyyy", { locale: ptBR });
    };

    // Pagination logic
    const { pageIndex, pageSize, pageCount, totalCount } = pagination;
    const startIndex = pageIndex * pageSize + 1;
    const endIndex = Math.min(startIndex + users.length - 1, totalCount);

    const goToPage = (page: number) => {
        if (page >= 0 && page < pageCount) {
            setPagination({
                ...pagination,
                pageIndex: page,
            });
        }
    };

    const SortableHeader = ({
        field,
        children,
    }: {
        field: SortField;
        children: React.ReactNode;
    }) => (
        <TableHead>
            <Button
                variant="ghost"
                onClick={() => handleSort(field)}
                className="h-auto p-0 font-medium hover:bg-transparent"
            >
                <div className="flex items-center gap-2">
                    {children}
                    {getSortIcon(field)}
                </div>
            </Button>
        </TableHead>
    );

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="space-y-4">
            <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <SortableHeader field="name">
                                    Usuário
                                </SortableHeader>
                                <SortableHeader field="email">
                                    Contato
                                </SortableHeader>
                                <SortableHeader field="status">
                                    Status
                                </SortableHeader>
                                <SortableHeader field="investor">
                                    Tipo
                                </SortableHeader>
                                <SortableHeader field="balance">
                                    Saldo
                                </SortableHeader>
                                <SortableHeader field="referral.total_count">
                                    Indicações
                                </SortableHeader>
                                <SortableHeader field="created_at">
                                    Criado em
                                </SortableHeader>
                                <TableHead className="w-[50px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow
                                    key={user.id}
                                    className="hover:bg-muted/50"
                                >
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-10 w-10">
                                                <AvatarImage
                                                    src={user.profile_photo_url}
                                                />
                                                <AvatarFallback>
                                                    {user.name
                                                        .split(" ")
                                                        .map((n) => n[0])
                                                        .join("")
                                                        .toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="font-medium">
                                                    {user.name}
                                                </div>
                                                <div className="text-sm text-muted-foreground">
                                                    @{user.username}
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        <div className="space-y-1">
                                            <div className="text-sm">
                                                {user.email}
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                {user.phone_code} {user.phone}
                                            </div>
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        <div className="space-y-2">
                                            {getStatusBadge(user.status)}
                                            {getBanBadge(user.ban_unban)}
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        <div className="space-y-1">
                                            <Badge
                                                variant={
                                                    user.investor
                                                        ? "default"
                                                        : "secondary"
                                                }
                                            >
                                                {user.investor
                                                    ? "Investidor"
                                                    : "Usuário"}
                                            </Badge>
                                            {user.is_afiliate && (
                                                <Badge
                                                    variant="outline"
                                                    className="flex items-center gap-1"
                                                >
                                                    <Users className="w-3 h-3" />
                                                    Afiliado
                                                </Badge>
                                            )}
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        <div className="space-y-1">
                                            <div className="font-medium flex items-center gap-1">
                                                <DollarSign className="w-3 h-3" />
                                                {formatCurrency(user.balance)}
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                Lucro:{" "}
                                                {formatCurrency(
                                                    user.profit_balance
                                                )}
                                            </div>
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        <div className="text-center">
                                            <div className="font-medium text-primary">
                                                {user.referral_data.total_count}
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                {
                                                    user.referral_data
                                                        .active_count
                                                }{" "}
                                                ativos
                                            </div>
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        <div className="text-sm">
                                            {formatDate(user.created_at)}
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    className="h-8 w-8 p-0"
                                                >
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        handleSetUserToAddBalance(
                                                            user.id
                                                        )
                                                    }
                                                >
                                                    <CircleDollarSign className="mr-2 h-4 w-4" />
                                                    Adicionar Saldo
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        handleShowPackages(user)
                                                    }
                                                >
                                                    <Package className="mr-2 h-4 w-4" />
                                                    Adicionar Plano
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        handleAcessCustomerAccount(
                                                            user.id
                                                        )
                                                    }
                                                >
                                                    <User className="mr-2 h-4 w-4" />
                                                    Acessar Conta
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        handleSetUserToChangePassword(
                                                            user.id
                                                        )
                                                    }
                                                >
                                                    <KeySquare className="mr-2 h-4 w-4" />
                                                    Trocar senha
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        onViewUser(user)
                                                    }
                                                >
                                                    <Eye className="mr-2 h-4 w-4" />
                                                    Visualizar
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        onEditUser(user)
                                                    }
                                                >
                                                    <Edit className="mr-2 h-4 w-4" />
                                                    Editar
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        onToggleBan(user)
                                                    }
                                                >
                                                    {user.ban_unban ===
                                                    "ban" ? (
                                                        <>
                                                            <Shield className="mr-2 h-4 w-4" />
                                                            Desbanir
                                                        </>
                                                    ) : (
                                                        <>
                                                            <ShieldOff className="mr-2 h-4 w-4" />
                                                            Banir
                                                        </>
                                                    )}
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        onDeleteUser(user)
                                                    }
                                                    className="text-destructive"
                                                >
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Excluir
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </Card>

            {/* Pagination Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                        Itens por página:
                    </span>
                    <Select
                        value={String(pageSize)}
                        onValueChange={(value: string) => {
                            setPagination({
                                ...pagination,
                                pageSize: parseInt(value),
                                pageIndex: 0, // Reset to the first page when page size changes
                            });
                        }}
                    >
                        <SelectTrigger className="w-20">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="5">5</SelectItem>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="20">20</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                        Mostrando {startIndex} a {endIndex} de {totalCount}{" "}
                        resultados
                    </span>
                </div>
                {/* Navegação por páginas */}
                <div className="flex items-center space-x-2">
                    {/* Botão Primeira Página (Opcional, mas recomendado para muitas páginas) */}
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 p-0 max-md:hidden" // Ocultar em telas muito pequenas, se desejar
                        onClick={() => goToPage(0)}
                        disabled={pageIndex === 0}
                    >
                        <span className="sr-only">Primeira página</span>
                        {/* Ícone de primeira página (ex: ChevronFirst) */}
                        <ChevronFirst className="h-4 w-4" />
                    </Button>

                    {/* Botão Página Anterior */}
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 p-0"
                        onClick={() => goToPage(pageIndex - 1)}
                        disabled={pageIndex === 0}
                    >
                        <span className="sr-only">Página anterior</span>
                        <ChevronLeft className="h-4 w-4" />
                    </Button>

                    {/* Números das Páginas (Gerados dinamicamente) */}
                    <div className="flex items-center flex-wrap max-md:mt-3">
                        {/* Chame a função para obter o range de páginas visíveis */}
                        {generatePaginationRange(pageIndex, pageCount, 5).map(
                            (pageIdx, i) => {
                                // Renderizar ellipsis
                                if (pageIdx === -1) {
                                    return (
                                        <span
                                            key={i}
                                            className="px-2 text-muted-foreground"
                                        >
                                            ...
                                        </span>
                                    );
                                }

                                // Renderizar número da página
                                const isCurrentPage = pageIdx === pageIndex;
                                return (
                                    <Button
                                        key={i}
                                        variant={
                                            isCurrentPage
                                                ? "default"
                                                : "outline"
                                        }
                                        className={`h-8 w-8 p-0 mx-1 ${
                                            isCurrentPage
                                                ? "pointer-events-none"
                                                : ""
                                        }`}
                                        onClick={() => goToPage(pageIdx)}
                                    >
                                        <span>{pageIdx + 1}</span>
                                    </Button>
                                );
                            }
                        )}
                    </div>

                    {/* Botão Próxima Página */}
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 p-0"
                        onClick={() => goToPage(pageIndex + 1)}
                        disabled={pageIndex >= pageCount - 1}
                    >
                        <span className="sr-only">Próxima página</span>
                        <ChevronRight className="h-4 w-4" />
                    </Button>

                    {/* Botão Última Página (Opcional) */}
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 p-0 max-md:hidden" // Ocultar em telas muito pequenas, se desejar
                        onClick={() => goToPage(pageCount - 1)}
                        disabled={pageIndex >= pageCount - 1}
                    >
                        <span className="sr-only">Última página</span>
                        {/* Ícone de última página (ex: ChevronLast) */}
                        <ChevronLast className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <Dialog open={userBalanceId ? true : false}>
                <DialogTrigger className="items-start hidden">
                    <CircleDollarSign className="mr-2 h-4 w-4" />
                    Adicionar saldo
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Adicionar saldo ao usuário?</DialogTitle>
                        <DialogDescription>
                            Informe abaixo o valor a ser acrescentado.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center gap-2">
                        <div className="grid flex-1 gap-2">
                            <label htmlFor="newBalance" className="sr-only">
                                Valor
                            </label>
                            <Input
                                id="newBalance"
                                name="newBalance"
                                placeholder="Informe o valor a acrescentar"
                                onChange={onChangeUserBalance}
                            />
                        </div>
                    </div>
                    <DialogFooter className="sm:justify-start">
                        <Button
                            type="button"
                            variant="default"
                            onClick={handleAddBalance}
                        >
                            Adicionar
                        </Button>
                        <Button
                            type="button"
                            variant="destructive"
                            onClick={() => setUserBalanceId(null)}
                        >
                            Close
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <Dialog open={userKeyId ? true : false}>
                <DialogTrigger className="items-start hidden">
                    <KeySquare className="mr-2 h-4 w-4" />
                    Trocar senha
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Trocar senha do usuário?</DialogTitle>
                        <DialogDescription>
                            Informe abaixo a nova senha.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center gap-2">
                        <div className="grid flex-1 gap-2">
                            <label htmlFor="password" className="sr-only">
                                Senha
                            </label>
                            <Input
                                id="password"
                                name="password"
                                placeholder="Informe a nova senha"
                                onChange={onChangeUserPass}
                            />
                        </div>
                    </div>
                    <DialogFooter className="sm:justify-start">
                        <Button
                            type="button"
                            variant="default"
                            onClick={handleRenewPassword}
                        >
                            Alterar
                        </Button>
                        <Button
                            type="button"
                            variant="destructive"
                            onClick={() => setUserKeyId(null)}
                        >
                            Cancelar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            {selectedUser && (
                <Dialog open={showPackages}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                Adicionar Plano para Usuário
                            </DialogTitle>
                            <DialogDescription>
                                Selecione o plano a ser adicionado ao usuário.
                            </DialogDescription>
                        </DialogHeader>
                        <ScrollArea className="h-[500px]">
                            <div className="flex flex-col gap-2 pr-3">
                                {packages.length > 0 &&
                                    packages.map((pkg, key) => (
                                        <IncrementPackageCard
                                            key={`incre-pkg-${key}`}
                                            pkg={pkg}
                                            user={selectedUser}
                                            onSuccess={() =>
                                                setShowPackages(false)
                                            }
                                        />
                                    ))}
                            </div>
                        </ScrollArea>
                        <DialogFooter className="sm:justify-start">
                            <Button
                                type="button"
                                variant="destructive"
                                className="w-full"
                                onClick={() => setShowPackages(false)}
                            >
                                Cancelar
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
}
