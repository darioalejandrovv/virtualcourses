import {DefaultCrudRepository} from '@loopback/repository';
import {Faculty, FacultyRelations} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class FacultyRepository extends DefaultCrudRepository<
  Faculty,
  typeof Faculty.prototype.id,
  FacultyRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Faculty, dataSource);
  }
}
