import { Controller, Get, Post, Body, Patch, Param, Delete, Query, NotFoundException, Render } from '@nestjs/common';
import { SliderService } from './slider.service';
import { CreateSliderDto } from './dto/create-slider.dto';
import { UpdateSliderDto } from './dto/update-slider.dto';
import { PaginationQuery } from 'src/shared/dto/pagination.dto';

@Controller('admin/portal/sliders')
export class SliderController {
  constructor(private readonly sliderService: SliderService) { }

  @Get('list')
  @Render('admin/portal/sliders/list')
  slidersList() {
    return {
      title: 'Sliders',
    };
  }

  @Post('list')
  async slidersListPaginated(@Query() queryDto: PaginationQuery) {
    const result = await this.sliderService.getPaginatedList(queryDto);
    return result;
  }

  @Get('add')
  @Render('admin/portal/sliders/add')
  async addUpdateSlider(@Query('id') id: string) {
    let title = 'Add Slider';
    let is_update = false;
    let action_data = {};
    if (id) {
      const checkAdmin = await this.sliderService.findSliderById(id);
      if (!checkAdmin) {
        throw new NotFoundException({
          message: 'Slider not found',
        });
      }
      title = 'Update Slider';
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
  async addUpdateSliderSubmit(@Body() data: CreateSliderDto) {
    await this.sliderService.addUpdateSlider(data);
    return {
      message: data.action_id ? 'Slider has been updated' : 'Slider has been added',
      redirect: '/admin/sliders/list',
    };
  }

  @Delete()
  async deleteSlider(@Query('id') id: string) {
    return await this.sliderService.deleteSlider(id);
  }
}
