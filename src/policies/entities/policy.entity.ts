import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { BaseEntity } from '../../common/entities';
import { User } from '../../users/entities';

@Entity()
export class Policy extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  action: string;

  @ManyToOne(() => User, (user) => user.policies, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  user: User;
}
