import { Module } from '@nestjs/common';
import { DomainModule } from 'libs/domain';
import { CommunityController } from './community.controller';
import { CommunityService } from './community.service';

@Module({
  imports: [DomainModule],
  controllers: [CommunityController],
  providers: [CommunityService],
})
export class CommunityModule {}
