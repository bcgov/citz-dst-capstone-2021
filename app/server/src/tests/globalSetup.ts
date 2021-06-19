import dotenv from 'dotenv';
import * as Console from 'console';

export default () => {
  const config = dotenv.config();
  Console.log('\njest global setup - applied env variables');
  Console.log(config.parsed);
};
