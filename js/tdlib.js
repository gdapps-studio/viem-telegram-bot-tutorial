const tdl = require('tdl');

// If libtdjson is not present in the system search paths, the path to the
// libtdjson shared library can be set manually, e.g.:
//   tdl.configure({ tdjson: '/usr/local/lib/libtdjson.dylib' })
// The library directory can be set separate from the library name,
// example to search for libtdjson in the directory of the current script:
//   tdl.configure({ libdir: __dirname })

// Instead of building TDLib yourself, the aforementioned prebuilt-tdlib can be
// used as follows:
//   const { getTdjson } = require('prebuilt-tdlib')
//   tdl.configure({ tdjson: getTdjson() })

const client = tdl.createClient({
  apiId: 2222, // Your api_id
  apiHash: '0123456789abcdef0123456789abcdef', // Your api_hash
});
// Passing apiId and apiHash is mandatory,
// these values can be obtained at https://my.telegram.org/

client.on('error', console.error);

// Aside of receiving responses to your requests, the server can push to you
// events called "updates" which can be received as follows:
client.on('update', (update) => {
  console.log('Received update:', update);
});

async function main() {
  // Log in to a Telegram account. By default, with no arguments, this function will
  // ask for phone number etc. in the console. Instead of logging in as a user,
  // it's also possible to log in as a bot using `client.loginAsBot('<TOKEN>')`.
  await client.login();

  // Invoke a TDLib method. The information regarding TDLib method list and
  // documentation is below this code block.
  const me = await client.invoke({ _: 'getMe' });
  console.log('My user:', me);

  // Invoke some other TDLib method.
  const chats = await client.invoke({
    _: 'getChats',
    chat_list: { _: 'chatListMain' },
    limit: 10,
  });
  console.log('A part of my chat list:', chats);

  // Close the instance so that TDLib exits gracefully and the JS runtime can
  // finish the process.
  await client.close();
}

main().catch(console.error);
