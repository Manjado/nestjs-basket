import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BasketService } from 'src/basket/basket.service';
import {
  CreateProductResponse,
  GetListOfProductsResponse,
  GetPaginatedListOfProductsResponse,
} from 'src/interfaces/shop';
import { Repository } from 'typeorm';
import { ShopItem } from './shop-item.entity';

@Injectable()
export class ShopService {
  constructor(
    @Inject(forwardRef(() => BasketService))
    private basketService: BasketService, // @InjectRepository(ShopItem) // private shopItemRepository: Repository<ShopItem>,  active record dont need to use Repository
  ) {}

  async getProducts(
    currentPage: number = 1,
  ): Promise<GetPaginatedListOfProductsResponse> {
    // const count = await ShopItem.count();
    // console.log({ count });
    // return await ShopItem.find({ skip: 3, take: 3 });

    // const [items, count] = await ShopItem.findAndCount({
    //   take: 3,
    // });
    // console.log({ count });
    // return items;

    const maxPerPage = 3;

    const [items, count] = await ShopItem.findAndCount({
      skip: maxPerPage * (currentPage - 1),
      take: maxPerPage,
    });
    const pagesCount = Math.ceil(count / maxPerPage);
    return { items, pagesCount };
  }

  async hasProduct(name: string): Promise<boolean> {
    return (await this.getProducts()).items.some((item) => item.name === name);
  }

  async getPriceOfProduct(name: string): Promise<number> {
    return (await this.getProducts()).items.find((item) => item.name === name)
      .price;
  }

  async getOneProduct(id: string): Promise<ShopItem> {
    return await ShopItem.findOneOrFail(id); // fail will return 500
  }

  async removeProduct(id: string) {
    return await ShopItem.delete(id);
  }

  async createDummyProduct(): Promise<ShopItem> {
    const newItem = new ShopItem();
    newItem.price = 50;
    newItem.name = 'shose';
    newItem.description = 'Old school';

    await newItem.save();
    return newItem;
  }

  async addBoughtCounter(id: string) {
    // always use update
    await ShopItem.update(id, {
      wasEverBought: true,
    });

    //one option is:
    const item = await ShopItem.findOneOrFail(id);

    item.boughtCounter++;
    // await ShopItem.save(item);
    // or
    await item.save(); //the entity writes itself
  }

  async findProducts(searchTerm: string): Promise<GetListOfProductsResponse> {
    // findConditions
    // return await ShopItem.find({
    //   description: searchTerm,
    //   price: 50.0,
    // });

    //FindManyOptions
    // return await ShopItem.find({
    //   where: {
    //     description: searchTerm,
    //     price: 50.0,
    //   },
    // });

    //FindManyOptions + select
    // return await ShopItem.find({
    //   select: ['id', 'price'],
    //   where: {
    //     description: searchTerm,
    //     price: 50.0,
    //   },
    // });

    //Order
    return await ShopItem.find({
      order: {
        price: 'DESC',
      },
    });
  }
}
