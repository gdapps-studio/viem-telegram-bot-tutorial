import { config } from 'dotenv';
config();

const url = `https://api.telegram.org/${process.env.BOT_TOKEN}`;

void (async function () {
  const rsult = await fetch(`${url}/setMyCommands`, {
    method: 'POST',
    body: JSON.stringify([
      {
        command: 'test',
        description: 'this is a test command and gio is the goat',
      },
    ]),
  });
  const jsonResult = await rsult.json();
  console.log(jsonResult);
  const commands = await (await fetch(`${url}/getMyCommands`)).json();
  console.log('commands', commands);
})();
