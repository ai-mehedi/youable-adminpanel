import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { Comment, CommentSchema } from 'src/models/comments.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Industry, IndustrySchema } from 'src/models/industry.schema';
import { Blog, BlogSchema } from 'src/models/blog.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    MongooseModule.forFeature([{ name: Industry.name, schema: IndustrySchema }]),
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),

  ],


  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule { }
