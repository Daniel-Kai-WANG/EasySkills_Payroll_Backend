import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DeliveryDocument = HydratedDocument<Delivery>;

@Schema()
export class Delivery {
  @Prop({ type: String, required: true, unique: true })
  id: string;

  @Prop()
  type: 'delivery';

  @Prop()
  startDate: string;

  @Prop()
  endDate: string;

  @Prop()
  updateDate: string;

  @Prop()
  title: string;

  @Prop()
  numberOfDaysInvoicedOrQuantity: number;

  @Prop()
  numberOfDaysFree: number;

  @Prop()
  turnoverSimulatedExcludingTax: number;

  @Prop()
  costsSimulatedExcludingTax: number;

  @Prop()
  marginSimulatedExcludingTax: number;

  @Prop()
  profitabilitySimulated: number;

  @Prop()
  canShowTurnoverSimulatedExcludingTax: boolean;

  @Prop()
  canShowCostsSimulatedExcludingTax: boolean;

  @Prop()
  canShowMarginSimulatedExcludingTax: boolean;

  @Prop()
  canShowProfitabilitySimulated: boolean;

  @Prop()
  occupationRate: number;

  @Prop()
  canReadDelivery: boolean;

  @Prop()
  canWriteDelivery: boolean;

  @Prop()
  currency: number;

  @Prop()
  state: number;

  @Prop()
  exchangeRate: number;

  @Prop()
  currencyAgency: number;

  @Prop()
  exchangeRateAgency: number;

  @Prop({ type: Object })
  relationships: {
    project: {
      data: {
        type: string;
        id: string;
      };
    };
  };
}

export const DeliverySchema = SchemaFactory.createForClass(Delivery);
