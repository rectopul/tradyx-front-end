"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { formatDateTime } from "@/utils/formatters";
import { ColumnDef } from "@tanstack/react-table";
import {
    ArrowUp,
    Edit,
    Eye,
    Star,
    StarOff,
    Trash2,
    EllipsisVertical,
    Package,
    Calendar,
    TrendingUp,
    DollarSign,
    Percent,
    Clock,
    Image,
    ToggleLeft,
    ToggleRight,
} from "lucide-react";
import { asset } from "@/utils/helpers";

export enum PackageUnit {
    Hour = "hour",
    Day = "day",
    Week = "week",
    Month = "month",
}

export enum PackageStatus {
    active = "active",
    inactive = "inactive",
    draft = "draft",
}

// Tipos para o Package
export interface Package {
    id: number; //Id do pacote
    name: string; // Nome do pacote
    title?: string; // Titulo do pacote
    description?: string; // Descrição do pacote
    photo: string; // Imagem do pacote
    featured: boolean; // Pacote em destaque
    status: PackageStatus; // Status do pacote (active, inactive)
    frequency_unit: PackageUnit; // Frequencia dos pagamentos ('hour','day','week','month')
    total_duration: number; // Duração dos rendimentos baseado na frequency_unit
    commission_percentage: number; // Porcentagem de comissão á ser paga
    total_investment: number; // Valor investido no pacote
    return_amount: number; // Valor total á ser pago no final do ciclo
    created_at: string; // data de criação
    updated_at: string; // Data de atualização
}

export interface PackageActionsProps {
    onEdit: (pkg: Package) => void;
    onDelete: (packageId: number) => void;
    onToggleStatus: (packageId: number, status: PackageStatus) => void;
    onToggleFeatured: (packageId: number, featured: boolean) => void;
    onView: (packageId: number) => void;
}

const formatPackageUnit = (unit: PackageUnit): string => {
    switch (unit) {
        case PackageUnit.Hour:
            return "Hora";
        case PackageUnit.Day:
            return "Dia";
        case PackageUnit.Week:
            return "Semana";
        case PackageUnit.Month:
            return "Mês";
        default:
            return "Indefinido";
    }
};

// Componente para exibir status
const PackageStatusBadge = ({ status }: { status: PackageStatus }) => {
    const variants = {
        active: "bg-green-100 text-green-800 border-green-200",
        inactive: "bg-gray-100 text-gray-800 border-gray-200",
        draft: "bg-yellow-100 text-yellow-800 border-yellow-200",
    };

    const labels = {
        active: "Ativo",
        inactive: "Inativo",
        draft: "Rascunho",
    };

    return (
        <Badge className={`${variants[status]} font-medium`}>
            {labels[status]}
        </Badge>
    );
};

// Componente para exibir se é destaque
const FeaturedBadge = ({ featured }: { featured: boolean }) => {
    if (!featured) return null;

    return (
        <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 font-medium">
            <Star size={12} className="mr-1" />
            Destaque
        </Badge>
    );
};

