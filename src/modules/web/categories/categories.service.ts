import { Injectable } from '@nestjs/common';
import { Category, CategoryModel } from 'src/models/category.schema';
import { InjectModel } from '@nestjs/mongoose';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class CategoriesService {

  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: CategoryModel,
    private readonly i18n: I18nService,
  ) { }

  async findAllIndustryCategory() {
    return await this.categoryModel.find({ isActive: true, type: "industry" })
      .populate('industry');
  }


  async findAllBlogCategory() {
    return await this.categoryModel.find({ isActive: true, type: "blog" })
      .populate('blog');
  }

  async findCategoryBySlug(slug: string) {
    return await this.categoryModel.findOne({ slug: slug, isActive: true }).populate('industry');
  }
}
