import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
    Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { useAdmin } from "@/contexts/admin/admin-context";
import { toast } from "sonner";
import {
    Calendar,
    DollarSign,
    Gift,
    Link,
    Loader2,
    Settings,
    Users,
} from "lucide-react";
import { LogoUpload } from "@/components/admin/settings/LogoUpload";
import { fetchUpdateGeneralSettings } from "@/services/admin/settings";

// Esquema de validação com Zod
const formSchema = z.object({
    site_logo: z.any().nullable(),
    bonus_expiration_days: z.coerce
        .number()
        .min(0, { message: "O valor máximo deve ser positivo" })
        .optional()
        .nullable(),
    checkin: z.coerce
        .number()
        .min(0, { message: "A valor de checkin deve ser no mínimo 0" })
        .optional()
        .nullable(),
    registration_bonus: z.coerce
        .number()
        .min(0, { message: "O bônus deve ser no mínimo 0" })
        .max(100, { message: "O bônus deve ser no máximo 100" })
        .optional()
        .nullable(),
    total_member_register_reword: z.coerce
        .number()
        .min(0, { message: "A quantidade de dias devem ser positivos" })
        .optional()
        .nullable(),
    total_member_register_reword_amount: z.coerce
        .number()
        .min(0, { message: "A quantidade de dias devem ser positivos" })
        .optional()
        .nullable(),
    whatsapp_link: z.coerce
        .string()
        .url({ message: "URL inválida" })
        .optional()
        .nullable(),
    telegram_link: z.coerce
        .string()
        .url({ message: "URL inválida" })
        .optional()
        .nullable(),
});

type FormValues = z.infer<typeof formSchema>;

// Interface para tipagem das configurações de depósito
export type AdminSettingsFormData = Partial<FormValues>;

