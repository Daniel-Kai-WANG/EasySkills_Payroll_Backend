import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PayrollsModule } from './payrolls/payrolls.module';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
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
    MongooseModule.forRoot('mongodb+srv://kaiwang2027:lsx65318022@easy-skill-cluster.09ksxdm.mongodb.net/'),
    PayrollsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
