import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Resource } from './resource.schema';

export type ReferenceDocument = HydratedDocument<Reference>;

@Schema()
export class Reference {
  @Prop({ type: String, required: true, unique: true })
  id: string;

  @Prop({ type: Types.ObjectId, ref: 'Resource' })
  resource: Resource;

  @Prop()
  title: string;

  @Prop()
  description: string;
}

export const ReferenceSchema = SchemaFactory.createForClass(Reference);
