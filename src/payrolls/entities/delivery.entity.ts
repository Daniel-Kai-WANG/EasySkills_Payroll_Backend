import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Delivery {
  @PrimaryColumn()
  id: string;

  @Column()
  type: 'delivery';

  @Column()
  startDate: string;

  @Column()
  endDate: string;

  @Column()
  updateDate: string;

  @Column()
  title: string;

  @Column()
  numberOfDaysInvoicedOrQuantity: number;

  @Column()
  numberOfDaysFree: number;

  @Column()
  turnoverSimulatedExcludingTax: number;

  @Column()
  costsSimulatedExcludingTax: number;

  @Column()
  marginSimulatedExcludingTax: number;

  @Column()
  profitabilitySimulated: number;

  @Column()
  canShowTurnoverSimulatedExcludingTax: boolean;

  @Column()
  canShowCostsSimulatedExcludingTax: boolean;

  @Column()
  canShowMarginSimulatedExcludingTax: boolean;

  @Column()
  canShowProfitabilitySimulated: boolean;

  @Column()
  occupationRate: number;

  @Column()
  canReadDelivery: boolean;

  @Column()
  canWriteDelivery: boolean;

  @Column()
  currency: number;

  @Column()
  state: number;

  @Column()
  exchangeRate: number;

  @Column()
  currencyAgency: number;

  @Column()
  exchangeRateAgency: number;

  @Column('simple-json')
  relationships: {
    project: {
      data: {
        type: 'projects';
        id: string;
      };
    };
  };
}
