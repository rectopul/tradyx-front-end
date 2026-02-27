import { useAuth } from "@/hooks/useAuth";
import { getThemeSetting } from "@/services/referralService";
import { LoginPayload, Setting } from "@/types";
import { Eye, EyeOff, Loader2, LogIn, XCircle, Phone, Lock } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Form, FormItem, FormMessage } from "@/components/ui/form";
import { asset, formatPhone } from "@/utils/helpers";
import { Loader } from "../loader";
import { motion } from "framer-motion";
import { AnimatedInput } from "../ui/animated-input";

export function NewLoginForm() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const { login, isError: authError, isAuthenticated } = useAuth();
    const [setting, setSetting] = useState<Setting | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [internalError, setInternalError] = useState<boolean>(false);
    const [displayPhone, setDisplayPhone] = useState<string>("");

    const form = useForm({
        defaultValues: {
            phone: "",
            password: "",
        },
        mode: "onChange",
    });

    useEffect(() => {
        if (form.getValues("phone")) {
            const initialCleaned = form.getValues("phone").replace(/\D/g, "");
            setDisplayPhone(formatPhone(initialCleaned));
        }
    }, [form]);

    const handleGetSettings = useCallback(async () => {
        try {
            const settings = await getThemeSetting();
            setSetting(settings);
        } catch (error) {
            toast.error("Erro ao obter configurações");
        }
    }, []);

    useEffect(() => {
        if (authError) {
            setInternalError(authError);
        }
    }, [authError]);

    useEffect(() => {
        handleGetSettings();
    }, [handleGetSettings]);

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    const onSubmit: SubmitHandler<LoginPayload> = async (credentials) => {
        setIsSubmitting(true);
        try {
            await new Promise<void>((resolve, reject) => {
                login(credentials, {
                    onSuccess: () => {
                        toast.success("Login realizado com sucesso!");
                        navigate("/");
                        resolve();
                    },
                    onError: (error) => {
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
            <div className="w-full h-screen flex justify-center items-center bg-gray-50">
                <Loader />
            </div>
        );
    }

    const currentLoading: boolean = isSubmitting;

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 font-sans">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <div className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100 overflow-hidden relative">
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand/5 rounded-full blur-3xl"></div>

                    <div className="mb-12 text-center relative z-10">
                        <div className="max-w-[160px] mx-auto mb-8">
                            <img
                                src={asset("/assets/images/tradyx-logo-shadow.png")}
                                alt="Tradyx"
                                className="w-full grayscale brightness-50"
                            />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                            Bem-vindo de volta
                        </h2>
                        <p className="text-sm text-gray-400 font-medium">
                            Faça login em sua conta para continuar
                        </p>
                    </div>

                    {internalError && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-red-50 border border-red-100 p-4 mb-8 rounded-2xl flex items-center gap-3"
                        >
                            <XCircle className="h-5 w-5 text-red-500 shrink-0" />
                            <p className="text-xs text-red-600 font-bold leading-tight">
                                Credenciais inválidas. Verifique seu telefone e senha.
                            </p>
                        </motion.div>
                    )}

                    <Form {...form}>
                        <form
                            className="space-y-8 relative z-10"
                            onSubmit={form.handleSubmit(onSubmit)}
                        >
                            <Controller
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <AnimatedInput
                                            label="Número de Telefone"
                                            name={field.name}
                                            Logo={Phone}
                                            value={displayPhone}
                                            placeholder="(00) 00000-0000"
                                            onChange={(val) => {
                                                const cleanedValue = val.replace(/\D/g, "");
                                                setDisplayPhone(formatPhone(cleanedValue));
                                                field.onChange(cleanedValue);
                                            }}
                                            onBlur={field.onBlur}
                                        />
                                        <FormMessage className="text-xs font-bold text-red-500 ml-1" />
                                    </FormItem>
                                )}
                            />

                            <Controller
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <div className="flex justify-between items-center px-1">
                                            <label className="text-sm font-bold text-gray-900 flex items-center gap-2">
                                                <Lock className="w-4 h-4 text-brand" /> Senha
                                            </label>
                                            <button
                                                type="button"
                                                onClick={() => navigate("/password-recovery")}
                                                className="text-xs font-bold text-brand hover:underline"
                                            >
                                                Esqueceu?
                                            </button>
                                        </div>
                                        <div className="relative">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                className="w-full bg-gray-50 border-2 border-transparent focus:border-brand focus:bg-white text-gray-900 font-bold text-base rounded-2xl h-14 px-6 transition-all outline-none placeholder:text-gray-300"
                                                placeholder="Sua senha"
                                                {...field}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-900"
                                            >
                                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                            </button>
                                        </div>
                                        <FormMessage className="text-xs font-bold text-red-500 ml-1" />
                                    </FormItem>
                                )}
                            />

                            <button
                                type="submit"
                                disabled={currentLoading}
                                className="w-full bg-brand hover:bg-brand/90 text-gray-900 font-bold text-lg h-16 rounded-2xl shadow-lg shadow-brand/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50"
                            >
                                {currentLoading ? (
                                    <>
                                        <Loader2 className="h-6 w-6 animate-spin" />
                                        <span>Entrando...</span>
                                    </>
                                ) : (
                                    <>
                                        <LogIn className="h-6 w-6" />
                                        <span>Entrar</span>
                                    </>
                                )}
                            </button>

                            <div className="text-center pt-4">
                                <p className="text-sm text-gray-400 font-medium">
                                    Não tem uma conta?
                                    <button
                                        type="button"
                                        onClick={() => navigate("/signup")}
                                        className="text-brand ml-2 font-bold hover:underline"
                                    >
                                        Cadastre-se agora
                                    </button>
                                </p>
                            </div>
                        </form>
                    </Form>
                </div>
            </motion.div>
        </div>
    );
}
