import { Injectable } from '@nestjs/common';
import { omit } from 'lodash';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { nanoid } from 'nanoid';
import Ctx from 'src/types/context.type';
import { signJwt } from 'src/utils/jwt.util';
import { ConfirmUserInput } from './dto/inputs/confirm-user.input';
import { CreateUserInput } from './dto/inputs/create-user.input';
import { LoginUserInput } from './dto/inputs/login-user.input';
import { User, UserDocument } from './models/user.schema';
import { CookieOptions } from 'express';

const cookieOptions: CookieOptions = {
  domain: 'localhost',
  secure: false,
  sameSite: 'strict',
  httpOnly: true,
  path: '/',
};

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
    if (user.active) throw new Error('Account has  been activated');
    user.active = true;
    await user.save();
    return user;
  }

  async login(input: LoginUserInput, context: Ctx): Promise<UserDocument> {
    const { username, password } = input;
    const user = await this.userModel
      .findOne({ username })
      .select('-__v -confirmToken');
    if (!user || !(await user.comparePassword(password))) {
      throw new Error('Invalid username or password');
    }
    if (!user.active) throw new Error('Please confirm your e-mail address');
    const jwt = signJwt(omit(user.toJSON(), ['password'], ['active']));
    context.res.cookie('token', jwt, cookieOptions);
    return user;
  }
}
