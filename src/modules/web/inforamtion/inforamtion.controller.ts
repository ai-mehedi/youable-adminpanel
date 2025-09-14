import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InforamtionService } from './inforamtion.service';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Information')
@Controller('web/inforamtion')
export class InforamtionController {
  constructor(private readonly inforamtionService: InforamtionService) {}

@Get()
  findAll() {
    return this.inforamtionService.findAll();
  }

}
