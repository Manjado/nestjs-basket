import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { BasketService } from './basket.service';
import { AddProductDto } from './dto/add-product.dto';
import {
  AddProductToBasketResponse,
  GetTotalPriceResponse,
  ListProductsInBasketResponse,
  RemoveProductFromBasketResonse,
} from 'src/interfaces/basket';

@Controller('basket')
export class BasketController {
  constructor(@Inject(BasketService) private basketService: BasketService) {}
  @Post('/')
  addProductToBasket(@Body() item: AddProductDto): AddProductToBasketResponse {
    return this.basketService.add(item);
  }

  @Delete('/:index')
  removeProductFromBasket(
    @Param('index') index: string,
  ): RemoveProductFromBasketResonse {
    return this.basketService.remove(Number(index));
  }

  @Get('/')
  listProductsInBasket(): ListProductsInBasketResponse {
    return this.basketService.list();
  }

  @Get('/total-price')
  getTotalPrice(): GetTotalPriceResponse {
    return this.basketService.getTotalPrice();
  }
}
