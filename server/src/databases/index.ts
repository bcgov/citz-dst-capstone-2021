import config from 'config';
import { dbConfig } from '@interfaces/db.interface';

const { host, port, database }: dbConfig = config.get('dbConfig');

const dbName = process.env.MONGODB_DB_MAIN || database;
const uri = process.env.MONGODB_URI || `mongodb://${host}:${port}`;

export const dbConnection = {
  url: `${uri}/${dbName}`,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
};
