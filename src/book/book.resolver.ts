import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { AuthorService } from 'src/author/author.service';
import { Author } from 'src/author/models/author.schema';
import { BookService } from './book.service';
import { GetBookArgs } from './dto/args/get-book.args';
import { CreateBookInput } from './dto/inputs/create-book.input';
import { Book } from './models/book.schema';

@Resolver(() => Book)
export class BookResolver {
  constructor(
    private bookService: BookService,
    private authorService: AuthorService,
  ) {}

  @Query(() => [Book], { name: 'books', nullable: 'items' })
  async books() {
    return await this.bookService.findMany();
  }

  @Query(() => Book, { name: 'book', nullable: true })
  async book(@Args() { id }: GetBookArgs) {
    return await this.bookService.findById(id);
  }

  @Mutation(() => Book)
  async createBook(@Args('input') book: CreateBookInput) {
    return await this.bookService.createBook(book);
  }

  @ResolveField(() => Author)
  async author(@Parent() book: Book) {
    return await this.authorService.findById(book.author);
  }
}
