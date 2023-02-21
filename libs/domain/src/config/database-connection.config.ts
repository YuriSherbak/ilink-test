import { ConnectionOptions } from 'typeorm';
import { baseConfig } from './database-base.config';
import { entities } from '../entities';

export const connectionConfig: ConnectionOptions = {
  ...baseConfig,
  entities,
};
