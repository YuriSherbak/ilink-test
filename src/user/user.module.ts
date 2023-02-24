import { Module } from '@nestjs/common';
import { DomainModule } from 'libs/domain';
import { CommunityModule } from '../community';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [DomainModule, CommunityModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
