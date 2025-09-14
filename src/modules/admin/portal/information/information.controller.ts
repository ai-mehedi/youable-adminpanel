import { Controller, Get, Post, Body, Patch, Param, Delete, Render, Query, NotFoundException } from '@nestjs/common';
import { InformationService } from './information.service';
import { CreateInformationDto } from './dto/create-information.dto';
import { UpdateInformationDto } from './dto/update-information.dto';
import { PaginationQuery } from 'src/shared/dto/pagination.dto';


@Controller('admin/portal/information')
export class InformationController {
  constructor(private readonly informationService: InformationService) {}

  @Get('list')
  @Render('admin/portal/information/list')
  informationList() {
    return {
      title: 'Information',
    };
  }

  @Post('list')
  async informationListPaginated(@Query() queryDto: PaginationQuery) {
    const result = await this.informationService.getPaginatedList(queryDto);
    return result;
  }

  @Get('add')
  @Render('admin/portal/information/add')
  async addUpdateInformation(@Query('id') id: string) {
    let title = 'Add Information';
    let is_update = false;
    let action_data = {};
    if (id) {
      const checkAdmin = await this.informationService.findInformationById(id);
      if (!checkAdmin) {
        throw new NotFoundException({
          message: 'Information not found',
        });
      }
      title = 'Update Information';
      is_update = true;
      action_data = checkAdmin.toObject();
    }

    return {
      title: title,
      is_update: is_update,
      action_data: action_data,
    };
  }

  @Post('add')
  async addUpdateInformationSubmit(@Body() data: CreateInformationDto) {
    await this.informationService.addUpdateInformation(data);
    return {
      message: data.action_id ? 'Information has been updated' : 'Information has been added',
      redirect: '/admin/information/list',
    };
  }

  @Delete()
  async deleteInformation(@Query('id') id: string) {
    return await this.informationService.deleteInformation(id);
  }

}
