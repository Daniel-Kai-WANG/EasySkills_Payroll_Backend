import { Entity, PrimaryColumn, OneToMany, Column } from 'typeorm';
import { WorkUnit } from './work-unit.entity';

@Entity()
export class TimesReportDelivery {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  startDate: string;

  @Column()
  endDate: string;

  @OneToMany(() => WorkUnit, (workUnit) => workUnit.delivery)
  workUnits: WorkUnit[];
}
