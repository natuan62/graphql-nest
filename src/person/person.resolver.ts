import { Args, Mutation, Resolver, Query, ID } from '@nestjs/graphql';
import { Person } from './person.model';
import { PersonService } from './person.service';
import { CreatePersonInput, PersonFilters } from './person.types';

@Resolver(() => Person)
export class PersonResolver {
  constructor(private readonly personService: PersonService) {}

  @Mutation(() => Person)
  createPerson(@Args('payload') input: CreatePersonInput) {
    return this.personService.create(input);
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
}
