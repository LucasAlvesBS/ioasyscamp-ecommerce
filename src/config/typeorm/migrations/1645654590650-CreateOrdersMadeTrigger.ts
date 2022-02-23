import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateOrdersMadeTrigger1645654590650
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TRIGGER tr_accumulate_orders
      BEFORE INSERT ON orders
      FOR EACH ROW
      EXECUTE PROCEDURE accumulate_orders();
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TRIGGER tr_accumulate_orders
      ON orders
    `);
  }
}
