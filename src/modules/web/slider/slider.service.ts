import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { I18nService } from 'nestjs-i18n';
import { Slider, SliderModel } from 'src/models/slide.schema';


@Injectable()
export class SliderService {
  constructor(
    @InjectModel(Slider.name)
    private readonly sliderModel: SliderModel,
    private readonly i18n: I18nService,
  ) { }

  findAll() {
    return this.sliderModel.find().exec();
  }

}
