import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param,


  patch, post,




  put,

  requestBody
} from '@loopback/rest';
import {ServicesKeys as keys} from '../keys/services-keys';
import {Student} from '../models';
import {StudentRepository, UserRepository} from '../repositories';
import {EncryptDecrypt} from '../services/encrypt-decrypt.services';


export class StudentController {
  constructor(
    @repository(StudentRepository)
    public studentRepository: StudentRepository,
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) { }

  @post('/student', {
    responses: {
      '200': {
        description: 'Student model instance',
        content: {'application/json': {schema: getModelSchemaRef(Student)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Student, {
            title: 'NewStudent',
            exclude: ['id'],
          }),
        },
      },
    })
    student: Omit<Student, 'id'>,
  ): Promise<Student> {
    let s = await this.studentRepository.create(student);
    let password1 = new EncryptDecrypt(keys.MD5).Encrypt(s.document);
    let password2 = new EncryptDecrypt(keys.MD5).Encrypt(password1);
    let u = {
      userName: s.document,
      password: password2,
      role: 1,
      studentId: s.id
    };

    let user = await this.userRepository.create(u);
    user.password = '';
    s.user = user;
    return s;
  }

  @get('/student/count', {
    responses: {
      '200': {
        description: 'Student model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Student) where?: Where<Student>,
  ): Promise<Count> {
    return this.studentRepository.count(where);
  }

  @get('/student', {
    responses: {
      '200': {
        description: 'Array of Student model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Student, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Student) filter?: Filter<Student>,
  ): Promise<Student[]> {
    return this.studentRepository.find(filter);
  }

  @patch('/student', {
    responses: {
      '200': {
        description: 'Student PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Student, {partial: true}),
        },
      },
    })
    student: Student,
    @param.where(Student) where?: Where<Student>,
  ): Promise<Count> {
    return this.studentRepository.updateAll(student, where);
  }

  @get('/student/{id}', {
    responses: {
      '200': {
        description: 'Student model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Student, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Student, {exclude: 'where'}) filter?: FilterExcludingWhere<Student>
  ): Promise<Student> {
    return this.studentRepository.findById(id, filter);
  }

  @patch('/student/{id}', {
    responses: {
      '204': {
        description: 'Student PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Student, {partial: true}),
        },
      },
    })
    student: Student,
  ): Promise<void> {
    await this.studentRepository.updateById(id, student);
  }

  @put('/student/{id}', {
    responses: {
      '204': {
        description: 'Student PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() student: Student,
  ): Promise<void> {

    let u = await this.userRepository.findOne({where: {studentId: student.id}})
    if (u) {
      u.userName = student.document;
      await this.userRepository.replaceById(u.id, u);
    }
    await this.studentRepository.replaceById(id, student);
  }

  @del('/student/{id}', {
    responses: {
      '204': {
        description: 'Student DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.studentRepository.deleteById(id);
  }
}
