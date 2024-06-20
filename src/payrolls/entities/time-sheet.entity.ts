import { PrimaryColumn, Column } from 'typeorm';

export class Timesheet {
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
}