// Componente para preview da imagem
const ImagePreview = ({ src, alt }: { src: string; alt: string }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="relative group">
                    <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center overflow-hidden">
                        {src ? (
                            <img
                                src={asset(src)}
                                alt={alt}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            />
                        ) : (
                            <Image size={20} className="text-slate-400" />
                        )}
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 rounded-lg transition-all flex items-center justify-center">
                        <Eye
                            size={16}
                            className="text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        />
                    </div>
                </button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Preview da Imagem</DialogTitle>
                    <DialogDescription>
                        Imagem do pacote: {alt}
                    </DialogDescription>
                </DialogHeader>
                <div className="flex justify-center">
                    {src ? (
                        <img
                            src={asset(src)}
                            alt={alt}
                            className="max-w-full max-h-96 object-contain rounded-lg"
                        />
                    ) : (
                        <div className="w-full h-48 bg-slate-100 rounded-lg flex items-center justify-center">
                            <Image size={48} className="text-slate-400" />
                            <span className="ml-2 text-slate-500">
                                Sem imagem
                            </span>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export const getPackageColumns = ({
    onEdit,
    onDelete,
    onToggleStatus,
    onToggleFeatured,
    onView,
}: PackageActionsProps): ColumnDef<Package>[] => [
    {
        accessorKey: "id",
        enableGlobalFilter: true,
        header: ({ table }) => (
            <Checkbox
                className="rounded-[4px] data-[state=checked]:bg-blue-400"
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Selecionar todos"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                className="rounded-[4px]"
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Selecionar linha"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "photo",
        header: () => <div className="w-12">Imagem</div>,
        cell: ({ row }) => {
            const photo = row.getValue("photo") as string;
            const name = row.getValue("name") as string;

            return <ImagePreview src={photo} alt={name} />;
        },
        enableSorting: false,
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    className="h-auto p-0 font-semibold"
                >
                    Nome do Pacote
                    <ArrowUp className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const name = row.getValue("name") as string;
            const title = row.original.title;
            const featured = row.original.featured;

            return (
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2">
                            <Package size={16} className="text-slate-500" />
                            <span className="font-medium">{name}</span>
                        </div>
                        {featured && <FeaturedBadge featured={featured} />}
                    </div>
                    {title && (
                        <div className="text-sm text-slate-500">{title}</div>
                    )}
                </div>
            );
        },
    },
    {
        accessorKey: "total_investment",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    className="h-auto p-0 font-semibold"
                >
                    Investimento
                    <ArrowUp className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const investment = row.getValue("total_investment") as number;
            const returnAmount = row.original.return_amount;

            const formattedInvestment = new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
            }).format(investment);

            const formattedReturn = new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
            }).format(returnAmount);

            return (
                <div className="space-y-1">
                    <div className="flex items-center gap-1">
                        <DollarSign size={14} className="text-slate-500" />
                        <span className="font-semibold text-blue-600">
                            {formattedInvestment}
                        </span>
                    </div>
                    <div className="flex items-center gap-1">
                        <TrendingUp size={14} className="text-green-500" />
                        <span className="text-sm text-green-600 font-medium">
                            {formattedReturn}
                        </span>
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "commission_percentage",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    className="h-auto p-0 font-semibold"
                >
                    Comissão
                    <ArrowUp className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const percentage = row.getValue("commission_percentage") as number;
            const duration = row.original.total_duration;
            const unit = row.original.frequency_unit as PackageUnit;

            return (
                <div className="space-y-1">
                    <div className="flex items-center gap-1">
                        <Percent size={14} className="text-slate-500" />
                        <span className="font-semibold text-purple-600">
                            {percentage}%
                        </span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock size={14} className="text-slate-500" />
                        <span className="text-sm text-slate-600">
                            {duration}{" "}
                            {duration === 1
                                ? formatPackageUnit(unit)
                                : formatPackageUnit(unit) + "s"}
                        </span>
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "status",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    className="h-auto p-0 font-semibold"
                >
                    Status
                    <ArrowUp className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const status = row.getValue("status") as PackageStatus;
            return <PackageStatusBadge status={status} />;
        },
    },
    {
        accessorKey: "created_at",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    className="h-auto p-0 font-semibold"
                >
                    Data de Criação
                    <ArrowUp className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const dateString = row.getValue("created_at") as string;

            return (
                <div className="flex items-center gap-1">
                    <Calendar size={14} className="text-slate-500" />
                    <span className="text-sm font-medium">
                        {formatDateTime(dateString)}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: "actions",
        header: () => <div className="text-center">Ações</div>,
        cell: ({ row }) => {
            const packageData = row.original;
            const { id, status, featured } = packageData;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <button className="text-slate-400 rounded-sm p-2 hover:text-slate-900 hover:bg-slate-100 transition-colors">
                            <EllipsisVertical size={17} />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuLabel>Ações do Pacote</DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem onClick={() => onView(id)}>
                            <Eye size={16} className="mr-2" />
                            Visualizar
                        </DropdownMenuItem>

                        <DropdownMenuItem onClick={() => onEdit(packageData)}>
                            <Edit size={16} className="mr-2" />
                            Editar
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                            onClick={() => onToggleStatus(id, status)}
                        >
                            {status === "active" ? (
                                <>
                                    <ToggleLeft
                                        size={16}
                                        className="mr-2 text-red-500"
                                    />
                                    Desativar
                                </>
                            ) : (
                                <>
                                    <ToggleRight
                                        size={16}
                                        className="mr-2 text-green-500"
                                    />
                                    Ativar
                                </>
                            )}
                        </DropdownMenuItem>

                        <DropdownMenuItem
                            onClick={() => onToggleFeatured(id, !featured)}
                        >
                            {featured ? (
                                <>
                                    <StarOff
                                        size={16}
                                        className="mr-2 text-yellow-500"
                                    />
                                    Remover Destaque
                                </>
                            ) : (
                                <>
                                    <Star
                                        size={16}
                                        className="mr-2 text-yellow-500"
                                    />
                                    Destacar
                                </>
                            )}
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                            onClick={() => onDelete(id)}
                            className="text-red-600 focus:text-red-600 focus:bg-red-50"
                        >
                            <Trash2 size={16} className="mr-2" />
                            Excluir
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
        enableSorting: false,
    },
];
