import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectValue,
    SelectTrigger,
} from "../ui/select";
import { toast } from "sonner";
import { ApiException } from "@/utils/api-errors";
import { Button } from "../ui/button";
import { WithdrawnAccountPayload } from "@/types";
import { createWithdrawAccount } from "@/services/transactionsService";
import {
    checkCPF,
    maskCPF,
    maskPhone,
    removeSpecialChars,
} from "@/utils/formatters";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useUser } from "@/contexts/UserProvider";
import { AxiosError } from "axios";

// Definindo o schema com a mesma estrutura do WithdrawnAccountPayload
const withdrawalFormSchema = z.object({
    full_name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
    cpf: z
        .string()
        .transform((value) => removeSpecialChars(value))
        .refine((cpf) => cpf.length === 11, {
            message: "CPF deve ter 11 dígitos",
        })
        .refine((cpf) => checkCPF(cpf), {
            message: "CPF inválido",
        }),
    phone: z
        .string()
        .transform((value) => removeSpecialChars(value))
        .refine((phone) => phone.length === 11, {
            message: "Telefone deve ter 11 dígitos",
        }),
    pix_key_type: z.enum(["CPF", "EMAIL", "PHONE"] as const),
    pix_key: z.string().min(1, "Chave PIX é obrigatória"),
    status: z.enum(["active", "inactive"]),
    is_default: z.boolean().optional(),
}) satisfies z.ZodType<WithdrawnAccountPayload>;

export function WithdrawalAccountForm() {
    const { user, updateUser } = useUser();
    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm<WithdrawnAccountPayload>({
        resolver: zodResolver(withdrawalFormSchema),
        defaultValues: {
            is_default: true,
            status: "active",
        },
    });

    const onSubmitAccount: SubmitHandler<WithdrawnAccountPayload> = async (
        payload
    ) => {
        toast.loading("Registrando conta para saques");
        try {
            const formattedPayload = {
                ...payload,
                cpf: removeSpecialChars(payload.cpf),
                phone: removeSpecialChars(payload.phone),
            };

            const withdrawnAccount = await createWithdrawAccount(
                formattedPayload
            );

            if (user) {
                const new_user = {
                    ...user,
                    withdraw_account: withdrawnAccount,
                };

                updateUser(new_user);
            }
            toast.dismiss();
            toast.success("Conta cadastrada com sucesso!", {
                description: `Sua conta para saque ja está cadastrada. Seus saques serão depositados na conta cadastrada`,
            });
        } catch (error) {
            toast.dismiss();

            // Convertemos AxiosError para ApiException
            if (error instanceof AxiosError) {
                const apiError = ApiException.fromAxiosError(error);

                if (apiError.hasErrorFor("name")) {
                    toast.error(apiError.getErrorFor("name"));
                    return;
                } else if (apiError.hasErrorFor("phone")) {
                    toast.error(apiError.getErrorFor("phone"));
                    return;
                } else if (apiError.hasErrorFor("email")) {
                    toast.error(apiError.getErrorFor("email"));
                    return;
                } else if (apiError.hasErrorFor("password")) {
                    toast.error(apiError.getErrorFor("password"));
                    return;
                } else if (apiError.hasErrorFor("password_confirmation")) {
                    toast.error(apiError.getErrorFor("password_confirmation"));
                    return;
                } else if (apiError.hasErrorFor("ref_by")) {
                    toast.error(apiError.getErrorFor("ref_by"));

                    return;
                } else {
                    toast.error(apiError.message);
                    return;
                }
            }

            if (error instanceof ApiException) {
                toast.error(error.message);
                return;
            }

            // Erro desconhecido
            toast.error("Erro desconhecido");
            console.error(error);
        }
    };

    // Handle CPF mask
    const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const maskedValue = maskCPF(e.target.value);
        setValue("cpf", maskedValue);
    };

    // Handle phone mask
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const maskedValue = maskPhone(e.target.value);
        setValue("phone", maskedValue);
    };

    return (
        <form onSubmit={handleSubmit(onSubmitAccount)} className="grid gap-4">
            <div className="space-y-2">
                <h4 className="font-medium leading-none">
                    Cadastrar Conta PIX
                </h4>
                <p className="text-sm text-muted-foreground">
                    Cadastre uma conta para receber seus saques
                </p>
            </div>

            <div className="grid gap-2">
                <Label htmlFor="full_name">Nome Completo</Label>
                <Input
                    id="full_name"
                    {...register("full_name", { required: true })}
                />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="cpf">CPF</Label>
                <Input
                    id="cpf"
                    inputMode="numeric"
                    {...register("cpf", {
                        required: true,
                        onChange: handleCPFChange,
                    })}
                />
                {errors.cpf && (
                    <span className="text-sm text-red-500">
                        {errors.cpf.message}
                    </span>
                )}
            </div>

            <div className="grid gap-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                    id="phone"
                    inputMode="numeric"
                    {...register("phone", {
                        required: true,
                        onChange: handlePhoneChange,
                    })}
                />
                {errors.phone && (
                    <span className="text-sm text-red-500">
                        {errors.phone.message}
                    </span>
                )}
            </div>

            <div className="grid gap-2">
                <Label htmlFor="pix_key_type">Tipo de Chave PIX</Label>
                <Controller
                    name="pix_key_type"
                    control={control}
                    render={({ field }) => (
                        <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Selecione o tipo" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="CPF">CPF</SelectItem>
                                <SelectItem value="EMAIL">Email</SelectItem>
                                <SelectItem value="PHONE">Telefone</SelectItem>
                                <SelectItem value="RANDOM">
                                    Chave Aleatória
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    )}
                />
                {errors.pix_key_type && (
                    <span className="text-sm text-red-500">
                        {errors.pix_key_type.message}
                    </span>
                )}
            </div>

            <div className="grid gap-2">
                <Label htmlFor="pix_key">Chave PIX</Label>
                <Input
                    id="pix_key"
                    {...register("pix_key", { required: true })}
                />
                {errors.pix_key && (
                    <span className="text-sm text-red-500">
                        {errors.pix_key.message}
                    </span>
                )}
            </div>

            <Button type="submit" className="w-full">
                Cadastrar Conta
            </Button>
        </form>
    );
}
