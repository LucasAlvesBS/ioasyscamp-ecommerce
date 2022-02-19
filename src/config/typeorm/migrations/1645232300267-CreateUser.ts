import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUser1645232300267 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TYPE role_type AS ENUM ('user', 'admin');
        CREATE TABLE users (
        id varchar(255) PRIMARY KEY,
        first_name varchar(100) NOT NULL,
        last_name varchar(100) NOT NULL,
        email varchar(255) NOT NULL UNIQUE,
        password varchar(255) NOT NULL,
        cpf varchar(11) NOT NULL UNIQUE,
        telephone varchar(255) NOT NULL,
        gender varchar(100),
        role role_type,
        created_at timestamp DEFAULT CURRENT_TIMESTAMP,
        updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
        deleted_at timestamp 
    );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE users; DROP TYPE role_type');
  }
}
