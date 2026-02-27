import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InputMask from "react-input-mask-next";
import { Phone, Lock, Eye, EyeOff, Shield, ArrowRight } from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginPayload, Setting } from "@/types";
import { useAuth } from "@/hooks/useAuth";
import { Alert, AlertDescription } from "../ui/alert";

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { login, isLoading, isError, getErrorMessage } = useAuth();
    const [setting, setSetting] = useState<Setting | null>(null);

    const form = useForm({
        defaultValues: {
            phone: "",
            password: "",
        },
    });

    const onSubmit: SubmitHandler<LoginPayload> = async (credentials) => {
        await login(credentials);
        navigate("/");
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen p-4 bg-background">
            <div className="w-full max-w-md space-y-6">
                {/* Enhanced Logo Container */}
                <div className="flex flex-col items-center space-y-4 mb-8">
                    <div className="w-32 h-32 relative overflow-hidden bg-card rounded-full flex items-center justify-center shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
                        <img
                            src={
                                window.Laravel.appUrl +
                                "/public/common/img/index-C2IkVkPt.js.png"
                            }
                            alt="Logo"
                            className="w-full h-full object-contain absolute"
                        />
                    </div>
                </div>

                <Card className="border-border shadow-lg">
                    <CardHeader className="space-y-3 pb-4">
                        <div className="flex justify-center mb-2">
                            <Shield className="text-primary w-8 h-8" />
                        </div>
                        <CardTitle className="text-2xl font-bold text-center">
                            Bem-vindo de volta!
                        </CardTitle>
                        <CardDescription className="text-center">
                            Entre com suas credenciais para acessar sua conta de
                            forma segura
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-6"
                            >
                                {isError && (
                                    <Alert variant="destructive">
                                        <AlertDescription>
                                            {getErrorMessage()}
                                        </AlertDescription>
                                    </Alert>
                                )}
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Telefone</FormLabel>
                                            <FormControl>
                                                <div className="relative group">
                                                    <Phone
                                                        size={18}
                                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground group-hover:text-primary transition-colors"
                                                    />
                                                    <InputMask
                                                        mask="(99) 99999-9999"
                                                        placeholder="(99) 99999-9999"
                                                        className="flex h-12 w-full rounded-lg border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-10 transition-all duration-200"
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
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Senha</FormLabel>
                                            <FormControl>
                                                <div className="relative group">
                                                    <Lock
                                                        size={18}
                                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground group-hover:text-primary transition-colors"
                                                    />
                                                    <Input
                                                        type={
                                                            showPassword
                                                                ? "text"
                                                                : "password"
                                                        }
                                                        className="pl-10 pr-10 h-12 rounded-lg transition-all duration-200"
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
                                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors focus:outline-none"
                                                    >
                                                        {showPassword ? (
                                                            <EyeOff size={18} />
                                                        ) : (
                                                            <Eye size={18} />
                                                        )}
                                                    </button>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button
                                    type="submit"
                                    className="w-full h-12 text-base font-medium rounded-lg relative overflow-hidden group"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                            Entrando...
                                        </>
                                    ) : (
                                        <div className="flex items-center justify-center gap-2">
                                            Entrar
                                            <ArrowRight
                                                size={18}
                                                className="group-hover:translate-x-1 transition-transform"
                                            />
                                        </div>
                                    )}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4 pt-2 pb-6">
                        <div className="text-sm text-center text-muted-foreground">
                            Esqueceu sua senha?{" "}
                            <button
                                onClick={() => navigate("/recuperar-senha")}
                                className="text-primary hover:underline font-medium"
                            >
                                Recuperar acesso
                            </button>
                        </div>
                        <div className="text-sm text-center text-muted-foreground">
                            Ainda não tem uma conta?{" "}
                            <button
                                onClick={() => navigate("/signup")}
                                className="text-primary hover:underline font-medium"
                            >
                                Criar conta
                            </button>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default LoginForm;
