import { useEffect } from "react";
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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { FormProvider, useForm } from "react-hook-form";
import { useAdmin } from "@/contexts/admin/admin-context";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { ApiException } from "@/utils/api-errors";
import { fetchUpdateDepositSettings } from "@/services/adminServices";

// Esquema de validação com Zod
const formSchema = z
    .object({
        minimum_deposit: z.coerce
            .number()
            .min(0, { message: "O valor mínimo deve ser positivo" }),

        maximum_deposit: z.coerce
            .number()
            .min(0, { message: "O valor máximo deve ser positivo" }),

        deposit_fee_percentage: z.coerce
            .number()
            .min(0, { message: "A taxa deve ser no mínimo 0" })
            .max(100, { message: "A taxa deve ser no máximo 100" })
            .optional()
            .nullable(),

        deposit_bonus_percentage: z.coerce
            .number()
            .min(0, { message: "O bônus deve ser no mínimo 0" })
            .max(100, { message: "O bônus deve ser no máximo 100" })
            .optional()
            .nullable(),

        bonus_expiration_days: z.coerce
            .number()
            .min(0, { message: "Os dias de expiração devem ser positivos" })
            .optional()
            .nullable(),

        auto_approve_deposits: z.boolean().default(false),

        deposit_confirmation_time: z.coerce
            .number()
            .min(0, { message: "O tempo deve ser positivo" })
            .optional()
            .nullable(),

        max_pending_time: z.coerce
            .number()
            .min(0, { message: "O tempo deve ser positivo" })
            .optional()
            .nullable(),

        max_deposits_per_day: z.coerce
            .number()
            .min(0, { message: "O limite deve ser positivo" })
            .optional()
            .nullable(),

        require_kyc_for_deposit: z.boolean().default(false),

        deposit_limiter: z.boolean().default(false),

        deposit_days_allowed: z.array(z.string()).optional().nullable(),

        enabled_gateways: z.array(z.string()).optional().nullable(),

        deposit_terms_url: z
            .string()
            .url({ message: "URL inválida" })
            .optional()
            .nullable(),

        deposit_alert_text: z.string().optional().nullable(),

        deposit_support_link: z
            .string()
            .url({ message: "URL inválida" })
            .optional()
            .nullable(),
    })
    .refine((data) => data.maximum_deposit >= data.minimum_deposit, {
        message: "O valor máximo deve ser maior ou igual ao valor mínimo",
        path: ["maximum_deposit"],
    });

type FormValues = z.infer<typeof formSchema>;

// Interface para tipagem das configurações de depósito
export interface DepositSettingsFormData {
    minimum_deposit: number;
    maximum_deposit: number;
    deposit_fee_percentage?: number | null;
    deposit_bonus_percentage?: number | null;
    bonus_expiration_days?: number | null;
    auto_approve_deposits: boolean;
    deposit_confirmation_time?: number | null;
    max_pending_time?: number | null;
    max_deposits_per_day?: number | null;
    require_kyc_for_deposit: boolean;
    deposit_limiter: boolean;
    deposit_days_allowed?: string[] | null;
    enabled_gateways?: string[] | null;
    deposit_terms_url?: string | null;
    deposit_alert_text?: string | null;
    deposit_support_link?: string | null;
}

// Opções dos dias da semana
const daysOfWeek = [
    { id: "sunday", label: "Domingo" },
    { id: "monday", label: "Segunda-feira" },
    { id: "tuesday", label: "Terça-feira" },
    { id: "wednesday", label: "Quarta-feira" },
    { id: "thursday", label: "Quinta-feira" },
    { id: "friday", label: "Sexta-feira" },
    { id: "saturday", label: "Sábado" },
];

// Opções de gateways de pagamento (adapte conforme seus gateways)
const paymentGateways = [
    { id: "pix", label: "PIX" },
    { id: "credit_card", label: "Cartão de Crédito" },
    { id: "bank_transfer", label: "Transferência Bancária" },
    { id: "crypto", label: "Criptomoedas" },
    { id: "paypal", label: "PayPal" },
    { id: "mercado_pago", label: "Mercado Pago" },
];

