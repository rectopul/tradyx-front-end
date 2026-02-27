import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { MoreHorizontal, Edit, Trash2, TrendingUp } from "lucide-react";
import { ReferralConfig } from "@/types/admin/referral";
import { toast } from "sonner";

interface ReferralConfigTableProps {
    configs: ReferralConfig[];
    onDelete: (id: number) => Promise<void>;
}

export function ReferralConfigTable({
    configs,
    onDelete,
}: ReferralConfigTableProps) {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [configToDelete, setConfigToDelete] = useState<ReferralConfig | null>(
        null
    );

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const formatPercentage = (percentage: number) => {
        return `${percentage.toFixed(2)}%`;
    };

    const getBadgeVariant = (level: number) => {
        if (level <= 2) return "default";
        if (level <= 5) return "secondary";
        return "outline";
    };

    const handleDeleteClick = (config: ReferralConfig) => {
        setConfigToDelete(config);
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (configToDelete) {
            try {
                await onDelete(configToDelete.id);
                toast.success("Configuração excluída com sucesso");
            } catch (error) {
                toast.error("Erro ao excluir configuração");
            } finally {
                setDeleteDialogOpen(false);
                setConfigToDelete(null);
            }
        }
    };

    const sortedConfigs = [...configs].sort((a, b) => a.level - b.level);

    return (
        <>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Nível</TableHead>
                            <TableHead>Percentual de Bônus</TableHead>
                            <TableHead className="hidden md:table-cell">
                                Data de Criação
                            </TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sortedConfigs.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={4}
                                    className="text-center py-8 text-muted-foreground"
                                >
                                    <div className="flex flex-col items-center gap-2">
                                        <TrendingUp className="h-8 w-8 text-muted-foreground/50" />
                                        <p>Nenhuma configuração encontrada</p>
                                        <p className="text-sm">
                                            Clique em "Nova Configuração" para
                                            começar
                                        </p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            sortedConfigs.map((config) => (
                                <TableRow key={config.id}>
                                    <TableCell className="font-medium">
                                        <Badge
                                            variant={getBadgeVariant(
                                                config.level
                                            )}
                                        >
                                            Nível {config.level}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <TrendingUp className="h-4 w-4 text-green-600" />
                                            <span className="font-medium text-green-700">
                                                {formatPercentage(
                                                    config.bonus_percentage
                                                )}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell text-muted-foreground">
                                        {formatDate(config.created_at)}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    className="h-8 w-8 p-0"
                                                >
                                                    <span className="sr-only">
                                                        Abrir menu
                                                    </span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem className="cursor-pointer">
                                                    <Edit className="mr-2 h-4 w-4" />
                                                    Editar
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className="cursor-pointer text-red-600 hover:text-red-700"
                                                    onClick={() =>
                                                        handleDeleteClick(
                                                            config
                                                        )
                                                    }
                                                >
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Excluir
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <AlertDialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                        <AlertDialogDescription>
                            Tem certeza que deseja excluir a configuração do{" "}
                            <strong>Nível {configToDelete?.level}</strong> com{" "}
                            <strong>
                                {configToDelete?.bonus_percentage}% de bônus
                            </strong>
                            ? Esta ação não pode ser desfeita.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleConfirmDelete}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            Excluir
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
