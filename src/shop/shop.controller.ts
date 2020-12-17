import {
  Controller,
  Get,
  HostParam,
  Inject,
  Param,
  Redirect,
  Scope,
} from '@nestjs/common';
import { GetListOfProductsResponse } from 'src/interfaces/shop';
import { ShopService } from './shop.service';

@Controller({
  path: 'shop',
  host: ':name.lvh.me',
})
export class ShopController {
  onApplicationBootstrap() {
    console.log('załadowany!');
  }

  onApplicationShutdown() {
    console.log('Aplikacja zaraz zniknie');
  }

  constructor(@Inject(ShopService) private shopService: ShopService) {}

  @Get('/')
  getListOfProduct(): GetListOfProductsResponse {
    return this.shopService.getProducts();
  }

  @Get('/welcome')
  welcome(@HostParam('name') siteName: string): string {
    return `Welcome on ${siteName}`;
  }
}
