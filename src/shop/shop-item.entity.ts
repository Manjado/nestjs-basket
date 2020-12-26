import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
