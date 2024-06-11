import { Delivery } from './delivery';
import { Expenses } from './expenses';
import { Project } from './project';
import {
  IncludedAdvantage,
  IncludedAgency,
  IncludedExpensesreport,
  IncludedItem,
  IncludedResource,
  IncludedTimesreport,
} from './types';

export type Payslip = {
  id: string;
  firstName: string;
  lastName: string;
  isSelected: boolean;
  contracts: ContractExt[];
  advantagePayList: (IncludedAdvantage | undefined)[];
  currentTimesreports: (IncludedTimesreport | undefined)[];
  deliveries: Delivery[];
  projects: Project[];
  expenses: Expenses[];
  deliveriesIncluded?: IncludedItem[];
  projectsIncluded?: IncludedItem[];
};

export type Contract = {
  id: string;
  type: 'appextractpayrollcontract';
  attributes: Attributes;
  relationships: Relationships;
};

export type ContractExt = Contract & {
  contractType?: string;
  currency?: any;
  resources?: IncludedResource[];
  agencies?: IncludedAgency[];
  timesreports?: IncludedTimesreport[];
  expensesreports?: IncludedExpensesreport[];
  advantage?: IncludedAdvantage[];
};

export type Attributes = {
  startDate: string;
  endDate: string;
  typeOf: number;
  payrollComments: string;
  payrollTerm: string;
  monthlySalary: number;
  currency: number;
  currencyAgency: number;
  exchangeRate: number;
  exchangeRateAgency: number;
  productionTimes: number;
  internalTimes: number;
  absencesTimes: number;
  expensesToPay: number;
  expensesAlreadyAdvanced: number;
  canGenerateAdvantages: boolean;
};

export type Relationships = {
  advantagesToPay: AdvantagesToPay;
  agency: AgencyRelationship;
  dependsOn: DependsOn;
  timesReports: TimesReports;
  expensesReports: ExpensesReports;
};

export type AdvantagesToPay = {
  data: [
    {
      id?: string;
      type?: 'advantage';
    },
  ];
};

export type AgencyRelationship = {
  data: AgencyData;
};

export type AgencyData = {
  id: string;
  type: string;
};

export type DependsOn = {
  data: DependsOnData;
};

export type DependsOnData = {
  id: string;
  type: string;
};

export type TimesReports = {
  data: [
    {
      id: string;
      type: 'timesreport';
    },
  ];
};

export type ExpensesReports = {
  data: ExpensesReportDataItem[];
};

export type ExpensesReportDataItem = {
  id: string;
  type: string;
};
