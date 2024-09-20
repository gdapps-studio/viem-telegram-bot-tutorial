import { Bot, session } from 'grammy';
import type { MyContext } from '../types/index.js';

export class SessionHandler {
  bot: Bot<MyContext>;

  constructor(bot: Bot<MyContext>) {
    this.bot = bot;
  }

  setupSession() {
    this.bot.use(session({ initial: this.initialSessionData() }));
  }

  private initialSessionData() {
    return () => ({});
  }
}
