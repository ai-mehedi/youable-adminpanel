import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { I18nService } from 'nestjs-i18n';
import { Address, AddressModel } from 'src/models/address-schema';

@Injectable()
export class AddressService {
  constructor(
    @InjectModel(Address.name)
    private readonly addressModel: AddressModel,
    private readonly i18n: I18nService,
  ) { }

  async findAll() {

    return await this.addressModel.find().lean();
  }

}
