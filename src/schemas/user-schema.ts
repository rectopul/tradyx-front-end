import { z } from "zod";

export const userEditSchema = z.object({
    name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    realname: z
        .string()
        .min(2, "Nome real deve ter pelo menos 2 caracteres")
        .or(z.literal(""))
        .optional(),
    username: z
        .string()
        .min(3, "Username deve ter pelo menos 3 caracteres")
        .or(z.literal(""))
        .optional(),
    email: z.string().email("Email inválido").or(z.literal("")).optional(),
    phone_code: z.string().min(1, "Código do telefone é obrigatório"),
    phone: z.string().min(8, "Telefone deve ter pelo menos 8 dígitos"),
    status: z.enum(["active", "inactive"]),
    ban_unban: z.enum(["ban", "unban"]),
    is_afiliate: z.boolean(),
    investor: z.number().min(0, "Valor deve ser positivo"),
    balance: z.number().min(0, "Saldo deve ser positivo"),
    profit_balance: z.number().min(0, "Saldo de lucro deve ser positivo"),
    blocked_balance: z.number().min(0, "Saldo bloqueado deve ser positivo"),
    total_commission: z.number().min(0, "Comissão total deve ser positiva"),
    gateway_method: z.string().optional(),
    pix_type: z.string().optional(),
    pix_key: z.string().optional(),
    gateway_number: z.string().optional(),
});

export type UserEditFormData = z.infer<typeof userEditSchema>;
