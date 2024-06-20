export type TimesReport = {
  id: string;
  type: string;
  attributes: TimesReportAttributes;
  relationships: TimesReportRelationships;
};

export type TimesReportAttributes = {
  term: string;
  creationDate: string;
  updateDate: string;
  informationComments: string;
  workUnitRate: number;
  closed: boolean;
  state: string;
  regularTimes: WorkUnit[];
  exceptionalTimes: any[];
  workplaceTimes?: WorkPlaceTime[];
  plannedTimes: any[];
  absencesTimes: AbsenceTime[];
};

export type WorkUnit = {
  id: string;
  startDate: string;
  duration: number;
  row: number;
  workUnitType: WorkUnitType;
  delivery?: TimesReportDelivery;
  batch?: any;
  project?: TimesReportProject;
};

export type WorkUnitType = {
  reference: number;
  activityType: string;
  name: string;
};

export type TimesReportProject = {
  id: string;
  reference: string;
};

export type WorkPlaceTime = {
  id: string;
  startDate: string;
  duration: number;
  row: number;
  workplaceType: WorkPlaceType;
};

export type WorkPlaceType = {
  reference: number;
  name: string;
  state: boolean;
};

export type AbsenceTime = {
  startDate: string;
  duration: number;
  workUnitType: WorkUnitType;
};

export type TimesReportRelationships = {
  files: RelationshipData<TimesReportDocument[]>;
  signatures: RelationshipData<any[]>;
  orders: RelationshipData<TimesReportOrder[]>;
  validations: RelationshipData<TimesReportValidation[]>;
  resource: RelationshipData<TimesReportResource>;
  agency: RelationshipData<TimesReportAgency>;
  expensesReport: RelationshipData<TimesReportExpensesReport>;
  projects: RelationshipData<TimesReportProject>;
  validationWorkflow: RelationshipData<TimesReportResource[]>;
  createdBy: RelationshipData<TimesReportResource>;
};

export type TimesReportDelivery = {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
};

export type TimesReportDocument = {
  id: string;
  type: string;
};

export type TimesReportOrder = {
  id: string;
  type: string;
};

export type TimesReportValidation = {
  id: string;
  type: string;
};

export type TimesReportResource = {
  id: string;
  type: string;
};

export type TimesReportAgency = {
  id: string;
  type: string;
};

export type TimesReportExpensesReport = {
  id: string;
  type: string;
};

export type RelationshipData<T> = {
  data: T;
};
