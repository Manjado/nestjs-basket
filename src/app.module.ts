import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BasketModule } from './basket/basket.module';
import { ShopModule } from './shop/shop.module';
import { CacheModule } from './cache/cache.module';
import { DiscountCodeModule } from './discount-code/discount-code.module';

@Module({
  imports: [TypeOrmModule.forRoot(), BasketModule, ShopModule, CacheModule, DiscountCodeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
