import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user')
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ name: 'password_hash', type: 'varchar', length: 255 })
  password_hash: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ name: 'avatar_url', type: 'varchar', length: 500, nullable: true })
  avatar_url?: string | null;

  @Column({
    name: 'explore_radius_m',
    type: 'integer',
    default: 150,
  })
  explore_radius_m: number;

  @Column({
    name: 'friendship_radius_m',
    type: 'integer',
    default: 10,
  })
  friendship_radius_m: number;

  @Column({
    name: 'graph_visible',
    type: 'boolean',
    default: true,
  })
  graph_visible: boolean;

  @Column({ type: 'varchar', length: 20, default: 'active' })
  status: string;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updated_at: Date;
}
