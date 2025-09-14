import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument } from 'mongoose';
import { PaginateModel } from 'src/shared/plugins/mongoose-plugin/pagination/types';
import { SoftDeleteModel } from 'src/shared/plugins/mongoose-plugin/soft-delete/types';
import { paginatePlugin } from 'src/shared/plugins/mongoose-plugin/pagination/plugin';
import { softDeletePlugin } from 'src/shared/plugins/mongoose-plugin/soft-delete/plugin';

export type AddressDocument = HydratedDocument<Address>;
mongoose.Schema.Types.String.set('trim', true);

@Schema({
  timestamps: true,
})
export class Address {
  @ApiProperty()
  @Prop({ type: String, required: true })
  name: string;

  @ApiProperty()
  @Prop({ type: String, required: true })
  description: string;


  @ApiProperty()
  @Prop({ type: Boolean, default: true })
  isActive: boolean;
}

export const AddressSchema = SchemaFactory.createForClass(Address);

AddressSchema.plugin(paginatePlugin);
AddressSchema.plugin(softDeletePlugin);

export type AddressModel = PaginateModel<Address> &
  SoftDeleteModel<Address>;
