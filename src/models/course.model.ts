import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Enroll} from './enroll.model';
import {Faculty} from './faculty.model';
import {Area} from './area.model';
import {Section} from './section.model';

@model()
export class Course extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  code: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'number',
    default: 1,
  })
  duration?: string;

  @property({
    type: 'string',
    required: true,
  })
  professor: string;

  @property({
    type: 'number',
    default: 0,
  })
  rate?: number;

  @property({
    type: 'string',
    required: true,
  })
  image: string;

  @hasMany(() => Enroll)
  enrolls: Enroll[];

  @belongsTo(() => Faculty)
  facultyId: string;

  @belongsTo(() => Area)
  areaId: string;

  @hasMany(() => Section)
  sections: Section[];

  constructor(data?: Partial<Course>) {
    super(data);
  }
}

export interface CourseRelations {
  // describe navigational properties here
}

export type CourseWithRelations = Course & CourseRelations;
