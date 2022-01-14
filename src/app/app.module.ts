import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

import { PersonModule } from '../person/person.module';
import { HobbyModule } from '../hobby/hobby.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://nestjs.xxxxx.mongodb.net', {
      user: 'admin',
      pass: 'admin123',
      dbName: 'my-database',
      w: 'majority',
      retryWrites: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
      debug: false,
      installSubscriptionHandlers: true,
    }),
    PersonModule,
    HobbyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
