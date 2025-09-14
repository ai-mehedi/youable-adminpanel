import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SliderService } from './slider.service';

import { ApiTags } from '@nestjs/swagger';

@ApiTags('Sliders')
@Controller('web/slider')
export class SliderController {
  constructor(private readonly sliderService: SliderService) {}

  @Get()
  findAll() {
    return this.sliderService.findAll();
  }

}
