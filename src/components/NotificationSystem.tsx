// src/components/NotificationSystem.tsx
import { useEffect } from "react";
import {
    subscribeToChannel,
    listenToEvent,
    unsubscribeFromChannel,
} from "@/services/pusher";
import { toast } from "sonner";
import { useUser } from "@/contexts/UserProvider";
import { UserData } from "@/types";
import { CircleDollarSign } from "lucide-react";

export interface Notification {
    id: string;
    message: string;
    user_id: number;
    user: UserData;
    type: "info" | "success" | "warning" | "error";
    timestamp: number;
}

const NotificationSystem = () => {
    const { user, updateUser } = useUser();

    useEffect(() => {
        // Verifique se o usuário está autenticado
        if (!user || !user.id) return;

        // Canal específico para o usuário atual
        const channelName = `chanel-user-${user.id}`;

        console.log("channel", channelName);

        // Inscreva-se no canal
        const channel = subscribeToChannel(channelName);

        // Ouça o evento de nova notificação
        listenToEvent(channel, "paid", (data: Notification) => {
            console.info("Evento recebido", data);
            console.info(
                "Condição satisfeita?",
                user && user.id === data.user.id
            );
            if (user && user.id === data.user.id) {
                if (data.type === "info") {
                    toast.info(data.message, {
                        action: {
                            label: "Fechar",
                            onClick: console.log,
                        },
                        duration: 5000,
                        icon: <CircleDollarSign size={18} />,
                        position: "top-right",
                    });
                } else {
                    toast.warning(data.message, {
                        action: {
                            label: "Fechar",
                            onClick: console.log,
                        },
                    });
                }

                if (data.user && data.user.balance) {
                    updateUser({
                        ...user,
                        balance: data.user.balance,
                    });
                }
            }
        });

        // Limpeza quando o componente for desmontado
        return () => {
            unsubscribeFromChannel(channelName);
        };
    }, [user, updateUser]); // Adicione as dependências do useEffect

    return <></>;
};

export default NotificationSystem;
