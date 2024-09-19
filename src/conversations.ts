import { type Address, formatEther, isAddress } from 'viem';
import { publicClient } from './client.js';
import type { MyContext } from './bot.js';
import {
  type Conversation,
  conversations,
  createConversation,
} from '@grammyjs/conversations';
import { Api, type Bot, InlineKeyboard, type RawApi } from 'grammy';
import { actionKeys, ACTIONS, type Actions } from './actions/constants.js';

type MyConversation = Conversation<MyContext>;

async function checkForAddressValidity(
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

export const getBalanceAddressConvo = (
  conversation: MyConversation,
  ctx: MyContext,
) =>
  checkForAddressValidity(conversation, ctx, async (address) => {
    const balance = await publicClient.getBalance({
      address,
    });
    const balanceInNumber = +formatEther(balance);
    await ctx.reply(
      `Balance: ${balanceInNumber === 0 ? balanceInNumber : balanceInNumber.toFixed(5)} ETH`,
    );
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
  bot.use(conversations());
  bot.use(createConversation(getBalanceAddressConvo));
  bot.use(createConversation(getTransactionCountConvo));
};

export const addActionToKeyboard = (cKey: string, keyboard: InlineKeyboard) => {
  const currentAction = ACTIONS[cKey as Actions];
  keyboard.row().text(currentAction.name, cKey);
};

export const createCommandButtons = () => {
  const keyboard = new InlineKeyboard();
  actionKeys.forEach((cKey) => addActionToKeyboard(cKey, keyboard));
  return keyboard;
};
