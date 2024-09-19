import { Api, type Bot, type RawApi } from 'grammy';
import type { MyContext } from '../bot.js';
import {
  actionKeys,
  type ActionObject,
  type Actions,
  ACTIONS,
} from './constants.js';

const handleCallBack = async (ctx: MyContext, action: ActionObject) => {
  await ctx.answerCallbackQuery(`You clicked on ${action.name}`);
  await action.action(ctx);
};

export const initActionsCallbackQueries = (
  bot: Bot<MyContext, Api<RawApi>>,
) => {
  actionKeys.forEach((cKey) => {
    const action = ACTIONS[cKey as Actions];
    bot.callbackQuery(cKey, (ctx) => handleCallBack(ctx, action));
  });
};
