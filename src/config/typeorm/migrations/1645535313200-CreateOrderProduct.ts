import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateOrderProduct1645535313200 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE orders_products (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        order_id UUID,
        product_id UUID,
        created_at timestamp DEFAULT CURRENT_TIMESTAMP,
        updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
        deleted_at timestamp,
        FOREIGN KEY (order_id) REFERENCES orders(id),
        FOREIGN KEY (product_id) REFERENCES products(id) 
    );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE orders_products');
  }
}
