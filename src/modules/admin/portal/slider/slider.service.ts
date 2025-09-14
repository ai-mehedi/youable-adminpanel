import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSliderDto } from './dto/create-slider.dto';
import { UpdateSliderDto } from './dto/update-slider.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Slider, SliderModel } from 'src/models/slide.schema';
import { PaginationQuery } from 'src/shared/dto/pagination.dto';
import { PaginationOptions } from 'src/shared/plugins/mongoose-plugin/pagination/types';
import { PaginationUI } from 'src/common/helpers/utils/pagination-uri.utils';
import { RenderEjsFile } from 'src/common/helpers/utils/utils';
import { join } from 'path';

@Injectable()
export class SliderService {
  constructor(
    @InjectModel(Slider.name)
    private readonly sliderModel: SliderModel,
  ) { }

  async findSliderById(_id: string) {
    return this.sliderModel.findById(_id);
  }

  async addUpdateSlider(data: CreateSliderDto) {
    if (data.action_id) {
      const checkSlider = await this.sliderModel.findOne({ _id: data.action_id });
      if (!checkSlider) {
        throw new BadRequestException({
          message: 'Slider does not exist.',
          field: 'action_id',
        });
      }

      await this.sliderModel.updateOne(
        {
          _id: data.action_id,
        },
        {
          $set: {
            title: data.title,
            thumbnail: data.thumbnail,
            happyclients: data.happyclients,
            successfulprojects: data.successfulprojects,
            certificationsdelivered: data.certificationsdelivered,
            customersatisfaction: data.customersatisfaction,
            description: data.description,
            isActive: data.isActive,
          },
        },
      );
    }

    if (!data.action_id) {
      const checkEmail = await this.sliderModel.findOne({ _id: data.action_id });
      if (checkEmail) {
        throw new BadRequestException({
          message: 'Slider already exists.',
          field: 'action_id',
        });
      }
      await this.sliderModel.create({
        title: data.title,
        thumbnail: data.thumbnail,
        happyclients: data.happyclients,
        successfulprojects: data.successfulprojects,
        certificationsdelivered: data.certificationsdelivered,
        customersatisfaction: data.customersatisfaction,
        description: data.description,
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
    const renderPath = 'views/admin/portal/sliders/widgets/list.ejs';
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

    const results = await this.sliderModel.paginate({}, options);

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

  async deleteSlider(id: string) {
    const result = await this.sliderModel.findOneAndDelete({
      _id: id,
    });

    if (!result) {
      throw new NotFoundException({
        message: 'Slider not found',
      });
    }
    return {
      message: 'Slider deleted successfully',
    };
  }
}
