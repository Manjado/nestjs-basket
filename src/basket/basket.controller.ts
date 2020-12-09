import { Body, Controller, Inject, Post } from '@nestjs/common';
import { BasketService } from './basket.service';
import { AddProductDto } from './dto/add-product.dto';
import { AddProductToBasketResponse } from 'src/interfaces/basket';

@Controller('basket')
export class BasketController {
  constructor(@Inject(BasketService) private basketService: BasketService) {}
  @Post('/')
  addProductToBasket(@Body() item: AddProductDto): AddProductToBasketResponse {
    return this.basketService.add(item);
  }
}
