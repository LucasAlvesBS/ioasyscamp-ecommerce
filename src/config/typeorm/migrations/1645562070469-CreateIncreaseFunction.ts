import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateIncreaseFunction1645562070469 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION increase_stock() RETURNS TRIGGER
      AS
      $$
      BEGIN
        UPDATE stocks SET available_quantity = available_quantity + NEW.products_quantity
          WHERE id = NEW.stock_id;
        return NEW;
      END
      $$ LANGUAGE plpgsql;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP FUNCTION increase_stock');
  }
}
