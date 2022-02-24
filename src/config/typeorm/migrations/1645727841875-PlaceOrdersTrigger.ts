import { MigrationInterface, QueryRunner } from 'typeorm';

export class PlaceOrdersTrigger1645727841875 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TRIGGER tr_place_orders
      BEFORE INSERT ON orders
      FOR EACH ROW
      EXECUTE PROCEDURE place_orders();
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TRIGGER tr_place_orders
      ON orders
    `);
  }
}
