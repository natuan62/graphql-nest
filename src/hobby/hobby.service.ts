import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { Hobby, HobbyDocument } from './hobby.model';
import {
  CreateHobbyInput,
  ListHobbyInput,
  UpdateHobbyInput,
} from './hobby.types';
import rawQueryToMongoose from '../utils/raw-query-to-mongoose';
@Injectable()
export class HobbyService {
  constructor(
    @InjectModel(Hobby.name) private hobbyModel: Model<HobbyDocument>,
  ) {}

  create(payload: CreateHobbyInput) {
    const createdHobby = new this.hobbyModel(payload);
    return createdHobby.save();
  }

  getById(_id: MongooseSchema.Types.ObjectId) {
    return this.hobbyModel.findById(_id).exec();
  }

  list(filters: ListHobbyInput) {
    return this.hobbyModel.find({ ...filters }).exec();
  }

  async listFilters(rawFilters: any) {
    // query {
    //   hobbiesWithFilters(filters:{
    //     skip: 0
    //     limit: 3
    //     fields: {
    //       name: true
    //     }
    //     sort: {
    //       name: "asc"
    //     }
    //     where:{
    //       name:{
    //          in: ["a"]
    //       }
    //     }
    //   }) {
    //     _id
    //     name
    //   }
    // }
    const filters = rawQueryToMongoose(rawFilters);
    const query = { ...filters.where };
    const fields = filters.fields || null;
    const ops: { [key: string]: any } = {};
    if (filters.sort) {
      ops.sort = filters.sort;
    }
    if (filters.skip) {
      ops.skip = filters.skip;
    }
    if (filters.limit) {
      ops.limit = filters.limit;
    }
    console.log('query', query);
    console.log('fields', fields);
    console.log('ops', ops);
    try {
      const result = await this.hobbyModel.find(query, fields, ops);
      return result;
    } catch (error) {
      throw error;
    }
  }

  update(payload: UpdateHobbyInput) {
    return this.hobbyModel
      .findByIdAndUpdate(payload._id, payload, { new: true })
      .exec();
  }

  delete(_id: MongooseSchema.Types.ObjectId) {
    return this.hobbyModel.findByIdAndDelete(_id).exec();
  }
}
