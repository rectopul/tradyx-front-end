import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "@/components/loader";
import { motion } from "framer-motion";

import * as z from "zod";
import { Form, FormItem, FormMessage } from "@/components/ui/form";
import {
    Loader2,
    Eye,
    EyeOff,
    XCircle,
    LogIn,
    User,
    Phone,
    Lock,
    Link as LinkIcon,
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
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [displayPhone, setDisplayPhone] = useState<string>("");
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const location = useLocation();

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
        mode: "onChange",
    });

    const handleGetSettings = async () => {
        try {
            await api.get("/sanctum/csrf-cookie");
            const settings = await getThemeSetting();
            setSetting(settings);
        } catch (error) {
            toast.error("Erro ao obter configurações");
        }
    };

    useEffect(() => {
        handleGetSettings();
    }, []);

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

            const response = await userSignup(data);
            const { token, data: userData } = response;

            toast.dismiss(toastId);
            toast.success("Cadastro realizado com sucesso!");

            await api.get("/sanctum/csrf-cookie");
            localStorage.setItem("user_data", JSON.stringify(userData));
            queryClient.setQueryData(["auth"], true);
            queryClient.setQueryData(["user"], userData);

            setTimeout(() => {
                if (token) navigate("/withdraw_account/setup");
            }, 1500);
        } catch (error) {
            toast.dismiss(toastId);
            if (error instanceof AxiosError) {
                const apiError = ApiException.fromAxiosError(error);
                toast.error(apiError.message);
                setError(apiError.message);
            } else if (error instanceof ApiException) {
                setError(error.message);
                toast.error(error.message);
            } else {
                const errorMsg = "Ocorreu um erro durante o cadastro.";
                toast.error(errorMsg);
                setError(errorMsg);
            }
        } finally {
            setIsLoading(false);
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

    const currentLoading: boolean = isSubmitting || isLoading;

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 font-sans">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-md"
            >
                <div className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100 relative overflow-hidden">
                    <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-brand/5 rounded-full blur-3xl"></div>

                    <div className="mb-12 text-center relative z-10">
                        <div className="max-w-[160px] mx-auto mb-8">
                            <img
                                src={asset("/assets/images/tradyx-logo-shadow.png")}
                                alt="Tradyx"
                                className="w-full grayscale brightness-50"
                            />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                            Criar Conta
                        </h2>
                        <p className="text-sm text-gray-400 font-medium">
                            Preencha seus dados para começar a investir
                        </p>
                    </div>

                    {isError && (
                        <div className="bg-red-50 border border-red-100 p-4 mb-8 rounded-2xl flex items-center gap-3">
                            <XCircle className="h-5 w-5 text-red-500 shrink-0" />
                            <p className="text-xs text-red-600 font-bold leading-tight">
                                {isError}
                            </p>
                        </div>
                    )}

                    <Form {...form}>
                        <form
                            className="space-y-6 relative z-10"
                            onSubmit={form.handleSubmit(onSubmit)}
                        >
                            <Controller
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <AnimatedInput
                                            label="Nome Completo"
                                            name={field.name}
                                            Logo={User}
                                            value={field.value}
                                            placeholder="Seu nome completo"
                                            onChange={field.onChange}
                                            onBlur={field.onBlur}
                                        />
                                        <FormMessage className="text-xs font-bold text-red-500 ml-1" />
                                    </FormItem>
                                )}
                            />

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
                                        <label className="text-sm font-bold text-gray-900 ml-1 flex items-center gap-2">
                                            <Lock className="w-4 h-4 text-brand" /> Senha
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                className="w-full bg-gray-50 border-2 border-transparent focus:border-brand focus:bg-white text-gray-900 font-bold text-base rounded-2xl h-14 px-6 transition-all outline-none placeholder:text-gray-300"
                                                placeholder="Crie uma senha"
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

                            <Controller
                                control={form.control}
                                name="password_confirmation"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <label className="text-sm font-bold text-gray-900 ml-1 flex items-center gap-2">
                                            <Lock className="w-4 h-4 text-brand" /> Confirmar Senha
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={showPasswordConfirmation ? "text" : "password"}
                                                className="w-full bg-gray-50 border-2 border-transparent focus:border-brand focus:bg-white text-gray-900 font-bold text-base rounded-2xl h-14 px-6 transition-all outline-none placeholder:text-gray-300"
                                                placeholder="Repita sua senha"
                                                {...field}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-900"
                                            >
                                                {showPasswordConfirmation ? <EyeOff size={20} /> : <Eye size={20} />}
                                            </button>
                                        </div>
                                        <FormMessage className="text-xs font-bold text-red-500 ml-1" />
                                    </FormItem>
                                )}
                            />

                            <Controller
                                control={form.control}
                                name="ref_by"
                                render={({ field }) => (
                                    <FormItem>
                                        <AnimatedInput
                                            label="Código de Indicação (Opcional)"
                                            name={field.name}
                                            Logo={LinkIcon}
                                            value={field.value || ""}
                                            placeholder="Código de convite"
                                            readOnly={!!refCodeFromUrl}
                                            onChange={field.onChange}
                                            onBlur={field.onBlur}
                                            className={refCodeFromUrl ? "opacity-70 cursor-not-allowed" : ""}
                                        />
                                        {refCodeFromUrl && (
                                            <p className="text-[10px] text-brand font-bold uppercase tracking-wider ml-1">
                                                Aplicando bônus de indicação do link
                                            </p>
                                        )}
                                    </FormItem>
                                )}
                            />

                            <button
                                type="submit"
                                disabled={currentLoading}
                                className="w-full bg-brand hover:bg-brand/90 text-gray-900 font-bold text-lg h-16 rounded-2xl shadow-lg shadow-brand/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50 mt-4"
                            >
                                {currentLoading ? (
                                    <>
                                        <Loader2 className="h-6 w-6 animate-spin" />
                                        <span>Criando Conta...</span>
                                    </>
                                ) : (
                                    <>
                                        <LogIn className="h-6 w-6" />
                                        <span>Cadastrar</span>
                                    </>
                                )}
                            </button>

                            <div className="text-center pt-2">
                                <p className="text-sm text-gray-400 font-medium">
                                    Já tem uma conta?
                                    <button
                                        type="button"
                                        onClick={() => navigate("/login")}
                                        className="text-brand ml-2 font-bold hover:underline"
                                    >
                                        Faça login aqui
                                    </button>
                                </p>
                            </div>
                        </form>
                    </Form>
                </div>
            </motion.div>
        </div>
    );
};

export default SignupForm;
