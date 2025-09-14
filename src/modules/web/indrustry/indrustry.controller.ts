import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IndrustryService } from './indrustry.service';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('indrustry')
@Controller('web/indrustry')
export class IndrustryController {
  constructor(private readonly indrustryService: IndrustryService) { }
  @Get()
  findAll() {
    return this.indrustryService.findAll();
  }
  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.indrustryService.findOne(slug);
  }
}
