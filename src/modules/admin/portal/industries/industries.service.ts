import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateIndustryDto } from './dto/create-industry.dto';
import { UpdateIndustryDto } from './dto/update-industry.dto';
import { Category, CategoryModel } from 'src/models/category.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Industry, IndustryModel } from 'src/models/industry.schema';
import { PaginationQuery } from 'src/shared/dto/pagination.dto';
import { PaginationOptions } from 'src/shared/plugins/mongoose-plugin/pagination/types';
import { RenderEjsFile } from 'src/common/helpers/utils/utils';
import { join } from 'path';
import { PaginationUI } from 'src/common/helpers/utils/pagination-uri.utils';

@Injectable()
export class IndustriesService {
  constructor(
    @InjectModel(Industry.name)
    private readonly industryModel: IndustryModel,
    @InjectModel(Category.name)
    private readonly categoryModel: CategoryModel,
  ) { }

  async findAllCategory() {
    return this.categoryModel.find(
      { isActive: true, type: "industry" },
    );
  }

  async findIndustryById(_id: string) {
    return this.industryModel.findById(_id);
  }

  async addUpdateIndustry(data: CreateIndustryDto) {
    if (data.action_id) {
      const checkIndustry = await this.industryModel.findOne({ _id: data.action_id });
      if (!checkIndustry) {
        throw new BadRequestException({
          message: 'Industry does not exist.',
          field: 'action_id',
        });
      }

      await this.industryModel.updateOne(
        {
          _id: data.action_id,
        },
        {
          $set: data,
        },
      );

      await this.categoryModel.updateOne(
        {
          _id: data.category,
        },
        {
          $addToSet: { industry: data.action_id }
        },
      );
    }

    if (!data.action_id) {
      const checkEmail = await this.industryModel.findOne({ _id: data.action_id });
      if (checkEmail) {
        throw new BadRequestException({
          message: 'Industry already exists.',
          field: 'action_id',
        });
      }

      const industry = await this.industryModel.create({
        ...data,
      });
      await this.categoryModel.updateOne(
        {
          _id: data.category,
        },
        {
          $push: { industry: industry._id }
        },
      );
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
    const renderPath = 'views/admin/portal/industries/widgets/list.ejs';
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

    const results = await this.industryModel.paginate({}, options);

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

  async deleteIndustry(id: string) {
    const result = await this.industryModel.findOneAndDelete({
      _id: id,
    });

    if (!result) {
      throw new NotFoundException({
        message: 'Industry not found',
      });
    }
    return {
      message: 'Industry deleted successfully',
    };
  }

}
