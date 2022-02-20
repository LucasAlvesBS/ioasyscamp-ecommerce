import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { UsersEntity } from '../../../app/users/users.entity';
import { hashSync } from 'bcrypt';
import { Role } from '../../enum/role.enum';

const userPassword = process.env.USER_PASSWORD;
const hashedPassword = hashSync(userPassword, 10);

export class CreateAdmin implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(UsersEntity)
      .values([
        {
          firstName: process.env.USER_FIRST_NAME,
          lastName: process.env.USER_LAST_NAME,
          email: process.env.USER_EMAIL,
          password: `${hashedPassword}`,
          cpf: process.env.USER_CPF,
          telephone: process.env.USER_TELEPHONE,
          gender: process.env.USER_GENDER,
          role: Role.User,
        },
      ])
      .execute();
  }
}
