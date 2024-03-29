import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateBookInput {
  @Field()
  title: string;

  @Field()
  isPopulate: boolean;

  @Field()
  author: string;
}
