import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Content {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column({ length: 500 })
  message: string;

  @Column()
  showYn: string;

  @Column()
  deleteYn: string;

  @Column()
  reportCount: number;

  @Column()
  createdDt: Date;
}
