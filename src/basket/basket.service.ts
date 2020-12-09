import { Injectable } from '@nestjs/common';
import { AddProductToBasketResponse } from 'src/interfaces/basket';
import { AddProductDto } from './dto/add-product.dto';

@Injectable()
export class BasketService {
  private items: AddProductDto[] = [];

  add(item: AddProductDto): AddProductToBasketResponse {
    if (
      typeof item.name !== 'string' &&
      typeof item.count !== 'number' &&
      item.name === '' &&
      item.count < 1
    ) {
      return {
        isSuccess: false,
      };
    }
    this.items.push(item);

    return {
      isSuccess: true,
      index: this.items.length - 1,
    };
  }
}
