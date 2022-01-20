import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { DynamooseModule } from 'nestjs-dynamoose';
import { PersonModule } from '../person/person.module';
// import { HobbyModule } from '../hobby/hobby.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    DynamooseModule.forRoot({
      local: 'http://localhost:8000',
      aws: { region: 'us-west-2' },
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
      debug: false,
      installSubscriptionHandlers: true,
    }),
    PersonModule,
    // HobbyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
