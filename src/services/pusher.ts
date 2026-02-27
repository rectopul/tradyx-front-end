// src/services/pusher.ts
import Pusher, { Channel } from "pusher-js";

// Substitua estes valores pelos seus dados do Pusher
const APP_KEY = import.meta.env.VITE_PUSHER_APP_KEY;
const APP_CLUSTER = import.meta.env.VITE_PUSHER_APP_CLUSTER;

// Inicialize o Pusher
export const pusherClient = new Pusher(APP_KEY, {
    cluster: APP_CLUSTER,
    // authEndpoint: import.meta.env.VITE_API_URL
});

// Função para se inscrever em um canal
export const subscribeToChannel = (channelName: string) => {
    return pusherClient.subscribe(channelName);
};

// Função para ouvir eventos em um canal
export const listenToEvent = (
    channel: Channel,
    eventName: string,
    callback: (data: any) => void
) => {
    channel.bind(eventName, callback);
};

// Função para cancelar a inscrição em um canal
export const unsubscribeFromChannel = (channelName: string) => {
    pusherClient.unsubscribe(channelName);
};
