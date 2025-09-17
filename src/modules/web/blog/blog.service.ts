import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { I18nService } from 'nestjs-i18n';
import { Blog, BlogModel } from 'src/models/blog.schema';
import { PaginationQuery } from 'src/shared/dto/pagination.dto';
import { PaginationOptions } from 'src/shared/plugins/mongoose-plugin/pagination/types';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog.name)
    private readonly blogModel: BlogModel,
    private readonly i18n: I18nService,
  ) { }

  async findAllBlogs() {
    const blogs = await this.blogModel.find({ isActive: true });
    return {
      blogs,
    };
  }

  async findBlogBySlug(slug: string) {
    const blog = await this.blogModel
      .findOne({
        slug,
        isActive: true,
      }).populate('category').populate('author').populate('comments');

    if (!blog) {
      throw new NotFoundException({
        message: this.i18n.t('response-messages.field.not_found'),
        field: 'blog',
      });
    }
    return {
      message: this.i18n.t('response-messages.field.retrieved', {
        args: {
          field: 'blog',
        },
      }),
      blog,
    };
  }
}