export function DepositSettings() {
    const { settings, updateSettings } = useAdmin();

    // Valores padrão do formulário
    const defaultValues: Partial<FormValues> = {
        minimum_deposit: settings?.minimum_deposit || 0,
        maximum_deposit: settings?.maximum_deposit || 0,
        deposit_fee_percentage: settings?.deposit_fee_percentage || null,
        deposit_bonus_percentage: settings?.deposit_bonus_percentage || null,
        bonus_expiration_days: settings?.bonus_expiration_days || null,
        auto_approve_deposits: settings?.auto_approve_deposits || false,
        deposit_confirmation_time: settings?.deposit_confirmation_time || null,
        max_pending_time: settings?.max_pending_time || null,
        max_deposits_per_day: settings?.max_deposits_per_day || null,
        require_kyc_for_deposit: settings?.require_kyc_for_deposit || false,
        deposit_limiter: settings?.deposit_limiter || false,
        deposit_days_allowed: settings?.deposit_days_allowed || [],
        enabled_gateways: settings?.enabled_gateways || [],
        deposit_terms_url: settings?.deposit_terms_url || "",
        deposit_alert_text: settings?.deposit_alert_text || "",
        deposit_support_link: settings?.deposit_support_link || "",
    };

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues,
    });

    const onSubmit = async (data: FormValues) => {
        toast.loading("Salvando configurações...");
        try {
            console.log("Configurações de depósito salvas:", data);
            const dataReceived = await fetchUpdateDepositSettings(data);
            updateSettings({ ...settings, ...dataReceived.data.data });
            toast.dismiss();
            toast.success("Configurações salvas com sucesso!");
        } catch (error) {
            toast.dismiss();

            if (error instanceof AxiosError) {
                const apiError = ApiException.fromAxiosError(error);

                if (apiError.hasErrorFor("minimum_deposit")) {
                    toast.error("Erro ao atualizar valor mínimo de depósito", {
                        description: apiError.getErrorFor("minimum_deposit"),
                    });
                    return;
                } else if (apiError.hasErrorFor("maximum_deposit")) {
                    toast.error("Erro ao atualizar valor máximo de depósito", {
                        description: apiError.getErrorFor("maximum_deposit"),
                    });
                    return;
                } else {
                    toast.error(
                        "Erro ao atualizar configurações de depósitos",
                        {
                            description: error.message,
                        }
                    );
                    return;
                }
            }

            toast.error("Erro ao atualizar configurações", {
                description: "Erro desconhecido",
            });
        } finally {
            toast.dismiss();
        }
    };

    useEffect(() => {
        if (settings) {
            form.reset({
                minimum_deposit: settings.minimum_deposit,
                maximum_deposit: settings.maximum_deposit,
                deposit_fee_percentage: settings.deposit_fee_percentage,
                deposit_bonus_percentage: settings.deposit_bonus_percentage,
                bonus_expiration_days: settings.bonus_expiration_days,
                auto_approve_deposits: settings.auto_approve_deposits,
                deposit_confirmation_time: settings.deposit_confirmation_time,
                max_pending_time: settings.max_pending_time,
                max_deposits_per_day: settings.max_deposits_per_day,
                require_kyc_for_deposit: settings.require_kyc_for_deposit,
                deposit_limiter: settings.deposit_limiter,
                deposit_days_allowed: settings.deposit_days_allowed || [],
                enabled_gateways: settings.enabled_gateways || [],
                deposit_terms_url: settings.deposit_terms_url,
                deposit_alert_text: settings.deposit_alert_text,
                deposit_support_link: settings.deposit_support_link,
            });
        }
    }, [settings]);

    return (
        <Card className="w-full mx-auto bg-transparent">
            <CardHeader>
                <CardTitle>Configurações de Depósitos</CardTitle>
            </CardHeader>
            <CardContent>
                <FormProvider {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        {/* Valores Mínimo e Máximo */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="minimum_deposit"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Valor Mínimo de Depósito
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="number"
                                                step="0.01"
                                                placeholder="20.00"
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Valor mínimo permitido para depósito
                                            (R$)
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="maximum_deposit"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Valor Máximo de Depósito
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="number"
                                                step="0.01"
                                                placeholder="10000.00"
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Valor máximo permitido para depósito
                                            (R$)
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Taxas e Bônus */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="deposit_fee_percentage"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Taxa de Depósito (%)
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="number"
                                                step="0.01"
                                                placeholder="2.5"
                                                value={field.value || ""}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Taxa cobrada em cada depósito
                                            (opcional)
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="deposit_bonus_percentage"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Bônus de Depósito (%)
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="number"
                                                step="0.01"
                                                placeholder="10"
                                                value={field.value || ""}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Percentual de bônus no depósito
                                            (opcional)
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Expiração do Bônus e Limites */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <FormField
                                control={form.control}
                                name="bonus_expiration_days"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Dias para Expirar Bônus
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="number"
                                                placeholder="30"
                                                value={field.value || ""}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Dias até o bônus expirar
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="max_deposits_per_day"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Máx. Depósitos/Dia
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="number"
                                                placeholder="5"
                                                value={field.value || ""}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Limite de depósitos por dia
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="deposit_confirmation_time"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Tempo Confirmação (min)
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="number"
                                                placeholder="15"
                                                value={field.value || ""}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Tempo para confirmar depósito
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Tempo Máximo Pendente */}
                        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                            <FormField
                                control={form.control}
                                name="max_pending_time"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Tempo Máximo Pendente (min)
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="number"
                                                placeholder="60"
                                                value={field.value || ""}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Tempo máximo que um depósito pode
                                            ficar pendente
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Switches de Configuração */}
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="auto_approve_deposits"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">
                                                Aprovar Depósitos
                                                Automaticamente
                                            </FormLabel>
                                            <FormDescription>
                                                Aprova depósitos automaticamente
                                                sem revisão manual
                                            </FormDescription>
                                        </div>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="require_kyc_for_deposit"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">
                                                Exigir KYC para Depósitos
                                            </FormLabel>
                                            <FormDescription>
                                                Exige verificação de identidade
                                                antes de permitir depósitos
                                            </FormDescription>
                                        </div>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="deposit_limiter"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">
                                                Ativar Limitador de Depósitos
                                            </FormLabel>
                                            <FormDescription>
                                                Ativa o controle de limites e
                                                dias permitidos para depósitos
                                            </FormDescription>
                                        </div>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Dias Permitidos para Depósito */}
                        <FormField
                            control={form.control}
                            name="deposit_days_allowed"
                            render={() => (
                                <FormItem>
                                    <div className="mb-4">
                                        <FormLabel className="text-base">
                                            Dias Permitidos para Depósitos
                                        </FormLabel>
                                        <FormDescription>
                                            Selecione os dias da semana em que
                                            depósitos são permitidos
                                        </FormDescription>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                        {daysOfWeek.map((day) => (
                                            <FormField
                                                key={day.id}
                                                control={form.control}
                                                name="deposit_days_allowed"
                                                render={({ field }) => {
                                                    return (
                                                        <FormItem
                                                            key={day.id}
                                                            className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-2"
                                                        >
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value?.includes(
                                                                        day.id
                                                                    )}
                                                                    onCheckedChange={(
                                                                        checked: boolean
                                                                    ) => {
                                                                        const currentValue =
                                                                            field.value ||
                                                                            [];
                                                                        if (
                                                                            checked
                                                                        ) {
                                                                            field.onChange(
                                                                                [
                                                                                    ...currentValue,
                                                                                    day.id,
                                                                                ]
                                                                            );
                                                                        } else {
                                                                            field.onChange(
                                                                                currentValue.filter(
                                                                                    (
                                                                                        value
                                                                                    ) =>
                                                                                        value !==
                                                                                        day.id
                                                                                )
                                                                            );
                                                                        }
                                                                    }}
                                                                />
                                                            </FormControl>
                                                            <FormLabel className="font-normal text-sm">
                                                                {day.label}
                                                            </FormLabel>
                                                        </FormItem>
                                                    );
                                                }}
                                            />
                                        ))}
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Gateways de Pagamento */}
                        <FormField
                            control={form.control}
                            name="enabled_gateways"
                            render={() => (
                                <FormItem>
                                    <div className="mb-4">
                                        <FormLabel className="text-base">
                                            Gateways de Pagamento Habilitados
                                        </FormLabel>
                                        <FormDescription>
                                            Selecione os métodos de pagamento
                                            disponíveis
                                        </FormDescription>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                        {paymentGateways.map((gateway) => (
                                            <FormField
                                                key={gateway.id}
                                                control={form.control}
                                                name="enabled_gateways"
                                                render={({ field }) => {
                                                    return (
                                                        <FormItem
                                                            key={gateway.id}
                                                            className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-2"
                                                        >
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value?.includes(
                                                                        gateway.id
                                                                    )}
                                                                    onCheckedChange={(
                                                                        checked: boolean
                                                                    ) => {
                                                                        const currentValue =
                                                                            field.value ||
                                                                            [];
                                                                        if (
                                                                            checked
                                                                        ) {
                                                                            field.onChange(
                                                                                [
                                                                                    ...currentValue,
                                                                                    gateway.id,
                                                                                ]
                                                                            );
                                                                        } else {
                                                                            field.onChange(
                                                                                currentValue.filter(
                                                                                    (
                                                                                        value
                                                                                    ) =>
                                                                                        value !==
                                                                                        gateway.id
                                                                                )
                                                                            );
                                                                        }
                                                                    }}
                                                                />
                                                            </FormControl>
                                                            <FormLabel className="font-normal text-sm">
                                                                {gateway.label}
                                                            </FormLabel>
                                                        </FormItem>
                                                    );
                                                }}
                                            />
                                        ))}
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* URLs e Texto de Suporte */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="deposit_terms_url"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            URL dos Termos de Depósito
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="url"
                                                placeholder="https://seusite.com/termos"
                                                value={field.value || ""}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Link para os termos e condições de
                                            depósito
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="deposit_support_link"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Link de Suporte</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="url"
                                                placeholder="https://seusite.com/suporte"
                                                value={field.value || ""}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Link para suporte relacionado a
                                            depósitos
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Texto de Alerta */}
                        <FormField
                            control={form.control}
                            name="deposit_alert_text"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Texto de Alerta</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            placeholder="Digite uma mensagem de alerta para os usuários sobre depósitos..."
                                            value={field.value || ""}
                                            rows={3}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Texto informativo exibido aos usuários
                                        na página de depósito
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full">
                            Salvar Configurações de Depósito
                        </Button>
                    </form>
                </FormProvider>
            </CardContent>
        </Card>
    );
}
