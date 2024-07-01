export type DeliveryDto = {
  id: string;
  type: 'delivery';
  attributes: DeliveryAttributes;
  relationships: DeliveryRelationships;
};

export type DeliveryAttributes = {
  startDate: string;
  endDate: string;
  updateDate: string;
  title: string;
  numberOfDaysInvoicedOrQuantity: number;
  numberOfDaysFree: number;
  turnoverSimulatedExcludingTax: number;
  costsSimulatedExcludingTax: number;
  marginSimulatedExcludingTax: number;
  profitabilitySimulated: number;
  canShowTurnoverSimulatedExcludingTax: boolean;
  canShowCostsSimulatedExcludingTax: boolean;
  canShowMarginSimulatedExcludingTax: boolean;
  canShowProfitabilitySimulated: boolean;
  occupationRate: number;
  canReadDelivery: boolean;
  canWriteDelivery: boolean;
  currency: number;
  state: number;
  exchangeRate: number;
  currencyAgency: number;
  exchangeRateAgency: number;
};

export type DeliveryRelationships = {
  project: {
    data: {
      id: string;
      type: 'project';
    };
  };
};
