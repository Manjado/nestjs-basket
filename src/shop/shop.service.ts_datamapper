import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BasketService } from 'src/basket/basket.service';
import {
  CreateProductResponse,
  GetListOfProductsResponse,
} from 'src/interfaces/shop';
import { Repository } from 'typeorm';
import { ShopItem } from './shop-item.entity';

@Injectable()
export class ShopService {
  constructor(
    @Inject(forwardRef(() => BasketService))
    private basketService: BasketService,
    @InjectRepository(ShopItem)
    private shopItemRepository: Repository<ShopItem>,
  ) {}

  async getProducts(): Promise<GetListOfProductsResponse> {
    return await this.shopItemRepository.find();
  }

  async hasProduct(name: string): Promise<boolean> {
    return (await this.getProducts()).some((item) => item.name === name);
  }

  async getPriceOfProduct(name: string): Promise<number> {
    return (await this.getProducts()).find((item) => item.name === name).price;
  }

  async getOneProduct(id: string): Promise<ShopItem> {
    return await this.shopItemRepository.findOneOrFail(id); // fail will return 500
  }

  async removeProduct(id: string) {
    return await this.shopItemRepository.delete(id);
  }

  async createDummyProduct(): Promise<ShopItem> {
    const newItem = new ShopItem();
    newItem.price = 50;
    newItem.name = 'shose';
    newItem.description = 'Old school';

    await this.shopItemRepository.save(newItem);
    return newItem;
  }

  async addBoughtCounter(id: string) {
    // always use update
    await this.shopItemRepository.update(id, {
      wasEverBought: true,
    });

    //one option is:
    const item = await this.shopItemRepository.findOneOrFail(id);

    item.boughtCounter++;
    await this.shopItemRepository.save(item);
  }
}
