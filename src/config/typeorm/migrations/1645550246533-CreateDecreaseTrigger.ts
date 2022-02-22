import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDecreaseTrigger1645550246533 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TRIGGER tr_decrease_stock
      BEFORE INSERT ON orders
      FOR EACH ROW
      EXECUTE PROCEDURE decrease_stock();
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TRIGGER tr_decrease_stock
      ON orders
    `);
  }
}
