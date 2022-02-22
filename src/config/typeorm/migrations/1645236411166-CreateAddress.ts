import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAddress1645236411166 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE addresses (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        state varchar(50) NOT NULL,
        city varchar(50) NOT NULL,
        address1 varchar(255) NOT NULL UNIQUE,
        address2 varchar(255),
        zip_code varchar(8) NOT NULL,
        user_id UUID,
        created_at timestamp DEFAULT CURRENT_TIMESTAMP,
        updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
        deleted_at timestamp,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE addresses');
  }
}
