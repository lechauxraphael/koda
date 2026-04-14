import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Users } from '../users/user.entity';
import { Chat } from 'src/chat/chat.entity';

@Entity()
export class Groups {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: false })
  name!: string;

  @Column()
  creator!: string;

  @Column({ default: 4 })
  maxGroupSize!: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  dateCreation!: Date;

  @ManyToMany(() => Users, (user) => user.groups)
  @JoinTable({
    name: 'groups_users',
    joinColumn: { name: 'groupId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'userId', referencedColumnName: 'id' }
  })
  users!: Users[];

  @OneToMany(() => Chat, (chat) => chat.group)
  chats!: Chat[];
 }
