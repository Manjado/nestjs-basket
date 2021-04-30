import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CacheItem extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({length: 100})
  controllerName: string;

  @Column({length: 100})
  actionName: string;

  @Column({type: 'longtext'})
  dataJson: string;

  @Column({default: () => 'CURRENT_TIMESTAMP'})
  createdAt: Date;
}