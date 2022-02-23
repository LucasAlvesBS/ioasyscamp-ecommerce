import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { StocksEntity } from '../../../app/stocks/stocks.entity';

export class CreateStock implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(StocksEntity)
      .values([
        {
          description: 'E-commerce management',
        },
      ])
      .execute();
  }
}
