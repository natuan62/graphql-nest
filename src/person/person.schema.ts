import { Schema } from 'dynamoose';

export const PersonSchema = new Schema(
  {
    id: {
      type: String,
      hashKey: true,
    },
    name: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);
