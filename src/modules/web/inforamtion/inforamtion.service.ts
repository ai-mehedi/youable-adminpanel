import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { I18nService } from 'nestjs-i18n';
import { Info, InfoModel } from 'src/models/info.schema';

@Injectable()
export class InforamtionService {
  constructor(
    @InjectModel(Info.name)
    private readonly infoModel: InfoModel,
    private readonly i18n: I18nService,
  ) { }

  async findAll() {
    return await this.infoModel.find().exec();
  }


}
