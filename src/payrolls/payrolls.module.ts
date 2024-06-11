import { Module } from '@nestjs/common';
import { PayrollsService } from './payrolls.service';
import { PayrollsController } from './payrolls.controller';
import { HttpModule } from '@nestjs/axios';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { Reference } from './entities/reference.entity';
// import { Resource } from './entities/resource.entity';

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
    // TypeOrmModule.forFeature([Resource, Reference]),
  ],
  controllers: [PayrollsController],
  providers: [PayrollsService],
  // exports: [TypeOrmModule],
})
export class PayrollsModule {}
