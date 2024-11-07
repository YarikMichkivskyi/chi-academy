import { io, Socket } from 'socket.io-client';

const SOCKET_SERVER_URL = 'http://ec2-13-49-67-34.eu-north-1.compute.amazonaws.com/notifications';

let socket: Socket | null = null;

export const connectToSocket = () => {
    if (!socket) {
        socket = io(SOCKET_SERVER_URL);
    }
    return socket;
};

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};