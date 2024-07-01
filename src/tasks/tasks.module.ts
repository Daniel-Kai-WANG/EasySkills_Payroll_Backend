import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ResourcesModule } from 'src/resources/resources.module';
import { AdministrativeModule } from 'src/administrative/administrative.module';
import { DeliveriesModule } from 'src/deliveries/deliveries.module';

@Module({
  imports: [ResourcesModule, AdministrativeModule, DeliveriesModule],
  providers: [TasksService],
})
export class TaskModule {}
