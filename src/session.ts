import { session } from 'grammy';

const initialSessionData = () => ({});

export const sessionMiddleware = session({ initial: initialSessionData });
