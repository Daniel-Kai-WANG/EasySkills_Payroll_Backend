import { Entity, PrimaryColumn, OneToMany, Column } from 'typeorm';
import { WorkUnit } from './work-unit.entity';

@Entity()
export class WorkUnitType {
  @PrimaryColumn()
  reference: number;

  @Column()
  activityType: string;

  @Column()
  name: string;

  @OneToMany(() => WorkUnit, (workUnit) => workUnit.workUnitType)
  workUnits: WorkUnit[];
}
