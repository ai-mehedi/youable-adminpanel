import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument } from 'mongoose';
import { PaginateModel } from 'src/shared/plugins/mongoose-plugin/pagination/types';
import { SoftDeleteModel } from 'src/shared/plugins/mongoose-plugin/soft-delete/types';
import { paginatePlugin } from 'src/shared/plugins/mongoose-plugin/pagination/plugin';
import { softDeletePlugin } from 'src/shared/plugins/mongoose-plugin/soft-delete/plugin';
import { Category } from './category.schema';
import { Types } from 'mongoose';

export type IndustryDocument = HydratedDocument<Industry>;
mongoose.Schema.Types.String.set('trim', true);

@Schema({
    timestamps: true,
})
export class Industry {
    @ApiProperty()
    @Prop({ type: String, required: true })
    title: string;
    @ApiProperty()
    @Prop({ type: String, required: true })
    slug: string;

    @ApiProperty()
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true })
    author: Types.ObjectId;

    @ApiProperty({ type: [String], description: 'Array of Comment IDs' })
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }], required: false })
    comments: mongoose.Types.ObjectId[];

    @ApiProperty()
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }], required: false })
    category: mongoose.Types.ObjectId;

    @ApiProperty()
    @Prop({ type: String, required: true })
    summary: string;

    @ApiProperty()
    @Prop({ type: String, required: true })
    thumbnail: string;

    @ApiProperty()
    @Prop({ type: String, required: true })
    description: string;

    @ApiProperty()
    @Prop({ type: Boolean, default: true })
    isActive: boolean;
}

export const IndustrySchema = SchemaFactory.createForClass(Industry);

IndustrySchema.plugin(paginatePlugin);
IndustrySchema.plugin(softDeletePlugin);

export type IndustryModel = PaginateModel<Industry> & SoftDeleteModel<Industry>;
