// lib/socket.js
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { io, Socket } from 'socket.io-client';
import { GetToken, GetTokenRND } from './global';

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

export const initSocket = () => {
  if (!socket) {
    socket = io('http://172.24.52.65:4747/',
      {
        timeout:50000,
        reconnection:true,
        reconnectionAttempts:5,
        reconnectionDelay:1000,
        reconnectionDelayMax:5000,
        randomizationFactor:0.5,
        extraHeaders:{
          'token':GetTokenRND(),
          'X-Verification':'IDMConsoleV2'
        }
      }
    ); // your socket server URL
  }
};

export const getSocket = () => {
  if (!socket) {
    initSocket();
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};