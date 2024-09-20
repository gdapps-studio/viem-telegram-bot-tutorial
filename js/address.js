import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts';
const randomPr = generatePrivateKey();
const account = privateKeyToAccount(randomPr);
console.log(`private key: ${randomPr}`);
console.log(`address ${account.address}`);
