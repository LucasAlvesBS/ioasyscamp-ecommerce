import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateStock1645306429127 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE stocks (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name varchar(255) NOT NULL,
        products_quantity int NOT NULL,
        available boolean NOT NULL,
        created_at timestamp DEFAULT CURRENT_TIMESTAMP,
        updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
        deleted_at timestamp
      );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE stocks');
  }
}
