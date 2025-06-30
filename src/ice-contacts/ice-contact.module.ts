import { Module } from '@nestjs/common';
import { ICEContactsService } from './ice-contact.service';
import { ICEContactsController } from './ice-contact.controller';
import { ICEContact, ICEContactSchema } from './schemas/ice-contact.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CompaniesModule } from 'src/companies/companies.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ICEContact.name, schema: ICEContactSchema },
    ]),
    CompaniesModule,
  ],
  exports: [ICEContactsService],
  controllers: [ICEContactsController],
  providers: [ICEContactsService],
})
export class ICEContactsModule {}
