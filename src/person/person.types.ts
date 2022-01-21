import { Field, InputType, InterfaceType } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-type-json';
@InputType()
@InterfaceType('BasePerson')
export class CreatePersonInput {
  @Field()
  name: string;
}

@InputType()
export class PersonFilters {
  @Field(() => Number, { nullable: true })
  skip?: number;

  @Field(() => Number, { nullable: true })
  limit?: number;

  @Field(() => GraphQLJSONObject, { nullable: true })
  fields?: string[];

  @Field(() => GraphQLJSONObject, { nullable: true })
  sort?: object;

  @Field(() => GraphQLJSONObject, { nullable: true })
  where?: object;
}

@InputType()
export class UpdatePersonInput {
  @Field(() => String, { nullable: true })
  name?: string;
}
