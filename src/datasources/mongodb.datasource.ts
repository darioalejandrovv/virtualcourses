import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'mongodb',
  connector: 'mongodb',
  url: 'mongodb+srv://virtual_courses_user_db:yCmDhhWpas15ePfO@cluster0.p1r2l.mongodb.net/VirtualCoursesDB?retryWrites=true&w=majority',
  host: 'cluster0.p1r2l.mongodb.net',
  port: 27017,
  user: 'virtual_courses_user_db',
  password: 'yCmDhhWpas15ePfO',
  database: 'virtualCoursesDB',
  useNewUrlParser: true
};

/* DATABASE LOCAL
run mongod --dbpath /usr/local/var/mongodb --logpath /usr/local/var/log/mongodb/mongo.log --fork

const config = {
  name: 'mongodb',
  connector: 'mongodb',
  url: 'mongodb://LOCALHOST:27017/VirtualCoursesDB',
  host: 'localhost',
  port: 27017,
  user: '',
  password: '',
  database: 'virtualCoursesDB',
  useNewUrlParser: true
};
*/

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MongodbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'mongodb';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.mongodb', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
