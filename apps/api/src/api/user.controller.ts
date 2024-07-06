import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import UserService from 'src/user/application/user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DecreaseCreditBalanceDto } from './dto/decrease-credit-balance.dto';
import { UserDto } from './dto/user.dto';
import ImageService from 'src/image/application/image.service';
import { AddImageDto } from './dto/add-image.dto';

@Controller('user')
export default class UserController {
  constructor(
    private readonly userSvc: UserService,
    private readonly imageSvc: ImageService,
  ) {}

  @Post()
  async createUser(@Body() user: CreateUserDto) {
    await this.userSvc.create(user);
    return { message: 'User created successfully' };
  }

  @Get(':id')
  async getUserById(@Param('id') userId: string): Promise<UserDto> {
    const user = await this.userSvc.getUser({ userId });
    return { ...user, id: user.clerkId };
  }

  @Patch(':id')
  async updateUser(
    @Param('id') userId: string,
    @Body() user: UpdateUserDto,
  ): Promise<UserDto> {
    const updatedUser = await this.userSvc.update({ userId, ...user });
    return { ...updatedUser, id: updatedUser.clerkId };
  }

  @Delete(':id')
  async deleteUser(@Param('id') userId: string) {
    await this.userSvc.delete({ userId });
    return { message: 'User deleted successfully' };
  }

  @Patch(':id/decrease-balance')
  async decreaseCreditBalance(
    @Param('id') userId: string,
    @Body() decreaseCreditBalanceDto: DecreaseCreditBalanceDto,
  ): Promise<UserDto> {
    const updatedUser = await this.userSvc.decreaseCreditBalance({
      userId,
      amount: decreaseCreditBalanceDto.amount,
    });
    return { ...updatedUser, id: updatedUser.clerkId };
  }

  @Post(':id/images')
  async addImageToUser(
    @Param('id') userId: string,
    @Body() addImageDto: AddImageDto,
  ) {
    const author = await this.userSvc.getUser({ userId });
    const newImage = await this.imageSvc.addImage({
      author,
      createImageProps: addImageDto.image,
    });
    return { message: 'Image added successfully', image: newImage };
  }
}
