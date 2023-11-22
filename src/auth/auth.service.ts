import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserLoginDto } from './dto/user-login.dto';
import { UsersService } from 'src/users/users.service';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(userLoginDto: UserLoginDto) {
    if (userLoginDto.password !== userLoginDto.confirmPassword) {
      throw new HttpException('Passwords do not match', HttpStatus.BAD_REQUEST);
    }
    const user = await this.usersService.findOneByEmail(userLoginDto.email);

    if (!compareSync(userLoginDto.password, user.password)) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.email, admin: user.admin };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
