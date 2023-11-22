import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/user-login.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signIn(@Body() userLoginDto: UserLoginDto) {
    return this.authService.signIn(userLoginDto);
  }

  @Post('signup')
  signUp(@Body() userDto: UpdateUserDto) {
    return this.authService.signUp(userDto);
  }
}
