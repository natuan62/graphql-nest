import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { PubSub } from 'graphql-subscriptions';
import { Hobby } from './hobby.model';
import { HobbyService } from './hobby.service';
import {
  CreateHobbyInput,
  ListHobbyInput,
  UpdateHobbyInput,
  HobbyFilters,
} from './hobby.types';

@Resolver(() => Hobby)
export class HobbyResolver {
  private pubSub: PubSub;

  constructor(private hobbyService: HobbyService) {
    this.pubSub = new PubSub();
  }

  @Query(() => Hobby)
  async hobby(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ) {
    return this.hobbyService.getById(_id);
  }

  @Query(() => [Hobby])
  async hobbies(@Args('filters', { nullable: true }) filters?: ListHobbyInput) {
    return this.hobbyService.list(filters);
  }

  @Query(() => [Hobby])
  async hobbiesWithFilters(
    @Args('filters', { nullable: true }) filters?: HobbyFilters,
  ) {
    return this.hobbyService.listFilters(filters);
  }

  @Mutation(() => Hobby)
  async createHobby(@Args('payload') payload: CreateHobbyInput) {
    const hobby = await this.hobbyService.create(payload);
    this.pubSub.publish('hobbyCreated', { hobbyCreated: hobby });
    return hobby;
  }

  @Mutation(() => Hobby)
  async updateHobby(@Args('payload') payload: UpdateHobbyInput) {
    const hobby = await this.hobbyService.update(payload);
    return hobby;
  }

  @Mutation(() => Hobby)
  async deleteHobby(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ) {
    return this.hobbyService.delete(_id);
  }

  @Subscription(() => Hobby, {
    filter: (payload, variables) => {
      return payload.hobbyCreated.name === variables.name;
    },
  })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  hobbyCreated(@Args('name') name: string) {
    return this.pubSub.asyncIterator('hobbyCreated');
  }
}
