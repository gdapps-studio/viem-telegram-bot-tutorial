import { Bot } from 'grammy';
import { type Address, formatEther, isAddress } from 'viem';
import { publicClient } from '../client.js';
import { conversations, createConversation } from '@grammyjs/conversations';
import type { MyContext, MyConversation } from '../types/index.js';

export class ConversationHandler {
  bot: Bot<MyContext>;
  constructor(bot: Bot<MyContext>) {
    this.bot = bot;
  }

  private async checkForAddressValidity(
    conversation: MyConversation,
    ctx: MyContext,
    onValidAddress?: (address: Address) => void,
  ) {
    await ctx.reply('What is your eth address');
    const { message } = await conversation.wait();

    if (message?.text === undefined || !isAddress(message?.text))
      await ctx.reply(
        `Invalid address: ${message?.text || '<empty text>'}. Please try again`,
      );
    else onValidAddress?.(message.text);
  }

  private getBalanceAddressConvo = (
    conversation: MyConversation,
    ctx: MyContext,
  ) =>
    this.checkForAddressValidity(conversation, ctx, async (address) => {
      const balance = await publicClient.getBalance({
        address,
      });
      const balanceInNumber = +formatEther(balance);
      await ctx.reply(
        `Balance: ${balanceInNumber === 0 ? balanceInNumber : balanceInNumber.toFixed(5)} ETH`,
      );
    });

  private getTransactionCountConvo = (
    conversation: MyConversation,
    ctx: MyContext,
  ) =>
    this.checkForAddressValidity(conversation, ctx, async (address) => {
      const transactionCount = await publicClient.getTransactionCount({
        address,
      });
      await ctx.reply(`Transaction Count: ${transactionCount}`);
    });

  setupConversations() {
    this.bot.use(conversations());
    this.bot.use(createConversation(this.getBalanceAddressConvo));
    this.bot.use(createConversation(this.getTransactionCountConvo));
  }
}
