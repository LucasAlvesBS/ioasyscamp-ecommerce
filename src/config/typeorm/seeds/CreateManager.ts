import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { UsersEntity } from '../../../app/users/users.entity';
import { hashSync } from 'bcrypt';
import { Role } from '../../enum/role.enum';

const managerPassword = process.env.MANAGER_PASSWORD;
const hashedPassword = hashSync(managerPassword, 10);

export class CreateManager implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(UsersEntity)
      .values([
        {
          firstName: process.env.MANAGER_FIRST_NAME,
          lastName: process.env.MANAGER_LAST_NAME,
          email: process.env.MANAGER_EMAIL,
          password: `${hashedPassword}`,
          cpf: process.env.MANAGER_CPF,
          telephone: process.env.MANAGER_TELEPHONE,
          gender: process.env.MANAGER_GENDER,
          role: Role.Manager,
        },
      ])
      .execute();
  }
}
