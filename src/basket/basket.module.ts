import { forwardRef, Module } from '@nestjs/common';
import { MailModule } from '../mail/mail.module';
import { ShopModule } from '../shop/shop.module';
import { BasketController } from './basket.controller';
import { BasketService } from './basket.service';

@Module({
  imports: [forwardRef(() => ShopModule), forwardRef(() => MailModule)],
  controllers: [BasketController],
  providers: [BasketService],
  exports: [BasketService],
})
export class BasketModule {}
