import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "@/components/loader";

import * as z from "zod";
import { Form, FormItem, FormMessage } from "@/components/ui/form";
import {
    Loader2,
    User,
    Key,
    Eye,
    EyeOff,
    XCircle,
    Phone,
    Link,
    ArrowRight,
    LogIn,
} from "lucide-react";
import { toast } from "sonner";
import { userSignup } from "@/services/transactionsService";
import { ApiException } from "@/utils/api-errors";
import { useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";
import { AxiosError } from "axios";
import { getThemeSetting } from "@/services/referralService";
import { Setting } from "@/types";
import { asset, formatPhone } from "@/utils/helpers";
import { AnimatedInput } from "@/components/ui/animated-input";

// Interface para a resposta da API
export interface SignupResponse {
    redirect: string;
    data: {
        id: number;
        name: string;
        phone: string;
        // outros campos retornados pela API
    };
    token: string;
}

// Schema de validação aprimorado
const signupSchema = z
    .object({
        name: z
            .string()
            .min(3, "O nome deve ter no mínimo 3 caracteres")
            .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "O nome deve conter apenas letras"),
        phone: z
            .string()
            .min(10, "O telefone deve ter no mínimo 10 dígitos")
            .max(11, "O telefone deve ter no máximo 11 dígitos")
            .regex(/^\d+$/, "Apenas números são permitidos"),
        password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
        password_confirmation: z
            .string()
            .min(6, "A senha deve ter no mínimo 6 caracteres"),
        ref_by: z.string().optional(),
    })
    .refine((data) => data.password === data.password_confirmation, {
        message: "As senhas não coincidem",
        path: ["password_confirmation"],
    });

export type SignupFormData = z.infer<typeof signupSchema>;

const SignupForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] =
        useState(false);
    const [setting, setSetting] = useState<Setting | null>(null);
    const [internalError, setInternalError] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    // Estado para o valor do telefone com a máscara visível
    const [displayPhone, setDisplayPhone] = useState<string>("");
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const location = useLocation();

    // Para obter o código de referência dos query params na URL (ex: /signup?ref=ABC123)
    const queryParams = new URLSearchParams(location.search);
    const refCodeFromUrl = queryParams.get("ref") || "";

    const form = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            name: "",
            phone: "",
            password: "",
            password_confirmation: "",
            ref_by: refCodeFromUrl,
        },
        mode: "onChange", // Valida enquanto o usuário digita
    });

    const handleGetSettings = async () => {
        try {
            await api.get("/sanctum/csrf-cookie");
            const settings = await getThemeSetting();
            setSetting(settings);
        } catch (error) {
            toast.error("Erro ao obter configurações", {
                style: { background: "#f5f5f5", color: "#E3001B" },
            });
        }
    };

    useEffect(() => {
        handleGetSettings();
    }, []);

    // Atualiza o campo ref_by quando o código de referência na URL mudar
    useEffect(() => {
        if (refCodeFromUrl) {
            form.setValue("ref_by", refCodeFromUrl);
        }
    }, [refCodeFromUrl, form]);

    const onSubmit = async (data: SignupFormData) => {
        const toastId = toast.loading("Processando dados de cadastro");
        setIsSubmitting(true);
        try {
            setIsLoading(true);
            setError(null);
            setInternalError(false);

            const response = await userSignup(data);

            const { token, data: userData } = response;

            toast.dismiss(toastId);
            toast.success("Cadastro realizado com sucesso!", {
                description: "Você será redirecionado para o painel.",
                duration: 3000,
            });

            // Obter o cookie CSRF para autenticação Sanctum (Laravel)
            await api.get("/sanctum/csrf-cookie");

            // Armazena os dados do usuário no localStorage, similar ao que é feito no login
            localStorage.setItem("user_data", JSON.stringify(userData));

            // Atualiza o estado de autenticação no queryClient
            queryClient.setQueryData(["auth"], true);
            // Atualiza os dados do usuário no queryClient
            queryClient.setQueryData(["user"], userData);

            // Redireciona para o dashboard após um pequeno delay para mostrar a mensagem de sucesso
            setTimeout(() => {
                if (token) navigate("/withdraw_account/setup");
            }, 1500);
        } catch (error) {
            toast.dismiss(toastId);

            // Tratamento de erro melhorado
            if (error instanceof AxiosError) {
                const apiError = ApiException.fromAxiosError(error);
                const errorFields = [
                    "email",
                    "full_name",
                    "phone",
                    "pix_key_type",
                    "pix_key",
                ];

                for (const field of errorFields) {
                    if (apiError.hasErrorFor(field)) {
                        const errorMessage = apiError.getErrorFor(field);
                        toast.error(errorMessage);
                        setError(errorMessage);
                        return;
                    }
                }

                toast.error(apiError.message);
                setError(apiError.message);
                return;
            }

            if (error instanceof ApiException) {
                setError(error.message);
                toast.error(error.message);
                return;
            }

            // Erro desconhecido
            const errorMsg =
                "Ocorreu um erro durante o cadastro. Tente novamente mais tarde.";
            toast.error(errorMsg);
            setError(errorMsg);
            console.error(error);
        } finally {
            setIsLoading(false);
            setIsSubmitting(false);
        }
    };

    if (!setting) {
        return (
            <div className="w-full h-screen flex justify-center items-center bg-main-gradient">
                <Loader />
            </div>
        );
    }

    const currentLoading: boolean = isSubmitting || isLoading;

    return (
        <div className="min-h-screen flex items-center justify-center p-6 sm:p-6 bg-main-gradient font-space">
            {/* Card de Registro: Com bordas de slot machine (arredondadas e com sombra intensa) */}
            <div className="w-full max-w-md bg-secondary-gradient p-8 sm:p-10 shadow-gradient-[#865dc1,#492067] !rounded-3xl transition-all duration-500 transform hover:scale-[1.01]">
                {/* Logo Area - Adaptado para o tema escuro */}
                <div className="mb-10 text-center">
                    {/* Placeholder para o logo (usando texto estilizado para o tema slot) */}
                    <div className="text-6xl font-extrabold text-blue-zodiac-500 mb-2 tracking-wider drop-shadow-lg">
                        <img
                            src={asset("/assets/images/tradyx-logo-shadow.png")}
                            alt=""
                            className="w-24 mx-auto"
                        />
                    </div>
                    <p className="text-sm text-tradyx-200 font-semibold">
                        Crescendo juntos, evoluindo sempre.
                    </p>
                </div>

                {/* Títulos e Subtítulos */}
                <h2 className="text-2xl font-bold text-tradyx-200 mb-2 text-center">
                    Crie sua Conta
                </h2>
                <p className="text-tradyx-200 mb-6 text-center text-xs">
                    Preencha os dados abaixo para começar a investir.
                </p>

                {/* Exibição de Erro */}
                {internalError ||
                    (isError && (
                        <div className="shadow-bottom-xl shadow-tradyx-950 bg-transparent rounded-lg">
                            <div className="bg-gradient-to-br from-red-400 text-tradyx-100 to-red-600 border border-red-600 p-4 mb-6 rounded-lg shadow-inner">
                                <div className="flex items-center">
                                    <XCircle className="h-5 w-5 flex-shrink-0" />
                                    <div className="ml-3">
                                        <p className="text-sm">
                                            Falha no cadastro. Verifique os
                                            dados ou tente outro telefone.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                {/* Formulário Tipado */}
                <Form {...form}>
                    <form
                        className="space-y-6"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        {/* Campo Nome */}
                        <Controller
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <AnimatedInput
                                        label="Nome Completo"
                                        name={field.name as keyof FormData}
                                        Logo={User}
                                        onBlur={field.onBlur}
                                        onChange={field.onChange}
                                        placeholder="Seu nome completo"
                                        value={field.value}
                                    />
                                    <FormMessage>
                                        {/* Mensagem de erro para Nome */}
                                    </FormMessage>
                                </FormItem>
                            )}
                        />

                        {/* Campo Telefone usando Controller */}
                        <Controller
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <AnimatedInput
                                        label="Telefone"
                                        name={field.name as keyof FormData}
                                        Logo={Phone}
                                        onBlur={field.onBlur}
                                        onChange={(e) => {
                                            const rawValue = e;
                                            const cleanedValue =
                                                rawValue.replace(/\D/g, "");

                                            // 1. Aplica a máscara e atualiza o estado visual
                                            const maskedValue =
                                                formatPhone(cleanedValue);
                                            setDisplayPhone(maskedValue);

                                            // 2. Atualiza o react-hook-form com o valor LIMPO (apenas dígitos)
                                            field.onChange(cleanedValue);
                                        }}
                                        placeholder="(00) 00000-0000"
                                        value={displayPhone}
                                    />
                                    <FormMessage>
                                        {/* Mensagem de erro para Telefone */}
                                    </FormMessage>
                                </FormItem>
                            )}
                        />

                        {/* Campo Senha */}
                        <Controller
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <label
                                        className="block text-sm mb-1 text-tradyx-300 font-medium"
                                        htmlFor="password"
                                    >
                                        Senha
                                    </label>
                                    <div className="relative flex items-center">
                                        <div className="absolute left-0 top-0 bottom-0 flex items-center pl-3 text-tradyx-300">
                                            <Key className="w-4 h-4" />
                                        </div>
                                        <div className="flex-1">
                                            <input
                                                type={
                                                    showPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                className="w-full bg-morph-back text-tradyx-500 shadow-right border-2 border-tradyx-950 shadow-royal-purple-700 rounded-lg h-10 py-3 pl-10 pr-3 focus:outline-none focus:ring-0 focus:ring-transparent transition-all duration-300 placeholder:text-tradyx-300"
                                                placeholder="Crie sua senha"
                                                {...field}
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowPassword(
                                                        !showPassword
                                                    )
                                                }
                                                className="absolute bg-transparent right-0 top-1/2 transform -translate-y-1/2 pr-3 text-tradyx-300 hover:text-amber-400 transition-colors"
                                            >
                                                {showPassword ? (
                                                    <EyeOff size={24} />
                                                ) : (
                                                    <Eye size={24} />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                    <FormMessage>
                                        {/* Mensagem de erro para Senha */}
                                    </FormMessage>
                                </FormItem>
                            )}
                        />

                        {/* Campo Confirmação de Senha */}
                        <Controller
                            control={form.control}
                            name="password_confirmation"
                            render={({ field }) => (
                                <FormItem>
                                    <label
                                        className="block text-tradyx-300 text-sm font-semibold"
                                        htmlFor="password_confirmation"
                                    >
                                        Confirme a Senha
                                    </label>
                                    <div className="relative flex items-center">
                                        <div className="absolute left-0 top-0 bottom-0 flex items-center pl-3 text-tradyx-300">
                                            <Key className="w-4 h-4" />
                                        </div>
                                        <div className="flex-1">
                                            <input
                                                type={
                                                    showPasswordConfirmation
                                                        ? "text"
                                                        : "password"
                                                }
                                                className="w-full bg-morph-back text-tradyx-500 shadow-right border-2 border-tradyx-950 shadow-royal-purple-700 rounded-lg h-10 py-3 pl-10 pr-3 focus:outline-none focus:ring-0 focus:ring-transparent transition-all duration-300 placeholder:text-tradyx-300"
                                                placeholder="Repita sua senha"
                                                {...field}
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowPasswordConfirmation(
                                                        !showPasswordConfirmation
                                                    )
                                                }
                                                className="absolute bg-transparent right-0 top-1/2 transform -translate-y-1/2 pr-3 text-tradyx-300 hover:text-amber-400 transition-colors"
                                            >
                                                {showPasswordConfirmation ? (
                                                    <EyeOff size={24} />
                                                ) : (
                                                    <Eye size={24} />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                    <FormMessage>
                                        {/* Mensagem de erro para Confirmação de Senha */}
                                    </FormMessage>
                                </FormItem>
                            )}
                        />

                        {/* Campo Código de Referência (Opcional/Oculto se preenchido) */}
                        <Controller
                            control={form.control}
                            name="ref_by"
                            render={({ field }) => (
                                <FormItem>
                                    {/* Esconde a label se já estiver preenchido pela URL */}
                                    {!refCodeFromUrl && (
                                        <label
                                            className="block text-tradyx-300 text-sm font-semibold mb-1"
                                            htmlFor="ref_by"
                                        >
                                            Código de Referência (Opcional)
                                        </label>
                                    )}
                                    <div className="flex relative items-center">
                                        <div className="absolute left-0 top-0 bottom-0 flex items-center pl-3 text-tradyx-300">
                                            <Link className="w-4 h-4" />
                                        </div>
                                        <input
                                            placeholder="Cód. de quem te indicou"
                                            type="text"
                                            className={`w-full bg-morph-back text-tradyx-500 shadow-right border-2 border-tradyx-950 shadow-royal-purple-700 rounded-lg h-10 py-3 pl-10 pr-3 focus:outline-none focus:ring-0 focus:ring-transparent transition-all duration-300 placeholder:text-tradyx-300
                                                     ${
                                                         refCodeFromUrl
                                                             ? "opacity-70 cursor-not-allowed"
                                                             : ""
                                                     }`}
                                            readOnly={!!refCodeFromUrl} // Não editável se vier da URL
                                            value={field.value || ""} // Usa o valor do field, que inclui o valor da URL
                                            onChange={field.onChange}
                                        />
                                    </div>
                                    {refCodeFromUrl && (
                                        <p className="text-xs text-amber-400 mt-1 flex items-center">
                                            <ArrowRight className="w-3 h-3 mr-1" />{" "}
                                            Você está se registrando através de
                                            um link de indicação.
                                        </p>
                                    )}
                                </FormItem>
                            )}
                        />

                        {/* Botão de Registro - Estilo "Vibrante/Glow" em Amarelo/Ouro */}
                        <button
                            type="submit"
                            className="w-full mt-8 bg-orange-gradient hover:bg-amber-600 text-sm text-tradyx-50 font-extrabold py-4 px-4 rounded-[15px] 
                                       transition-all duration-300 transform hover:scale-[1.01] shadow-top-inset shadow-cream-can-100
                                       focus:outline-none focus:ring-4 focus:ring-amber-500/80 flex justify-center items-center group uppercase 
                                       tracking-widest disabled:opacity-50 disabled:shadow-none"
                            disabled={currentLoading}
                        >
                            {currentLoading ? (
                                <div className="flex items-center justify-center">
                                    <Loader2 className="h-5 w-5 animate-spin mr-2 text-ebony-clay-900" />
                                    <span>Criando Conta...</span>
                                </div>
                            ) : (
                                <div className="flex items-center">
                                    <LogIn className="w-5 h-5 mr-2" />
                                    <span>CADASTRAR E COMEÇAR</span>
                                </div>
                            )}
                        </button>

                        {/* Link de Login */}
                        <div className="mt-6 text-center">
                            <p className="text-ebony-clay-400 text-sm">
                                Já tem uma conta?
                                <a
                                    href="/login"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        navigate("/login");
                                    }}
                                    className="text-blue-zodiac-400 ml-2 font-semibold hover:text-blue-zodiac-300 transition-colors duration-300"
                                >
                                    Fazer Login
                                </a>
                            </p>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default SignupForm;
