import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  userId: string;

  @Column()
  password: string;

  @Column()
  username: string;

  @Column()
  accountType: string;

  @Column()
  createdDt: Date;
}
