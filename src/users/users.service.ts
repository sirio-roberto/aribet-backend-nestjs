import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    createUserDto.password = await this.hashPassword(createUserDto.password);
    const user = await this.prisma.user.create({
      data: createUserDto,
    });

    delete user.password;
    return user;
  }

  async findAll() {
    const users = await this.prisma.user.findMany({ where: { active: true } });
    return users.map((user) => {
      delete user.password;
      return user;
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { id, active: true },
    });

    delete user.password;
    return user;
  }

  findOneByEmail(email: string) {
    return this.prisma.user.findUniqueOrThrow({
      where: { email, active: true },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    if (updateUserDto.password !== updateUserDto.confirmPassword) {
      throw new HttpException('Passwords do not match', HttpStatus.BAD_REQUEST);
    }
    delete updateUserDto.confirmPassword;
    updateUserDto.password = await this.hashPassword(updateUserDto.password);
    Object.assign(user, updateUserDto);

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: user,
    });

    delete updatedUser.password;
    return updatedUser;
  }

  async remove(id: number) {
    try {
      const user = await this.findOne(id);
      user.active = false;
      await this.prisma.user.update({
        where: { id },
        data: user,
      });
    } catch {}
  }

  private async hashPassword(password: string) {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }

  async toggleAdmin(id: number) {
    const user = await this.findOne(id);
    user.admin = !user.admin;
    await this.prisma.user.update({
      where: { id, active: true },
      data: user,
    });
    return user;
  }
}
