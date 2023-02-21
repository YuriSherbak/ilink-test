import { Module } from '@nestjs/common';
import { DomainModule } from 'libs/domain';
import { CommunityModule } from '../community';
import { UserController } from './user.controller';

@Module({
  imports: [DomainModule, CommunityModule],
  controllers: [UserController],
  providers: [],
})
export class UserModule {}
