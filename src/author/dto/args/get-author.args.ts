import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class GetAuthorArgs {
  @Field()
  id: string;
}
