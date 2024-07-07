import {
  Body,
  Controller,
  Get,
  Ip,
  NotFoundException,
  Patch,
  Post,
  Put,
  Redirect,
  Req,
  Res,
  Session,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { AuthGuards } from 'src/guards/auth.guard';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ProfileDto } from '../dtos/profile.dto';
import { RegisterDto } from '../dtos/register.dto';
import { UserDto } from '../dtos/user.dto';
import { UserDocument } from '../schemas/user.schema';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express'; 
import { last } from 'rxjs';
// @Serialize(UserDto)

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body('email') email: string, @Session() session: any,   @Ip() ipAddress: string,) {
    const user = await this.usersService.findOne(email) as UserDocument ;
    
    if (!user ) {
      // Handle the case where user data is incomplete
      throw new NotFoundException('User data is incomplete');
    }
    user.lastLogin = new Date();
    
    await user.save();
    const { accessToken } = await this.authService.login(user.email, user._id);
    const loggedUser = { 
      _id: user._id,
      name: user.firstname + ' ' + user.lastname,
      firstname: user.firstname,
      lastname: user.lastname,
      isAdmin: user.isAdmin,
      email: user.email,
      lastLogin:user.lastLogin, 
      phone:user.phone || '',
      avatar:user.avatar,
      gender:user.gender,
      ipAddress:ipAddress,
      accessToken: accessToken ,
    };
    session.user = loggedUser;
    console.log("seassion.user",session)
    return session.user; 
   }
  

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Session() session: any) {
    return session.user;
  }
  
  @Get('profiles')
  getProfiles(@Session() session: any) {
    return session.user;
  }
  @Post('logout')
  async logout(@Session() session: any) {
    session=null;
  }

  @Post('register')
  async register(
    @Body() { firstname, lastname, email, password }: RegisterDto,
    @Session() session: any
  ) {
    const user = await this.authService.register(firstname, lastname, email, password);

    const { _id, isAdmin } = user;

    const { accessToken } = await this.authService.login(firstname, user._id);

    const loggedUser = {
      firstname:user.firstname,
      lastname:user.lastname,
      _id,
      isAdmin,
      email: user.email,
      accessToken,
    };

    session.user = loggedUser;

    return loggedUser;
  }

  @UseGuards(AuthGuards)
  @Patch('profile')
  async updateUser(@Body() credentials: ProfileDto, @Session() session: any) {
    const user = await this.usersService.update(session.user._id, credentials);

    const {firstname, lastname, _id, email, isAdmin } = user;

    const updatedUser = {
      firstname,
      lastname,
      _id,
      isAdmin,
      email,
      accessToken: session.user.accessToken,
    };

    session.user = updatedUser;
  

    return updatedUser;
  }
  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookAuth(@Session() session: any){}
  @Get('google') 
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Session() session: any) {
    
  } 
  @Get('google/callback') 
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: any , @Res() res: Response , @Session() session: any) {  
    const userData = await this.authService.googleLogin(req);
const user = userData.user
const { name, _id, email, isAdmin } = user;
    const { accessToken } = await this.authService.login(userData.name, userData._id);

    const loggedUser = { name, _id, isAdmin, email, accessToken };

    session.user = loggedUser;
  
    res.redirect('http://localhost:3000/login/sucess')
    return {loggedUser};
  
  }
  

  @Get('facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  async facebookAuthRedirect(@Req() req: any, @Res() res: Response, @Session() session: any) {
    try {
      const userData = await this.authService.facebookLogin(req);
      const user = userData.user
      const { name, _id, email, isAdmin } = user;
      const { accessToken } = await this.authService.login(userData.name, userData._id);
      const loggedUser = { name, _id, isAdmin, email, accessToken };
      session.user = loggedUser;
      res.redirect('http://localhost:3000/login/sucess');
    } catch (error) {
      console.error('Facebook authentication error:', error);
      res.redirect('http://localhost:3000/login/error');
    }
  }
}
