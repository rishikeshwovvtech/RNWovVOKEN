import {io} from 'socket.io-client';
import {WOVVMAPS_API_BASE_URL} from './Constants';

export const socket = io(WOVVMAPS_API_BASE_URL);
