import {
  Args,
  Mutation,
  Resolver,
  Query,
  ID,
  Subscription,
} from '@nestjs/graphql';
import { Person } from './person.model';
import { PersonService } from './person.service';
import {
  CreatePersonInput,
  PersonFilters,
  UpdatePersonInput,
} from './person.types';
import { GraphQLJSONObject } from 'graphql-type-json';
import { PubSub } from 'graphql-subscriptions';

@Resolver(() => Person)
export class PersonResolver {
  private pubSub: PubSub;
  constructor(private readonly personService: PersonService) {
    this.pubSub = new PubSub();
  }

  @Mutation(() => Person)
  async createPerson(@Args('payload') payload: CreatePersonInput) {
    const person = await this.personService.create(payload);
    this.pubSub.publish('personCreated', { personCreated: person });
    return person;
  }

  @Query(() => Person)
  personById(@Args('id', { type: () => ID }) id: string) {
    return this.personService.findById({ id });
  }

  @Query(() => [Person])
  personByName(@Args('name', { type: () => String }) name: string) {
    return this.personService.personByName(name);
  }

  @Query(() => [Person])
  personByFilters(
    @Args('filters', { nullable: true }) filters?: PersonFilters,
  ) {
    return this.personService.personByFilters(filters);
  }

  @Mutation(() => Person)
  personUpdate(
    @Args('id', { type: () => ID }) id: string,
    @Args('payload') payload: UpdatePersonInput,
  ) {
    return this.personService.update({ id }, payload);
  }

  @Mutation(() => GraphQLJSONObject)
  async personDelete(
    @Args('id', { nullable: true, type: () => ID }) id: string,
  ) {
    return this.personService.delete({ id });
  }

  @Subscription(() => Person, {
    filter: (payload, variables) => {
      return payload.personCreated.name === variables.name;
    },
  })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  personCreated(@Args('name') name: string) {
    return this.pubSub.asyncIterator('personCreated');
  }
}
