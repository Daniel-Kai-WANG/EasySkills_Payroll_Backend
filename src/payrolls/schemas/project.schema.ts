import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProjectDocument = HydratedDocument<Project>;

@Schema()
export class Project {
  @Prop({ type: String, required: true, unique: true })
  id: string;

  @Prop()
  type: 'project';

  @Prop()
  typeOf: number;

  @Prop()
  mode: number;

  @Prop()
  reference: string;

  @Prop()
  isProjectManager: boolean;

  @Prop()
  canReadProject: boolean;

  @Prop()
  canWriteProject: boolean;

  @Prop()
  canShowContact: boolean;

  @Prop()
  canShowCompany: boolean;

  @Prop()
  canShowCurrency: boolean;

  @Prop()
  canShowCurrencyAgency: boolean;

  @Prop()
  canShowExchangeRate: boolean;

  @Prop()
  canShowExchangeRateAgency: boolean;

  @Prop()
  canShowTurnoverSimulatedExcludingTax: boolean;

  @Prop()
  canShowCostsSimulatedExcludingTax: boolean;

  @Prop()
  canShowMarginSimulatedExcludingTax: boolean;

  @Prop()
  canShowProfitabilitySimulated: boolean;

  @Prop()
  currency: number;

  @Prop()
  exchangeRate: number;

  @Prop()
  currencyAgency: number;

  @Prop()
  exchangeRateAgency: number;

  @Prop()
  turnoverSimulatedExcludingTax: number;

  @Prop()
  costsSimulatedExcludingTax: number;

  @Prop()
  marginSimulatedExcludingTax: number;

  @Prop()
  profitabilitySimulated: number;

  @Prop({ type: Object })
  relationships: {
    contact: {
      data: {
        id: string;
        type: 'contact';
      };
    };
    company: {
      data: {
        id: string;
        type: 'company';
      };
    };
    opportunity: {
      data: {
        id: string;
        type: 'opportunity';
      };
    };
  };
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
