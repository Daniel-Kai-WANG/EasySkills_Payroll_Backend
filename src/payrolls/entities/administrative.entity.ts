import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Administrative {
  @PrimaryColumn()
  id: string;

  @Column()
  type: 'resource';

  @Column()
  reference: string;

  @Column()
  dateOfBirth: string;

  @Column()
  placeOfBirth: string;

  @Column()
  nationality: string;

  @Column()
  function: string;

  @Column()
  healthCareNumber: string;

  @Column()
  situation: number;

  @Column()
  administrativeComments: string;

  @Column()
  seniorityDate: string;

  @Column()
  originalSeniorityDate: string;

  @Column()
  forceSeniorityDate: boolean;

  @Column()
  validitySeniorityDate: string;

  @Column('simple-json')
  relationships: {
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
    agency: {
      data: {
        id: string;
        type: 'agency';
      };
    };
  };
}
