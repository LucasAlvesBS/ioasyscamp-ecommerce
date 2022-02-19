import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateOrderProduct1645306527161 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE orders_products (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        order_id UUID REFERENCES orders(id),
        product_id UUID REFERENCES products(id),
        created_at timestamp DEFAULT CURRENT_TIMESTAMP,
        updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
        deleted_at timestamp 
    );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE orders_products');
  }
}
