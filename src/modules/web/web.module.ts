import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { NewsletterModule } from './newsletter/newsletter.module';
import { ContactModule } from './contact/contact.module';
import { UserModule } from './user/user.module';
import { FaqModule } from './faq/faq.module';
import { FaceModule } from './face/face.module';
import { SpaceModule } from './space/space.module';
import { BlogModule } from './blog/blog.module';
import { SliderModule } from './slider/slider.module';
import { CategoriesModule } from './categories/categories.module';
import { AddressModule } from './address/address.module';
import { InforamtionModule } from './inforamtion/inforamtion.module';
import { IndrustryModule } from './indrustry/indrustry.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    AuthModule,
    NewsletterModule,
    ContactModule,
    UserModule,
    FaqModule,
   
    FaceModule,
    SpaceModule,
    BlogModule,
    SliderModule,
    CategoriesModule,
    AddressModule,
    InforamtionModule,
    IndrustryModule,
    CommentModule,
  ],
})
export class WebModule {}
