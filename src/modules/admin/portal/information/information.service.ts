import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateInformationDto } from './dto/create-information.dto';
import { UpdateInformationDto } from './dto/update-information.dto';
import { Info, InfoModel } from 'src/models/info.schema';
import { InjectModel } from '@nestjs/mongoose';
import { I18nService } from 'nestjs-i18n';
import { PaginationQuery } from 'src/shared/dto/pagination.dto';
import { PaginationOptions } from 'src/shared/plugins/mongoose-plugin/pagination/types';
import { PaginationUI } from 'src/common/helpers/utils/pagination-uri.utils';
import { RenderEjsFile } from 'src/common/helpers/utils/utils';
import { join } from 'path';

@Injectable()
export class InformationService {
   constructor(
      @InjectModel(Info.name)
      private readonly infoModel: InfoModel,
      private readonly i18n: I18nService,
    ) {}

    async findInformationById(_id: string) {
      return this.infoModel.findById(_id);
    }

    async addUpdateInformation(data: CreateInformationDto) {
      if (data.action_id) {
        const checkInformation = await this.infoModel.findOne({ _id: data.action_id });
        if (!checkInformation) {
          throw new BadRequestException({
            message: 'Information does not exist.',
            field: 'action_id',
          });
        }
  
        await this.infoModel.updateOne(
          {
            _id: data.action_id,
          },
          {
            $set: {
              whatsappnumber: data.whatsappnumber,
              contactnumber: data.contactnumber,
              email: data.email,
              isActive: data.isActive,
            },
          },
        );
      }
  
      if (!data.action_id) {
        const checkEmail = await this.infoModel.findOne({ _id: data.action_id });
        if (checkEmail) {
          throw new BadRequestException({
            message: 'Information already exists.',
            field: 'action_id',
          });
        }
        await this.infoModel.create({
         whatsappnumber: data.whatsappnumber,
              contactnumber: data.contactnumber,
              email: data.email,
              isActive: data.isActive,
        });
      }
    }
  
    async getPaginatedList({
      limit,
      page,
      sortBy,
      sortOrder,
      searchText,
    }: PaginationQuery) {
      const options: PaginationOptions = { page, limit };
      const pagination = new PaginationUI();
      const renderPath = 'views/admin/portal/information/widgets/list.ejs';
      const searchBy = ['title'];
  
      limit = limit || 25;
      pagination.per_page = limit;
      const offset = (page - 1) * limit;
  
      options.sortOrder = {
        direction: sortOrder,
        id: sortBy,
      };
  
      if (searchText) {
        options.search = {
          searchText,
          searchBy,
        };
      }

      const results = await this.infoModel.paginate({}, options);

      const paginate_ui = pagination.getAllPageLinks(
        Math.ceil(results.total / limit),
        Math.abs(results.page),
      );
  
      let html_data = '';
      let serial_number = offset;
  
      for (const result of results.records) {
        serial_number++;
        html_data += await RenderEjsFile(join(global.ROOT_DIR, renderPath), {
          result,
          serial_number,
        });
      }
  
      return {
        data_exist: results.total > 0,
        data: html_data,
        total_count: results.total,
        pagination: paginate_ui,
      };
    }

    async deleteInformation(id: string) {
      const result = await this.infoModel.findOneAndDelete({
        _id: id,
      });
  
      if (!result) {
        throw new NotFoundException({
          message: 'Information not found',
        });
      }
      return {
        message: 'Information deleted successfully',
      };
    }
}
