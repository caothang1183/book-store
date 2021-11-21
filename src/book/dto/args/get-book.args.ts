import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class GetBookArgs {
  @Field()
  id: string;
}
