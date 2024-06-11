import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { Resource } from './resource.entity';

@Entity()
export class Reference {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Resource, (resource) => resource.references)
  resource: Resource;

  @Column()
  title: string;

  @Column()
  description: string;
}
