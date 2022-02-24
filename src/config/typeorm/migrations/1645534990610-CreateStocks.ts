import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateStocks1645534990610 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE stocks (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        description text NOT NULL,
        available_quantity int DEFAULT 0,
        expected_profit decimal(10, 2) DEFAULT 0.00,
        created_at timestamp DEFAULT CURRENT_TIMESTAMP,
        updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
        deleted_at timestamp
      );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE stocks');
  }
}
