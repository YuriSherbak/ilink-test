import { Module } from '@nestjs/common';
import { DomainModule } from 'libs/domain';
import { CommunityModule } from '../community';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';

@Module({
  imports: [DomainModule, CommunityModule],
  controllers: [UserController],
  providers: [UserService, UserResolver],
})
export class UserModule {}
