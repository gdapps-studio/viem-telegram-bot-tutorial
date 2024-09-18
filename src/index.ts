import {Bot, Context, InlineKeyboard} from "grammy";
import env from "./env.js";
import {DESCRIPTION, ENDING_TEXT, TITLE} from "./constants.js";

const bot = new Bot(env.BOT_TOKEN);

type Actions = 'readBlockNumber' | 'getBalance' | 'getTransactionCount'
type ActionObject = {
    key: Actions,
    name: string,
    action: (ctx: Context) => (void | Promise<void>)
}

const COMMANDS: Record<Actions, ActionObject> = {
    readBlockNumber: {
        key: 'readBlockNumber', action:async  (ctx: Context) => {
            console.log('reading block number')
            await ctx.reply('Reading block number')
        },
        name: 'Read Block Number'
    },
    getBalance: {
        key: 'getBalance', action: (ctx: Context) => {
            console.log('getting balance')
        },
        name: 'Get Balance'
    },
    getTransactionCount: {
        key: 'getTransactionCount', action: (ctx: Context) => {
            console.log('transaction count')
        },
        name: 'Get Transaction Count'
    },
}


Object.keys(COMMANDS).forEach((cKey) => {
    const command = COMMANDS[cKey as Actions]
    bot.callbackQuery(command.key, async (ctx) => {
        await ctx.answerCallbackQuery(`You clicked on ${command.name}`)
        await command.action(ctx)
    })
})

bot.command('start', async (ctx) => {
    const keyboard = new InlineKeyboard()
    Object.values(COMMANDS).forEach((c) => {
        keyboard.row().text(c.name, c.key)
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
