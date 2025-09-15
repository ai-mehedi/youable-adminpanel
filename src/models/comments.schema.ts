import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { PaginateModel } from 'src/shared/plugins/mongoose-plugin/pagination/types';
import { SoftDeleteModel } from 'src/shared/plugins/mongoose-plugin/soft-delete/types';
import { paginatePlugin } from 'src/shared/plugins/mongoose-plugin/pagination/plugin';
import { softDeletePlugin } from 'src/shared/plugins/mongoose-plugin/soft-delete/plugin';

export type CommentDocument = HydratedDocument<Comment>;
mongoose.Schema.Types.String.set('trim', true);

@Schema({
    timestamps: true,
})
export class Comment {
    @ApiProperty()
    @Prop({ type: String, required: true })
    name: string;

    @ApiProperty()
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Industry", required: false })
    industry: Types.ObjectId;

    @ApiProperty()
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Blog", required: false })
    blog: Types.ObjectId;


    @ApiProperty()
    @Prop({ type: String, required: true })
    email: string;

    @ApiProperty()
    @Prop({ type: String, required: true })
    description: string;

    @ApiProperty()
    @Prop({ type: Boolean, default: true })
    isActive: boolean;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);

CommentSchema.plugin(paginatePlugin);
CommentSchema.plugin(softDeletePlugin);

export type CommentModel = PaginateModel<Comment> & SoftDeleteModel<Comment>;
