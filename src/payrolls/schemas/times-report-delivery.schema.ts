import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { WorkUnit } from './work-unit.schema';

export type TimesReportDeliveryDocument = HydratedDocument<TimesReportDelivery>;

@Schema()
export class TimesReportDelivery {
  @Prop({ type: String, required: true, unique: true })
  id: string;

  @Prop()
  title: string;

  @Prop()
  startDate: string;

  @Prop()
  endDate: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'WorkUnit' }] })
  workUnits: WorkUnit[];
}

export const TimesReportDeliverySchema = SchemaFactory.createForClass(TimesReportDelivery);
