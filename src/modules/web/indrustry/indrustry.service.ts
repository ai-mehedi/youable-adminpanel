import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { I18nService } from 'nestjs-i18n';
import { Industry, IndustryModel } from 'src/models/industry.schema';

@Injectable()
export class IndrustryService {

  constructor(
    @InjectModel(Industry.name)
    private readonly industryModel: IndustryModel,
    private readonly i18n: I18nService,
  ) { }


  async findAll() {
    return await this.industryModel.find().exec();
  }
  async findOne(slug: string) {
    return await this.industryModel.findOne({ slug }).exec();
  }


}
