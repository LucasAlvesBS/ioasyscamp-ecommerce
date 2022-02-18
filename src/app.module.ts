import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UsersModule } from './app/users/users.module';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './app/orders/orders.module';
import { ProductsModule } from './app/products/products.module';
import { DiscountsModule } from './app/discounts/discounts.module';
import { AddressesModule } from './app/addresses/addresses.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.TYPEORM_CONNECTION,
      url: process.env.DATABASE_URL,
      entities: [__dirname + '/**/*.entity{.js,.ts}'],
      synchronize: true,
    } as TypeOrmModuleOptions),
    UsersModule,
    AuthModule,
    OrdersModule,
    ProductsModule,
    DiscountsModule,
    AddressesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
