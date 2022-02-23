import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateOrdersMadeFunction1645654460453
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION accumulate_orders() RETURNS TRIGGER
      AS
      $$
      BEGIN
        UPDATE users SET orders_made = orders_made + 1
          WHERE id = NEW.user_id;
        RETURN NEW;
      END
      $$ LANGUAGE plpgsql;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP FUNCTION accumulate_orders');
  }
}
