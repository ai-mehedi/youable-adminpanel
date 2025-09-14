import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument } from 'mongoose';
import { PaginateModel } from 'src/shared/plugins/mongoose-plugin/pagination/types';
import { SoftDeleteModel } from 'src/shared/plugins/mongoose-plugin/soft-delete/types';
import { paginatePlugin } from 'src/shared/plugins/mongoose-plugin/pagination/plugin';
import { softDeletePlugin } from 'src/shared/plugins/mongoose-plugin/soft-delete/plugin';

import { Industry } from './industry.schema';
import { Blog } from './blog.schema';
export type CategoryDocument = HydratedDocument<Category>;
mongoose.Schema.Types.String.set('trim', true);

@Schema({
  timestamps: true,
})
export class Category {
  @ApiProperty()
  @Prop({ type: String, required: true })
  title: string;

  @ApiProperty()
  @Prop({ type: String, unique: true, required: true })
  slug: string;

  @ApiProperty({ type: [String], description: 'Array of Industry IDs' })
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Industry" }], required: false })
  industry: mongoose.Types.ObjectId[];

  @ApiProperty()
  @Prop({ type: String, required: true })
  thumbnail: string;

  @ApiProperty({ type: [String], description: 'Array of Blog IDs' })
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blog" }], required: false })
  blog: mongoose.Types.ObjectId[];

  @ApiProperty()
  @Prop({ type: String, required: true })
  description: string;

  @ApiProperty()
  @Prop({ type: String, required: true })
  type: string;


  @ApiProperty()
  @Prop({ type: Boolean, default: true })
  isActive: boolean;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

CategorySchema.plugin(paginatePlugin);
CategorySchema.plugin(softDeletePlugin);

export type CategoryModel = PaginateModel<Category> & SoftDeleteModel<Category>;
