import { ConnectionOptions } from 'typeorm';

export const baseConfig: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'yuri',
  password: '88005553535',
  database: 'ilink-test-db',
  synchronize: false,
};
