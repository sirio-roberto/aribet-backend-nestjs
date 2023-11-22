import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserLoginDto } from './dto/user-login.dto';
import { UsersService } from 'src/users/users.service';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(userLoginDto: UserLoginDto) {
    const user = await this.usersService.findOneByEmail(userLoginDto.email);

    if (!compareSync(userLoginDto.password, user.password)) {
      throw new UnauthorizedException('Wrong password');
    }

    return this.getAccessToken(user);
  }

  async signUp(userDto: UpdateUserDto) {
    if (userDto.password !== userDto.confirmPassword) {
      throw new UnauthorizedException('Passwords do not match');
    }
    delete userDto.confirmPassword;

    const user = await this.usersService.create(userDto);
    return this.getAccessToken(user);
  }

  private async getAccessToken(user: User) {
    const payload = { sub: user.id, username: user.email, admin: user.admin };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
