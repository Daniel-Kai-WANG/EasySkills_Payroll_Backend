import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Expenses {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string;

  @Column()
  closed: boolean;

  @Column()
  term: string;

  @Column()
  state: string;

  @Column()
  paid: boolean;

  @Column()
  toPay: number;

  @Column()
  currencyAgency: number;

  @Column()
  exchangeRateAgency: number;
}
