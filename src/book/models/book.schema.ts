import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Author } from 'src/author/models/author.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type BookDocument = Book & mongoose.Document;

@Schema()
@ObjectType()
export class Book {
  @Field(() => ID)
  _id: string;

  @Prop({ required: true })
  @Field()
  title: string;

  @Prop({ default: false })
  @Field()
  isPopulate: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Author.name })
  @Field(() => Author)
  author: Author | string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
