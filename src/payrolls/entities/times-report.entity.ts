import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { WorkUnit } from './work-unit.entity';
import { WorkUnitType } from './work-unit-type.entity';

@Entity()
export class TimesReport {
  @PrimaryColumn()
  id: string;

  @Column()
  type: string;

  @Column()
  term: string;

  @Column()
  creationDate: string;

  @Column()
  updateDate: string;

  @Column()
  informationComments: string;

  @Column('decimal')
  workUnitRate: number;

  @Column()
  closed: boolean;

  @Column()
  state: string;

  @OneToMany(() => WorkUnit, (workUnit) => workUnit.timesReport)
  regularTimes: WorkUnit[];

  @Column('simple-json')
  absencesTime: { startDate: string; duration: number; workUnitType: WorkUnitType }[];
}
