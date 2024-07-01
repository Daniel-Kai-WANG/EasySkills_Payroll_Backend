import { Module } from '@nestjs/common';
import { AdministrativeService } from './administrative.service';
import { AdministrativeController } from './administrative.controller';
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
  controllers: [AdministrativeController],
  providers: [AdministrativeService],
  exports: [AdministrativeService],
})
export class AdministrativeModule {}
