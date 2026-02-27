import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Upload, X, Loader2 } from "lucide-react";
import { siteUrl } from "@/services/api";
import { fetchStorePackage } from "@/services/adminServices";
import { fetchUpdatePackage } from "@/services/admin/package";
import { useAdmin } from "@/contexts/admin/admin-context";
import { Package, PackageStatus, PackageUnit } from "./columns";
import { toast } from "sonner";

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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
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
import { Separator } from "@/components/ui/separator";

// Schema de validação
const packageSchema = z.object({
    name: z.string().min(1, "O nome é obrigatório"),
    title: z.string().min(1, "O título é obrigatório"),
    description: z
        .string()
        .min(10, "A descrição deve ter pelo menos 10 caracteres"),
    photo: z.string().optional(),
    featured: z.boolean().default(false),
    status: z.enum(["active", "inactive", "draft"]).default("draft"),
    total_duration: z.coerce.number().min(1, "A duração deve ser maior que 0"),
    frequency_unit: z.enum(["hour", "day", "week", "month"]).default("month"),
    commission_percentage: z.coerce
        .number()
        .min(0, "A comissão deve ser no mínimo 0")
        .max(100, "A comissão deve ser no máximo 100"),
    total_investment: z.coerce
        .number()
        .min(0, "O investimento deve ser maior que 0"),
    return_amount: z.coerce.number().min(0, "O retorno deve ser maior que 0"),
});

export type PackageFormData = z.infer<typeof packageSchema>;

interface PackageFormDrawerProps {
    defaultData?: Package;
    isEdit?: boolean;
    opening?: boolean;
    onClose?: () => void;
}

