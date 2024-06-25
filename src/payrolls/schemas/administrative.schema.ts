import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AdministrativeDocument = HydratedDocument<Administrative>;

@Schema()
export class Administrative {
  @Prop({ type: String, required: true, unique: true })
  id: string;

  @Prop()
  type: 'resource';

  @Prop()
  reference: string;

  @Prop()
  dateOfBirth: string;

  @Prop()
  placeOfBirth: string;

  @Prop()
  nationality: string;

  @Prop()
  function: string;

  @Prop()
  healthCareNumber: string;

  @Prop()
  situation: number;

  @Prop()
  administrativeComments: string;

  @Prop()
  seniorityDate: string;

  @Prop()
  originalSeniorityDate: string;

  @Prop()
  forceSeniorityDate: boolean;

  @Prop()
  validitySeniorityDate: string;

  @Prop({ type: Object })
  relationships: {
    contracts: {
      data: [
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

export const AdministrativeSchema = SchemaFactory.createForClass(Administrative);
