import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('web/comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) { }

  @Post('industry')
  create(@Body() createCommentDto: CreateCommentDto) {
    console.log(createCommentDto);
    return this.commentService.create(createCommentDto);
  }


  @Post('blog')
  blogcreate(@Body() createCommentDto: CreateCommentDto) {
    console.log(createCommentDto);
    return this.commentService.Blogcomment(createCommentDto);
  }

}
