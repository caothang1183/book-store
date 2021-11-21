import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ConfirmUserInput } from './dto/inputs/confirm-user.input';
import { CreateUserInput } from './dto/inputs/create-user.input';
import { User } from './models/user.schema';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async registerUser(@Args('input') input: CreateUserInput) {
    return await this.userService.createUser(input);
  }

  @Mutation(() => User)
  async confirmUser(@Args('input') input: ConfirmUserInput) {
    return await this.userService.confirmUser(input);
  }
}
