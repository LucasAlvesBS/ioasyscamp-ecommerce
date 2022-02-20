import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUser1645232300267 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TYPE role_options AS ENUM ('user', 'admin', 'manager');
        CREATE TABLE users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        first_name varchar(100) NOT NULL,
        last_name varchar(100) NOT NULL,
        email varchar(255) NOT NULL UNIQUE,
        password varchar(255) NOT NULL,
        cpf varchar(11) NOT NULL UNIQUE,
        telephone varchar(255) NOT NULL,
        gender varchar(100),
        role role_options DEFAULT 'user',
        created_at timestamp DEFAULT CURRENT_TIMESTAMP,
        updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
        deleted_at timestamp 
    );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE users; DROP TYPE role_options');
  }
}
