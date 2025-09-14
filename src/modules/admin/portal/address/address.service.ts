import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Address, AddressModel } from 'src/models/address-schema';
import { I18nService } from 'nestjs-i18n';
import { PaginationQuery } from 'src/shared/dto/pagination.dto';
import { PaginationOptions } from 'src/shared/plugins/mongoose-plugin/pagination/types';
import { PaginationUI } from 'src/common/helpers/utils/pagination-uri.utils';
import { RenderEjsFile } from 'src/common/helpers/utils/utils';
import { join } from 'path';

@Injectable()
export class AddressService {
 constructor(
    @InjectModel(Address.name)
    private readonly addressModel: AddressModel,
    private readonly i18n: I18nService,
  ) {}


    async findAddressById(_id: string) {
      return this.addressModel.findById(_id);
    }
  
    async addUpdateAddress(data: CreateAddressDto) {
      if (data.action_id) {
        const checkAddress = await this.addressModel.findOne({ _id: data.action_id });
        if (!checkAddress) {
          throw new BadRequestException({
            message: 'Address does not exist.',
            field: 'action_id',
          });
        }
  
        await this.addressModel.updateOne(
          {
            _id: data.action_id,
          },
          {
            $set: {
              name: data.name,
              description: data.description,
            },
          },
        );
      }
  
      if (!data.action_id) {
        const checkEmail = await this.addressModel.findOne({ _id: data.action_id });
        if (checkEmail) {
          throw new BadRequestException({
            message: 'Address already exists.',
            field: 'action_id',
          });
        }
        await this.addressModel.create({
          name: data.name,
          description: data.description,
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
      const renderPath = 'views/admin/portal/address/widgets/list.ejs';
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
  
      const results = await this.addressModel.paginate({}, options);
  
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

    async deleteAddress(id: string) {
      const result = await this.addressModel.findOneAndDelete({
        _id: id,
      });
  
      if (!result) {
        throw new NotFoundException({
          message: 'Address not found',
        });
      }
      return {
        message: 'Address deleted successfully',
      };
    }

}
