import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { Document, Schema as MongooseSchema } from 'mongoose';

@ObjectType()
@Schema()
export class Hobby {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String, { nullable: true })
  @Prop()
  name?: string;
}

export type HobbyDocument = Hobby & Document;

export const HobbySchema = SchemaFactory.createForClass(Hobby);

// import { Schema } from 'dynamoose';

// export const HobbySchema = new Schema(
//   {
//     id: {
//       type: String,
//       hashKey: true,
//     },
//     name: {
//       type: String,
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//   },
// );
