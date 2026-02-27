import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Calendar as CalendarIcon, Filter, X } from "lucide-react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { UserFilters } from "@/types/user";

interface UserFiltersProps {
    filters: UserFilters;
    onFiltersChange: (filters: UserFilters) => void;
    onSearchChange: (search: string) => void;
    searchValue: string;
}

export function UserFiltersComponent({
    filters,
    onFiltersChange,
    onSearchChange,
    searchValue,
}: UserFiltersProps) {
    const [showFilters, setShowFilters] = useState(false);
    const [dateRange, setDateRange] = useState<DateRange | undefined>();

    const handleFilterChange = (key: keyof UserFilters, value: any) => {
        onFiltersChange({
            ...filters,
            [key]: value,
        });
    };

    const clearFilters = () => {
        onFiltersChange({});
        setDateRange(undefined);
    };

    const activeFiltersCount = Object.keys(filters).filter(
        (key) => filters[key as keyof UserFilters] !== undefined
    ).length;

    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                    <Input
                        placeholder="Buscar por nome, email, username..."
                        value={searchValue}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="h-10"
                    />
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        onClick={() => setShowFilters(!showFilters)}
                        className="h-10"
                    >
                        <Filter className="w-4 h-4 mr-2" />
                        Filtros
                        {activeFiltersCount > 0 && (
                            <Badge
                                variant="secondary"
                                className="ml-2 h-5 w-5 p-0 text-xs"
                            >
                                {activeFiltersCount}
                            </Badge>
                        )}
                    </Button>
                    {activeFiltersCount > 0 && (
                        <Button
                            variant="ghost"
                            onClick={clearFilters}
                            className="h-10"
                        >
                            <X className="w-4 h-4" />
                        </Button>
                    )}
                </div>
            </div>

            {showFilters && (
                <Card className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="space-y-2">
                            <Label>Status</Label>
                            <Select
                                value={filters.status || ""}
                                onValueChange={(value) =>
                                    handleFilterChange(
                                        "status",
                                        value || undefined
                                    )
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Todos os status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="">Todos</SelectItem>
                                    <SelectItem value="active">
                                        Ativo
                                    </SelectItem>
                                    <SelectItem value="inactive">
                                        Inativo
                                    </SelectItem>
                                    <SelectItem value="pending">
                                        Pendente
                                    </SelectItem>
                                    <SelectItem value="suspended">
                                        Suspenso
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Ban Status</Label>
                            <Select
                                value={filters.ban_unban || ""}
                                onValueChange={(value) =>
                                    handleFilterChange(
                                        "ban_unban",
                                        value || undefined
                                    )
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Todos" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="">Todos</SelectItem>
                                    <SelectItem value="active">
                                        Ativo
                                    </SelectItem>
                                    <SelectItem value="banned">
                                        Banido
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Tipo de Investidor</Label>
                            <Select
                                value={filters.investor?.toString() || ""}
                                onValueChange={(value) =>
                                    handleFilterChange(
                                        "investor",
                                        value ? parseInt(value) : undefined
                                    )
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Todos" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="">Todos</SelectItem>
                                    <SelectItem value="1">
                                        Investidor
                                    </SelectItem>
                                    <SelectItem value="0">
                                        Não Investidor
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Data de Criação</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start text-left font-normal"
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {dateRange?.from ? (
                                            dateRange.to ? (
                                                <>
                                                    {format(
                                                        dateRange.from,
                                                        "LLL dd, y"
                                                    )}{" "}
                                                    -{" "}
                                                    {format(
                                                        dateRange.to,
                                                        "LLL dd, y"
                                                    )}
                                                </>
                                            ) : (
                                                format(
                                                    dateRange.from,
                                                    "LLL dd, y"
                                                )
                                            )
                                        ) : (
                                            <span>Selecionar período</span>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                >
                                    <Calendar
                                        initialFocus
                                        mode="range"
                                        defaultMonth={dateRange?.from}
                                        selected={dateRange}
                                        onSelect={(range) => {
                                            setDateRange(range);
                                            handleFilterChange(
                                                "dateRange",
                                                range
                                            );
                                        }}
                                        numberOfMonths={2}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2 mt-4">
                        <Switch
                            id="is-affiliate"
                            checked={filters.is_afiliate || false}
                            onCheckedChange={(checked) =>
                                handleFilterChange(
                                    "is_afiliate",
                                    checked ? true : undefined
                                )
                            }
                        />
                        <Label htmlFor="is-affiliate">Apenas Afiliados</Label>
                    </div>
                </Card>
            )}
        </div>
    );
}
