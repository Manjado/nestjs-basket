import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { BasketService } from 'src/basket/basket.service';
import { GetListOfProductsResponse } from 'src/interfaces/shop';

@Injectable()
export class ShopService {
  constructor(
    @Inject(forwardRef(() => BasketService))
    private basketService: BasketService,
  ) {}

  getProducts(): GetListOfProductsResponse {
    return [
      { name: 'jeans', description: 'New collection', price: 100 },
      {
        name: 'cap',
        description: 'New collection',
        price: 30 - this.basketService.countPromo(),
      },
      {
        name: 't-shirt',
        description: 'New collection',
        price: 50 - this.basketService.countPromo(),
      },
    ];
  }

  hasProduct(name: string): boolean {
    return this.getProducts().some((item) => item.name === name);
  }

  getPriceOfProduct(name: string): number {
    return this.getProducts().find((item) => item.name === name).price;
  }
}
