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
            <div className="fixed inset-0 bg-ebony-clay-950 flex items-center justify-center p-4">
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
                    <h1 className="text-3xl font-bold text-ebony-clay-100 mb-4">
                        Conta de saque cadastrada com sucesso!
                    </h1>
                    <p className="text-ebony-clay-300 mb-8">
                        Agora você já pode realizar saques na plataforma.
                    </p>
                    <button
                        onClick={() => navigate("/")}
                        className="px-8 py-3 bg-ebony-clay-600 hover:bg-ebony-clay-700 text-white rounded-lg transition-colors duration-200"
                    >
                        Voltar ao painel
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-ebony-clay-950 flex items-center justify-center p-4 overflow-hidden">
            <div className="w-full max-w-2xl">
                <div className="mb-8">
                    <div className="flex items-center justify-center space-x-4 mb-4">
                        {[1, 2, 3].map((step) => (
                            <div key={step} className="flex items-center">
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                                        currentStep >= step
                                            ? "bg-ebony-clay-600 text-white"
                                            : "bg-ebony-clay-800 text-ebony-clay-400"
                                    }`}
                                >
                                    {step}
                                </div>
                                {step < 3 && (
                                    <div
                                        className={`w-16 h-1 mx-2 transition-all duration-300 ${
                                            currentStep > step
                                                ? "bg-ebony-clay-600"
                                                : "bg-ebony-clay-800"
                                        }`}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative h-[500px]">
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
                                <div className="bg-ebony-clay-900 rounded-xl p-8">
                                    <h2 className="text-2xl font-bold text-ebony-clay-100 mb-2">
                                        Dados do titular
                                    </h2>
                                    <p className="text-ebony-clay-300 mb-6">
                                        Informe o nome completo do titular da
                                        conta. Deve ser o mesmo nome cadastrado
                                        no banco. O CPF também deve pertencer ao
                                        titular da conta de saque.
                                    </p>

                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-ebony-clay-200 mb-2">
                                                Nome completo
                                            </label>
                                            <input
                                                type="text"
                                                {...register("full_name", {
                                                    required:
                                                        "Nome completo é obrigatório",
                                                    minLength: {
                                                        value: 3,
                                                        message:
                                                            "Nome deve ter no mínimo 3 caracteres",
                                                    },
                                                })}
                                                className="w-full px-4 py-3 bg-ebony-clay-800 border border-ebony-clay-700 rounded-lg text-ebony-clay-100 placeholder-ebony-clay-500 focus:outline-none focus:ring-2 focus:ring-ebony-clay-600 transition-all"
                                                placeholder="Digite seu nome completo"
                                            />
                                            {errors.full_name && (
                                                <p className="text-red-400 text-sm mt-1">
                                                    {errors.full_name.message}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-ebony-clay-200 mb-2">
                                                CPF
                                            </label>
                                            <input
                                                type="text"
                                                {...register("cpf", {
                                                    required:
                                                        "CPF é obrigatório",
                                                    validate: (value) =>
                                                        isValidCPF(value) ||
                                                        "CPF inválido",
                                                })}
                                                onChange={handleCpfChange}
                                                value={formValues.cpf}
                                                maxLength={14}
                                                className="w-full px-4 py-3 bg-ebony-clay-800 border border-ebony-clay-700 rounded-lg text-ebony-clay-100 placeholder-ebony-clay-500 focus:outline-none focus:ring-2 focus:ring-ebony-clay-600 transition-all"
                                                placeholder="000.000.000-00"
                                            />
                                            {errors.cpf && (
                                                <p className="text-red-400 text-sm mt-1">
                                                    {errors.cpf.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mt-8 flex justify-end">
                                        <button
                                            type="button"
                                            onClick={goToNextStep}
                                            disabled={
                                                !formValues.full_name ||
                                                !formValues.cpf ||
                                                !!errors.full_name ||
                                                !!errors.cpf
                                            }
                                            className="px-6 py-3 bg-ebony-clay-600 hover:bg-ebony-clay-700 text-white rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                                        >
                                            <span>Continuar</span>
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
                                <div className="bg-ebony-clay-900 rounded-xl p-8">
                                    <h2 className="text-2xl font-bold text-ebony-clay-100 mb-2">
                                        Telefone e chave PIX
                                    </h2>
                                    <p className="text-ebony-clay-300 mb-6">
                                        Agora informe o telefone e sua chave
                                        PIX. Pode ser um telefone, CPF ou
                                        e-mail.
                                    </p>

                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-ebony-clay-200 mb-2">
                                                Telefone
                                            </label>
                                            <input
                                                type="text"
                                                {...register("phone", {
                                                    required:
                                                        "Telefone é obrigatório",
                                                    validate: (value) =>
                                                        isValidPhone(value) ||
                                                        "Telefone inválido",
                                                })}
                                                onChange={handlePhoneChange}
                                                value={formValues.phone}
                                                maxLength={15}
                                                className="w-full px-4 py-3 bg-ebony-clay-800 border border-ebony-clay-700 rounded-lg text-ebony-clay-100 placeholder-ebony-clay-500 focus:outline-none focus:ring-2 focus:ring-ebony-clay-600 transition-all"
                                                placeholder="(00) 00000-0000"
                                            />
                                            {errors.phone && (
                                                <p className="text-red-400 text-sm mt-1">
                                                    {errors.phone.message}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-ebony-clay-200 mb-2">
                                                Chave PIX
                                            </label>
                                            <input
                                                type="text"
                                                {...register("pix_key", {
                                                    required:
                                                        "Chave PIX é obrigatória",
                                                })}
                                                className="w-full px-4 py-3 bg-ebony-clay-800 border border-ebony-clay-700 rounded-lg text-ebony-clay-100 placeholder-ebony-clay-500 focus:outline-none focus:ring-2 focus:ring-ebony-clay-600 transition-all"
                                                placeholder="Digite sua chave PIX"
                                            />
                                            {errors.pix_key && (
                                                <p className="text-red-400 text-sm mt-1">
                                                    {errors.pix_key.message}
                                                </p>
                                            )}

                                            {!isPixValid &&
                                                formValues.pix_key && (
                                                    <button
                                                        type="button"
                                                        onClick={validatePixKey}
                                                        disabled={
                                                            isPixValidating ||
                                                            !formValues.pix_key
                                                        }
                                                        className="mt-3 px-4 py-2 bg-ebony-clay-700 hover:bg-ebony-clay-600 text-ebony-clay-100 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                                                    >
                                                        {isPixValidating ? (
                                                            <>
                                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                                <span>
                                                                    Validando
                                                                    sua chave
                                                                    PIX...
                                                                </span>
                                                            </>
                                                        ) : (
                                                            <span>
                                                                Validar chave
                                                                PIX
                                                            </span>
                                                        )}
                                                    </button>
                                                )}

                                            {isPixValid && (
                                                <div className="mt-3 flex items-center space-x-2 text-green-400">
                                                    <CheckCircle2 className="w-5 h-5" />
                                                    <span className="text-sm">
                                                        Chave PIX validada com
                                                        sucesso!
                                                    </span>
                                                </div>
                                            )}

                                            {pixError && (
                                                <p className="text-red-400 text-sm mt-3">
                                                    {pixError}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mt-8 flex justify-between">
                                        <button
                                            type="button"
                                            onClick={goToPrevStep}
                                            className="px-6 py-3 bg-ebony-clay-800 hover:bg-ebony-clay-700 text-ebony-clay-100 rounded-lg transition-colors duration-200 flex items-center space-x-2"
                                        >
                                            <ArrowLeft className="w-5 h-5" />
                                            <span>Voltar</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={goToNextStep}
                                            disabled={
                                                !isPixValid || !!errors.phone
                                            }
                                            className="px-6 py-3 bg-ebony-clay-600 hover:bg-ebony-clay-700 text-white rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
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
                                <div className="bg-ebony-clay-900 rounded-xl p-8 pb-14">
                                    <h2 className="text-2xl font-bold text-ebony-clay-100 mb-2">
                                        Confirmação dos dados
                                    </h2>
                                    <p className="text-ebony-clay-300 mb-6 text-xs">
                                        Esta será a conta utilizada para seus
                                        saques na plataforma.
                                    </p>

                                    <div className="space-y-4 bg-ebony-clay-800 rounded-lg p-6 mb-8 text-sm">
                                        <div className="flex justify-between py-3 border-b border-ebony-clay-700">
                                            <span className="text-ebony-clay-400">
                                                Nome completo:
                                            </span>
                                            <span className="text-ebony-clay-100 font-medium">
                                                {formValues.full_name}
                                            </span>
                                        </div>
                                        <div className="flex justify-between py-3 border-b border-ebony-clay-700">
                                            <span className="text-ebony-clay-400">
                                                CPF:
                                            </span>
                                            <span className="text-ebony-clay-100 font-medium">
                                                {formValues.cpf}
                                            </span>
                                        </div>
                                        <div className="flex justify-between py-3 border-b border-ebony-clay-700">
                                            <span className="text-ebony-clay-400">
                                                Telefone:
                                            </span>
                                            <span className="text-ebony-clay-100 font-medium">
                                                {formValues.phone}
                                            </span>
                                        </div>
                                        <div className="flex justify-between py-3">
                                            <span className="text-ebony-clay-400">
                                                Chave PIX:
                                            </span>
                                            <span className="text-ebony-clay-100 font-medium">
                                                {formValues.pix_key}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mt-8 flex justify-between">
                                        <button
                                            type="button"
                                            onClick={goToPrevStep}
                                            disabled={isSubmitting}
                                            className="px-4 py-3 bg-ebony-clay-800 hover:bg-ebony-clay-700 text-ebony-clay-100 rounded-lg transition-colors duration-200 flex items-center space-x-2 disabled:opacity-50"
                                        >
                                            <ArrowLeft className="w-5 h-5" />
                                            <span>Voltar</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleSubmit(onSubmit)}
                                            disabled={isSubmitting}
                                            className="px-4 py-3 bg-ebony-clay-600 hover:bg-ebony-clay-700 text-white rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                    <span>
                                                        Estamos configurando sua
                                                        conta de saque...
                                                    </span>
                                                </>
                                            ) : (
                                                <>
                                                    <CheckCircle2 className="w-5 h-5" />
                                                    <span>
                                                        Concluir cadastro
                                                    </span>
                                                </>
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
