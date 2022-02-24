import { MigrationInterface, QueryRunner } from 'typeorm';

export class PlaceOrdersFunction1645727606038 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION place_orders() RETURNS TRIGGER
      AS
      $$
      DECLARE
        quantity int;
      BEGIN
        SELECT available_quantity FROM stocks WHERE id = NEW.stock_id INTO quantity;
        IF quantity < NEW.order_quantity THEN
          RAISE EXCEPTION 'the stock does not have enough quantity to meet the demand';
        ELSE  
          UPDATE stocks SET available_quantity = available_quantity - NEW.order_quantity
            WHERE id = NEW.stock_id;
        END IF;
        RETURN NEW;
      END
      $$ LANGUAGE plpgsql;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP FUNCTION place_orders');
  }
}
