import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { WorkUnit } from './work-unit.entity';

@Entity()
export class TimesReportProject {
  @PrimaryColumn()
  id: string;

  @Column()
  reference: string;

  @OneToMany(() => WorkUnit, (workUnit) => workUnit.project)
  workUnits: WorkUnit[];
}
