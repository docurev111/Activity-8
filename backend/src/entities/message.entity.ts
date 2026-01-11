import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { Room } from './room.entity';
import { User } from './user.entity';

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  // Persist sender name so re-logins don't rewrite who appears as the sender in the UI
  // Nullable so existing databases can migrate without crashing; new messages always set it.
  @Column({ nullable: true })
  username: string;

  @ManyToOne(() => Room, room => room.messages, { onDelete: 'CASCADE' })
  room: Room;

  @Column()
  roomId: number;

  @ManyToOne(() => User, user => user.messages, { onDelete: 'CASCADE' })
  user: User;

  @Column()
  userId: number;

  @CreateDateColumn()
  createdAt: Date;
}
