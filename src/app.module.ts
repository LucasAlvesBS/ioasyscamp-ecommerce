import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UsersModule } from './app/users/users.module';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './app/orders/orders.module';
import { ProductsModule } from './app/products/products.module';
import { DiscountsModule } from './app/discounts/discounts.module';
import { AddressesModule } from './app/addresses/addresses.module';
import { StocksModule } from './app/stocks/stocks.module';
import { CommentsModule } from './app/comments/comments.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.DB_CONNECTION,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      synchronize: false,
      logging: false,
      entities: [__dirname + '/**/*.entity{.js,.ts}'],
    } as TypeOrmModuleOptions),
    UsersModule,
    AuthModule,
    OrdersModule,
    ProductsModule,
    DiscountsModule,
    AddressesModule,
    StocksModule,
    CommentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
