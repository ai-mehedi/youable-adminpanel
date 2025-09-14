import { Controller, Get, Post, Body, Patch, Param, Delete, Render, Query, NotFoundException } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { PaginationQuery } from 'src/shared/dto/pagination.dto';

@Controller('admin/portal/address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get('list')
  @Render('admin/portal/address/list')
  addressList() {
    return {
      title: 'address',
    };
  }

  @Post('list')
  async addressListPaginated(@Query() queryDto: PaginationQuery) {
    const result = await this.addressService.getPaginatedList(queryDto);
    return result;
  }

  @Get('add')
  @Render('admin/portal/address/add')
  async addUpdateFaq(@Query('id') id: string) {
    let title = 'Add address';
    let is_update = false;
    let action_data = {};
    if (id) {
      const checkAdmin = await this.addressService.findAddressById(id);
      if (!checkAdmin) {
        throw new NotFoundException({
          message: 'Address not found',
        });
      }
      title = 'Update Address';
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
  async addUpdateAddressSubmit(@Body() data: CreateAddressDto) {
    await this.addressService.addUpdateAddress(data);
    return {
      message: data.action_id ? 'Address has been updated' : 'Address has been added',
      redirect: '/admin/portal/address/list',
    };
  }

  @Delete()
  async deleteAddress(@Query('id') id: string) {
    return await this.addressService.deleteAddress(id);
  }
}
