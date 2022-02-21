import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateOrder1645289349103 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TYPE payment_options AS ENUM ('cash', 'debit_card', 'credit_card', 'pix');
    CREATE TABLE orders (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        payment payment_options NOT NULL,
        products_quantity int DEFAULT 1,
        total_cost decimal,
        user_id UUID,
        created_at timestamp DEFAULT CURRENT_TIMESTAMP,
        updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
        deleted_at timestamp,
        FOREIGN KEY (user_id) REFERENCES users(id) 
    );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE orders; DROP TYPE payment_options');
  }
}
