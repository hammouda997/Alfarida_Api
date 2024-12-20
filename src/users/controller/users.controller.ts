import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
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
