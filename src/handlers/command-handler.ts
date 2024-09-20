import type { MyContext } from '../types/index.js';
import { type Bot, InlineKeyboard } from 'grammy';
import { WELCOME_HTML_TEXT } from '../constants.js';
import {
  actionKeys,
  type Actions,
  ACTIONS,
  getBlockNumberAction,
} from '../actions/constants.js';

export class CommandHandler {
  bot: Bot<MyContext>;

  constructor(bot: Bot<MyContext>) {
    this.bot = bot;
  }

  setupCommands() {
    this.bot.command('start', (ctx) =>
      ctx.reply(WELCOME_HTML_TEXT, {
        parse_mode: 'HTML',
        reply_markup: this.createCommandButtons(),
      }),
    );
    this.bot.command('readBlockNumber', getBlockNumberAction);

    this.bot.command('getBalance', (ctx) =>
      ctx.conversation.enter('getBalanceAddressConvo'),
    );
    this.bot.command('getTransactionCount', (ctx) =>
      ctx.conversation.enter('getTransactionCountConvo'),
    );
  }

  private createCommandButtons() {
    const keyboard = new InlineKeyboard();
    actionKeys.forEach((cKey) => this.addActionToKeyboard(cKey, keyboard));
    return keyboard;
  }

  private addActionToKeyboard(cKey: string, keyboard: InlineKeyboard) {
    const currentAction = ACTIONS[cKey as Actions];
    keyboard.row().text(currentAction.name, cKey);
  }
}
