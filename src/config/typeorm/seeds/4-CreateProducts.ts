import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { ProductsEntity } from '../../../app/products/products.entity';
import { Size } from '../../enum/size.enum';
import { Section } from '../../enum/section.enum';

export default class CreateProduct implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(ProductsEntity)
      .values([
        {
          name: 'jacket',
          description: 'fashion releases',
          size: Size.G,
          color: 'black',
          section: Section.Masculine,
          price: 89.99,
          productsQuantity: 5,
        },
        {
          name: 'jeans',
          description: 'fashion releases',
          size: Size.M,
          color: 'blue',
          section: Section.Feminine,
          price: 79.99,
          productsQuantity: 5,
        },
        {
          name: 'shirt',
          description: 'summer fashion',
          size: Size.P,
          color: 'green',
          section: Section.Kids,
          price: 45.99,
          productsQuantity: 5,
        },
        {
          name: 'pants',
          description: 'winter fashion',
          size: Size.M,
          color: 'purple',
          section: Section.Masculine,
          price: 93.5,
          productsQuantity: 5,
        },
        {
          name: 'skirt',
          description: 'summer fashion',
          size: Size.M,
          color: 'brown',
          section: Section.Feminine,
          price: 49.99,
          productsQuantity: 5,
        },
      ])
      .execute();
  }
}
