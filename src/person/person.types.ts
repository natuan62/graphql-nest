import { Field, InputType, InterfaceType } from '@nestjs/graphql';

@InputType()
@InterfaceType('BasePerson')
export class CreatePersonInput {
  @Field()
  name: string;
}
