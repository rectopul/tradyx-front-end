import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InputMask from "react-input-mask-next";
import {
    Phone,
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
    CheckCircle,
    XCircle,
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
import { LoginPayload, Setting } from "@/types";
import { useAuth } from "@/hooks/useAuth";
import { siteUrl } from "@/services/api";
import { toast } from "sonner";
import { getThemeSetting } from "@/services/referralService";

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { login, isLoading, isError, isAuthenticated } = useAuth();
    const [setting, setSetting] = useState<Setting | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [animateForm, setAnimateForm] = useState(false);

    const form = useForm({
        defaultValues: {
            phone: "",
            password: "",
        },
        mode: "onChange",
    });

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
        // Adiciona animação na entrada
        setTimeout(() => {
            setAnimateForm(true);
        }, 100);
    }, []);

    // Check authentication status and redirect if already logged in
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    const onSubmit: SubmitHandler<LoginPayload> = async (credentials) => {
        setIsSubmitting(true);
        try {
            // Call login mutation and await the result
            await new Promise<void>((resolve, reject) => {
                login(credentials, {
                    onSuccess: () => {
                        toast.success("Login realizado com sucesso!", {
                            style: { background: "#f5f5f5", color: "#E3001B" },
                        });
                        resolve();
                    },
                    onError: (error) => {
                        console.log("Erro ao fazer login no form:", error);
                        reject(error);
                    },
                });
            });
        } catch (error) {
            console.log("Erro capturado no login:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-red-50 to-white">
            {/* Layout dividido em duas colunas */}
            <div className="hidden lg:flex flex-col w-1/2 bg-red-600 justify-center items-center p-12 relative overflow-hidden">
                {/* Padrão de design inspirado nas asas da Avianca */}
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
                        Bem-vindo à Site Aviação
                    </h1>
                    <p className="text-xl opacity-90 max-w-md">
                        Acesse sua conta para gerenciar seus investimentos e
                        aproveitar todas as vantagens que preparamos para você.
                    </p>
                    <div className="pt-12">
                        <div className="flex items-center justify-center space-x-6">
                            <div className="flex flex-col items-center">
                                <CheckCircle className="w-8 h-8 mb-2" />
                                <span className="text-sm">Check-in diário</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <CheckCircle className="w-8 h-8 mb-2" />
                                <span className="text-sm">
                                    Investimentos seguros
                                </span>
                            </div>
                            <div className="flex flex-col items-center">
                                <CheckCircle className="w-8 h-8 mb-2" />
                                <span className="text-sm">
                                    Programa Fidelidade
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Formulário de login */}
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
                        <div className="w-24 h-24 bg-white rounded-full shadow-lg p-2 border-2 border-red-600 flex items-center justify-center mb-4">
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
                        <h1 className="text-2xl font-bold text-red-600">
                            Bem-vindo à Avianca
                        </h1>
                    </div>

                    {/* Título do formulário */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-800">
                            Acesse sua conta
                        </h2>
                        <p className="text-gray-600 mt-2">
                            Entre com suas credenciais para continuar
                        </p>
                    </div>

                    {/* Mensagem de erro */}
                    {isError && (
                        <div className="bg-red-50 border-l-4 border-red-600 p-4 mb-6 rounded-r">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <XCircle className="h-5 w-5 text-red-600" />
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-red-600">
                                        Credenciais inválidas
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Formulário */}
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6"
                        >
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden focus-within:ring-2 focus-within:ring-red-600 focus-within:border-transparent transition-all">
                                            <div className="flex items-center px-4 py-2 bg-gray-50 border-b border-gray-200">
                                                <Phone
                                                    size={16}
                                                    className="text-gray-500 mr-2"
                                                />
                                                <span className="text-sm font-medium text-gray-700">
                                                    Telefone
                                                </span>
                                            </div>
                                            <FormControl>
                                                <div className="px-4 py-3">
                                                    <InputMask
                                                        mask="(99) 99999-9999"
                                                        placeholder="(99) 99999-9999"
                                                        className="w-full bg-transparent border-none outline-none text-gray-800 placeholder-gray-400"
                                                        maskPlaceholder={null}
                                                        inputMode="numeric"
                                                        value={field.value}
                                                        onChange={(e) => {
                                                            const numericValue =
                                                                e.target.value.replace(
                                                                    /\D/g,
                                                                    ""
                                                                );
                                                            field.onChange(
                                                                numericValue
                                                            );
                                                        }}
                                                    />
                                                </div>
                                            </FormControl>
                                        </div>
                                        <FormMessage className="mt-2 text-sm text-red-600" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden focus-within:ring-2 focus-within:ring-red-600 focus-within:border-transparent transition-all">
                                            <div className="flex items-center px-4 py-2 bg-gray-50 border-b border-gray-200">
                                                <Lock
                                                    size={16}
                                                    className="text-gray-500 mr-2"
                                                />
                                                <span className="text-sm font-medium text-gray-700">
                                                    Senha
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
                                                        className="w-full bg-transparent border-none outline-none text-gray-800 placeholder-gray-400"
                                                        placeholder="Digite sua senha"
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

                            <div className="pt-2">
                                <Button
                                    type="submit"
                                    className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all"
                                    disabled={isLoading || isSubmitting}
                                >
                                    {isLoading || isSubmitting ? (
                                        <div className="flex items-center justify-center">
                                            <Loader2 className="h-5 w-5 animate-spin mr-2" />
                                            <span>Autenticando...</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center">
                                            <span>Entrar</span>
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

                    {/* Links de suporte */}
                    <div className="mt-8 space-y-4">
                        <div className="flex items-center justify-center">
                            <button
                                onClick={() => navigate("/recuperar-senha")}
                                className="text-gray-600 hover:text-red-600 text-sm transition-colors"
                            >
                                Esqueceu sua senha?
                            </button>
                        </div>
                        <div className="pt-4 border-t border-gray-200">
                            <div className="text-center">
                                <span className="text-gray-600 text-sm">
                                    Não tem uma conta?
                                </span>
                                <button
                                    onClick={() => navigate("/signup")}
                                    className="ml-2 text-red-600 hover:text-red-700 font-medium text-sm transition-colors"
                                >
                                    Criar agora
                                </button>
                            </div>
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

export default LoginForm;
