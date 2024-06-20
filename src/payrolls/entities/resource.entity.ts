import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Reference } from './reference.entity';

@Entity()
export class Resource {
  @PrimaryColumn()
  id: string;

  @Column()
  type: 'resource';

  @Column()
  canShowTechnicalData: boolean;

  @Column()
  canShowActions: boolean;

  @Column()
  civility: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  creationDate: string;

  @Column()
  updateDate: string;

  @Column()
  reference: string;

  @Column()
  typeOf: number;

  @Column()
  state: number;

  @Column()
  isVisible: boolean;

  @Column()
  thumbnail: string;

  @Column()
  skills: string;

  @Column()
  mobilityAreas: string[];

  @Column()
  title: string;

  @Column()
  availability: string;

  @Column()
  realAvailability: string;

  @Column()
  averageDailyPriceExcludingTax: number;

  @Column()
  email1: string;

  @Column()
  email2: string;

  @Column()
  email3: string;

  @Column()
  phone1: string;

  @Column()
  phone2: string;

  @Column()
  currency: number;

  @Column()
  exchangeRate: number;

  @Column()
  currencyAgency: number;

  @Column()
  exchangeRateAgency: number;

  @Column()
  numberOfResumes: number;

  @Column()
  numberOfActivePositionings: number;

  @Column()
  tools: string[];

  @Column()
  expertiseAreas: string[];

  @Column()
  activityAreas: string[];

  @Column()
  diplomas: string[];

  @Column()
  experience: number;

  @OneToMany(() => Reference, (reference) => reference.resource)
  references: Reference[];

  @Column()
  languages: string[];
}
