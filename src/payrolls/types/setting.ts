export type SettingApiResponse<T> = {
  meta: SettingMeta;
  data: T;
};

export type SettingMeta = {
  version: string;
  androidMinVersion: string;
  iosMinVersion: string;
  isLogged: boolean;
  language: string;
  timestamp: number;
  customer: string;
};

export type SettingsData = {
  setting: SettingItem;
  country: any;
  languages: any;
  nationality: any;
  lastBackupDate: any;
  systemSettings: any;
};

export type SettingItem = {
  action: any;
  state: any;
  currency: Currency[];
  calendar: any;
  taxRate: any;
  paymentTerm: any;
  paymentMethod: any;
  defaultOpportunityTypeCreated: any;
  defaultPositioningSearchModule: any;
  defaultMail: any;
  typeOf: TypeDetail;
  smoothAdditionalData: any;
  profitabilityMethodOfCalculating: any;
  showOwnOrderReference: any;
  itemInvoice: any;
  showLogoCompany: any;
  markdownTextDashboard: any;
  deliveryOrder: any;
  sharingEntity: any;
  activityArea: any;
  mobilityArea: any;
  experience: any;
  training: any;
  expertiseArea: any;
  duration: any;
  languageLevel: any;
  languageSpoken: any;
  availability: any;
  evaluation: any;
  origin: any;
  classification: any;
  source: any;
  criteria: any;
  tool: any;
  situation: any;
  civility: any;
  defaultNationality: any;
  timezone: any;
  cache: any;
  defaultAction: any;
  contractEndReason: any;
  additionalTurnoverTypes: any;
  sendingMode: any;
  invoiceEnableFacturxExportFormat: any;
  positioningSuggest: any;
  defaultScheduleAmount: any;
  defaultScheduleDate: any;
  defaultScheduleFrequency: any;
  maskSchedulesAnnual: any;
  maskSchedulesMonthly: any;
  maskSchedulesQuarterly: any;
  maskSchedulesSemiAnnual: any;
};

export type Currency = {
  id: number;
  iso: string;
  isEnabled: boolean;
  value: string;
  symbol: string;
};

export type TypeDetail = {
  project: ProjectsTypes[];
  contract: ContractTypes[];
  resource: any;
  activity: any;
  subscription: any;
  purchase: any;
  workingTime: any;
  employee: any;
  additionalTurnover: any;
  delivery: any;
  followedDocument: any;
};

export type ContractTypes = {
  id: number;
  value: string;
  isEnabled: boolean;
};

export type ProjectsTypes = {
  id: number;
  value: string;
  isEnabled: boolean;
  mode: number;
  scheduleProductionTurnover: boolean;
  isInternal: boolean;
  activityType: 'workUnit' | 'day';
};
