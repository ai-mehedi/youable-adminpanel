import { Module } from '@nestjs/common';
import { IndrustryService } from './indrustry.service';
import { IndrustryController } from './indrustry.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Industry, IndustrySchema } from 'src/models/industry.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Industry.name, schema: IndustrySchema }])],
  controllers: [IndrustryController],
  providers: [IndrustryService],
})
export class IndrustryModule {}
