import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useUser } from "@/contexts/UserProvider";
import { toast } from "sonner";
// import { userProfileUpdate } from "@/services/userService";
import { Spinner } from "@/components/ui/spinner";
import { Transfer } from "@/components/icons/lib";
import SettingsMenu, { SettingOption } from "@/components/settings-menu";
import { Users, Wallet } from "lucide-react";
import { TransactionsPage } from "./TransactionsPage";
import { WithdrawAccountPage } from "./WithdrawAccountPage";
import ReferralDashboard from "./ReferralDashboard";

// Enum para tipos de PIX
const PixTypes = {
    CPF: "CPF",
    EMAIL: "EMAIL",
    PHONE: "PHONE",
    RANDOM: "RANDOM",
} as const;

type PixType = (typeof PixTypes)[keyof typeof PixTypes];

// Schema de validação para dados pessoais
const profileFormSchema = z.object({
    name: z.string().min(2, {
        message: "Nome deve ter pelo menos 2 caracteres.",
    }),
    realname: z.string().min(2, {
        message: "Nome completo deve ter pelo menos 2 caracteres.",
    }),
    email: z.string().email({
        message: "Email inválido.",
    }),
    phone: z.string().min(8, {
        message: "Telefone deve ter pelo menos 8 dígitos.",
    }),
    phone_code: z.string().min(1, {
        message: "Código do país é obrigatório.",
    }),
    username: z.string().min(3, {
        message: "Nome de usuário deve ter pelo menos 3 caracteres.",
    }),
});

// Schema de validação para alteração de senha
// const passwordFormSchema = z
//     .object({
//         current_password: z.string().min(6, {
//             message: "Senha atual deve ter pelo menos 6 caracteres.",
//         }),
//         new_password: z.string().min(6, {
//             message: "Nova senha deve ter pelo menos 6 caracteres.",
//         }),
//         confirm_password: z.string().min(6, {
//             message: "Confirmar senha deve ter pelo menos 6 caracteres.",
//         }),
//     })
//     .refine((data) => data.new_password === data.confirm_password, {
//         message: "As senhas não coincidem",
//         path: ["confirm_password"],
//     });

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
    pix_key_type: z.enum(["CPF", "EMAIL", "PHONE", "RANDOM"]),
    pix_key: z.string().min(1, {
        message: "Chave PIX é obrigatória.",
    }),
    status: z.enum(["active", "inactive"]),
    is_default: z.boolean().default(true),
});

const UserSettingsPage = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const { user } = useUser();

    // Forms para cada seção
    const profileForm = useForm({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            name: "",
            realname: "",
            email: "",
            phone: "",
            phone_code: "",
            username: "",
        },
    });

    // const passwordForm = useForm({
    //     resolver: zodResolver(passwordFormSchema),
    //     defaultValues: {
    //         current_password: "",
    //         new_password: "",
    //         confirm_password: "",
    //     },
    // });

    const options: SettingOption[] = [
        {
            id: "personal",
            title: "Transações",
            icon: <Transfer className="w-6 h-6" />,
            content: <TransactionsPage />,
        },
        {
            id: "privacy",
            title: "Conta de saque",
            icon: <Wallet className="w-6 h-6" strokeWidth={3} />,
            content: <WithdrawAccountPage />,
        },
        {
            id: "notifications",
            title: "Equipe",
            icon: <Users className="w-6 h-6" strokeWidth={3} />,
            content: <ReferralDashboard />,
        },
    ];

    const withdrawAccountForm = useForm({
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
    });

    // Carregar dados do usuário
    useEffect(() => {
        const loadUserData = async () => {
            if (!user) return;

            try {
                // Preencher o formulário de perfil
                profileForm.reset({
                    name: user.name || "",
                    realname: user.realname || "",
                    email: user.email || "",
                    phone: user.phone || "",
                    phone_code: user.phone_code || "",
                    username: user.username || "",
                });

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
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            loadUserData();
        } else {
            // Se ainda não tem dados do usuário, mas já tentou carregar, não mostrar loading infinito
            if (loading && document.readyState === "complete") {
                setLoading(false);
            }
        }
    }, [user]);

    // Função para atualizar perfil
    // const onProfileSubmit = async (
    //     values: z.infer<typeof profileFormSchema>
    // ) => {
    //     try {
    //         // Substituir por sua API real
    //         const userUpdated = await userProfileUpdate({
    //             ...values,
    //             update_type: "perfil",
    //         });

    //         if (!userUpdated) throw new Error("Falha ao atualizar perfil");

    //         toast.success("Perfil Atualizado", {
    //             description:
    //                 "Suas informações pessoais foram atualizadas com sucesso.",
    //         });
    //     } catch (error) {
    //         console.error("Erro ao atualizar perfil:", error);
    //         toast.error("Erro", {
    //             description:
    //                 "Não foi possível atualizar seu perfil. Tente novamente mais tarde.",
    //         });
    //     }
    // };

    // Função para alterar senha
    // const onPasswordSubmit = async (
    //     values: z.infer<typeof passwordFormSchema>
    // ) => {
    //     try {
    //         // Substituir por sua API real
    //         const response = await fetch("/api/user/change-password", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify(values),
    //         });

    //         if (!response.ok) throw new Error("Falha ao alterar senha");

    //         toast.success("Senha Alterada", {
    //             description: "Sua senha foi alterada com sucesso.",
    //         });

    //         passwordForm.reset();
    //     } catch (error) {
    //         console.error("Erro ao alterar senha:", error);
    //         toast.error("Erro", {
    //             description:
    //                 "Não foi possível alterar sua senha. Verifique se a senha atual está correta.",
    //         });
    //     }
    // };

    // Componente de carregamento
    if (loading) {
        return <Spinner />;
    }

    return <SettingsMenu options={options} />;
};

export default UserSettingsPage;
