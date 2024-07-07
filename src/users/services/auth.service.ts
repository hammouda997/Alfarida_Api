import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { encryptPassword } from 'src/utils';
import { Profile } from 'passport-google-oauth20';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOne(email);

    if (!user) throw new NotFoundException('Invalid email or password');

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword)
      throw new BadRequestException('Invalid email or password');

    return user;
  }

  async login(email: string, userId: string) {
    const payload = { email, sub: userId };
  
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
  

  async register(firstname: string, lastname: string , email: string, password: string) {
    const existingUser = await this.usersService.findOne(email);

    if (existingUser) throw new BadRequestException('Email is already in use.');

    const encryptedPassword = await encryptPassword(password);

    const user = await this.usersService.create({
      email,
      password: encryptedPassword,
      isAdmin: false,
      firstname,
      lastname
    });

    return user;
  }
  async googleLogin(profile: any): Promise<any> {
    try {

      let user = await this.usersService.findOne(profile.user.email);
    
      if (!user) {
        user = await this.usersService.createUserFromGoogle(profile.user);
      }
      const payload = { email: user.email, sub: user.id }; // Customize payload as per your requirements
      const authToken = this.jwtService.sign(payload); 
const userData = { user, authToken }

       return userData ;
    } catch (error) {
      throw new BadRequestException('Google authentication failed');
    }
  }
  async facebookLogin(profile: any): Promise<any> {
    try {

      let user = await this.usersService.findOne(profile.user.user.email);
   
      if (!user) {
        user = await this.usersService.createUserFromFacebook(profile.user.user.email );
      }
      const payload = { email: user.email, sub: user.id }; // Customize payload as per your requirements
      const authToken = this.jwtService.sign(payload); 
const userData = { user, authToken }

       return userData ;
    } catch (error) {
      throw new BadRequestException('Facebook authentication failed');
    }
  }
}
