import {Bot, InlineKeyboard} from "grammy";
import env from "./env.js";
import {DESCRIPTION, ENDING_TEXT, TITLE} from "./constants.js";

const bot = new Bot(env.BOT_TOKEN);

// TODO maybe automate the process of adding a command and extended properties and based on the config code takes care of displaying the buttons, creating callback queries and implementing actions
// TODO maybe wrap a command in a class where all the logic leaves.

// TODO add third action here
const COMMANDS = {
    readBlockNumber: 'readBlockNumber',
    getTransactionCount: 'getTransactionCount',
}

// TODO finalise viem public calls
bot.callbackQuery(COMMANDS.readBlockNumber, async (ctx) => {
    await ctx.answerCallbackQuery("reading block number")
})

bot.callbackQuery(COMMANDS.getTransactionCount, async (ctx) => {
    await ctx.answerCallbackQuery("get transaction count")
    // TODO read user address using telegram bot
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
