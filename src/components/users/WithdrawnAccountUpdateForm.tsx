import { useEffect, useRef } from "react";
import { useForm as useFormWallet } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/UserProvider";
import { toast } from "sonner";
import { userWalletUpdate } from "@/services/userService";
import { ApiException } from "@/utils/api-errors";
import { PixType } from "@/types";

// Schema de validação para conta de saque
export const withdrawAccountSchema = z.object({
    full_name: z.string().min(2, {
        message: "Nome completo deve ter pelo menos 2 caracteres.",
    }),
    cpf: z
        .string()
        .min(11, {
            message: "CPF deve ter 11 dígitos.",
        })
        .max(14, {
            message:
                "CPF deve ter no máximo 14 caracteres incluindo pontuação.",
        }),
    phone: z.string().min(8, {
        message: "Telefone deve ter pelo menos 8 dígitos.",
    }),
    pix_key_type: z.enum(["CPF", "EMAIL", "PHONE"]),
    pix_key: z.string().min(1, {
        message: "Chave PIX é obrigatória.",
    }),
    status: z.enum(["active", "inactive"]),
    is_default: z.boolean().default(true),
});

export function WithdrawnAccountUpdateForm() {
    const { user } = useUser();
    const formRef = useRef(null);
    const submittingRef = useRef(false);

    const withdrawAccountForm = useFormWallet({
        resolver: zodResolver(withdrawAccountSchema),
        defaultValues: {
            full_name: "",
            cpf: "",
            phone: "",
            pix_key_type: "CPF" as PixType,
            pix_key: "",
            status: "active" as "active" | "inactive",
            is_default: true,
        },
        mode: "onBlur",
    });

    // Função para atualizar conta de saque diretamente, sem depender do evento de submissão do formulário
    const submitWithdrawAccount = async () => {
        try {
            // Prevenir submissões múltiplas
            if (submittingRef.current) return;
            submittingRef.current = true;

            // Obter valores atuais do formulário
            const values = withdrawAccountForm.getValues();

            // Validar formulário manualmente
            // const isValid = await withdrawAccountForm.trigger();
            // if (!isValid) {
            //     submittingRef.current = false;
            //     toast.error("Formulário inválido", {
            //         description: "Por favor, corrija os erros antes de enviar.",
            //     });
            //     return;
            // }

            console.log("Submetendo dados da conta de saque:", values);

            // Mostrar toast de carregamento
            toast.loading("Atualizando dados de saque...");

            // Chamar API diretamente
            const response = await userWalletUpdate(values);

            // Remover toast de carregamento
            toast.dismiss();

            if (response) {
                toast.success("Conta de Saque Atualizada", {
                    description:
                        "Suas informações de saque foram atualizadas com sucesso.",
                });
            } else {
                toast.error("Erro ao atualizar carteira", {
                    description:
                        "Não foi possível atualizar suas informações de saque.",
                });
            }
        } catch (error) {
            console.error("Erro ao atualizar conta de saque:", error);

            toast.dismiss();

            if (error instanceof ApiException) {
                toast.error("Erro", {
                    description: error.message,
                });
            } else {
                toast.error("Erro ao atualizar conta", {
                    description:
                        "Ocorreu um erro inesperado. Tente novamente mais tarde.",
                });
            }
        } finally {
            submittingRef.current = false;
        }
    };

    useEffect(() => {
        const loadUserData = async () => {
            if (!user) return;

            try {
                // Preencher o formulário de conta de saque se existir
                if (user.withdraw_account) {
                    withdrawAccountForm.reset({
                        full_name: user.withdraw_account.full_name || "",
                        cpf: user.withdraw_account.cpf || "",
                        phone: user.withdraw_account.phone || "",
                        pix_key_type: user.withdraw_account.pix_key_type,
                        pix_key: user.withdraw_account.pix_key || "",
                        status: user.withdraw_account.status || "active",
                        is_default: user.withdraw_account.is_default || true,
                    });
                }
            } catch (error) {
                console.error("Erro ao carregar dados do usuário:", error);
                toast.error("Erro", {
                    description: "Falha ao carregar dados do usuário.",
                });
            }
        };

        if (user) {
            loadUserData();
        }
    }, [user, withdrawAccountForm]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Conta de Saque</CardTitle>
                <CardDescription>
                    Configure suas informações para recebimento de saques.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...withdrawAccountForm}>
                    <div ref={formRef} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={withdrawAccountForm.control}
                                name="full_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nome Completo</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Nome completo conforme documentos"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={withdrawAccountForm.control}
                                name="cpf"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>CPF</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="000.000.000-00"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={withdrawAccountForm.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Telefone</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="(00) 99999-9999"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={withdrawAccountForm.control}
                                name="pix_key_type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tipo de Chave PIX</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecione o tipo" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="CPF">
                                                    CPF
                                                </SelectItem>
                                                <SelectItem value="EMAIL">
                                                    Email
                                                </SelectItem>
                                                <SelectItem value="PHONE">
                                                    Telefone
                                                </SelectItem>
                                                <SelectItem value="RANDOM">
                                                    Chave Aleatória
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={withdrawAccountForm.control}
                                name="pix_key"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Chave PIX</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Sua chave PIX"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={withdrawAccountForm.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Status</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecione o status" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="active">
                                                    Ativo
                                                </SelectItem>
                                                <SelectItem value="inactive">
                                                    Inativo
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Button
                            type="button"
                            className="mt-4"
                            disabled={submittingRef.current}
                            onClick={submitWithdrawAccount}
                        >
                            {submittingRef.current
                                ? "Salvando..."
                                : "Salvar Informações de Saque"}
                        </Button>
                    </div>
                </Form>
            </CardContent>
        </Card>
    );
}
