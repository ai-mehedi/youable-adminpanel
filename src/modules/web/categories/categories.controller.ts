import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Categories')
@Controller('web/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @Get()
  findIndustryCategoryAll() {
    return this.categoriesService.findAllIndustryCategory();
  }
  @Get('blog')
  findBlogCategoryAll() {
    return this.categoriesService.findAllBlogCategory();
  }
@Get('slug/:slug')
  findCategoryBySlug(@Param('slug') slug: string) {
    return this.categoriesService.findCategoryBySlug(slug);
  }

}
