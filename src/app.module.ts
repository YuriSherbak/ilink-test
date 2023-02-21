import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user';
import { CommunityModule } from './community';

@Module({
  imports: [UserModule, CommunityModule],
  controllers: [AppController],
})
export class AppModule {}
