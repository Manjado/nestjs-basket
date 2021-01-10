import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ShopItemDetails } from './shop-item-details.entity';
import { ShopSet } from './shop-set.entity';

@Entity()
export class ShopItem extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 40,
  })
  name: string;

  @Column({
    length: 10000,
    default: null,
    nullable: true,
  })
  description: string | null;

  @Column({
    type: 'float',
    precision: 6,
    scale: 2,
  })
  price: number;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    default: 0,
  })
  boughtCounter: number;

  @Column({
    default: false,
  })
  wasEverBought: boolean;

  //@OneToOne((type) => ShopItemDetails, { eager: true })
  @OneToOne((type) => ShopItemDetails)
  @JoinColumn()
  details: ShopItemDetails;

  // Subproduct
  @ManyToOne((type) => ShopItem, (entity) => entity.subShopItems)
  mainShopItem: ShopItem;

  // Main product
  @OneToMany((type) => ShopItem, (entity) => entity.mainShopItem)
  subShopItems: ShopItem[];

  //many-to-many
  @ManyToMany((type) => ShopSet, (entity) => entity.items)
  @JoinTable()
  sets: ShopSet[];
}
