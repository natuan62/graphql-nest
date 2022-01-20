import { Injectable } from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { Person, PersonKey } from './person.model';
import { CreatePersonInput } from './person.types';
import * as uuid from 'uuid';
@Injectable()
export class PersonService {
  constructor(
    @InjectModel('person')
    private personModel: Model<Person, PersonKey>,
  ) {}

  create(payload: CreatePersonInput) {
    const createdPerson = this.personModel.create({
      ...payload,
      id: uuid.v4(),
    });
    return createdPerson;
  }
}
