import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateIncreaseTrigger1645562227923 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TRIGGER tr_increase_stock
      BEFORE INSERT ON products
      FOR EACH ROW
      EXECUTE PROCEDURE increase_stock();
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TRIGGER tr_increase_stock
      ON products
    `);
  }
}
