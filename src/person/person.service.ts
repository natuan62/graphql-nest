import { Injectable } from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { Person, PersonKey } from './person.model';
import {
  CreatePersonInput,
  PersonFilters,
  UpdatePersonInput,
} from './person.types';
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

  findById(id: PersonKey) {
    return this.personModel.get(id);
  }

  personByName(name: string) {
    const filters = {
      name: {
        eq: name,
      },
    };
    return this.personModel.scan(filters).exec();
  }

  personByFilters(filters?: PersonFilters) {
    return this.personModel.scan({ ...filters.where }).exec();
  }

  update(key: PersonKey, input: UpdatePersonInput) {
    return this.personModel.update(key, input);
  }

  async delete(key: PersonKey) {
    return this.personModel.get(key);
  }
}
