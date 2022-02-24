import { MigrationInterface, QueryRunner } from 'typeorm';

export class IncreaseProductsTrigger1645728241439
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TRIGGER tr_increase_products
      BEFORE INSERT ON products
      FOR EACH ROW
      EXECUTE PROCEDURE increase_products();
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TRIGGER tr_increase_products
      ON products
    `);
  }
}
