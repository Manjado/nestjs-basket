import { Injectable } from '@nestjs/common';
import { GetListOfProductsResponse } from 'src/interfaces/shop';

@Injectable()
export class ShopService {
  getProducts(): GetListOfProductsResponse {
    return [
      { name: 'jeans', description: 'New collection', price: 100 },
      { name: 'cap', description: 'New collection', price: 30 },
      { name: 't-shirt', description: 'New collection', price: 50 },
    ];
  }

  hasProduct(name: string): boolean {
    return this.getProducts().some((item) => item.name === name);
  }

  getPriceOfProduct(name: string): number {
    return this.getProducts().find((item) => item.name === name).price;
  }
}
