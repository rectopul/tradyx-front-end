import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, ArrowRight, ArrowLeft } from "lucide-react";
import { cpfMask, phoneMask, removeMask } from "@/utils/masks";
import { isValidCPF, isValidPhone, detectPixKeyType } from "@/utils/validation";
import type { WithdrawFormData } from "@/types/withdraw";
import {
    createWithdrawAccount,
    fetchUpdateWithdrawAccount,
    validateWithdrawAccount,
} from "@/services/transactionsService";
import { PixType, WithdrawnAccountPayload } from "@/types";
import { AxiosError } from "axios";
import { ApiException } from "@/utils/api-errors";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserProvider";

export const WithdrawAccountSetup = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [isPixValidating, setIsPixValidating] = useState(false);
    const [isPixValid, setIsPixValid] = useState(false);
    const [pixError, setPixError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();
    const { user } = useUser();

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
        trigger,
    } = useForm<WithdrawFormData>({
        mode: "onChange",
        defaultValues: {
            full_name: user?.withdraw_account?.full_name ?? "",
            cpf: user?.withdraw_account?.cpf ?? "",
            phone: user?.withdraw_account?.phone ?? "",
            pix_key: user?.withdraw_account?.pix_key ?? "",
        },
    });

    const formValues = watch();

    const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const masked = cpfMask(e.target.value);
        setValue("cpf", masked, { shouldValidate: true });
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const masked = phoneMask(e.target.value);
        setValue("phone", masked, { shouldValidate: true });
    };

    const validatePixKey = async () => {
        setIsPixValidating(true);
        setPixError("");

        try {
            const response = await validateWithdrawAccount({
                pix_key: formValues.pix_key,
            });

            if (response) {
                setIsPixValid(true);
                setPixError("");
            } else {
                setIsPixValid(false);
                setPixError("Chave PIX inválida ou não reconhecida.");
            }
        } catch (error) {
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
                        setIsPixValid(false);
                        setPixError(String(errorMessage));
                        return;
                    }
                }

                setIsPixValid(false);
                setPixError(apiError.message);
                return;
            }
            setIsPixValid(false);
            setPixError("Erro ao validar chave PIX. Tente novamente.");
        } finally {
            setIsPixValidating(false);
        }
    };

    const handleNextStep = async () => {
        let fieldsToValidate: (keyof WithdrawFormData)[] = [];

        if (currentStep === 1) {
            fieldsToValidate = ["full_name", "cpf"];
        } else if (currentStep === 2) {
            fieldsToValidate = ["phone", "pix_key"];
        }

        const isStepValid = await trigger(fieldsToValidate);

        if (isStepValid) {
            if (currentStep === 2 && !isPixValid) {
                return;
            }
            setCurrentStep((prev) => prev + 1);
        }
    };

    const handlePrevStep = () => {
        setCurrentStep((prev) => prev - 1);
    };

    const onSubmit = async (data: WithdrawFormData) => {
        setIsSubmitting(true);

        try {
            const pixKeyType = detectPixKeyType(data.pix_key);

            const payload: WithdrawnAccountPayload = {
                full_name: data.full_name,
                cpf: removeMask(data.cpf),
                phone: removeMask(data.phone),
                pix_key_type: pixKeyType as PixType,
                pix_key: data.pix_key,
                status: "active",
                is_default: true,
            };

            if (user && user.withdraw_account) {
                const response = await fetchUpdateWithdrawAccount(
                    user.withdraw_account.id,
                    payload
                );

                if (response.id) {
                    return setIsSuccess(true);
                } else {
                    throw new Error("Erro ao cadastrar conta de saque");
                }
            }

            const response = await createWithdrawAccount(payload);

            if (response.id) {
                setIsSuccess(true);
            } else {
                throw new Error("Erro ao cadastrar conta de saque");
            }
        } catch (error) {
            alert("Erro ao cadastrar conta de saque. Tente novamente.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 300 : -300,
            opacity: 0,
        }),
    };

    const [direction, setDirection] = useState(1);

    const goToNextStep = () => {
        setDirection(1);
        handleNextStep();
    };

    const goToPrevStep = () => {
        setDirection(-1);
        handlePrevStep();
    };

    if (isSuccess) {
        return (
            <div className="fixed inset-0 bg-slate-50 flex items-center justify-center p-4 z-[60]">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                            delay: 0.2,
                            type: "spring",
                            stiffness: 200,
                        }}
                    >
                        <CheckCircle2 className="w-24 h-24 text-green-500 mx-auto mb-6" />
                    </motion.div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        Conta cadastrada!
                    </h1>
                    <p className="text-gray-500 mb-8 max-w-xs mx-auto">
                        Sua conta de saque foi configurada e você já pode realizar retiradas.
                    </p>
                    <button
                        onClick={() => navigate("/")}
                        className="px-10 py-4 bg-brand text-gray-900 font-extrabold rounded-2xl shadow-xl shadow-brand/20 active:scale-95 transition-all"
                    >
                        Ir para o Início
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-slate-50 flex flex-col items-center p-6 z-[60] overflow-y-auto">
            <div className="w-full max-w-md mt-10">
                <div className="mb-12">
                    <div className="flex items-center justify-center space-x-4">
                        {[1, 2, 3].map((step) => (
                            <div key={step} className="flex items-center">
                                <div
                                    className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                                        currentStep >= step
                                            ? "bg-brand text-gray-900 shadow-lg shadow-brand/20"
                                            : "bg-white text-gray-300 border border-gray-100"
                                    }`}
                                >
                                    {step}
                                </div>
                                {step < 3 && (
                                    <div
                                        className={`w-12 h-1 mx-2 rounded-full transition-all duration-300 ${
                                            currentStep > step
                                                ? "bg-brand"
                                                : "bg-gray-200"
                                        }`}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative">
                    <AnimatePresence mode="wait" custom={direction}>
                        {currentStep === 1 && (
                            <motion.div
                                key="step1"
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.3 }}
                                className="absolute inset-0"
                            >
                                <div className="bg-white rounded-[40px] p-8 shadow-sm border border-gray-100">
                                    <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
                                        Dados do Titular
                                    </h2>
                                    <p className="text-gray-400 text-sm font-medium mb-8 leading-relaxed">
                                        Informe os dados do titular da conta bancária para recebimento.
                                    </p>

                                    <div className="space-y-6">
                                        <div className="flex flex-col gap-2">
                                            <label className="text-sm font-bold text-gray-900 ml-1">
                                                Nome Completo
                                            </label>
                                            <input
                                                type="text"
                                                {...register("full_name", {
                                                    required: "Nome completo é obrigatório",
                                                    minLength: { value: 3, message: "Mínimo 3 caracteres" },
                                                })}
                                                className="w-full h-14 px-6 bg-gray-50 border-2 border-transparent focus:border-brand focus:bg-white rounded-2xl text-gray-900 font-bold transition-all outline-none"
                                                placeholder="Nome como no banco"
                                            />
                                            {errors.full_name && (
                                                <p className="text-red-500 text-xs font-bold ml-1">
                                                    {errors.full_name.message}
                                                </p>
                                            )}
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <label className="text-sm font-bold text-gray-900 ml-1">
                                                CPF
                                            </label>
                                            <input
                                                type="text"
                                                {...register("cpf", {
                                                    required: "CPF é obrigatório",
                                                    validate: (value) => isValidCPF(value) || "CPF inválido",
                                                })}
                                                onChange={handleCpfChange}
                                                value={formValues.cpf}
                                                maxLength={14}
                                                className="w-full h-14 px-6 bg-gray-50 border-2 border-transparent focus:border-brand focus:bg-white rounded-2xl text-gray-900 font-bold transition-all outline-none"
                                                placeholder="000.000.000-00"
                                            />
                                            {errors.cpf && (
                                                <p className="text-red-500 text-xs font-bold ml-1">
                                                    {errors.cpf.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mt-10">
                                        <button
                                            type="button"
                                            onClick={goToNextStep}
                                            disabled={!formValues.full_name || !formValues.cpf || !!errors.full_name || !!errors.cpf}
                                            className="w-full py-5 bg-brand hover:bg-brand/90 text-gray-900 font-extrabold text-lg rounded-2xl shadow-xl shadow-brand/20 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                                        >
                                            <span>Próximo Passo</span>
                                            <ArrowRight className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {currentStep === 2 && (
                            <motion.div
                                key="step2"
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.3 }}
                                className="absolute inset-0"
                            >
                                <div className="bg-white rounded-[40px] p-8 shadow-sm border border-gray-100">
                                    <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
                                        Contato e PIX
                                    </h2>
                                    <p className="text-gray-400 text-sm font-medium mb-8 leading-relaxed">
                                        Informe seu telefone de contato e sua chave PIX principal.
                                    </p>

                                    <div className="space-y-6">
                                        <div className="flex flex-col gap-2">
                                            <label className="text-sm font-bold text-gray-900 ml-1">
                                                Telefone
                                            </label>
                                            <input
                                                type="text"
                                                {...register("phone", {
                                                    required: "Telefone é obrigatório",
                                                    validate: (value) => isValidPhone(value) || "Telefone inválido",
                                                })}
                                                onChange={handlePhoneChange}
                                                value={formValues.phone}
                                                maxLength={15}
                                                className="w-full h-14 px-6 bg-gray-50 border-2 border-transparent focus:border-brand focus:bg-white rounded-2xl text-gray-900 font-bold transition-all outline-none"
                                                placeholder="(00) 00000-0000"
                                            />
                                            {errors.phone && (
                                                <p className="text-red-500 text-xs font-bold ml-1">
                                                    {errors.phone.message}
                                                </p>
                                            )}
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <label className="text-sm font-bold text-gray-900 ml-1">
                                                Chave PIX
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    {...register("pix_key", {
                                                        required: "Chave PIX é obrigatória",
                                                    })}
                                                    className={`w-full h-14 px-6 bg-gray-50 border-2 rounded-2xl text-gray-900 font-bold transition-all outline-none ${
                                                        isPixValid ? "border-green-100 bg-green-50/30" : "border-transparent focus:border-brand focus:bg-white"
                                                    }`}
                                                    placeholder="Digite sua chave PIX"
                                                />
                                                {isPixValid && (
                                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500">
                                                        <CheckCircle2 className="w-6 h-6" />
                                                    </div>
                                                )}
                                            </div>

                                            {!isPixValid && formValues.pix_key && (
                                                <button
                                                    type="button"
                                                    onClick={validatePixKey}
                                                    disabled={isPixValidating}
                                                    className="mt-2 text-sm font-bold text-brand hover:underline flex items-center gap-2"
                                                >
                                                    {isPixValidating ? (
                                                        <><Loader2 className="w-4 h-4 animate-spin" /> Validando...</>
                                                    ) : (
                                                        "Verificar Chave PIX"
                                                    )}
                                                </button>
                                            )}

                                            {pixError && (
                                                <p className="text-red-500 text-xs font-bold mt-1 ml-1">
                                                    {pixError}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mt-10 flex gap-3">
                                        <button
                                            type="button"
                                            onClick={goToPrevStep}
                                            className="px-6 h-14 bg-gray-100 hover:bg-gray-200 text-gray-500 font-bold rounded-2xl transition-all"
                                        >
                                            <ArrowLeft className="w-6 h-6" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={goToNextStep}
                                            disabled={!isPixValid || !!errors.phone}
                                            className="flex-1 h-14 bg-brand hover:bg-brand/90 text-gray-900 font-extrabold rounded-2xl shadow-xl shadow-brand/20 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                                        >
                                            <span>Avançar</span>
                                            <ArrowRight className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {currentStep === 3 && (
                            <motion.div
                                key="step3"
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.3 }}
                                className="absolute inset-0"
                            >
                                <div className="bg-white rounded-[40px] p-8 shadow-sm border border-gray-100">
                                    <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
                                        Revisar Dados
                                    </h2>
                                    <p className="text-gray-400 text-sm font-medium mb-8 leading-relaxed">
                                        Confirme se todas as informações estão corretas antes de finalizar.
                                    </p>

                                    <div className="space-y-4 bg-gray-50 rounded-[32px] p-6 mb-10 border border-gray-100/50">
                                        <div className="flex flex-col gap-1 border-b border-gray-100 pb-3">
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Titular</span>
                                            <span className="text-base font-bold text-gray-900">{formValues.full_name}</span>
                                        </div>
                                        <div className="flex flex-col gap-1 border-b border-gray-100 pb-3">
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">CPF</span>
                                            <span className="text-base font-bold text-gray-900">{formValues.cpf}</span>
                                        </div>
                                        <div className="flex flex-col gap-1 border-b border-gray-100 pb-3">
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Telefone</span>
                                            <span className="text-base font-bold text-gray-900">{formValues.phone}</span>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Chave PIX</span>
                                            <span className="text-base font-bold text-gray-900">{formValues.pix_key}</span>
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <button
                                            type="button"
                                            onClick={goToPrevStep}
                                            disabled={isSubmitting}
                                            className="px-6 h-14 bg-gray-100 hover:bg-gray-200 text-gray-500 font-bold rounded-2xl transition-all disabled:opacity-50"
                                        >
                                            <ArrowLeft className="w-6 h-6" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleSubmit(onSubmit)}
                                            disabled={isSubmitting}
                                            className="flex-1 h-14 bg-brand hover:bg-brand/90 text-gray-900 font-extrabold rounded-2xl shadow-xl shadow-brand/20 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                                        >
                                            {isSubmitting ? (
                                                <><Loader2 className="w-5 h-5 animate-spin" /><span>Salvando...</span></>
                                            ) : (
                                                <><CheckCircle2 className="w-5 h-5" /><span>Finalizar Configuração</span></>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};
