import type { MyContext } from './bot.js';
import { publicClient } from './client.js';
import { Api, type Bot, type RawApi } from 'grammy';

export type Actions = 'readBlockNumber' | 'getBalance' | 'getTransactionCount';
type ActionObject = {
  key: Actions;
  name: string;
  action: (ctx: MyContext) => void | Promise<void>;
};

export const ACTIONS: Record<Actions, ActionObject> = {
  readBlockNumber: {
    key: 'readBlockNumber',
    action: async (ctx: MyContext) => {
      const currentBlockNumber = await publicClient.getBlockNumber();
      await ctx.reply(`Current Block Number: ${currentBlockNumber}`);
    },
    name: 'Read Block Number',
  },
  getBalance: {
    key: 'getBalance',
    action: (ctx: MyContext) =>
      ctx.conversation.enter('getBalanceAddressConvo'),
    name: 'Get Balance',
  },
  getTransactionCount: {
    key: 'getTransactionCount',
    action: (ctx: MyContext) =>
      ctx.conversation.enter('getTransactionCountConvo'),
    name: 'Get Transaction Count',
  },
};

export const initActionsCallbackQueries = (
  bot: Bot<MyContext, Api<RawApi>>,
) => {
  Object.keys(ACTIONS).forEach((cKey) => {
    const command = ACTIONS[cKey as Actions];
    bot.callbackQuery(command.key, async (ctx) => {
      await ctx.answerCallbackQuery(`You clicked on ${command.name}`);
      await command.action(ctx);
    });
  });
};
