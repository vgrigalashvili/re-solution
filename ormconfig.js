import 'reflect-metadata';
import { DataSource } from 'typeorm';

var dbConfig = {
  synchronize: false,
  migrations: ['migrations/*.js'],
  cli: {
    migrationsDir: 'migrations',
  },
};

switch (process.env.NODE_ENV) {
  case 'development':
    Object.assign(dbConfig, {
      type: 'sqlite',
      database: 'db.sqlite',
      entities: ['**/*.entity.js'],
      synchronize: false,
    });
  case 'test':
    Object.assign(dbConfig, {
      type: 'sqlite',
      database: 'test.sqlite',
      entities: ['**/*.entity.ts'],
      synchronize: false,
    });
  case 'production':
    break;
  default:
    throw new Error('unknown environment: ' + process.env.NODE_ENV);
}
console.log(dbConfig);

export default dbConfig;
