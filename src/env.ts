import { parseEnv } from 'znv';
import { z } from 'zod';
import { config } from 'dotenv';
config();

export default parseEnv(process.env, {
  BOT_TOKEN: z.string().min(1),
});
