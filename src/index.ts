import {Bot, InlineKeyboard} from "grammy";
import env from "./env.js";
import {DESCRIPTION, ENDING_TEXT, TITLE} from "./constants.js";

const bot = new Bot(env.BOT_TOKEN);

const COMMANDS = {
    readBlockNumber: 'readBlockNumber',
    getTransactionCount: 'getTransactionCount',
}

bot.callbackQuery(COMMANDS.readBlockNumber, async (ctx) => {
    await ctx.answerCallbackQuery("reading block number")
})

bot.callbackQuery(COMMANDS.getTransactionCount, async (ctx) => {
    await ctx.answerCallbackQuery("get transaction count")
})

bot.command('start', async (ctx) => {
    const keyboard = new InlineKeyboard()
    Object.values(COMMANDS).forEach((keyboardElement) => {
        keyboard.row().text(keyboardElement, keyboardElement)
    })

    await ctx.reply(`
    <b>${TITLE}</b>
    
    ${DESCRIPTION}
    
    <b>${ENDING_TEXT}</b>
    `, {
        parse_mode: "HTML", reply_markup: keyboard
    });

})

bot.start();
