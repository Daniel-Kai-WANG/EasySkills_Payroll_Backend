import { PrimaryColumn, ManyToOne, Column } from 'typeorm';
import { TimesReportDelivery } from './times-report-delivery.entity';
import { TimesReportProject } from './times-report-project.entity';
import { TimesReport } from './times-report.entity';
import { WorkUnitType } from './work-unit-type.entity';

export class WorkUnit {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => TimesReport, (timesReport) => timesReport.regularTimes)
  timesReport: TimesReport;

  @Column()
  startDate: string;

  @Column('decimal')
  duration: number;

  @Column()
  row: number;

  @ManyToOne(() => WorkUnitType, (workUnitType) => workUnitType.workUnits)
  workUnitType: WorkUnitType;

  @ManyToOne(() => TimesReportDelivery, (delivery) => delivery.workUnits)
  delivery?: TimesReportDelivery;

  @ManyToOne(() => TimesReportProject, (project) => project.workUnits)
  project?: TimesReportProject;
}
