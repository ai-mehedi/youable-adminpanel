import { Controller, Get, Post, Body, Patch, Param, Delete, Render, Query } from '@nestjs/common';
import { CommentService } from './comment.service';
import { PaginationQuery } from 'src/shared/dto/pagination.dto';

@Controller('admin/portal/comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) { }
  @Get('list')
  @Render('admin/portal/comments/list')
  commentsList() {
    return {
      title: 'Comments',
    };
  }

  @Post('list')
  async commentsListPaginated(@Query() queryDto: PaginationQuery) {
    const result = await this.commentService.getPaginatedList(queryDto);
    return result;
  }

  @Delete()
  async deleteComment(@Query('id') id: string) {
    return await this.commentService.deleteComment(id);
  }
}
