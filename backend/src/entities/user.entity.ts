import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Message } from './message.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  // Store a hash (never store plain passwords)
  // Nullable so existing databases can migrate without crashing; signup will always set it.
  @Column({ nullable: true })
  passwordHash: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Message, message => message.user)
  messages: Message[];
}
