import { Module } from '@nestjs/common';
import { UserModule } from '../user';
import { DomainModule } from 'libs/domain';
import { CommunityController } from './community.controller';

@Module({
  imports: [DomainModule, UserModule],
  controllers: [CommunityController],
  providers: [],
})
export class CommunityModule {}
