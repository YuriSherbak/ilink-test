import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user';
import { CommunityModule } from './community';
import { TypeOrmModule } from '@nestjs/typeorm';
import { connectionConfig } from 'libs/domain';

@Module({
  imports: [
    TypeOrmModule.forRoot(connectionConfig),
    UserModule,
    CommunityModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
