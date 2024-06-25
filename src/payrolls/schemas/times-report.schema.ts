import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { WorkUnitType } from './work-unit-type.schema';
import { WorkUnit } from './work-unit.schema';

export type TimesReportDocument = HydratedDocument<TimesReport>;

@Schema()
export class TimesReport {
  @Prop({ type: String, required: true, unique: true })
  id: string;

  @Prop()
  type: string;

  @Prop()
  term: string;

  @Prop()
  creationDate: string;

  @Prop()
  updateDate: string;

  @Prop()
  informationComments: string;

  @Prop()
  workUnitRate: number;

  @Prop()
  closed: boolean;

  @Prop()
  state: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'WorkUnit' }] })
  regularTimes: WorkUnit[];

  @Prop({
    type: [
      {
        startDate: String,
        duration: Number,
        workUnitType: { type: Types.ObjectId, ref: 'WorkUnitType' },
      },
    ],
  })
  absencesTime: { startDate: string; duration: number; workUnitType: WorkUnitType }[];
}

export const TimesReportSchema = SchemaFactory.createForClass(TimesReport);
