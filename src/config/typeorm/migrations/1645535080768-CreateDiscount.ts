import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDiscount1645535080768 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE discounts (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        percentage decimal NOT NULL,
        created_at timestamp DEFAULT CURRENT_TIMESTAMP,
        updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
        deleted_at timestamp 
    );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE discounts');
  }
}
