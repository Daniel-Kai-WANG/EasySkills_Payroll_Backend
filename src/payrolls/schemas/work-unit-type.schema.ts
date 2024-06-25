import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { WorkUnit } from './work-unit.schema';

export type WorkUnitTypeDocument = HydratedDocument<WorkUnitType>;

@Schema()
export class WorkUnitType {
  @Prop({ type: Number, required: true, unique: true })
  reference: number;

  @Prop()
  activityType: string;

  @Prop()
  name: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'WorkUnit' }] })
  workUnits: WorkUnit[];
}

export const WorkUnitTypeSchema = SchemaFactory.createForClass(WorkUnitType);
