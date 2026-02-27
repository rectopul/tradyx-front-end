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
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useAdmin } from "@/contexts/admin/admin-context";
import { toast } from "sonner";
import { fetchUpdateWithdrawnSettings } from "@/services/adminServices";
import { AxiosError } from "axios";
import { ApiException } from "@/utils/api-errors";

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

// Esquema de validação com Zod
const formSchema = z.object({
    withdraw_charge: z.coerce
        .number()
        .min(0, { message: "A taxa de saque deve ser no mínimo 0" })
        .max(100, { message: "A taxa de saque deve ser no máximo 100" }),

    withdraw_start_time: z
        .string()
        .regex(timeRegex, {
            message: "Horário de início inválido (deve ser HH:mm)",
        })
        .optional()
        .nullable(),

    withdraw_end_time: z
        .string()
        .regex(timeRegex, {
            message: "Horário de fim inválido (deve ser HH:mm)",
        })
        .optional()
        .nullable(),

    minimum_withdraw: z.coerce
        .number()
        .min(0, { message: "O valor mínimo deve ser positivo" }),

    maximum_withdraw: z.coerce
        .number()
        .min(0, { message: "O valor máximo deve ser positivo" }),

    w_time_status: z.enum(["active", "inactive"]),
});

type FormValues = z.infer<typeof formSchema>;

export function WithdrawSettings() {
    const { settings, updateSettings } = useAdmin();

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        // Defina valores padrão aqui para evitar undefined
        defaultValues: {
            withdraw_charge: 0,
            minimum_withdraw: 0,
            maximum_withdraw: 0,
            w_time_status: "inactive",
            withdraw_start_time: "",
            withdraw_end_time: "",
        },
    });

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        toast.loading("Salvando informaçoes...");
        try {
            console.log("Configurações salvas:", data);
            const dataReceived = await fetchUpdateWithdrawnSettings(data);
            updateSettings(dataReceived.data);
            toast.dismiss();
            toast.success("Dados salvos com sucesso!");
            console.log("Dados salvos com sucesso!");
        } catch (error) {
            toast.dismiss();

            if (error instanceof AxiosError) {
                const apiError = ApiException.fromAxiosError(error);

                if (apiError.hasErrorFor("minimum_withdraw")) {
                    toast.error("Erro ao atualizar mínimo de psaque", {
                        description: apiError.getErrorFor("minimum_withdraw"),
                    });
                    return;
                } else {
                    toast.error("Erro ao atualizar configurações de saque", {
                        description: error.message,
                    });
                    return;
                }
            }

            toast.error("Erro ao atualizar saldo", {
                description: "Erro desconhecido",
            });

            return;
        } finally {
            toast.dismiss();
        }
    };

    useEffect(() => {
        if (settings) {
            form.reset({
                withdraw_charge: settings.withdraw_charge ?? 0,
                minimum_withdraw: settings.minimum_withdraw ?? 0,
                maximum_withdraw: settings.maximum_withdraw ?? 0,
                w_time_status: settings.w_time_status ?? "inactive",
                // Use os valores diretamente
                withdraw_start_time: settings.withdraw_start_time ?? "",
                withdraw_end_time: settings.withdraw_end_time ?? "",
            });
        }
    }, [settings, form]);

    return (
        <Card className="w-full mx-auto bg-transparent">
            <CardHeader>
                <CardTitle>Configurações de Saque</CardTitle>
            </CardHeader>
            <CardContent>
                <FormProvider {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="withdraw_charge"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Taxa de Saque (%)</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="text"
                                                onChange={(e) => {
                                                    // Você pode adaptar a máscara dinheiro aqui
                                                    field.onChange(
                                                        e.target.value
                                                    );
                                                }}
                                                placeholder="2,5"
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Taxa cobrada em cada saque (%)
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="w_time_status"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">
                                                Ativar Horário para Saques
                                            </FormLabel>
                                            <FormDescription>
                                                Ativa o controle de horários
                                                para processamento dos saques
                                            </FormDescription>
                                        </div>
                                        <FormControl>
                                            <Switch
                                                checked={
                                                    field.value === "active"
                                                }
                                                onCheckedChange={(checked) =>
                                                    field.onChange(
                                                        checked
                                                            ? "active"
                                                            : "inactive"
                                                    )
                                                }
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="withdraw_start_time"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Horário Início Saques
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="time"
                                                {...field}
                                                value={field.value ?? ""} // Se for null ou undefined, passa string vazia
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Horário em que os saques começam a
                                            ser processados
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="withdraw_end_time"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Horário Fim Saques
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="time"
                                                {...field}
                                                value={field.value ?? ""} // Se for null ou undefined, passa string vazia
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Horário em que os saques deixam de
                                            ser processados
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="minimum_withdraw"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Valor Mínimo</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="text"
                                                onChange={(e) => {
                                                    // máscara dinheiro (ex: "50,00")
                                                    field.onChange(
                                                        e.target.value
                                                    );
                                                }}
                                                placeholder="R$ 50,00"
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Valor mínimo permitido para saque
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="maximum_withdraw"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Valor Máximo</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="text"
                                                onChange={(e) => {
                                                    // máscara dinheiro (ex: "10.000,00")
                                                    field.onChange(
                                                        e.target.value
                                                    );
                                                }}
                                                placeholder="R$ 10.000,00"
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Valor máximo permitido para saque
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Button type="submit" className="w-full">
                            Salvar Configurações
                        </Button>
                    </form>
                </FormProvider>
            </CardContent>
        </Card>
    );
}
