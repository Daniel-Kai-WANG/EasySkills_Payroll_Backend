import { Module } from '@nestjs/common';
import { PayrollsService } from './payrolls.service';
import { PayrollsController } from './payrolls.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Administrative } from './entities/administrative.entity';
import { Delivery } from './entities/delivery.entity';
import { Expenses } from './entities/expenses.entity';
import { Project } from './entities/project.entity';
import { Reference } from './entities/reference.entity';
import { TimesReportDelivery } from './entities/times-report-delivery.entity';
import { TimesReportProject } from './entities/times-report-project.entity';
import { TimesReport } from './entities/times-report.entity';
import { WorkUnitType } from './entities/work-unit-type.entity';
import { WorkUnit } from './entities/work-unit.entity';
import { AdministrativeSchema } from '../administrative/schemas/administrative.schema';
import { DeliverySchema } from '../deliveries/schemas/delivery.schema';
import { ExpensesSchema } from './schemas/expenses.schema';
import { ProjectSchema } from './schemas/project.schema';
import { ReferenceSchema } from '../resources/schemas/reference.schema';
// import { ResourceSchema } from './schemas/resource.schema';
import { TimesReportDeliverySchema } from './schemas/times-report-delivery.schema';
import { TimesReportProjectSchema } from './schemas/times-report-project.schema';
import { TimesReportSchema } from './schemas/times-report.schema';
import { WorkUnitTypeSchema } from './schemas/work-unit-type.schema';
import { WorkUnitSchema } from './schemas/work-unit.schema';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { Reference } from './entities/reference.entity';
// import { Resource } from './entities/resource.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Administrative.name, schema: AdministrativeSchema },
      { name: Delivery.name, schema: DeliverySchema },
      { name: Expenses.name, schema: ExpensesSchema },
      { name: Project.name, schema: ProjectSchema },
      { name: Reference.name, schema: ReferenceSchema },
      // { name: Resource.name, schema: ResourceSchema },
      { name: TimesReportDelivery.name, schema: TimesReportDeliverySchema },
      { name: TimesReportProject.name, schema: TimesReportProjectSchema },
      { name: TimesReport.name, schema: TimesReportSchema },
      { name: WorkUnitType.name, schema: WorkUnitTypeSchema },
      { name: WorkUnit.name, schema: WorkUnitSchema },
    ]),
    // TypeOrmModule.forFeature([Resource, Reference]),
  ],
  controllers: [PayrollsController],
  providers: [PayrollsService],
  exports: [MongooseModule],
  // exports: [TypeOrmModule],
})
export class PayrollsModule {}
