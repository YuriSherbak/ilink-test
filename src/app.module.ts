import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user';
import { CommunityModule } from './community';
import { TypeOrmModule } from '@nestjs/typeorm';
import { connectionConfig } from 'libs/domain';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot(connectionConfig),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      include: [UserModule, CommunityModule],
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      debug: true,
      playground: true,
    }),
    UserModule,
    CommunityModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
