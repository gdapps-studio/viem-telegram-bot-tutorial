import { Bot } from 'grammy';
import env from './env.js';
import { ActionHandler } from './handlers/actoin-handler.js';
import { ConversationHandler } from './handlers/conversation-handler.js';
import { SessionHandler } from './handlers/session-handler.js';
import type { MyContext } from './types/index.js';
import { CommandHandler } from './handlers/command-handler.js';

export class ViemTelegramBot {
  bot: Bot<MyContext>;

  // Handlers
  conversationHandler: ConversationHandler;
  actionHandler: ActionHandler;
  sessionHandler: SessionHandler;
  commandHandler: CommandHandler;

  constructor() {
    this.bot = new Bot<MyContext>(env.BOT_TOKEN);
    this.conversationHandler = new ConversationHandler(this.bot);
    this.actionHandler = new ActionHandler(this.bot);
    this.sessionHandler = new SessionHandler(this.bot);
    this.commandHandler = new CommandHandler(this.bot);
  }

  init() {
    this.sessionHandler.setupSession();
    this.conversationHandler.setupConversations();
    this.actionHandler.setupCallbackQueries();
    this.commandHandler.setupCommands();
  }

  start() {
    void this.bot.start();
  }
}
