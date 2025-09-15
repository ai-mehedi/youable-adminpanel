import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { I18nService } from 'nestjs-i18n';
import { join } from 'path';
import { PaginationUI } from 'src/common/helpers/utils/pagination-uri.utils';
import { RenderEjsFile } from 'src/common/helpers/utils/utils';
import { Comment, CommentModel } from 'src/models/comments.schema';
import { PaginationQuery } from 'src/shared/dto/pagination.dto';
import { PaginationOptions } from 'src/shared/plugins/mongoose-plugin/pagination/types';

@Injectable()
export class CommentService {
 constructor(
     @InjectModel(Comment.name)
     private readonly commentModel: CommentModel,
     private readonly i18n: I18nService,
   ) {}
 
   async findCommentById(_id: string) {
     return this.commentModel.findById(_id);
   }


 
   async getPaginatedList({
     limit,
     page,
     sortBy,
     sortOrder,
     searchText,
   }: PaginationQuery) {
     const options: PaginationOptions = { page, limit };
     const pagination = new PaginationUI();
     const renderPath = 'views/admin/portal/comments/widgets/list.ejs';
     const searchBy = ['title'];
 
     limit = limit || 25;
     pagination.per_page = limit;
     const offset = (page - 1) * limit;
 
     options.sortOrder = {
       direction: sortOrder,
       id: sortBy,
     };
 
     if (searchText) {
       options.search = {
         searchText,
         searchBy,
       };
     }

     const results = await this.commentModel.paginate({}, options);

     const paginate_ui = pagination.getAllPageLinks(
       Math.ceil(results.total / limit),
       Math.abs(results.page),
     );
 
     let html_data = '';
     let serial_number = offset;
 
     for (const result of results.records) {
       serial_number++;
       html_data += await RenderEjsFile(join(global.ROOT_DIR, renderPath), {
         result,
         serial_number,
       });
     }
 
     return {
       data_exist: results.total > 0,
       data: html_data,
       total_count: results.total,
       pagination: paginate_ui,
     };
   }

   async deleteComment(id: string) {
     const result = await this.commentModel.findOneAndDelete({
       _id: id,
     });
 
     if (!result) {
       throw new NotFoundException({
         message: 'Comment not found',
       });
     }
     return {
       message: 'Comment deleted successfully',
     };
   }
}