const PackageFormDrawerUpdate: React.FC<PackageFormDrawerProps> = ({
    defaultData,
    isEdit,
    opening = false,
    onClose,
}) => {
    const [isOpen, setIsOpen] = useState(opening);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { addPackage, updatePackage } = useAdmin();

    const defaultValues = defaultData || {
        name: "",
        title: "",
        description: "",
        photo: "",
        featured: false,
        status: "draft" as const,
        total_duration: 1,
        frequency_unit: "month" as const,
        commission_percentage: 0,
        total_investment: 0,
        return_amount: 0,
    };

    // Otimização: Evitar recriação do `useForm` em cada renderização
    const form = useForm<PackageFormData>({
        resolver: zodResolver(packageSchema),
        defaultValues,
    });

    useEffect(() => {
        setIsOpen(opening);
        if (opening && defaultData) {
            form.reset(defaultData);
            setPreviewImage(
                defaultData.photo ? `${siteUrl}/${defaultData.photo}` : null
            );
        } else if (!opening) {
            // Resetar o formulário quando a drawer for fechada
            form.reset(defaultValues);
            setPreviewImage(null);
        }
    }, [opening, defaultData, form]);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target?.result as string;
                setPreviewImage(result);
                // AQUI: Usamos `URL.createObjectURL` para criar uma URL de objeto temporária
                // Isso é mais eficiente e limpo que `FileReader` para previews
                form.setValue("photo", result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setPreviewImage(null);
        form.setValue("photo", "");
    };

    const onSubmit = async (data: PackageFormData) => {
        setIsSubmitting(true);
        const loadingMessage = isEdit
            ? "Atualizando pacote..."
            : "Criando pacote...";
        const successMessage = isEdit
            ? "Pacote atualizado com sucesso!"
            : "Pacote criado com sucesso!";

        const toastId = toast.loading(loadingMessage);

        try {
            if (isEdit && defaultData?.id) {
                await fetchUpdatePackage(defaultData.id, data);
                updatePackage({
                    ...defaultData,
                    ...data,
                    status: data.status as PackageStatus,
                    frequency_unit: data.frequency_unit as PackageUnit,
                }); // Melhorar a atualização do estado
            } else {
                const newPackage = await fetchStorePackage(data);
                addPackage(newPackage);
            }

            toast.success(successMessage);
            handleClose();
        } catch (error) {
            console.error("Erro ao processar pacote:", error);
            toast.error("Erro ao processar pacote. Tente novamente.");
        } finally {
            toast.dismiss(toastId);
            setIsSubmitting(false);
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

    const handleClose = () => {
        setIsOpen(false);
        // O `useEffect` já cuida do reset, mas podemos ter aqui um `form.reset()` se a lógica for diferente
        onClose?.();
    };

    return (
        <Drawer open={isOpen} onOpenChange={handleClose}>
            <DrawerContent className="max-w-4xl mx-auto h-[90vh] flex flex-col">
                <DrawerHeader className="border-b p-6">
                    <DrawerTitle className="text-2xl font-bold">
                        {isEdit ? "Editar Pacote" : "Criar Novo Pacote"}
                    </DrawerTitle>
                    <DrawerDescription>
                        Preencha os dados do pacote de investimento para{" "}
                        {isEdit ? "atualizá-lo" : "criá-lo"}.
                    </DrawerDescription>
                </DrawerHeader>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    <Form {...form}>
                        {/* Seção de Informações Principais */}
                        <Card className="shadow-none border">
                            <CardHeader>
                                <CardTitle className="text-xl">
                                    Informações Principais
                                </CardTitle>
                                <FormDescription>
                                    Detalhes básicos do pacote, como nome,
                                    título e descrição.
                                </FormDescription>
                            </CardHeader>
                            <CardContent>
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
                                                        placeholder="Pacote de Ouro"
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
                                                <FormLabel>Título</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Investimento para Renda Passiva"
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
                                                <FormLabel>Descrição</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Descreva o pacote de investimento e seus benefícios..."
                                                        rows={4}
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Seção de Mídia e Configurações */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <Card className="shadow-none border">
                                <CardHeader>
                                    <CardTitle className="text-xl">
                                        Imagem do Pacote
                                    </CardTitle>
                                    <FormDescription>
                                        Adicione uma imagem visualmente atraente
                                        para o pacote.
                                    </FormDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {previewImage ? (
                                            <div className="relative">
                                                <img
                                                    src={previewImage}
                                                    alt="Pré-visualização do pacote"
                                                    className="w-full h-48 object-cover rounded-md border"
                                                />
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="icon"
                                                    className="absolute top-2 right-2 rounded-full"
                                                    onClick={removeImage}
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-md">
                                                <Upload className="h-12 w-12 text-gray-400" />
                                                <div className="mt-4 text-center">
                                                    <Label
                                                        htmlFor="photo-upload"
                                                        className="cursor-pointer"
                                                    >
                                                        <span className="text-blue-600 hover:text-blue-500 font-medium">
                                                            Clique para fazer
                                                            upload
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
                                                    <p className="text-sm text-gray-500 mt-1">
                                                        PNG, JPG até 10MB
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="shadow-none border">
                                <CardHeader>
                                    <CardTitle className="text-xl">
                                        Configurações e Visibilidade
                                    </CardTitle>
                                    <FormDescription>
                                        Defina o status e a visibilidade do
                                        pacote.
                                    </FormDescription>
                                </CardHeader>
                                <CardContent>
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
                                                            {[
                                                                "draft",
                                                                "active",
                                                                "inactive",
                                                            ].map((status) => (
                                                                <SelectItem
                                                                    key={status}
                                                                    value={
                                                                        status
                                                                    }
                                                                >
                                                                    <div className="flex items-center gap-2">
                                                                        <Badge
                                                                            className={getStatusColor(
                                                                                status
                                                                            )}
                                                                        >
                                                                            {getStatusText(
                                                                                status
                                                                            )}
                                                                        </Badge>
                                                                    </div>
                                                                </SelectItem>
                                                            ))}
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
                                                            Pacote em Destaque
                                                        </FormLabel>
                                                        <FormDescription>
                                                            Marque para exibir
                                                            este pacote em
                                                            seções de destaque.
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
                                                            aria-label="Pacote em Destaque"
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Seção de Valores e Duração */}
                        <Card className="shadow-none border">
                            <CardHeader>
                                <CardTitle className="text-xl">
                                    Detalhes Financeiros
                                </CardTitle>
                                <FormDescription>
                                    Defina o investimento, o retorno e a duração
                                    do pacote.
                                </FormDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="total_investment"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Valor de investimento
                                                        (R$)
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            step="0.01"
                                                            placeholder="0.00"
                                                            {...field}
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
                                                        Valor de Retorno (R$)
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            step="0.01"
                                                            placeholder="0.00"
                                                            {...field}
                                                        />
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
                                                        Percentual de rendimento
                                                        (%)
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            step="0.01"
                                                            max="100"
                                                            placeholder="0.00"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <Separator className="my-4" />{" "}
                                    {/* Adiciona um separador */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                                        onValueChange={
                                                            field.onChange
                                                        }
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
                    </Form>
                </div>

                <DrawerFooter className="border-t p-6">
                    <div className="flex justify-end gap-2">
                        <DrawerClose asChild>
                            <Button
                                variant="outline"
                                type="button"
                                disabled={isSubmitting}
                            >
                                Cancelar
                            </Button>
                        </DrawerClose>
                        <Button
                            onClick={form.handleSubmit(onSubmit)}
                            disabled={isSubmitting}
                            className="bg-blue-600 hover:bg-blue-700"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    {isEdit ? "Atualizando..." : "Criando..."}
                                </>
                            ) : isEdit ? (
                                "Atualizar Pacote"
                            ) : (
                                "Criar Pacote"
                            )}
                        </Button>
                    </div>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default PackageFormDrawerUpdate;
