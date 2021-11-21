import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBookInput } from './dto/inputs/create-book.input';
import { Book, BookDocument } from './models/book.schema';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}
  async findMany(): Promise<BookDocument[]> {
    return this.bookModel.find().lean();
  }

  async findById(id: string): Promise<BookDocument> {
    return this.bookModel.findById(id).lean();
  }

  async findByAuthorId(authorId: string): Promise<BookDocument[]> {
    return this.bookModel.find({ author: authorId }).lean();
  }

  async createBook(book: CreateBookInput): Promise<BookDocument> {
    const createdBook = new this.bookModel(book);
    return await createdBook.save();
  }
}
