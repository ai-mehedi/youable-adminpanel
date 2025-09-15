import { Module } from '@nestjs/common';
import { IndustriesService } from './industries.service';
import { IndustriesController } from './industries.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from 'src/models/category.schema';
import { Industry, IndustrySchema } from 'src/models/industry.schema';
import { Admin, AdminSchema } from 'src/models/admin.schema';

@Module({
    imports: [
      MongooseModule.forFeature([
        {
          name: Industry.name,
          schema: IndustrySchema,
        },
      ]),
       MongooseModule.forFeature([
        {
          name: Admin.name,
          schema: AdminSchema,
        },
      ]),
        MongooseModule.forFeature([
        {
          name: Category.name,
          schema: CategorySchema,
        },
      ]),
    ],
  controllers: [IndustriesController],
  providers: [IndustriesService],
})
export class IndustriesModule {}
