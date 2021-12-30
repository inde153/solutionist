import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class solvedSets {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  setId: number;

  @Column({
    default: 0,
  })
  answerRate: number;
}