import { Schema as MongooseSchema } from 'mongoose';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import GraphQLJSON, { GraphQLJSONObject } from 'graphql-type-json';

@InputType()
export class CreateHobbyInput {
  @Field(() => String, { nullable: true })
  name?: string;
}

@InputType()
export class ListHobbyInput {
  @Field(() => String, { nullable: true })
  _id?: MongooseSchema.Types.ObjectId;

  @Field(() => String, { nullable: true })
  name?: string;
}

@InputType()
export class UpdateHobbyInput {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String, { nullable: true })
  name?: string;
}

@InputType()
export class HobbyFilters {
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
