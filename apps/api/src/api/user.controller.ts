import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import UserService from 'src/user/application/user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export default class UserController {
  constructor(private readonly userSvc: UserService) {}

  @Post()
  async createUser(@Body() user: CreateUserDto) {
    const newUser = await this.userSvc.create(user);
    return { message: 'User created successfully', user: newUser };
  }

  @Get(':id')
  async getUserById(@Param('id') userId: string) {
    const user = await this.userSvc.getUser({ userId });
    return user;
  }

  @Patch(':id')
  async updateUser(@Param('id') userId: string, @Body() user: UpdateUserDto) {
    const updatedUser = await this.userSvc.update({ userId, ...user });
    return { message: 'User updated successfully', user: updatedUser };
  }

  @Delete(':id')
  async deleteUser(@Param('id') userId: string) {
    await this.userSvc.delete({ userId });
    return { message: 'User deleted successfully' };
  }
}
