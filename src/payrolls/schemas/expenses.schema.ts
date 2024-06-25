import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ExpensesDocument = HydratedDocument<Expenses>;

@Schema()
export class Expenses {
  @Prop({ type: String, required: true, unique: true })
  id: string;

  @Prop()
  type: string;

  @Prop()
  closed: boolean;

  @Prop()
  term: string;

  @Prop()
  state: string;

  @Prop()
  paid: boolean;

  @Prop()
  toPay: number;

  @Prop()
  currencyAgency: number;

  @Prop()
  exchangeRateAgency: number;
}

export const ExpensesSchema = SchemaFactory.createForClass(Expenses);
