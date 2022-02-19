import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProduct1645306477637 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TYPE size_options AS ENUM ('PP', 'P', 'M', 'G', 'GG', 'EGG');
    CREATE TYPE section_options AS ENUM ('masculine', 'feminine', 'kids');
    CREATE TABLE products (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name varchar(255) NOT NULL,
        description text NOT NULL,
        size size_options NOT NULL,
        color varchar(100) NOT NULL,
        section section_options NOT NULL,
        price decimal NOT NULL,
        discount_id UUID REFERENCES discounts(id),
        stock_id UUID REFERENCES stocks(id),
        created_at timestamp DEFAULT CURRENT_TIMESTAMP,
        updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
        deleted_at timestamp 
    );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'DROP TABLE products; DROP TYPE size_options; DROP TYPE section_options',
    );
  }
}
