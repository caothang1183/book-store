import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Book } from 'src/book/models/book.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema()
@ObjectType()
export class Author {
  @Field(() => ID)
  _id: string;

  @Prop({ required: true })
  @Field()
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Book' })
  @Field(() => [Book])
  books: Book[];
}

export type AuthorDocument = Author & mongoose.Document;

export const AuthorSchema = SchemaFactory.createForClass(Author);
