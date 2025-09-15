import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { I18nService } from 'nestjs-i18n';
import { Industry, IndustryModel } from 'src/models/industry.schema';
import { Blog, BlogModel } from 'src/models/blog.schema';
import { Comment, CommentModel } from 'src/models/comments.schema';
@Injectable()
export class CommentService {

  constructor(
    @InjectModel(Comment.name)
    private readonly commentModel: CommentModel,
    @InjectModel(Industry.name)
    private readonly industryModel: IndustryModel,
    @InjectModel(Blog.name)
    private readonly blogModel: BlogModel,
    private readonly i18n: I18nService,
  ) { }



  async create(createCommentDto: CreateCommentDto) {
    const createdComment = await this.commentModel.create(createCommentDto);
    await createdComment.save();
    await this.industryModel.updateOne({ _id: createCommentDto.industry }, { $push: { comments: createdComment._id } });
    return createdComment;
  }

async Blogcomment(createCommentDto: CreateCommentDto) {
    const createdComment = await this.commentModel.create(createCommentDto);
    await createdComment.save();
    await this.blogModel.updateOne({ _id: createCommentDto.blog }, { $push: { comments: createdComment._id } });
    return createdComment;
  }

}
