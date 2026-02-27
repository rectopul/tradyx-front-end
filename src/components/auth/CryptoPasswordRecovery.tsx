import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
    Mail,
    ArrowLeft,
    Shield,
    CheckCircle,
    AlertCircle,
    Loader2,
    KeyRound,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { authService } from "@/services/auth";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { ApiException } from "@/utils/api-errors";

export interface RequestForgotFormData {
    email: string;
}

const CryptoPasswordRecovery: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [showForm, setShowForm] = useState(true);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm<RequestForgotFormData>({
        mode: "onChange",
    });

    const onSubmit = async (data: RequestForgotFormData) => {
        setIsLoading(true);
        toast.loading("Solicitando...");
        try {
            await authService.requestPassword(data);
        } catch (error: any) {
            toast.dismiss();
            if (error instanceof AxiosError) {
                const apiError = ApiException.fromAxiosError(error);

                if (apiError.hasErrorFor("email")) {
                    toast.error(apiError.getErrorFor("email"));
                } else {
                    toast.error(error.message);
                }
            }
            setIsLoading(false);
            return setIsSuccess(false);
        }

        setIsLoading(false);
        setIsSuccess(true);
        setShowForm(false);
        toast.dismiss();
    };

    const handleBackToLogin = () => {
        navigate("/login");
    };

    const handleNewRequest = () => {
        setShowForm(true);
        setIsSuccess(false);
        reset();
    };

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center p-4">
                <div className="absolute inset-0  opacity-50"></div>

                <div className="relative w-full max-w-md">
                    <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500"></div>
                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>
                        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"></div>

                        {showForm && !isSuccess && (
                            <>
                                <div className="text-center mb-8">
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-lg">
                                        <KeyRound className="w-8 h-8 text-white" />
                                    </div>
                                    <h1 className="text-2xl font-bold text-white mb-2">
                                        Recuperar Senha
                                    </h1>
                                    <p className="text-gray-300 text-sm leading-relaxed">
                                        Digite seu e-mail para receber as
                                        instruções de recuperação da sua conta
                                        crypto
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-200 flex items-center gap-2">
                                            <Mail className="w-4 h-4" />
                                            E-mail
                                        </label>
                                        <div className="relative">
                                            <input
                                                {...register("email", {
                                                    required:
                                                        "E-mail é obrigatório",
                                                    pattern: {
                                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                        message:
                                                            "E-mail inválido",
                                                    },
                                                })}
                                                type="email"
                                                placeholder="seu@email.com"
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
                                                disabled={isLoading}
                                            />
                                            {errors.email && (
                                                <div className="absolute -bottom-6 left-0 flex items-center gap-1 text-red-400 text-xs">
                                                    <AlertCircle className="w-3 h-3" />
                                                    {errors.email.message}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex items-start gap-3">
                                        <Shield className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="text-blue-200 text-sm font-medium mb-1">
                                                Segurança Garantida
                                            </p>
                                            <p className="text-blue-300 text-xs leading-relaxed">
                                                Suas informações são protegidas
                                                com criptografia de ponta a
                                                ponta
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={handleSubmit(onSubmit)}
                                        disabled={!isValid || isLoading}
                                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                Enviando...
                                            </>
                                        ) : (
                                            <>
                                                <Mail className="w-5 h-5" />
                                                Enviar Instruções
                                            </>
                                        )}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleBackToLogin}
                                        className="w-full text-gray-300 hover:text-white font-medium py-2 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 hover:bg-white/5"
                                    >
                                        <ArrowLeft className="w-4 h-4" />
                                        Voltar ao Login
                                    </button>
                                </div>
                            </>
                        )}

                        {isSuccess && (
                            <div className="text-center space-y-6">
                                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-6 shadow-lg animate-pulse">
                                    <CheckCircle className="w-10 h-10 text-white" />
                                </div>

                                <div className="space-y-3">
                                    <h2 className="text-2xl font-bold text-white">
                                        E-mail Enviado!
                                    </h2>
                                    <p className="text-gray-300 text-sm leading-relaxed">
                                        Enviamos as instruções de recuperação
                                        para seu e-mail. Verifique também sua
                                        caixa de spam.
                                    </p>
                                </div>

                                <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 text-left">
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                                        <div className="space-y-2">
                                            <p className="text-green-200 text-sm font-medium">
                                                Próximos passos:
                                            </p>
                                            <ul className="text-green-300 text-xs space-y-1 list-disc list-inside ml-2">
                                                <li>Verifique seu e-mail</li>
                                                <li>
                                                    Clique no link de
                                                    recuperação
                                                </li>
                                                <li>
                                                    Defina uma nova senha segura
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <button
                                        onClick={handleNewRequest}
                                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg transform hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        <Mail className="w-5 h-5" />
                                        Enviar Novamente
                                    </button>

                                    <button
                                        onClick={handleBackToLogin}
                                        className="w-full text-gray-300 hover:text-white font-medium py-2 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 hover:bg-white/5"
                                    >
                                        <ArrowLeft className="w-4 h-4" />
                                        Voltar ao Login
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="text-center mt-6">
                        <p className="text-gray-400 text-xs">
                            © 2025 CryptoSystem. Seus ativos digitais
                            protegidos.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CryptoPasswordRecovery;
