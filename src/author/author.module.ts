import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookService } from 'src/book/book.service';
import { Book, BookSchema } from 'src/book/models/book.schema';
import { AuthorResolver } from './author.resolver';
import { AuthorService } from './author.service';
import { Author, AuthorSchema } from './models/author.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Book.name, schema: BookSchema },
      { name: Author.name, schema: AuthorSchema },
    ]),
  ],
  providers: [AuthorResolver, BookService, AuthorService],
})
export class AuthorModule {}
