require('dotenv/config');

module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  logging: false,
  entities: ['src/app/**/*.entity.ts'],
  migrations: ['src/config/typeorm/migrations/*.ts'],
  cli: {
    entitiesDir: 'src/app/**/',
    migrationsDir: 'src/config/typeorm/migrations',
  },
  seeds: ['src/config/typeorm/seeds/*.ts'],
  factories: ['src/config/typeorm/factories/*.ts'],
};
