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
  ParseIntPipe,
  HttpStatus,
  DefaultValuePipe,
} from '@nestjs/common';
import {
  CreateProductResponse,
  GetListOfProductsResponse,
  GetOneProductResponse,
  GetPaginatedListOfProductsResponse,
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

  // @Get('/:pageNumber')
  // getListOfProduct(
  //   @Param('pageNumber') pageNumber: string,
  // ): Promise<GetPaginatedListOfProductsResponse> {
  //   return this.shopService.getProducts(Number(pageNumber));
  // }

  // @Get('/find/:searchTerm')
  // testFindItem(
  //   @Param('searchTerm') searchTerm: string,
  // ): Promise<GetListOfProductsResponse> {
  //   return this.shopService.findProducts(searchTerm);
  // }

  // @Get('/:id')
  // getOneProduct(@Param('id') id: string): Promise<GetOneProductResponse> {
  //   return this.shopService.getOneProduct(id);
  // }

  // @Delete('/:id')
  // removeProduct(@Param('id') id: string) {
  //   this.shopService.removeProduct(id);
  // }

  // @Post('/')
  // createNewProduct(): Promise<CreateProductResponse> {
  //   return this.shopService.createDummyProduct();
  // }

  // @Get('/welcome')
  // welcome(@HostParam('name') siteName: string): string {
  //   return `Welcome on ${siteName}`;
  // }

  // @Get('/test/:index')
  // test(@Param('index', ParseIntPipe) index: number) {
  //   console.log(typeof index);
  //   return '';
  // }

  // @Get('/test/:index')
  // test(
  //   @Param(
  //     'index',
  //     new ParseIntPipe({
  //       errorHttpStatusCode: HttpStatus.FORBIDDEN,
  //     }),
  //   )
  //   index: number,
  // ) {
  //   console.log(typeof index);
  //   return '';
  // }

  @Get('/test/:index?')
  test(
    @Param('index', new DefaultValuePipe(0), ParseIntPipe)
    index?: number,
  ) {
    console.log(typeof index);
    return index;
  }
}
