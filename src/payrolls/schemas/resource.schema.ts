import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Reference } from './reference.schema';

export type ResourceDocument = HydratedDocument<Resource>;

@Schema()
export class Resource {
  @Prop({ type: String, required: true, unique: true })
  id: string;

  @Prop()
  type: 'resource';

  @Prop()
  canShowTechnicalData: boolean;

  @Prop()
  canShowActions: boolean;

  @Prop()
  civility: number;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  creationDate: string;

  @Prop()
  updateDate: string;

  @Prop()
  reference: string;

  @Prop()
  typeOf: number;

  @Prop()
  state: number;

  @Prop()
  isVisible: boolean;

  @Prop()
  thumbnail: string;

  @Prop()
  skills: string;

  @Prop()
  mobilityAreas: string[];

  @Prop()
  title: string;

  @Prop()
  availability: string;

  @Prop()
  realAvailability: string;

  @Prop()
  averageDailyPriceExcludingTax: number;

  @Prop()
  email1: string;

  @Prop()
  email2: string;

  @Prop()
  email3: string;

  @Prop()
  phone1: string;

  @Prop()
  phone2: string;

  @Prop()
  currency: number;

  @Prop()
  exchangeRate: number;

  @Prop()
  currencyAgency: number;

  @Prop()
  exchangeRateAgency: number;

  @Prop()
  numberOfResumes: number;

  @Prop()
  numberOfActivePositionings: number;

  @Prop()
  tools: string[];

  @Prop()
  expertiseAreas: string[];

  @Prop()
  activityAreas: string[];

  @Prop()
  diplomas: string[];

  @Prop()
  experience: number;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Reference' }] })
  references: Reference[];

  @Prop()
  languages: string[];
}

export const ResourceSchema = SchemaFactory.createForClass(Resource);
