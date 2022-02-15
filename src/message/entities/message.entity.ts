import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  message: string;

  @Column()
  contentId: number;

  @Column()
  deleteYn: string;

  @Column()
  reportCount: number;

  @Column()
  createdDt: Date;
}
