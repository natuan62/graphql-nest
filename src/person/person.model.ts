import { Field, ID, ObjectType } from '@nestjs/graphql';
import { CreatePersonInput } from './person.types';

export type PersonKey = {
  id: string;
};

@ObjectType({ implements: CreatePersonInput })
export class Person extends CreatePersonInput {
  @Field(/* istanbul ignore next */ () => ID)
  id: string;

  @Field(/* istanbul ignore next */ () => String)
  name: string;
}
