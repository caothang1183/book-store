import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { BookService } from 'src/book/book.service';
import { AuthorService } from './author.service';
import { GetAuthorArgs } from './dto/args/get-author.args';
import { CreateAuthorInput } from './dto/inputs/create-author.input';
import { Author } from './models/author.schema';

@Resolver(() => Author)
export class AuthorResolver {
  constructor(
    private authorsService: AuthorService,
    private bookService: BookService,
  ) {}

  @Query(() => [Author], { name: 'authors', nullable: 'items' })
  async authors() {
    return await this.authorsService.findMany();
  }
  @Query(() => Author, { name: 'author', nullable: true })
  async author(@Args() { id }: GetAuthorArgs) {
    return await this.authorsService.findById(id);
  }

  @Mutation(() => Author)
  async createAuthor(@Args('input') author: CreateAuthorInput) {
    return await this.authorsService.createAuthor(author);
  }

  @ResolveField()
  async books(@Parent() parent: Author) {
    return await this.bookService.findByAuthorId(parent._id);
  }
}
