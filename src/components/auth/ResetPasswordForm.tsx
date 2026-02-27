import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
    CheckCircle,
    XCircle,
    AlertCircle,
    Shield,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Setting } from "@/types";
import { siteUrl } from "@/services/api";
import { toast } from "sonner";
import { getThemeSetting } from "@/services/referralService";
import { authService } from "@/services/auth";
import { AxiosError } from "axios";
import { ApiException } from "@/utils/api-errors";

interface ResetPasswordPayload {
    password: string;
    confirmPassword: string;
}

const ResetPasswordForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [setting, setSetting] = useState<Setting | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [animateForm, setAnimateForm] = useState(false);
    const [token, setToken] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);

    const form = useForm<ResetPasswordPayload>({
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
        mode: "onChange",
    });

    const password = form.watch("password");
    const confirmPassword = form.watch("confirmPassword");

    // Validações de senha
    const passwordValidations = {
        minLength: password.length >= 8,
        hasUpperCase: /[A-Z]/.test(password),
        hasLowerCase: /[a-z]/.test(password),
        hasNumber: /\d/.test(password),
        hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    const isPasswordValid = Object.values(passwordValidations).every(Boolean);
    const passwordsMatch =
        password === confirmPassword && confirmPassword !== "";

    const handleGetSettings = async () => {
        try {
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

        // Capturar token e email dos query parameters
        const tokenParam = searchParams.get("token");
        let emailParam = searchParams.get("email");

        if (emailParam) {
            emailParam = decodeURIComponent(emailParam);
        }

        console.log("Token", tokenParam);
        console.log("Email", emailParam);

        if (!tokenParam || !emailParam) {
            toast.error("Link inválido ou expirado", {
                style: { background: "#f5f5f5", color: "#E3001B" },
            });

            // navigate("/login");
            return;
        }

        setToken(tokenParam);
        setEmail(emailParam);

        // Adiciona animação na entrada
        setTimeout(() => {
            setAnimateForm(true);
        }, 100);
    }, [searchParams, navigate]);

    const onSubmit: SubmitHandler<ResetPasswordPayload> = async (data) => {
        if (!isPasswordValid) {
            toast.error("A senha não atende aos critérios de segurança", {
                style: { background: "#f5f5f5", color: "#E3001B" },
            });
            return;
        }

        if (!passwordsMatch) {
            toast.error("As senhas não coincidem", {
                style: { background: "#f5f5f5", color: "#E3001B" },
            });
            return;
        }

        setIsSubmitting(true);
        try {
            await authService.changePasswordForgot({
                email: String(email),
                token: String(token),
                password: data.password,
                password_confirmation: data.confirmPassword,
            });
            // Simulando a chamada da API
            // await new Promise((resolve) => setTimeout(resolve, 2000));

            toast.success("Senha alterada com sucesso!", {
                style: { background: "#f5f5f5", color: "#E3001B" },
            });

            // navigate("/login");
        } catch (error) {
            console.error("Erro ao alterar senha:", error);
            toast.dismiss();
            if (error instanceof AxiosError) {
                const apiError = ApiException.fromAxiosError(error);

                if (apiError.hasErrorFor("message")) {
                    toast.error(apiError.getErrorFor("message"), {
                        style: { background: "#f5f5f5", color: "#E3001B" },
                    });
                } else {
                    toast.error(error.message, {
                        style: { background: "#f5f5f5", color: "#E3001B" },
                    });
                }
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!token || !email) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center p-4">
                <div className="text-center">
                    <AlertCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        Link Inválido
                    </h2>
                    <p className="text-gray-600">Redirecionando...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center p-4">
            <div className="hidden lg:flex flex-col w-1/2 bg-red-600 justify-center items-center p-12 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-20">
                    <div className="absolute transform rotate-45 bg-red-500 w-full h-32 -top-8 -left-8"></div>
                    <div className="absolute transform rotate-45 bg-red-500 w-full h-32 top-1/4 -left-16"></div>
                    <div className="absolute transform rotate-45 bg-red-500 w-full h-32 top-2/4 -left-24"></div>
                    <div className="absolute transform rotate-45 bg-red-500 w-full h-32 top-3/4 -left-32"></div>
                </div>

                {/* Branding e mensagem de boas-vindas */}
                <div className="z-10 text-white text-center space-y-8">
                    <div className="flex justify-center mb-6">
                        <div className="w-40 h-40 bg-white rounded-full p-4 shadow-2xl flex items-center justify-center">
                            <img
                                src={
                                    siteUrl +
                                    "/public/storage/" +
                                    setting?.site_logo
                                }
                                alt="Logo"
                                className="w-32 h-32 object-contain"
                            />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold">
                        Segurança em Primeiro Lugar
                    </h1>
                    <p className="text-xl opacity-90 max-w-md">
                        Defina uma nova senha segura para proteger sua conta e
                        manter seus investimentos seguros.
                    </p>
                    <div className="pt-12">
                        <div className="flex items-center justify-center space-x-6">
                            <div className="flex flex-col items-center">
                                <Shield className="w-8 h-8 mb-2" />
                                <span className="text-sm">Criptografia</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <CheckCircle className="w-8 h-8 mb-2" />
                                <span className="text-sm">Proteção total</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <Lock className="w-8 h-8 mb-2" />
                                <span className="text-sm">Dados seguros</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Formulário de troca de senha */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-4 md:p-12">
                <div
                    className={`w-full max-w-md transition-all duration-700 transform ${
                        animateForm
                            ? "translate-y-0 opacity-100"
                            : "translate-y-8 opacity-0"
                    }`}
                >
                    {/* Cabeçalho Mobile (visível apenas em telas pequenas) */}
                    <div className="flex flex-col items-center mb-8 lg:hidden">
                        <div className="w-24 h-24 bg-white rounded-full shadow-lg p-2 border-2 border-blue-700 flex items-center justify-center mb-4">
                            <img
                                src={
                                    siteUrl +
                                    "/public/storage/" +
                                    setting?.site_logo
                                }
                                alt="Logo"
                                className="w-20 h-20 object-contain"
                            />
                        </div>
                        <h1 className="text-2xl font-bold text-white">
                            Redefinir Senha
                        </h1>
                    </div>

                    {/* Título do formulário */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-white">
                            Definir Nova Senha
                        </h2>
                        <p className="text-white mt-2">
                            Crie uma senha segura para proteger sua conta
                        </p>
                        <p className="text-sm text-white mt-1">Para: {email}</p>
                    </div>

                    {/* Formulário */}
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6"
                        >
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="bg-transparent rounded-xl shadow-sm border border-blue-800 overflow-hidden focus-within:ring-2 focus-within:ring-blue-700 focus-within:border-transparent transition-all">
                                            <div className="flex items-center px-4 py-2 bg-transparent border-b border-blue-800">
                                                <Lock
                                                    size={16}
                                                    className="text-blue-500 mr-2"
                                                />
                                                <span className="text-sm font-medium text-white">
                                                    Nova Senha
                                                </span>
                                            </div>
                                            <FormControl>
                                                <div className="relative px-4 py-3">
                                                    <input
                                                        type={
                                                            showPassword
                                                                ? "text"
                                                                : "password"
                                                        }
                                                        className="w-full bg-transparent border-none outline-none text-white placeholder-white"
                                                        placeholder="Digite sua nova senha"
                                                        {...field}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setShowPassword(
                                                                !showPassword
                                                            )
                                                        }
                                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-600 transition-colors"
                                                    >
                                                        {showPassword ? (
                                                            <EyeOff size={16} />
                                                        ) : (
                                                            <Eye size={16} />
                                                        )}
                                                    </button>
                                                </div>
                                            </FormControl>
                                        </div>
                                        <FormMessage className="mt-2 text-sm text-red-600" />
                                    </FormItem>
                                )}
                            />

                            {/* Validações de senha */}
                            {password && (
                                <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                                    <h4 className="text-sm font-medium text-gray-700 mb-3">
                                        Critérios de segurança:
                                    </h4>
                                    <div className="space-y-1">
                                        <div className="flex items-center text-xs">
                                            {passwordValidations.minLength ? (
                                                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                            ) : (
                                                <XCircle className="w-4 h-4 text-red-500 mr-2" />
                                            )}
                                            <span
                                                className={
                                                    passwordValidations.minLength
                                                        ? "text-green-700"
                                                        : "text-red-600"
                                                }
                                            >
                                                Mínimo 8 caracteres
                                            </span>
                                        </div>
                                        <div className="flex items-center text-xs">
                                            {passwordValidations.hasUpperCase ? (
                                                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                            ) : (
                                                <XCircle className="w-4 h-4 text-red-500 mr-2" />
                                            )}
                                            <span
                                                className={
                                                    passwordValidations.hasUpperCase
                                                        ? "text-green-700"
                                                        : "text-red-600"
                                                }
                                            >
                                                Uma letra maiúscula
                                            </span>
                                        </div>
                                        <div className="flex items-center text-xs">
                                            {passwordValidations.hasLowerCase ? (
                                                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                            ) : (
                                                <XCircle className="w-4 h-4 text-red-500 mr-2" />
                                            )}
                                            <span
                                                className={
                                                    passwordValidations.hasLowerCase
                                                        ? "text-green-700"
                                                        : "text-red-600"
                                                }
                                            >
                                                Uma letra minúscula
                                            </span>
                                        </div>
                                        <div className="flex items-center text-xs">
                                            {passwordValidations.hasNumber ? (
                                                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                            ) : (
                                                <XCircle className="w-4 h-4 text-red-500 mr-2" />
                                            )}
                                            <span
                                                className={
                                                    passwordValidations.hasNumber
                                                        ? "text-green-700"
                                                        : "text-red-600"
                                                }
                                            >
                                                Um número
                                            </span>
                                        </div>
                                        <div className="flex items-center text-xs">
                                            {passwordValidations.hasSpecialChar ? (
                                                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                            ) : (
                                                <XCircle className="w-4 h-4 text-red-500 mr-2" />
                                            )}
                                            <span
                                                className={
                                                    passwordValidations.hasSpecialChar
                                                        ? "text-green-700"
                                                        : "text-red-600"
                                                }
                                            >
                                                Um caractere especial
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="bg-transparent rounded-xl shadow-sm border border-blue-800 overflow-hidden focus-within:ring-2 focus-within:ring-blue-700 focus-within:border-transparent transition-all">
                                            <div className="flex items-center px-4 py-2 bg-transparent border-b border-blue-800">
                                                <Lock
                                                    size={16}
                                                    className="text-blue-700 mr-2"
                                                />
                                                <span className="text-sm font-medium text-white">
                                                    Confirmar Senha
                                                </span>
                                            </div>
                                            <FormControl>
                                                <div className="relative px-4 py-3">
                                                    <input
                                                        type={
                                                            showConfirmPassword
                                                                ? "text"
                                                                : "password"
                                                        }
                                                        className="w-full bg-transparent border-none outline-none text-white placeholder-white"
                                                        placeholder="Confirme sua nova senha"
                                                        {...field}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setShowConfirmPassword(
                                                                !showConfirmPassword
                                                            )
                                                        }
                                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-600 transition-colors"
                                                    >
                                                        {showConfirmPassword ? (
                                                            <EyeOff size={16} />
                                                        ) : (
                                                            <Eye size={16} />
                                                        )}
                                                    </button>
                                                </div>
                                            </FormControl>
                                        </div>
                                        <FormMessage className="mt-2 text-sm text-red-600" />
                                    </FormItem>
                                )}
                            />

                            {/* Validação de confirmação de senha */}
                            {confirmPassword && (
                                <div className="flex items-center text-sm">
                                    {passwordsMatch ? (
                                        <>
                                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                            <span className="text-green-700">
                                                As senhas coincidem
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            <XCircle className="w-4 h-4 text-red-500 mr-2" />
                                            <span className="text-red-600">
                                                As senhas não coincidem
                                            </span>
                                        </>
                                    )}
                                </div>
                            )}

                            <div className="pt-2">
                                <Button
                                    type="submit"
                                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-50"
                                    disabled={
                                        isSubmitting ||
                                        !isPasswordValid ||
                                        !passwordsMatch
                                    }
                                >
                                    {isSubmitting ? (
                                        <div className="flex items-center justify-center">
                                            <Loader2 className="h-5 w-5 animate-spin mr-2" />
                                            <span>Alterando senha...</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center">
                                            <span>Alterar Senha</span>
                                            <ArrowRight
                                                size={18}
                                                className="ml-2"
                                            />
                                        </div>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </Form>

                    {/* Link de volta ao login */}
                    <div className="mt-8">
                        <div className="text-center">
                            <button
                                onClick={() => navigate("/login")}
                                className="text-white hover:text-blue-600 text-sm transition-colors"
                            >
                                ← Voltar ao login
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Overlay de carregamento animado */}
            {isSubmitting && (
                <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
                    <div className="flex flex-col items-center">
                        <div className="relative">
                            <div className="w-16 h-16 border-4 border-red-200 rounded-full"></div>
                            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-red-600 rounded-full border-t-transparent animate-spin"></div>
                        </div>
                        <p className="mt-4 text-red-600 font-medium">
                            Processando...
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResetPasswordForm;
