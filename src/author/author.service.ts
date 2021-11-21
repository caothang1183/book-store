import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAuthorInput } from './dto/inputs/create-author.input';
import { Author, AuthorDocument } from './models/author.schema';

@Injectable()
export class AuthorService {
  constructor(
    @InjectModel(Author.name) private authorModel: Model<AuthorDocument>,
  ) {}

  async findMany(): Promise<AuthorDocument[]> {
    return this.authorModel.find().lean();
  }
  async findById(id: Author | string): Promise<AuthorDocument> {
    return this.authorModel.findById(id).lean();
  }

  async createAuthor(author: CreateAuthorInput): Promise<AuthorDocument> {
    const createdAuthor = new this.authorModel(author);
    return await createdAuthor.save();
  }
}
