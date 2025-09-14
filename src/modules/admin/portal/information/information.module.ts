import { Module } from '@nestjs/common';
import { InformationService } from './information.service';
import { InformationController } from './information.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Info, InfoSchema } from 'src/models/info.schema';

@Module({
   imports: [
      MongooseModule.forFeature([
        {
          name: Info.name,
          schema: InfoSchema,
        },
      ]),
    ],
  controllers: [InformationController],
  providers: [InformationService],
})
export class InformationModule {}
