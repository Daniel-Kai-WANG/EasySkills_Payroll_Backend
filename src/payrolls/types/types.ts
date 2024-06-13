export type ApiResponse<T> = {
  meta: Meta;
  data: T;
  included?: IncludedItem[];
};

export type IncludedItem =
  | IncludedAgency
  | IncludedResource
  | IncludedExpensesreport
  | IncludedTimesreport
  | IncludedPole
  | IncludedAdvantage
  | IncludedOpportunity
  | IncludedContact
  | IncludedCompany
  | IncludedProject
  | IncludedDocument
  | IncludedOrder
  | IncludedValidation
  | IncludedDelivery
  | IncludedContract;

export type Meta = {
  totals?: Totals;
  solr?: boolean;
  version: string;
  androidMinVersion: string;
  iosMinVersion: string;
  isLogged: boolean;
  language: string;
  timestamp: number;
  customer: string;
  expectedValidatorsAllowedForValidate?: any;
  expectedValidatorsAllowedForUnValidate?: any;
  expectedValidatorsAllowedForReject?: any;
  missingReports?: string[];
  warnings?: [
    {
      code: string;
      detail: string;
    },
  ];
};

export type Totals = {
  rows: number;
  turnoverSimulatedExcludingTax?: number;
  costsSimulatedExcludingTax?: number;
  marginSimulatedExcludingTax?: number;
  profitabilitySimulated?: number;
};

export type IncludedAgency = {
  id: string;
  type: 'agency';
  attributes: {
    name: string;
    workUnitRate: number;
    contractsSalaryType?: string;
    advantageTypes?: AgencyAdvantageType[];
  };
};

export type AgencyAdvantageType = {
  reference: number;
  name: string;
  frequency: string;
};

export type IncludedResource = {
  id: string;
  type: 'resource';
  attributes: {
    lastName: string;
    firstName: string;
    typeOf: number;
    workUnitRate: string;
  };
};

export type IncludedExpensesreport = {
  id: string;
  type: 'expensesreport';
  attributes: {
    term: string;
    state: string;
  };
};

export type IncludedTimesreport = {
  id: string;
  type: 'timesreport';
  attributes: {
    term: string;
    state: string;
  };
};

export type IncludedPole = {
  id: string;
  type: 'pole';
  attributes: {
    name: string;
  };
};

export type IncludedAdvantage = {
  id: string;
  type: 'advantage';
  attributes: {
    advantageType: {
      name: string;
      reference: number;
    };
    quantity: number;
    employeeAmount: number;
  };
};

export type IncludedOpportunity = {
  id: string;
  type: 'opportunity';
  attributes: {
    title: string;
  };
};

export type IncludedContact = {
  id: string;
  type: 'contact';
  attributes: {
    lastName: string;
    firstName: string;
    canReadContact: boolean;
  };
};

export type IncludedCompany = {
  id: string;
  type: 'company';
  attributes: {
    name: string;
    thumbnail?: string;
    canReadCompany?: boolean;
  };
};

export type IncludedProject = {
  id: string;
  type: 'project';
  attributes: {
    reference: string;
    typeOf: number;
    mode: number;
    currency: number;
    exchangeRate: number;
    currencyAgency: number;
    exchangeRateAgency: number;
    canShowCurrency: boolean;
    canShowCurrencyAgency: boolean;
    canShowExchangeRate: boolean;
    canShowExchangeRateAgency: boolean;
    canReadProject: boolean;
    canShowCompany: boolean;
    canShowContact: boolean;
  };
  relationships: {
    opportunity: {
      data: {
        id: string;
        type: 'opportunity';
      };
    };
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
  };
};

export type IncludedDocument = {
  id: string;
  type: 'document';
  attributes: {
    name: string;
    category?: string;
  };
  relationships?: {
    project: {
      data: {
        id: string;
        type: 'project';
      };
    };
  };
};

export type IncludedOrder = {
  id: string;
  type: 'order';
  attributes: {
    reference: string;
    number: string;
    showInformationCommentsOnCustomerPdf: boolean;
    showResourceFullNameOnCustomerPdf: boolean;
    showWorkUnitTypeNameOnCustomerPdf: boolean;
    useWorkUnitsForRegularDurationsOnCustomerPdf: boolean;
  };
  relationships: {
    project: {
      data: {
        id: string;
        type: 'project';
      };
    };
  };
};

export type IncludedValidation = {
  id: string;
  type: 'validation';
  attributes: {
    date: string;
    state: string;
    reason: string;
  };
  relationships: {
    realValidator: {
      data: {
        id: string;
        type: 'resource';
      };
    };
    expectedValidator: {
      data: {
        id: string;
        type: 'resource';
      };
    };
  };
};

export type IncludedDelivery = {
  id: string;
  type: 'delivery';
  attributes: {
    title: string;
    startDate: string;
    endDate: string;
  };
};

export type IncludedContract = {
  id: string;
  type: 'contract';
  attributes: {
    typeOf: number;
    employeeType: number;
    startDate: string;
    endDate: string;
    monthlySalary: number;
    classification: string;
    contractAverageDailyCost: number;
    contractAverageDailyProductionCost: number;
    currency: number;
    exchangeRate: number;
    currencyAgency: number;
    exchangeRateAgency: number;
    advantageTypes: [];
  };
  relationships: {
    agency: {
      data: {
        id: number;
        type: 'agency';
      };
    };
    parentContract: {
      data: null;
    };
    childContract: {
      data: null;
    };
  };
};
