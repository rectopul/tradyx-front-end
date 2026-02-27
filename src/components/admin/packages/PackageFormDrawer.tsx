import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Plus, Upload, X } from "lucide-react";

// Shadcn/ui components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { fetchStorePackage } from "@/services/adminServices";
import { useAdmin } from "@/contexts/admin/admin-context";

// Schema de validação
const packageSchema = z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    title: z.string().min(1, "Título é obrigatório"),
    description: z
        .string()
        .min(10, "Descrição deve ter pelo menos 10 caracteres"),
    photo: z.string().optional(),
    featured: z.boolean().default(false),
    status: z.enum(["active", "inactive", "draft"]).default("draft"),
    total_duration: z.coerce.number().min(1, "Duração deve ser maior que 0"),
    frequency_unit: z.enum(["hour", "day", "week", "month"]).default("month"),
    commission_percentage: z.coerce
        .number()
        .min(0)
        .max(100, "Comissão deve estar entre 0 e 100%"),
    total_investment: z.coerce
        .number()
        .min(0, "Investimento deve ser maior que 0"),
    return_amount: z.coerce.number().min(0, "Retorno deve ser maior que 0"),
});

export type PackageFormData = z.infer<typeof packageSchema>;

interface PackageFormDrawerProps {
    defaultData?: PackageFormData;
    opening?: boolean;
}

