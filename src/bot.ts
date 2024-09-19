import { Bot, type Context } from 'grammy';
import env from './env.js';
import { initActionsCallbackQueries } from './actions.js';
import { WELCOME_HTML_TEXT } from './constants.js';
import { type ConversationFlavor } from '@grammyjs/conversations';
import { conversationSetup, createCommandButtons } from './conversations.js';

const bot = new Bot<MyContext>(env.BOT_TOKEN);
export type MyContext = Context & ConversationFlavor;

export const launchBot = async () => {
  conversationSetup(bot);

  initActionsCallbackQueries(bot);

  bot.command('start', async (ctx) => {
    await ctx.reply(WELCOME_HTML_TEXT, {
      parse_mode: 'HTML',
      reply_markup: createCommandButtons(),
    });
  });

  void bot.start();
};
