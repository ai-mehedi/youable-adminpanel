import { Controller, Get, Param, Query } from '@nestjs/common';
import { BlogService } from './blog.service';
import { ApiTags } from '@nestjs/swagger';
import { PaginationQuery } from 'src/shared/dto/pagination.dto';

@ApiTags('Blogs')
@Controller('web/blog')
export class BlogController {
  constructor(private readonly BlogService: BlogService) {}

  @Get()
  findAllBlogs(@Query() queryDto: PaginationQuery) {
    return this.BlogService.findAllBlogs(queryDto);
  }

  @Get(':id')
  findOneBlog(@Param('id') id: string) {
    return this.BlogService.findBlogById(id);
  }
}
