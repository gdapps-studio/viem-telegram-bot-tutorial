import { Bot } from 'grammy';
import {
  actionKeys,
  type ActionObject,
  type Actions,
  ACTIONS,
} from '../actions/constants.js';
import type { MyContext } from '../types/index.js';

export class ActionHandler {
  bot: Bot<MyContext>;

  constructor(bot: Bot<MyContext>) {
    this.bot = bot;
  }

  private async handleCallBack(ctx: MyContext, action: ActionObject) {
    await ctx.answerCallbackQuery(`You clicked on ${action.name}`);
    await action.action(ctx);
  }

  setupCallbackQueries() {
    actionKeys.forEach((cKey) => {
      const action = ACTIONS[cKey as Actions];
      this.bot.callbackQuery(cKey, (ctx) => this.handleCallBack(ctx, action));
    });
  }
}
