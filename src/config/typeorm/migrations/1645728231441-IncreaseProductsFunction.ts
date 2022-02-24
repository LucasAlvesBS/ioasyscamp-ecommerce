import { MigrationInterface, QueryRunner } from 'typeorm';

export class IncreaseProductsFunction1645728231441
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION increase_products() RETURNS TRIGGER
      AS
      $$
      BEGIN
        UPDATE stocks SET available_quantity = available_quantity + 1
          WHERE id = NEW.stock_id;
        UPDATE stocks SET expected_profit = expected_profit + NEW.price
          WHERE id = NEW.stock_id;
        RETURN NEW;
      END
      $$ LANGUAGE plpgsql;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP FUNCTION increase_products');
  }
}
