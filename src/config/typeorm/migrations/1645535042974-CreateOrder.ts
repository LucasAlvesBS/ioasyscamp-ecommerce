import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateOrder1645535042974 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TYPE payment_options AS ENUM ('cash', 'debit_card', 'credit_card', 'pix');
    CREATE TABLE orders (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        payment payment_options NOT NULL,
        order_quantity int NOT NULL,
        user_id UUID,
        stock_id UUID,
        created_at timestamp DEFAULT CURRENT_TIMESTAMP,
        updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
        deleted_at timestamp,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (stock_id) REFERENCES stocks(id) 
    );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE orders; DROP TYPE payment_options');
  }
}
