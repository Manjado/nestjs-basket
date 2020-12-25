import {
  Controller,
  Delete,
  Get,
  HostParam,
  Inject,
  Param,
  Post,
  Redirect,
  Scope,
} from '@nestjs/common';
import {
  CreateProductResponse,
  GetListOfProductsResponse,
  GetOneProductResponse,
} from 'src/interfaces/shop';
import { ShopService } from './shop.service';

// http://www.lvh.me:3000/shop
// @Controller({
//   path: 'shop',
//   host: ':name.lvh.me',
// })

@Controller('shop')
export class ShopController {
  onApplicationBootstrap() {
    console.log('załadowany!');
  }

  onApplicationShutdown() {
    console.log('Aplikacja zaraz zniknie');
  }

  constructor(@Inject(ShopService) private shopService: ShopService) {}

  @Get('/')
  getListOfProduct(): Promise<GetListOfProductsResponse> {
    return this.shopService.getProducts();
  }

  @Get('/:id')
  getOneProduct(@Param('id') id: string): Promise<GetOneProductResponse> {
    return this.shopService.getOneProduct(id);
  }

  @Delete('/:id')
  removeProduct(@Param('id') id: string) {
    this.shopService.removeProduct(id);
  }

  @Post('/')
  createNewProduct(): Promise<CreateProductResponse> {
    return this.shopService.createDummyProduct();
  }

  // @Get('/welcome')
  // welcome(@HostParam('name') siteName: string): string {
  //   return `Welcome on ${siteName}`;
  // }
}
