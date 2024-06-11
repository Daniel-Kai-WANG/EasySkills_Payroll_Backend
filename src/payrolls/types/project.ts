export type Project = {
  id: string;
  type: 'project';
  attributes: ProjectAttributes;
  relationships: ProjectRelationships;
};

export type ProjectAttributes = {
  typeOf: number;
  mode: number;
  reference: string;
  isProjectManager: boolean;
  canReadProject: boolean;
  canWriteProject: boolean;
  canShowContact: boolean;
  canShowCompany: boolean;
  canShowCurrency: boolean;
  canShowCurrencyAgency: boolean;
  canShowExchangeRate: boolean;
  canShowExchangeRateAgency: boolean;
  canShowTurnoverSimulatedExcludingTax: boolean;
  canShowCostsSimulatedExcludingTax: boolean;
  canShowMarginSimulatedExcludingTax: boolean;
  canShowProfitabilitySimulated: boolean;
  currency: number;
  exchangeRate: number;
  currencyAgency: number;
  exchangeRateAgency: number;
  turnoverSimulatedExcludingTax: number;
  costsSimulatedExcludingTax: number;
  marginSimulatedExcludingTax: number;
  profitabilitySimulated: number;
};

export type ProjectRelationships = {
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
  schedules: {
    data: any[];
  };
  opportunity: {
    data: {
      id: string;
      type: 'opportunity';
    };
  };
};
