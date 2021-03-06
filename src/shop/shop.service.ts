import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BasketService } from 'src/basket/basket.service';
import { AddProductDto } from './dto/add-product.dto';
import { MulterDiskUploadedFiles } from '../interfaces/files';
import {
  CreateProductResponse,
  GetListOfProductsResponse,
  GetPaginatedListOfProductsResponse,
  ShopItemInterface,
} from 'src/interfaces/shop';
import {
  Between,
  getConnection,
  In,
  IsNull,
  LessThan,
  Like,
  Not,
  Repository,
} from 'typeorm';
import { ShopItemDetails } from './shop-item-details.entity';
import { ShopItem } from './shop-item.entity';
import * as fs from 'fs';
import * as path from 'path';
import { storageDir } from 'src/utils/storage';

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
      relations: ['details', 'sets'],
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
    newItem.name = 'Backpack Alfa';
    newItem.description = 'New collection 2021';

    await newItem.save();

    const details = new ShopItemDetails();
    details.color = 'black';
    details.width = 50;

    await details.save();

    newItem.details = details;

    // delete relation
    //newItem.details = null

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
    //----------
    //FindManyOptions
    // return await ShopItem.find({
    //   where: {
    //     description: searchTerm,
    //     price: 50.0,
    //   },
    // });
    //----------
    //FindManyOptions + select
    // return await ShopItem.find({
    //   select: ['id', 'price'],
    //   where: {
    //     description: searchTerm,
    //     price: 50.0,
    //   },
    // });
    //----------
    //Order
    // return await ShopItem.find({
    //   order: {
    //     price: 'DESC',
    //   },
    // });
    //----------
    //AND OR
    // return await ShopItem.find({
    //   where: [{ description: 'Old school' }, { price: 9.99 }],
    // });
    //----------
    //Less_then
    // return await ShopItem.find({
    //   where: {
    //     price: LessThan(10),
    //   },
    // });
    //----------
    //BETWEEN
    // return await ShopItem.find({
    //   where: {
    //     price: Between(10, 15),
    //   },
    // });
    //----------
    //LIKE
    // return await ShopItem.find({
    //   where: {
    //     description: Like(`%${searchTerm}%`),
    //   },
    // });
    //----------
    //IN
    // return await ShopItem.find({
    //   where: {
    //     id: In([1, 2]),
    //   },
    // });
    //----------
    //IsNull
    // return await ShopItem.find({
    //   where: {
    //     description: IsNull(),
    //   },
    // });
    //----------
    //Not
    // return await ShopItem.find({
    //   where: {
    //     description: Not(IsNull()),
    //   },
    // });
    //----------
    //queryBuilder get - Result
    const count = await getConnection()
      .createQueryBuilder()
      .select('COUNT(shopItem.id)', 'count')
      .from(ShopItem, 'shopItem')
      .getRawOne();

    console.log({ count });

    //queryBuilder get - Entity
    return await getConnection()
      .createQueryBuilder()
      .select('shopItem')
      .from(ShopItem, 'shopItem')
      .where('shopItem.description LIKE :searchTerm', {
        searchTerm: `%${searchTerm}%`,
      })
      .orderBy('shopItem.id', 'ASC')
      .skip(2)
      .take(3)
      .getMany();

    //----------
    //Raw
    // Raw(function_or_string)
    //don't use because of sql injection
  }

  async addProduct(
    req: AddProductDto,
    files: MulterDiskUploadedFiles,
  ): Promise<ShopItemInterface> {
    const photo = files?.photo?.[0] ?? null;
    const movie = files?.movie?.[0] ?? null;

    try {
      const shopItem = new ShopItem();
      shopItem.name = req.name;
      shopItem.description = req.description;
      shopItem.price = req.price;

      if (photo) {
        shopItem.photoFn = photo.filename;
      }

      await shopItem.save();

      return {
        id: shopItem.id,
        name: shopItem.name,
        description: shopItem.description,
        price: shopItem.price,
      };
    } catch (e) {
      try {
        if (photo) {
          fs.unlinkSync(
            path.join(storageDir(), 'product-photos', photo.filename),
          );
        }
      } catch (e2) {}
      throw e;
    }
  }
}
