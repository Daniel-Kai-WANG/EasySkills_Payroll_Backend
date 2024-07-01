import { Module } from '@nestjs/common';
import { DeliveriesService } from './deliveries.service';
import { DeliveriesController } from './deliveries.controller';
import { HttpModule } from '@nestjs/axios';

const username = 'deborah.chan@easy-skill.com';
const password = 'Sibeh7lazyset';
const token = btoa(`${username}:${password}`);

@Module({
  imports: [
    HttpModule.register({
      baseURL: 'https://ui.boondmanager.com/api',
      headers: {
        Authorization: `Basic ${token}`,
      },
    }),
  ],
  controllers: [DeliveriesController],
  providers: [DeliveriesService],
  exports: [DeliveriesService],
})
export class DeliveriesModule {}
