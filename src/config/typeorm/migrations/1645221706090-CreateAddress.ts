import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAddress1645221706090 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE addresses (
        id varchar(255) PRIMARY KEY,
        state varchar(50) NOT NULL,
        city varchar(50) NOT NULL,
        address1 varchar(255) NOT NULL UNIQUE,
        address2 varchar(255),
        zip_code varchar(8) NOT NULL,
        user_id varchar(255) REFERENCES users(id),
        created_at timestamp DEFAULT CURRENT_TIMESTAMP,
        updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
        deleted_at timestamp 
    );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE addresses');
  }
}
