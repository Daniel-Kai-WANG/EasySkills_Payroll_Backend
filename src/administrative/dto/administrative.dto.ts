export type AdministrativeDto = {
  id: string;
  type: 'resource';
  attributes: AdministrativeAttributes;
  relationships: AdministrativeRelationships;
};

export type AdministrativeAttributes = {
  reference: string;
  dateOfBirth: string;
  placeOfBirth: string;
  nationality: string;
  function: string;
  healthCareNumber: string;
  situation: number;
  administrativeComments: string;
  seniorityDate: string;
  originalSeniorityDate: string;
  forceSeniorityDate: boolean;
  validitySeniorityDate: string;
};

export type AdministrativeRelationships = {
  contracts: {
    data: [
      {
        id: string;
        type: 'contract';
      },
      {
        id: string;
        type: 'contract';
      },
    ];
  };
  files: {
    data: [
      {
        id: string;
        type: 'document';
      },
    ];
  };
  candidate: {
    data: null;
  };
  providerContact: {
    data: null;
  };
  providerCompany: {
    data: null;
  };
  agency: {
    data: {
      id: string;
      type: 'agency';
    };
  };
};
