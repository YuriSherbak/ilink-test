import { ConnectionOptions } from 'typeorm';
import { baseConfig } from './database-base.config';
import { join } from 'path';

const migrationsConfig: ConnectionOptions = {
  ...baseConfig,
  entities: [join(process.cwd(), 'libs/domain/src/entities/*.entity.ts')],
  migrations: [`migrations/*ts`],
  cli: { migrationsDir: `migrations` },
};

export = migrationsConfig;
