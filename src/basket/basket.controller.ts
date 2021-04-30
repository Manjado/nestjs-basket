import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BasketService } from './basket.service';
import { AddProductDto } from './dto/add-product.dto';
import {
  AddProductToBasketResponse,
  GetTotalPriceResponse,
  ListProductsInBasketResponse,
  RemoveProductFromBasketResonse,
} from 'src/interfaces/basket';
import { PasswordProtectGuard } from '../guard/password-protect.guard';
import { UsePassword } from 'src/decorators/use-password-decorator';

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
  getTotalPrice(): Promise<GetTotalPriceResponse> {
    return this.basketService.getTotalPrice();
  }

   @Get('/admin')
   @UseGuards(PasswordProtectGuard)
   @UsePassword('admin1')
    test() {
    return 'secret_path'
  }
}
