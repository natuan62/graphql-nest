import { Args, Mutation, Resolver, Query, ID } from '@nestjs/graphql';
import { Person } from './person.model';
import { PersonService } from './person.service';
import { CreatePersonInput } from './person.types';

@Resolver(() => Person)
export class PersonResolver {
  constructor(private readonly personService: PersonService) {}

  @Mutation(/* istanbul ignore next */ () => Person)
  createPerson(@Args('payload') input: CreatePersonInput) {
    return this.personService.create(input);
  }

  @Query(/* istanbul ignore next */ () => Person)
  personById(
    @Args('id', { type: /* istanbul ignore next */ () => ID }) id: string,
  ) {
    return { id };
  }
}
