import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AddressService } from './address.service';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('address')
@Controller('web/address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}
  @Get()
  findAll() {
    return this.addressService.findAll();
  }

}
