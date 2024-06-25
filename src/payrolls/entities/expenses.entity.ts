import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Expenses {
  @PrimaryColumn()
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
