import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '../users/user.entity';

@Entity()
export class Url {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  protocol: string;

  @Column()
  method: string;

  @Column()
  successCodes: number;

  @Column()
  timeoutSeconds: number;

  @Column({ default: false })
  approved: boolean;

  @ManyToOne(() => User, (user) => user.urls)
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
