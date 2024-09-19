import type { MyContext } from '../bot.js';
import { publicClient } from '../client.js';
export type Actions = 'readBlockNumber' | 'getBalance' | 'getTransactionCount';

export type ActionObject = {
  name: string;
  action: (ctx: MyContext) => void | Promise<void>;
};

export const ACTIONS: Record<Actions, ActionObject> = {
  readBlockNumber: {
    action: async (ctx: MyContext) => {
      const currentBlockNumber = await publicClient.getBlockNumber();
      await ctx.reply(`Current Block Number: ${currentBlockNumber}`);
    },
    name: 'Read Block Number',
  },
  getBalance: {
    action: (ctx: MyContext) =>
      ctx.conversation.enter('getBalanceAddressConvo'),
    name: 'Get Balance',
  },
  getTransactionCount: {
    action: (ctx: MyContext) =>
      ctx.conversation.enter('getTransactionCountConvo'),
    name: 'Get Transaction Count',
  },
};
export const actionKeys = Object.keys(ACTIONS);
