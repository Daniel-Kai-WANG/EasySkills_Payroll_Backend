import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PayrollsModule } from './payrolls/payrolls.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'test',
      password: '123456789',
      database: 'easyskill',
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
    }),
    PayrollsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
