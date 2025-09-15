import { Controller, Get, Post, Body, Patch, Param, Delete, Query, NotFoundException, Render } from '@nestjs/common';
import { IndustriesService } from './industries.service';
import { CreateIndustryDto } from './dto/create-industry.dto';
import { UpdateIndustryDto } from './dto/update-industry.dto';
import { PaginationQuery } from 'src/shared/dto/pagination.dto';

@Controller('admin/portal/industries')
export class IndustriesController {
  constructor(private readonly industriesService: IndustriesService) {}

  @Get('list')
  @Render('admin/portal/industries/list')
  industriesList() {
    return {
      title: 'Industries',
    };
  }

  @Post('list')
  async industriesListPaginated(@Query() queryDto: PaginationQuery) {
    const result = await this.industriesService.getPaginatedList(queryDto);
    return result;
  }

  @Get('add')
  @Render('admin/portal/industries/add')
  async addUpdateIndustry(@Query('id') id: string) {
    const authors = await this.industriesService.findAllAdmin();
    let title = 'Add Industry';
    let is_update = false;
    let action_data = {};
    const categories = await this.industriesService.findAllCategory();
    if (id) {
      const checkAdmin = await this.industriesService.findIndustryById(id);
      if (!checkAdmin) {
        throw new NotFoundException({
          message: 'Industry not found',
        });
      }
      title = 'Update Industry';
      is_update = true;
      action_data = checkAdmin.toObject();
    }

    return {
      title: title,
      is_update: is_update,
      action_data: action_data,
      categories: categories,
      authors: authors,
    };
  }

  @Post('add')
  async addUpdateIndustrySubmit(@Body() data: CreateIndustryDto) {
    await this.industriesService.addUpdateIndustry(data);
    return {
      message: data?.action_id
        ? 'Industry has been updated'
        : 'Industry has been added',
      continue: {
        redirect: '/admin/portal/industries/list',
      },
    };
  }

  @Delete()
  async deleteIndustry(@Query('id') id: string) {
    return await this.industriesService.deleteIndustry(id);
  }
}
