import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument } from 'mongoose';
import { PaginateModel } from 'src/shared/plugins/mongoose-plugin/pagination/types';
import { SoftDeleteModel } from 'src/shared/plugins/mongoose-plugin/soft-delete/types';
import { paginatePlugin } from 'src/shared/plugins/mongoose-plugin/pagination/plugin';
import { softDeletePlugin } from 'src/shared/plugins/mongoose-plugin/soft-delete/plugin';

export type SliderDocument = HydratedDocument<Slider>;
mongoose.Schema.Types.String.set('trim', true);

@Schema({
    timestamps: true,
})
export class Slider {
    @ApiProperty()
    @Prop({ type: String, required: true })
    title: string;

    @ApiProperty()
    @Prop({ type: String, required: true })
    thumbnail: string;

    @ApiProperty()
    @Prop({ type: String, required: true })
    description: string;

    @ApiProperty()
    @Prop({ type: String, required: true })
    happyclients: string;
    @ApiProperty()
    @Prop({ type: String, required: true })
    successfulprojects: string;

    @ApiProperty()
    @Prop({ type: String, required: true })
    certificationsdelivered: string;

    @ApiProperty()
    @Prop({ type: String, required: true })
    customersatisfaction: string;

    @ApiProperty()
    @Prop({ type: Boolean, default: true })
    isActive: boolean;
}

export const SliderSchema = SchemaFactory.createForClass(Slider);

SliderSchema.plugin(paginatePlugin);
SliderSchema.plugin(softDeletePlugin);

export type SliderModel = PaginateModel<Slider> & SoftDeleteModel<Slider>;
