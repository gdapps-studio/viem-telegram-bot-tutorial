import { Bot } from "grammy";
import env from "./env.js";

const bot = new Bot(env.BOT_TOKEN);


const COMMANDS = {
    readBlockNumber: 'readBlockNumber',
    getTransactionCount: 'getTransactionCount',


}

bot.command(COMMANDS.readBlockNumber, async (c) => {
   await c.reply("readBlockNumber")
})

bot.command(COMMANDS.readBlockNumber, async (c) => {
    await c.reply("readBlockNumber")
})

bot.command(COMMANDS.readBlockNumber, async (c) => {
    await c.reply("readBlockNumber")
})

bot.on("message", (ctx) => ctx.reply("Hi there!"));

bot.start();
