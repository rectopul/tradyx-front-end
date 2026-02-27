import { useAuth } from "@/hooks/useAuth";
import { getThemeSetting } from "@/services/referralService";
import { LoginPayload, Setting } from "@/types";
import { Eye, EyeOff, Key, Loader2, LogIn, XCircle } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Form, FormItem, FormMessage } from "@/components/ui/form";
import { asset, formatPhone } from "@/utils/helpers";
import { AnimatedInput } from "../ui/animated-input";
import { Loader } from "../loader";

export function NewLoginForm() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const { login, isError: authError, isAuthenticated } = useAuth();
    const [setting, setSetting] = useState<Setting | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [internalError, setInternalError] = useState<boolean>(false);
    // Estado para o valor do telefone com a máscara visível
    const [displayPhone, setDisplayPhone] = useState<string>("");

    const form = useForm({
        defaultValues: {
            phone: "",
            password: "",
        },
        mode: "onChange",
    });

    // Sincroniza o valor do formulário com o estado visual (apenas se o valor inicial mudar)
    useEffect(() => {
        if (form.getValues("phone")) {
            const initialCleaned = form.getValues("phone").replace(/\D/g, "");
            setDisplayPhone(formatPhone(initialCleaned));
        }
    }, [form]);

    // Função para buscar configurações
    const handleGetSettings = useCallback(async () => {
        try {
            const settings = await getThemeSetting();
            setSetting(settings);
        } catch (error) {
            toast.error("Erro ao obter configurações", {
                style: { background: "#1a2239", color: "#ff6347" },
            });
        }
    }, []);

    // Atualiza o estado de erro interno com o erro do hook de autenticação
    useEffect(() => {
        if (authError) {
            setInternalError(authError);
        }
    }, [authError]);

    useEffect(() => {
        handleGetSettings();
    }, [handleGetSettings]);

    // Redireciona se autenticado
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
                        navigate("/");
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

    if (!setting) {
        return (
            <div className="w-full h-screen flex justify-center items-center bg-main-gradient">
                <Loader />
            </div>
        );
    }

    const currentLoading: boolean = isSubmitting;

    return (
        <div className="min-h-screen flex items-center justify-center p-6 sm:p-6 bg-main-gradient font-space">
            {/* Card de Login: Com bordas de slot machine (arredondadas e com sombra intensa) */}
            <div
                className="w-full max-w-md bg-secondary-gradient p-8 sm:p-10 shadow-gradient-[#865dc1,#492067] !rounded-3xl
                           transition-all duration-500 transform hover:scale-[1.01]"
            >
                {/* Logo Area - Adaptado para o tema escuro */}
                <div className="mb-10 text-center">
                    {/* Placeholder para o logo (usando texto estilizado para o tema slot) */}
                    <div className="text-6xl max-w-44 mx-auto mb-4 font-extrabold text-blue-zodiac-500 tracking-wider drop-shadow-lg">
                        <img
                            src={asset("/assets/images/tradyx-logo-shadow.png")}
                            alt=""
                            className="w-full"
                        />
                    </div>
                    <p className="text-sm text-tradyx-200 font-semibold">
                        Crescendo juntos, evoluindo sempre.
                    </p>
                </div>

                {/* Títulos e Subtítulos */}
                <h2 className="text-xl font-bold text-tradyx-200 mb-1 text-center">
                    Acesso a conta
                </h2>
                <p className="text-tradyx-200 mb-6 text-center text-sm">
                    Bem vindo de volta! Por favor, insira suas credenciais
                </p>

                {/* Exibição de Erro */}
                {internalError && (
                    <div className="bg-red-900/40 border-l-4 border-red-500 p-4 mb-6 rounded-lg shadow-inner">
                        <div className="flex items-center">
                            <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                            <div className="ml-3">
                                <p className="text-sm text-red-400">
                                    Credenciais inválidas. Verifique seu
                                    telefone e senha.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Formulário Tipado */}
                <Form {...form}>
                    <form
                        className="space-y-6"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        {/* Campo Telefone usando Controller */}
                        <Controller
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem className="bg-transparent">
                                    <AnimatedInput
                                        label="Telefone"
                                        name={field.name as keyof FormData} // Casting necessário para o nome
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
                                        onBlur={field.onBlur}
                                        placeholder="(00) 00000-0000"
                                        value={displayPhone}
                                    />
                                    <FormMessage className="text-cream-can-400">
                                        {form.formState.errors.phone?.message}
                                    </FormMessage>
                                </FormItem>
                            )}
                        />

                        {/* Campo Senha usando Controller */}
                        <Controller
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex justify-between items-center mb-2">
                                        <label
                                            className="block text-tradyx-300 text-sm font-medium"
                                            htmlFor="password"
                                        >
                                            Senha
                                        </label>
                                        <a
                                            href="/password-recovery"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                navigate("/password-recovery");
                                            }}
                                            className="text-sm text-tradyx-300 hover:text-blue-zodiac-300 transition-colors duration-300"
                                        >
                                            Esqueceu a senha?
                                        </a>
                                    </div>
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
                                                // Aplica as classes de estilo aprimoradas
                                                className="w-full bg-morph-back text-tradyx-500 shadow-right border-2 border-tradyx-950 shadow-royal-purple-700 rounded-lg h-10 py-3 pl-10 pr-3
                                                       focus:outline-none focus:ring-0 focus:ring-transparent
                                                       transition-all duration-300 placeholder:text-tradyx-300"
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
                                                className="absolute bg-transparent right-0 top-1/2 transform -translate-y-1/2 pr-3 text-tradyx-300 hover:text-tradyx-950 transition-colors"
                                            >
                                                {showPassword ? (
                                                    <EyeOff size={16} />
                                                ) : (
                                                    <Eye size={16} />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                    <FormMessage>
                                        {/* {form.formState.errors.password?.message} */}
                                    </FormMessage>
                                </FormItem>
                            )}
                        />

                        {/* Botão de Login - Estilo "Vibrante/Glow" em Amarelo/Ouro */}
                        {/* Countainer shadow button */}
                        <div className="shadow-xl shadow-tradyx-900">
                            <button
                                type="submit"
                                className="w-full mt-8 bg-orange-gradient hover:bg-amber-600 text-tradyx-50 font-extrabold py-4 px-4 rounded-[15px]
                                       transition-all duration-300 transform hover:scale-[1.01] shadow-top-inset shadow-cream-can-100
                                       focus:outline-none focus:ring-4 focus:ring-amber-500/80 flex justify-center items-center group uppercase
                                       tracking-widest disabled:opacity-50 disabled:shadow-none"
                                disabled={currentLoading}
                            >
                                {currentLoading ? (
                                    <div className="flex items-center justify-center">
                                        <Loader2 className="h-5 w-5 animate-spin mr-2 text-ebony-clay-900" />
                                        <span>Autenticando...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center">
                                        <LogIn className="w-5 h-5 mr-2" />
                                        <span>ENTRAR</span>
                                    </div>
                                )}
                            </button>
                        </div>

                        {/* Link de Cadastro */}
                        <div className="mt-6 text-center">
                            <p className="text-ebony-clay-400 text-sm">
                                Ainda não tem conta?
                                <a
                                    href="/signup"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        navigate("/signup");
                                    }}
                                    className="text-amber-400 ml-2 font-semibold hover:text-amber-300 transition-colors duration-300"
                                >
                                    Crie sua conta agora
                                </a>
                            </p>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}
