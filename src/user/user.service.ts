import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { nanoid } from 'nanoid';
import { ConfirmUserInput } from './dto/inputs/confirm-user.input';
import { CreateUserInput } from './dto/inputs/create-user.input';
import { User, UserDocument } from './models/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(input: CreateUserInput): Promise<UserDocument> {
    const confirmToken = nanoid(32);
    return await this.userModel.create({ ...input, confirmToken });
  }

  async confirmUser(input: ConfirmUserInput): Promise<UserDocument> {
    const { email, confirmToken } = input;
    const user = await this.userModel.findOne({ email });
    if (!user) throw new Error('User does not exist');
    if (confirmToken !== user.confirmToken)
      throw new Error('Confirm Token is incorrect');
    user.active = true;
    await user.save();
    return user;
  }
}
