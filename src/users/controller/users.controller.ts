import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AdminProfileDto } from '../dtos/admin.profile.dto';
import { UserDto } from '../dtos/user.dto';
import { UsersService } from '../services/users.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { ProfileDto } from '../dtos/profile.dto';

@Serialize(UserDto)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post(':userId/viewed-products')
  async addViewedProduct(@Param('userId') userId: string, @Body('productId') productId: string) {
    return this.usersService.addViewedProduct(userId, productId);
  }

  @Get(':userId/viewed-products')
  async getViewedProducts(@Param('userId') userId: string) {
    return this.usersService.getViewedProducts(userId);
  }
  @UseGuards(AdminGuard)
  @Get()
  getUsers() {
    return this.usersService.findAll();
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteOne(id);
  }

  @UseGuards(AdminGuard)
  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @UseGuards(AdminGuard)
  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() credentials: UserDto
  ) {
    return this.usersService.adminUpdate(id, credentials);
  }
  @UseGuards(AdminGuard)
   @Patch(':id')
  async updateUserProfile(
    @Param('id') id: string,
    @Body() credentials: ProfileDto
  ) {
    return this.usersService.update(id, credentials);
  }
}
