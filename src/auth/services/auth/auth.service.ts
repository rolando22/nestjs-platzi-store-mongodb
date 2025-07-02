import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { User } from 'src/users/entities/user.entity';
import { Token } from '../../models/token.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: User['email'],
    password: User['password'],
  ): Promise<User | null> {
    const user = await this.userModel.findOne({ email }).exec();

    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) return null;

    return user.toObject();
  }

  generateJWT(user: User) {
    const payload: Token = { role: user.role, sub: user._id };

    return {
      accessToken: this.jwtService.sign(payload),
      user,
    };
  }
}
