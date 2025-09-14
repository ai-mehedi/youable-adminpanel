import { Module } from '@nestjs/common';
import { InforamtionService } from './inforamtion.service';
import { InforamtionController } from './inforamtion.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Info, InfoSchema } from 'src/models/info.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Info.name, schema: InfoSchema }])],
  controllers: [InforamtionController],
  providers: [InforamtionService],
})
export class InforamtionModule {}