const PackageFormDrawer: React.FC = ({
    defaultData,
    opening = false,
}: PackageFormDrawerProps) => {
    const [isOpen, setIsOpen] = useState(opening);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const { addPackage } = useAdmin();

    const defaultValues = defaultData || {
        name: "",
        title: "",
        description: "",
        photo: "",
        featured: false,
        status: "draft",
        total_duration: 1,
        frequency_unit: "month",
        commission_percentage: 0,
        total_investment: 0,
        return_amount: 0,
    };
    const form = useForm<PackageFormData>({
        resolver: zodResolver(packageSchema),
        defaultValues,
    });

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target?.result as string;
                setPreviewImage(result);
                form.setValue("photo", result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setPreviewImage(null);
        form.setValue("photo", "");
    };

    const calcTotalValuePackage = () => {
        const investAmount = form.getValues("total_investment");
        const comissionPercent = form.getValues("commission_percentage");
        const duration = Number(form.getValues("total_duration"));
        const unit = form.getValues("frequency_unit");

        const returnAmount = investAmount * (comissionPercent / 100);

        let multiplier = 1;

        switch (unit) {
            case "hour":
                multiplier = duration / 24; // duração em dias * 24h
                break;
            case "day":
                multiplier = duration; // já está em dias
                break;
            case "week":
                multiplier = duration * 7; // semanas * 7 dias
                break;
            case "month":
                multiplier = duration * 30; // meses * ~30 dias (pode trocar por 28-31)
                break;
        }

        console.log("quantidade de dias", duration);
        console.log("delimitador de multiplicação", unit);
        console.log("duração em dias", multiplier);

        form.setValue("return_amount", returnAmount * multiplier);
    };

    const onSubmit = async (data: PackageFormData) => {
        toast.loading("Criando pacote...");
        try {
            console.log("Dados do formulário:", data);
            const newPackage = await fetchStorePackage(data);
            addPackage(newPackage);
            // Aqui você faria a chamada para sua API
            setIsOpen(false);
            form.reset();
            setPreviewImage(null);
            toast.dismiss();
            return toast.success("Pacote criado com sucesso!");
        } catch (error) {
            toast.dismiss();
            toast.error("Erro ao criar pacote. Tente novamente.");
        } finally {
            toast.dismiss();
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "active":
                return "bg-green-100 text-green-800";
            case "inactive":
                return "bg-red-100 text-red-800";
            case "draft":
                return "bg-yellow-100 text-yellow-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case "active":
                return "Ativo";
            case "inactive":
                return "Inativo";
            case "draft":
                return "Rascunho";
            default:
                return status;
        }
    };

    return (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerTrigger asChild>
                <Button
                    size="sm"
                    className="gap-2 bg-blue-600 hover:bg-blue-700"
                >
                    <Plus className="h-4 w-4" />
                    Novo Pacote
                </Button>
            </DrawerTrigger>
            <DrawerContent className="max-w-4xl mx-auto h-[90vh]">
                <DrawerHeader className="border-b">
                    <DrawerTitle>Criar Novo Pacote</DrawerTitle>
                    <DrawerDescription>
                        Preencha os dados do pacote de investimento
                    </DrawerDescription>
                </DrawerHeader>

                <div className="flex-1 overflow-y-auto p-6">
                    <Form {...form}>
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Coluna Esquerda */}
                                <div className="space-y-6">
                                    <Card>
                                        <CardContent className="p-4">
                                            <h3 className="font-semibold mb-4">
                                                Informações Básicas
                                            </h3>

                                            <div className="space-y-4">
                                                <FormField
                                                    control={form.control}
                                                    name="name"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>
                                                                Nome do Pacote
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder="Digite o nome do pacote"
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="title"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>
                                                                Título
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder="Digite o título do pacote"
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="description"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>
                                                                Descrição
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Textarea
                                                                    placeholder="Descreva o pacote de investimento..."
                                                                    rows={4}
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormDescription>
                                                                Mínimo de 10
                                                                caracteres
                                                            </FormDescription>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardContent className="p-4">
                                            <h3 className="font-semibold mb-4">
                                                Configurações
                                            </h3>

                                            <div className="space-y-4">
                                                <FormField
                                                    control={form.control}
                                                    name="status"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>
                                                                Status
                                                            </FormLabel>
                                                            <Select
                                                                onValueChange={
                                                                    field.onChange
                                                                }
                                                                defaultValue={
                                                                    field.value
                                                                }
                                                            >
                                                                <FormControl>
                                                                    <SelectTrigger>
                                                                        <SelectValue placeholder="Selecione o status" />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent>
                                                                    <SelectItem value="draft">
                                                                        <div className="flex items-center gap-2">
                                                                            <Badge
                                                                                className={getStatusColor(
                                                                                    "draft"
                                                                                )}
                                                                            >
                                                                                {getStatusText(
                                                                                    "draft"
                                                                                )}
                                                                            </Badge>
                                                                        </div>
                                                                    </SelectItem>
                                                                    <SelectItem value="active">
                                                                        <div className="flex items-center gap-2">
                                                                            <Badge
                                                                                className={getStatusColor(
                                                                                    "active"
                                                                                )}
                                                                            >
                                                                                {getStatusText(
                                                                                    "active"
                                                                                )}
                                                                            </Badge>
                                                                        </div>
                                                                    </SelectItem>
                                                                    <SelectItem value="inactive">
                                                                        <div className="flex items-center gap-2">
                                                                            <Badge
                                                                                className={getStatusColor(
                                                                                    "inactive"
                                                                                )}
                                                                            >
                                                                                {getStatusText(
                                                                                    "inactive"
                                                                                )}
                                                                            </Badge>
                                                                        </div>
                                                                    </SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="featured"
                                                    render={({ field }) => (
                                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                                            <div className="space-y-0.5">
                                                                <FormLabel className="text-base">
                                                                    Pacote em
                                                                    Destaque
                                                                </FormLabel>
                                                                <FormDescription>
                                                                    Marque se
                                                                    este pacote
                                                                    deve
                                                                    aparecer em
                                                                    destaque
                                                                </FormDescription>
                                                            </div>
                                                            <FormControl>
                                                                <Switch
                                                                    checked={
                                                                        field.value
                                                                    }
                                                                    onCheckedChange={
                                                                        field.onChange
                                                                    }
                                                                />
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* Coluna Direita */}
                                <div className="space-y-6">
                                    <Card>
                                        <CardContent className="p-4">
                                            <h3 className="font-semibold mb-4">
                                                Imagem do Pacote
                                            </h3>

                                            <div className="space-y-4">
                                                {previewImage ? (
                                                    <div className="relative">
                                                        <img
                                                            src={previewImage}
                                                            alt="Preview"
                                                            className="w-full h-48 object-cover rounded-lg"
                                                        />
                                                        <Button
                                                            type="button"
                                                            variant="destructive"
                                                            size="sm"
                                                            className="absolute top-2 right-2"
                                                            onClick={
                                                                removeImage
                                                            }
                                                        >
                                                            <X className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                ) : (
                                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                                                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                                        <div className="mt-4">
                                                            <Label
                                                                htmlFor="photo-upload"
                                                                className="cursor-pointer"
                                                            >
                                                                <span className="text-blue-600 hover:text-blue-500">
                                                                    Clique para
                                                                    fazer upload
                                                                </span>
                                                                <Input
                                                                    id="photo-upload"
                                                                    type="file"
                                                                    accept="image/*"
                                                                    className="hidden"
                                                                    onChange={
                                                                        handleImageUpload
                                                                    }
                                                                />
                                                            </Label>
                                                            <p className="text-sm text-gray-500 mt-2">
                                                                PNG, JPG até
                                                                10MB
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardContent className="p-4">
                                            <h3 className="font-semibold mb-4">
                                                Valores e Duração
                                            </h3>

                                            <div className="space-y-4">
                                                <FormField
                                                    control={form.control}
                                                    name="total_investment"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>
                                                                Investimento
                                                                Total (R$)
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    type="number"
                                                                    step="0.01"
                                                                    placeholder="0.00"
                                                                    {...field}
                                                                    onChange={(
                                                                        e
                                                                    ) => {
                                                                        field.onChange(
                                                                            e
                                                                        ); // atualiza o form
                                                                        calcTotalValuePackage(); // recalcula o retorno
                                                                    }}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="return_amount"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>
                                                                Valor de Retorno
                                                                (R$)
                                                            </FormLabel>
                                                            <FormControl>
                                                                <div className="relative">
                                                                    <span className="text-slate-900 flex items-center justify-center h-full uppercase text-[14px] font-avenir font-normal absolute left-4 top-1/2 -translate-y-1/2">
                                                                        R$
                                                                    </span>
                                                                    <Input
                                                                        type="number"
                                                                        step="0.01"
                                                                        placeholder="0.00"
                                                                        className="pl-12 flex items-center"
                                                                        readOnly
                                                                        {...field}
                                                                    />
                                                                </div>
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="commission_percentage"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>
                                                                Percentual de
                                                                Comissão (%)
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    type="number"
                                                                    step="0.01"
                                                                    max="100"
                                                                    placeholder="0.00"
                                                                    {...field}
                                                                    onChange={(
                                                                        e
                                                                    ) => {
                                                                        field.onChange(
                                                                            e
                                                                        ); // atualiza o form
                                                                        calcTotalValuePackage(); // recalcula o retorno
                                                                    }}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <div className="grid grid-cols-2 gap-4">
                                                    <FormField
                                                        control={form.control}
                                                        name="total_duration"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>
                                                                    Duração
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        type="number"
                                                                        min="1"
                                                                        placeholder="1"
                                                                        {...field}
                                                                        onChange={(
                                                                            e
                                                                        ) => {
                                                                            field.onChange(
                                                                                e
                                                                            ); // atualiza o form
                                                                            calcTotalValuePackage(); // recalcula o retorno
                                                                        }}
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name="frequency_unit"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>
                                                                    Unidade
                                                                </FormLabel>
                                                                <Select
                                                                    onValueChange={(
                                                                        e
                                                                    ) => {
                                                                        field.onChange(
                                                                            e
                                                                        );
                                                                        calcTotalValuePackage();
                                                                    }}
                                                                    defaultValue={
                                                                        field.value
                                                                    }
                                                                >
                                                                    <FormControl>
                                                                        <SelectTrigger>
                                                                            <SelectValue placeholder="Selecione" />
                                                                        </SelectTrigger>
                                                                    </FormControl>
                                                                    <SelectContent>
                                                                        <SelectItem value="hour">
                                                                            Horas
                                                                        </SelectItem>
                                                                        <SelectItem value="day">
                                                                            Dias
                                                                        </SelectItem>
                                                                        <SelectItem value="week">
                                                                            Semanas
                                                                        </SelectItem>
                                                                        <SelectItem value="month">
                                                                            Meses
                                                                        </SelectItem>
                                                                    </SelectContent>
                                                                </Select>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </Form>
                </div>

                <DrawerFooter className="border-t">
                    <div className="flex justify-end gap-2">
                        <DrawerClose asChild>
                            <Button variant="outline">Cancelar</Button>
                        </DrawerClose>
                        <Button
                            onClick={form.handleSubmit(onSubmit)}
                            className="bg-blue-600 hover:bg-blue-700"
                        >
                            Criar Pacote
                        </Button>
                    </div>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default PackageFormDrawer;
