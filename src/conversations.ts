import { type Address, formatEther, isAddress } from 'viem';
import { publicClient } from './client.js';
import type { MyContext } from './bot.js';
import {
  type Conversation,
  conversations,
  createConversation,
} from '@grammyjs/conversations';
import { Api, type Bot, InlineKeyboard, type RawApi, session } from 'grammy';
import { ACTIONS } from './actions.js';

type MyConversation = Conversation<MyContext>;

const replyWithAskingAddress = (ctx: MyContext) =>
  ctx.reply('What is your eth addresss');

const replyWithInvalidAddressMessage = async (
  ctx: MyContext,
  address: string | undefined,
) => ctx.reply(`Invalid address: ${address}`);

async function checkForAddressValidity(
  conversation: MyConversation,
  ctx: MyContext,
  onValidAddress?: (address: Address) => void,
) {
  await replyWithAskingAddress(ctx);
  const { message } = await conversation.wait();

  if (message?.text === undefined || !isAddress(message?.text))
    await replyWithInvalidAddressMessage(ctx, message?.text);
  else onValidAddress?.(message.text);
}

export const getBalanceAddressConvo = (
  conversation: MyConversation,
  ctx: MyContext,
) =>
  checkForAddressValidity(conversation, ctx, async (address) => {
    const balance = await publicClient.getBalance({
      address,
    });
    await ctx.reply(`Balance: ${Number(formatEther(balance)).toFixed(5)} ETH`);
  });

export const getTransactionCountConvo = (
  conversation: MyConversation,
  ctx: MyContext,
) =>
  checkForAddressValidity(conversation, ctx, async (address) => {
    const transactionCount = await publicClient.getTransactionCount({
      address,
    });
    await ctx.reply(`Transaction Count: ${transactionCount}`);
  });

export const conversationSetup = (bot: Bot<MyContext, Api<RawApi>>) => {
  bot.use(session({ initial: () => ({}) }));
  bot.use(conversations());
  bot.use(createConversation(getBalanceAddressConvo));
  bot.use(createConversation(getTransactionCountConvo));
};

export const createCommandButtons = () => {
  const keyboard = new InlineKeyboard();
  Object.values(ACTIONS).forEach((c) => {
    keyboard.row().text(c.name, c.key);
  });
  return keyboard;
};
