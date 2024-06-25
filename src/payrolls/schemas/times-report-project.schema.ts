import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { WorkUnit } from './work-unit.schema';

export type TimesReportProjectDocument = HydratedDocument<TimesReportProject>;

@Schema()
export class TimesReportProject {
  @Prop({ type: String, required: true, unique: true })
  id: string;

  @Prop()
  reference: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'WorkUnit' }] })
  workUnits: WorkUnit[];
}

export const TimesReportProjectSchema = SchemaFactory.createForClass(TimesReportProject);
