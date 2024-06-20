import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Project {
  @PrimaryColumn()
  id: string;

  @Column()
  type: 'project';

  @Column()
  typeOf: number;

  @Column()
  mode: number;

  @Column()
  reference: string;

  @Column()
  isProjectManager: boolean;

  @Column()
  canReadProject: boolean;

  @Column()
  canWriteProject: boolean;

  @Column()
  canShowContact: boolean;

  @Column()
  canShowCompany: boolean;

  @Column()
  canShowCurrency: boolean;

  @Column()
  canShowCurrencyAgency: boolean;

  @Column()
  canShowExchangeRate: boolean;

  @Column()
  canShowExchangeRateAgency: boolean;

  @Column()
  canShowTurnoverSimulatedExcludingTax: boolean;

  @Column()
  canShowCostsSimulatedExcludingTax: boolean;

  @Column()
  canShowMarginSimulatedExcludingTax: boolean;

  @Column()
  canShowProfitabilitySimulated: boolean;

  @Column()
  currency: number;

  @Column()
  exchangeRate: number;

  @Column()
  currencyAgency: number;

  @Column()
  exchangeRateAgency: number;

  @Column()
  turnoverSimulatedExcludingTax: number;

  @Column()
  costsSimulatedExcludingTax: number;

  @Column()
  marginSimulatedExcludingTax: number;

  @Column()
  profitabilitySimulated: number;

  @Column('simple-json')
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
