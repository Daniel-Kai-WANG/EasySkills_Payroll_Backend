export type ResourceDto = {
  id: string;
  type: 'resource';
  attributes: ResourceAttributes;
  relationships: ResourceRelationships;
};

export type ResourceAttributes = {
  canShowTechnicalData: boolean;
  canShowActions: boolean;
  civility: number;
  firstName: string;
  lastName: string;
  creationDate: string;
  updateDate: string;
  reference: string;
  typeOf: number;
  state: number;
  isVisible: boolean;
  thumbnail: string;
  skills: string;
  mobilityAreas: string[];
  title: string;
  availability: string;
  realAvailability: string;
  averageDailyPriceExcludingTax: number;
  email1: string;
  email2: string;
  email3: string;
  phone1: string;
  phone2: string;
  currency: number;
  exchangeRate: number;
  currencyAgency: number;
  exchangeRateAgency: number;
  numberOfResumes: number;
  numberOfActivePositionings: number;
  tools: string[];
  expertiseAreas: string[];
  activityAreas: string[];
  diplomas: string[];
  experience: number;
  references: Reference[];
  languages: string[];
};

export type Reference = {
  id: string;
  title: string;
  description: string;
};

export type ResourceRelationships = {
  mainManager: {
    data: {
      id: string;
      type: 'resource';
    };
  };
  hrManager: {
    data: {
      id: string;
      type: 'resource';
    };
  };
  agency: {
    data: {
      id: string;
      type: 'agency';
    };
  };
  pole: {
    data: {
      id: string;
      type: 'pole';
    };
  };
};
