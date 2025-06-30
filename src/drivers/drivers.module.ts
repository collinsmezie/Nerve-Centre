import { Module } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { DriversController } from './drivers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Driver, DriverSchema } from './schemas/driver.schema';
import { CompaniesModule } from '../companies/companies.module';

@Module({
  imports: [
    // Add any necessary imports here, such as MongooseModule for MongoDB
    MongooseModule.forFeature([{ name: Driver.name, schema: DriverSchema }]),
    CompaniesModule,
  ],
  controllers: [DriversController],
  providers: [DriversService],
})
export class DriversModule {}
