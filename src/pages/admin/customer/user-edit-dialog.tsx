import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { userEditSchema, UserEditFormData } from "@/schemas/user-schema";
import { User, DollarSign, Users, CreditCard, Settings } from "lucide-react";
import { UserData } from "@/types";

interface UserEditDialogProps {
    user: UserData | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (data: UserEditFormData) => void;
}

export function UserEditDialog({
    user,
    open,
    onOpenChange,
    onSave,
}: UserEditDialogProps) {
    const form = useForm<UserEditFormData>({
        resolver: zodResolver(userEditSchema),
        defaultValues: {
            name: "",
            realname: "",
            username: "",
            email: "",
            phone_code: "",
            phone: "",
            status: "active",
            ban_unban: "unban",
            is_afiliate: false,
            investor: 0,
            balance: 0,
            profit_balance: 0,
            blocked_balance: 0,
            total_commission: 0,
            gateway_method: "",
            pix_type: "",
            pix_key: "",
            gateway_number: "",
        },
    });

    // Atualizar o formulário quando o usuário mudar
    useEffect(() => {
        if (user) {
            form.reset({
                name: user.name || "",
                realname: user.realname || "",
                username: user.username || "",
                email: user.email || "",
                phone_code: user.phone_code || "",
                phone: user.phone || "",
                status: user.status || "active",
                ban_unban: user.ban_unban || "active",
                is_afiliate: user.is_afiliate || false,
                investor: user.investor || 0,
                balance: user.balance || 0,
                profit_balance: user.profit_balance || 0,
                blocked_balance: user.blocked_balance || 0,
                total_commission: user.total_commission || 0,
                gateway_method: user.gateway_method || "",
                pix_type: user.pix_type || "",
                pix_key: user.pix_key || "",
                gateway_number: user.gateway_number || "",
            });
        }
    }, [user, form]);

    const onSubmit = (data: UserEditFormData) => {
        onSave(data);
        onOpenChange(false);
    };

    if (!user) return null;

    const getStatusColor = (status: string) => {
        switch (status) {
            case "active":
                return "bg-green-500";
            case "pending":
                return "bg-yellow-500";
            case "suspended":
                return "bg-red-500";
            default:
                return "bg-gray-500";
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                            <AvatarImage src={user.profile_photo_url} />
                            <AvatarFallback>
                                {user.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")
                                    .toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <DialogTitle className="text-2xl">
                                {user.name}
                            </DialogTitle>
                            <DialogDescription className="flex items-center gap-2 mt-1">
                                <Badge variant="secondary">ID: {user.id}</Badge>
                                <span
                                    className={`w-2 h-2 rounded-full ${getStatusColor(
                                        user.status
                                    )}`}
                                />
                                {user.status}
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                        key={user.id} // Força re-render quando user muda
                    >
                        <Tabs defaultValue="personal" className="w-full">
                            <TabsList className="grid w-full grid-cols-4">
                                <TabsTrigger value="personal">
                                    <User className="w-4 h-4 mr-2" />
                                    Pessoal
                                </TabsTrigger>
                                <TabsTrigger value="financial">
                                    <DollarSign className="w-4 h-4 mr-2" />
                                    Financeiro
                                </TabsTrigger>
                                <TabsTrigger value="payment">
                                    <CreditCard className="w-4 h-4 mr-2" />
                                    Pagamento
                                </TabsTrigger>
                                <TabsTrigger value="referral">
                                    <Users className="w-4 h-4 mr-2" />
                                    Indicações
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="personal" className="space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <User className="w-5 h-5" />
                                            Informações Pessoais
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Nome</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="realname"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Nome Real
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="username"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Username
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            type="email"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <div className="grid grid-cols-3 gap-2">
                                            <FormField
                                                control={form.control}
                                                name="phone_code"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Código
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                {...field}
                                                                placeholder="+55"
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <div className="col-span-2">
                                                <FormField
                                                    control={form.control}
                                                    name="phone"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>
                                                                Telefone
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Settings className="w-5 h-5" />
                                            Configurações da Conta
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="status"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Status
                                                    </FormLabel>
                                                    <Select
                                                        onValueChange={
                                                            field.onChange
                                                        }
                                                        value={field.value}
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="active">
                                                                Ativo
                                                            </SelectItem>
                                                            <SelectItem value="inactive">
                                                                Inativo
                                                            </SelectItem>
                                                            <SelectItem value="pending">
                                                                Pendente
                                                            </SelectItem>
                                                            <SelectItem value="suspended">
                                                                Suspenso
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="ban_unban"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Status de Ban
                                                    </FormLabel>
                                                    <Select
                                                        onValueChange={
                                                            field.onChange
                                                        }
                                                        value={field.value}
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="active">
                                                                Ativo
                                                            </SelectItem>
                                                            <SelectItem value="banned">
                                                                Banido
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="investor"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Tipo de Investidor
                                                    </FormLabel>
                                                    <Select
                                                        onValueChange={(
                                                            value: string
                                                        ) =>
                                                            field.onChange(
                                                                parseInt(value)
                                                            )
                                                        }
                                                        value={field.value?.toString()}
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="0">
                                                                Não Investidor
                                                            </SelectItem>
                                                            <SelectItem value="1">
                                                                Investidor
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="is_afiliate"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                                    <div className="space-y-0.5">
                                                        <FormLabel>
                                                            Afiliado
                                                        </FormLabel>
                                                        <div className="text-sm text-muted-foreground">
                                                            Usuário pode indicar
                                                            outros
                                                        </div>
                                                    </div>
                                                    <FormControl>
                                                        <Switch
                                                            checked={
                                                                field.value
                                                            }
                                                            onCheckedChange={
                                                                field.onChange
                                                            }
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent
                                value="financial"
                                className="space-y-6"
                            >
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <DollarSign className="w-5 h-5" />
                                            Informações Financeiras
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="balance"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Saldo Principal
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            step="0.01"
                                                            {...field}
                                                            onChange={(e) =>
                                                                field.onChange(
                                                                    parseFloat(
                                                                        e.target
                                                                            .value
                                                                    ) || 0
                                                                )
                                                            }
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="profit_balance"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Saldo de Lucro
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            step="0.01"
                                                            {...field}
                                                            onChange={(e) =>
                                                                field.onChange(
                                                                    parseFloat(
                                                                        e.target
                                                                            .value
                                                                    ) || 0
                                                                )
                                                            }
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="blocked_balance"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Saldo Bloqueado
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            step="0.01"
                                                            {...field}
                                                            onChange={(e) =>
                                                                field.onChange(
                                                                    parseFloat(
                                                                        e.target
                                                                            .value
                                                                    ) || 0
                                                                )
                                                            }
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="total_commission"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Comissão Total
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            step="0.01"
                                                            {...field}
                                                            onChange={(e) =>
                                                                field.onChange(
                                                                    parseFloat(
                                                                        e.target
                                                                            .value
                                                                    ) || 0
                                                                )
                                                            }
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="payment" className="space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <CreditCard className="w-5 h-5" />
                                            Informações de Pagamento
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="gateway_method"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Método de Pagamento
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="pix_type"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Tipo de PIX
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="pix_key"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Chave PIX
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="gateway_number"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Número do Gateway
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="referral" className="space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Users className="w-5 h-5" />
                                            Rede de Indicações
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-primary">
                                                    {user.referral_data
                                                        ?.total_count || 0}
                                                </div>
                                                <div className="text-sm text-muted-foreground">
                                                    Total
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-green-600">
                                                    {user.referral_data
                                                        ?.active_count || 0}
                                                </div>
                                                <div className="text-sm text-muted-foreground">
                                                    Ativos
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-blue-600">
                                                    {user.referral_data
                                                        ?.investor_count || 0}
                                                </div>
                                                <div className="text-sm text-muted-foreground">
                                                    Investidores
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-purple-600">
                                                    {user.referral_data
                                                        ?.level1_count || 0}
                                                </div>
                                                <div className="text-sm text-muted-foreground">
                                                    Nível 1
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-orange-600">
                                                    {user.referral_data
                                                        .level2_count || 0}
                                                </div>
                                                <div className="text-sm text-muted-foreground">
                                                    Nível 2
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => onOpenChange(false)}
                            >
                                Cancelar
                            </Button>
                            <Button type="submit">Salvar Alterações</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
