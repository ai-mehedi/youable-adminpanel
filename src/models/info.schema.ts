import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument } from 'mongoose';
import { PaginateModel } from 'src/shared/plugins/mongoose-plugin/pagination/types';
import { SoftDeleteModel } from 'src/shared/plugins/mongoose-plugin/soft-delete/types';
import { paginatePlugin } from 'src/shared/plugins/mongoose-plugin/pagination/plugin';
import { softDeletePlugin } from 'src/shared/plugins/mongoose-plugin/soft-delete/plugin';

export type InfoDocument = HydratedDocument<Info>;
mongoose.Schema.Types.String.set('trim', true);

@Schema({
    timestamps: true,
})
export class Info {
    @ApiProperty()
    @Prop({ type: String, required: true })
    whatsappnumber: string;

    @ApiProperty()
    @Prop({ type: String, required: true })
    contactnumber: string;

    @ApiProperty()
    @Prop({ type: String, required: true })
    email: string;

    @ApiProperty()
    @Prop({ type: Boolean, default: true })
    isActive: boolean;
}

export const InfoSchema = SchemaFactory.createForClass(Info);

InfoSchema.plugin(paginatePlugin);
InfoSchema.plugin(softDeletePlugin);

export type InfoModel = PaginateModel<Info> & SoftDeleteModel<Info>;
