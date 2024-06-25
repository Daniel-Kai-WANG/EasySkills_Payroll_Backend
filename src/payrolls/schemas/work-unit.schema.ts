import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { TimesReport } from './times-report.schema';
import { TimesReportDelivery } from './times-report-delivery.schema';
import { TimesReportProject } from './times-report-project.schema';
import { WorkUnitType } from './work-unit-type.schema';

export type WorkUnitDocument = HydratedDocument<WorkUnit>;

@Schema()
export class WorkUnit {
  @Prop({ type: String, required: true, unique: true })
  id: string;

  @Prop({ type: Types.ObjectId, ref: 'TimesReport' })
  timesReport: TimesReport;

  @Prop()
  startDate: string;

  @Prop({ type: Number })
  duration: number;

  @Prop()
  row: number;

  @Prop({ type: Types.ObjectId, ref: 'WorkUnitType' })
  workUnitType: WorkUnitType;

  @Prop({ type: Types.ObjectId, ref: 'TimesReportDelivery' })
  delivery?: TimesReportDelivery;

  @Prop({ type: Types.ObjectId, ref: 'TimesReportProject' })
  project?: TimesReportProject;
}

export const WorkUnitSchema = SchemaFactory.createForClass(WorkUnit);