export function AdminSettings() {
    const { settings, updateSettings } = useAdmin();

    // Valores padrão do formulário
    const defaultValues: Partial<FormValues> = {
        site_logo: settings?.site_logo,
        bonus_expiration_days: settings?.bonus_expiration_days,
        checkin: settings?.checkin || null,
        registration_bonus: settings?.registration_bonus || null,
        telegram_link: settings?.telegram_link || "",
        total_member_register_reword:
            settings?.total_member_register_reword || null,
        total_member_register_reword_amount:
            settings?.total_member_register_reword_amount || null,
        whatsapp_link: settings?.whatsapp_link || "",
    };

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues,
    });

    const [preview, setPreview] = useState<string | null>(
        settings?.site_logo ?? null
    );
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data: FormValues) => {
        setIsLoading(true);
        toast.loading("Salvando configurações...");

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500));

            console.log("Configurações do sistema salvas:", data);
            const newSettings = await fetchUpdateGeneralSettings(data);
            updateSettings(newSettings);
            toast.dismiss();
            toast.success("Configurações salvas com sucesso!");
        } catch (error) {
            toast.dismiss();
            toast.error("Erro ao salvar configurações", {
                description: "Tente novamente em alguns instantes",
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (settings) {
            form.reset({
                site_logo: settings.site_logo,
                bonus_expiration_days: settings.bonus_expiration_days,
                checkin: settings.checkin,
                registration_bonus: settings.registration_bonus,
                telegram_link: settings.telegram_link,
                total_member_register_reword:
                    settings.total_member_register_reword,
                total_member_register_reword_amount:
                    settings.total_member_register_reword_amount,
                whatsapp_link: settings.whatsapp_link,
            });
        }
    }, [settings]);

    return (
        <div className="max-w-4xl mx-auto space-y-8 p-6">
            {/* Header */}
            <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-3">
                    <div className="p-3 bg-primary/10 rounded-full">
                        <Settings className="h-8 w-8 text-primary" />
                    </div>
                    <h1 className="text-3xl font-bold">
                        Configurações do Sistema
                    </h1>
                </div>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Gerencie as configurações gerais do sistema, incluindo logo,
                    links sociais e configurações de bônus.
                </p>
            </div>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    {/* Logo Section */}
                    <Card className="transition-all duration-200 hover:shadow-md">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-lg font-semibold flex items-center gap-2">
                                <Settings className="h-5 w-5 text-primary" />
                                Identidade Visual
                            </CardTitle>
                            <p className="text-sm text-muted-foreground">
                                Configure o logo que será exibido no sistema
                            </p>
                        </CardHeader>
                        <CardContent>
                            <FormField
                                control={form.control}
                                name="site_logo"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex items-center gap-2">
                                            <Settings className="h-4 w-4" />
                                            Logo do Site
                                        </FormLabel>
                                        <FormControl>
                                            <LogoUpload
                                                value={field.value}
                                                onChange={field.onChange}
                                                preview={preview}
                                                onPreviewChange={setPreview}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Imagem que será exibida como logo do
                                            site.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    {/* Social Links Section */}
                    <Card className="transition-all duration-200 hover:shadow-md">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-lg font-semibold flex items-center gap-2">
                                <Link className="h-5 w-5 text-primary" />
                                Links Sociais
                            </CardTitle>
                            <p className="text-sm text-muted-foreground">
                                Configure os links para redes sociais e canais
                                de comunicação
                            </p>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid gap-6 md:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name="telegram_link"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2">
                                                <Link className="h-4 w-4 text-blue-600" />
                                                Link do Telegram
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    value={field.value || ""}
                                                    placeholder="https://t.me/seucanal"
                                                    type="url"
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Link para o grupo do Telegram
                                                (opcional).
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="whatsapp_link"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2">
                                                <Link className="h-4 w-4 text-green-600" />
                                                Link do WhatsApp
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    value={field.value || ""}
                                                    placeholder="https://wa.me/5599999999999"
                                                    type="url"
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Link para contato via WhatsApp
                                                (opcional).
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Bonus Settings Section */}
                    <Card className="transition-all duration-200 hover:shadow-md">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-lg font-semibold flex items-center gap-2">
                                <Gift className="h-5 w-5 text-primary" />
                                Configurações de Bônus
                            </CardTitle>
                            <p className="text-sm text-muted-foreground">
                                Configure os valores e prazos relacionados aos
                                bônus do sistema
                            </p>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid gap-6 md:grid-cols-3">
                                <FormField
                                    control={form.control}
                                    name="bonus_expiration_days"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4 text-orange-600" />
                                                Dias para Expirar o Bônus
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    value={field.value || ""}
                                                    type="number"
                                                    placeholder="30"
                                                    min="0"
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Quantidade de dias até o bônus
                                                expirar.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="registration_bonus"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2">
                                                <Gift className="h-4 w-4 text-purple-600" />
                                                Bônus de Registro
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type="number"
                                                    value={field.value || ""}
                                                    placeholder="50.00"
                                                    step="0.01"
                                                    min="0"
                                                    max="100"
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Valor do bônus para novos
                                                cadastros.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="checkin"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2">
                                                <Gift className="h-4 w-4 text-purple-600" />
                                                Bônus de Checkin
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type="number"
                                                    value={field.value || ""}
                                                    placeholder="50.00"
                                                    step="0.01"
                                                    min="0"
                                                    max="100"
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Valor do bônus a cada checkin.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Referral Rewards Section */}
                    <Card className="transition-all duration-200 hover:shadow-md">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-lg font-semibold flex items-center gap-2">
                                <Users className="h-5 w-5 text-primary" />
                                Recompensas de Indicação
                            </CardTitle>
                            <p className="text-sm text-muted-foreground">
                                Configure as recompensas para usuários que
                                indicam novos membros
                            </p>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid gap-6 md:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name="total_member_register_reword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2">
                                                <Users className="h-4 w-4 text-blue-600" />
                                                Total de Membros para Recompensa
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type="number"
                                                    value={field.value || ""}
                                                    placeholder="10"
                                                    min="0"
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Número de indicações necessárias
                                                para liberar recompensa.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="total_member_register_reword_amount"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2">
                                                <DollarSign className="h-4 w-4 text-green-600" />
                                                Valor da Recompensa (R$)
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type="number"
                                                    value={field.value || ""}
                                                    placeholder="100.00"
                                                    step="0.01"
                                                    min="0"
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Valor pago ao atingir a meta de
                                                indicações.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Submit Button */}
                    <div className="flex justify-center pt-6">
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="px-8 py-3 text-lg font-semibold min-w-[200px]"
                        >
                            {isLoading ? (
                                <div className="flex items-center gap-2">
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Salvando...
                                </div>
                            ) : (
                                "Salvar Configurações"
                            )}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
