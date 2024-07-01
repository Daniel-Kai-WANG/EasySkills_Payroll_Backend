import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { ResourcesModule } from './resources/resources.module';
import { HttpModule } from '@nestjs/axios';
import { TaskModule } from './tasks/tasks.module';
import { AdministrativeModule } from './administrative/administrative.module';
import { DeliveriesModule } from './deliveries/deliveries.module';

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
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'root',
    //   password: 'root',
    //   database: 'test',
    //   entities: [],
    //   synchronize: true,
    //   autoLoadEntities: true,
    // }),
    ScheduleModule.forRoot(),
    MongooseModule.forRoot('mongodb+srv://kaiwang2027:lsx65318022@easy-skill-cluster.09ksxdm.mongodb.net/'),
    // PayrollsModule,
    ResourcesModule,
    TaskModule,
    AdministrativeModule,
    DeliveriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
