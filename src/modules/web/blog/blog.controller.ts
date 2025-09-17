import { Controller, Get, Param, Query } from '@nestjs/common';
import { BlogService } from './blog.service';
import { ApiTags } from '@nestjs/swagger';
import { PaginationQuery } from 'src/shared/dto/pagination.dto';

@ApiTags('Blogs')
@Controller('web/blog')
export class BlogController {
  constructor(private readonly BlogService: BlogService) { }

  @Get()
  findAllBlogs() {
    return this.BlogService.findAllBlogs();
  }

  @Get(':slug')
 async findOneBlog(@Param('slug') slug: string) {
    return await this.BlogService.findBlogBySlug(slug);
  }
}
