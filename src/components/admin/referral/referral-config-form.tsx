import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { CreateReferralConfig } from "@/types/admin/referral";

const formSchema = z.object({
    level: z.coerce
        .number()
        .min(1, "Nível deve ser maior que 0")
        .max(10, "Nível não pode ser maior que 10"),
    bonus_percentage: z.coerce
        .number()
        .min(0.01, "Percentual deve ser maior que 0%")
        .max(100, "Percentual não pode ser maior que 100%"),
});

interface ReferralConfigFormProps {
    onSubmit: (data: CreateReferralConfig) => Promise<void>;
    existingLevels: number[];
}

export function ReferralConfigForm({
    onSubmit,
    existingLevels,
}: ReferralConfigFormProps) {
    const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            level: 1,
            bonus_percentage: 5,
        },
    });

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        if (existingLevels.includes(values.level)) {
            toast.error("Já existe uma configuração para este nível");
            return;
        }

        setIsSubmitting(true);
        try {
            await onSubmit(values);
            form.reset();
            setOpen(false);
            toast.success("Configuração criada com sucesso!");
        } catch (error) {
            toast.error("Erro ao criar configuração");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Nova Configuração
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Nova Configuração de Referral</DialogTitle>
                    <DialogDescription>
                        Adicione uma nova configuração de bônus por nível de
                        referral.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className="space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="level"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nível</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="1"
                                            {...field}
                                            min="1"
                                            max="10"
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Nível da hierarquia de referral (1-10)
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="bonus_percentage"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Percentual de Bônus (%)
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="5.0"
                                            step="0.01"
                                            {...field}
                                            min="0.01"
                                            max="100"
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Percentual de bônus para este nível
                                        (0.01% - 100%)
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-end space-x-2 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setOpen(false)}
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="gap-2"
                            >
                                {isSubmitting && (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                )}
                                Criar Configuração
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
