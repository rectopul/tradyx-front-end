// CheckinCard.tsx
import {
    Award,
    CheckCircle2,
    AlertCircle,
    Plane,
    MessageCircle,
    Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState } from "react";
import { formatCurrency } from "@/utils/formatters";
import { useUser } from "@/contexts/UserProvider";

interface CheckinData {
    checkin_reward: number;
    potential_reward: number;
    has_checked_in_today: boolean;
    last_checkin: {
        checkin_date: string;
        created_at: string;
        updated_at: string;
        status: string;
        reward_amount: number;
    };
    consecutive_days: number;
    current_month_checkins: string[];
}

interface CheckinCardProps {
    checkinData: CheckinData;
    processCheckin: () => void;
}

export const CheckinCard = ({
    checkinData,
    processCheckin,
}: CheckinCardProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const { settings } = useUser();

    console.log("Data recebido no checkin: ", checkinData);

    const handleCheckin = async () => {
        setIsLoading(true);
        try {
            await processCheckin();
        } catch (error) {
            console.error("Erro ao realizar check-in:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Calcula percentual do mês
    const daysInMonth = new Date(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        0
    ).getDate();
    const checkinPercentage =
        (checkinData.current_month_checkins.length / daysInMonth) * 100;

    const shareOnWhatsApp = () => {
        window.open(settings?.whatsapp_link, "_blank");
    };

    const shareOnTelegram = () => {
        window.open(settings?.telegram_link, "_blank");
    };

    return (
        <Card className="overflow-hidden border-none shadow-lg">
            <CardHeader className="bg-blue-500 text-white py-4">
                <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center gap-2 font-medium">
                        <Plane className="h-5 w-5" />
                        Check-in Diário
                    </CardTitle>
                    <span className="text-sm font-medium bg-white text-blue-500 px-3 py-1 rounded-full shadow-sm">
                        {checkinData.consecutive_days} dias consecutivos
                    </span>
                </div>
            </CardHeader>
            <CardContent className="pt-6 bg-white">
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-500">
                                Status de Hoje
                            </p>
                            <div className="flex items-center gap-2">
                                {checkinData.has_checked_in_today ? (
                                    <>
                                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                                        <span className="font-medium">
                                            Check-in realizado
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <AlertCircle className="h-5 w-5 text-blue-500" />
                                        <span className="font-medium">
                                            Pendente
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-medium text-gray-500">
                                Recompensa
                            </p>
                            <p className="text-lg font-bold text-blue-500">
                                {formatCurrency(checkinData.checkin_reward)}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">
                                Progresso Mensal
                            </span>
                            <span className="font-medium">
                                {checkinData.current_month_checkins.length} de{" "}
                                {daysInMonth} dias
                            </span>
                        </div>
                        <Progress
                            value={checkinPercentage}
                            className="h-2 bg-gray-200"
                            style={
                                {
                                    "--tw-progress-bar-color": "rgb(220 38 38)",
                                } as React.CSSProperties
                            }
                        />
                    </div>

                    {checkinData.last_checkin && (
                        <div className="text-sm text-gray-500">
                            Último check-in:{" "}
                            {formatDistanceToNow(
                                new Date(checkinData.last_checkin.checkin_date),
                                {
                                    addSuffix: true,
                                    locale: ptBR,
                                }
                            )}
                        </div>
                    )}

                    <div className="flex items-center gap-3 bg-red-50 p-4 rounded-lg border-l-4 border-blue-500">
                        <Award className="h-5 w-5 text-blue-500 flex-shrink-0" />
                        <p className="text-sm">
                            Potencial de ganhos mensais:{" "}
                            <span className="font-bold text-blue-500">
                                {formatCurrency(checkinData.potential_reward)}
                            </span>
                        </p>
                    </div>

                    {checkinData.has_checked_in_today && (
                        <div className="space-y-3">
                            <p className="text-sm font-medium text-gray-700">
                                Compartilhar conquista:
                            </p>
                            <div className="flex gap-3">
                                <Button
                                    className="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium"
                                    onClick={shareOnWhatsApp}
                                >
                                    <MessageCircle className="h-4 w-4 mr-2" />
                                    WhatsApp
                                </Button>
                                <Button
                                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium"
                                    onClick={shareOnTelegram}
                                >
                                    <Send className="h-4 w-4 mr-2" />
                                    Telegram
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
            <CardFooter className="bg-gray-50 pt-6 pb-4">
                <Button
                    className={`w-full font-medium !bg-blue-500`}
                    onClick={handleCheckin}
                    disabled={checkinData.has_checked_in_today || isLoading}
                >
                    {isLoading
                        ? "Processando..."
                        : checkinData.has_checked_in_today
                        ? "Você já fez check-in hoje"
                        : "Fazer Check-in"}
                </Button>
            </CardFooter>
        </Card>
    );
};
