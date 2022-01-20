import { Module } from '@nestjs/common';
import { DynamooseModule } from 'nestjs-dynamoose';
import { PersonResolver } from './person.resolver';
import { PersonSchema } from './person.schema';
import { PersonService } from './person.service';
@Module({
  imports: [
    DynamooseModule.forFeature([
      {
        name: 'person',
        schema: PersonSchema,
      },
    ]),
  ],
  providers: [PersonResolver, PersonService],
})
export class PersonModule {}
