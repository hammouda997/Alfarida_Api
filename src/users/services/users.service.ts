import { InjectModel } from '@nestjs/mongoose';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User, UserDocument } from '../schemas/user.schema';
import { Model, Types } from 'mongoose';
import { encryptPassword } from 'src/utils';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async addViewedProduct(userId: string, productId: string): Promise<User> {
    return this.userModel.findByIdAndUpdate(
      userId,
      { $addToSet: { viewedProducts: productId } }, // Use $addToSet to avoid duplicates
      { new: true }
    );
  }
  async getViewedProducts(userId: string): Promise<string[]> {
    const user = await this.userModel.findById(userId).select('viewedProducts').exec();
    return user ? user.viewedProducts : [];
  }
  async createMany(users: Partial<UserDocument>[]): Promise<UserDocument[]> {
    const createdUsers = await this.userModel.insertMany(users);

    return createdUsers;
  }
  async createUserFromFacebook(facebookUser: any): Promise<UserDocument> {
    try {
      if (!facebookUser || !facebookUser.email || !facebookUser.name) {
        throw new BadRequestException('Invalid Google user data');
      }
  
      const { email, firstname , lastname } = facebookUser;
  
      const existingUser = await this.userModel.findOne({ email });
  
      if (existingUser) {
        return existingUser; 
      } else {
        const encryptedPassword = await encryptPassword('');
  
        const newUser = await this.create({
          email,
          firstname,
          lastname,
          password: encryptedPassword,
          isAdmin: false, 
        });
  
        return newUser;
      }
    } catch (error) {
      throw new BadRequestException('Failed to create user from Google data');
    }
  }
  async createUserFromGoogle(googleUser: any): Promise<UserDocument> {
    try {
      if (!googleUser || !googleUser.email || !googleUser.name) {
        throw new BadRequestException('Invalid Google user data');
      }
  
      const { email,  firstname,
        lastname } = googleUser;
  
      const existingUser = await this.userModel.findOne({ email });
  
      if (existingUser) {
        return existingUser; 
      } else {
        const encryptedPassword = await encryptPassword('');
  
        const newUser = await this.create({
          email,
          firstname,
          lastname,
          password: encryptedPassword,
          isAdmin: false, 
        });
  
        return newUser;
      }
    } catch (error) {
      throw new BadRequestException('Failed to create user from Google data');
    }
  }
  

  async create(user: Partial<UserDocument>): Promise<UserDocument> {
    const createdUser = await this.userModel.create(user);

    return createdUser;
  }

  async findOne(email: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ email });

    return user;
  }

  async findById(id: string): Promise<UserDocument> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid user ID.');
    }
  
    const user = await this.userModel.findById(id).populate('lastname');
  
    if (!user) {
      throw new NotFoundException('User not found.');
    }
  
    return user;
  }
  
  
  async findAll(): Promise<UserDocument[]> {
    const users = await this.userModel.find();

    return users;
  }

  async deleteOne(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id))
      throw new BadRequestException('Invalid user ID.');

    const user = await this.userModel.findById(id);

    if (!user) throw new NotFoundException('User not found.');

    await user.remove();
  }

  async update(
    id: string,
    attrs: Partial<UserDocument>
  ): Promise<UserDocument> {
    if (!Types.ObjectId.isValid(id))
      throw new BadRequestException('Invalid user ID.');
  
    const user = await this.userModel.findById(id);
  
    if (!user) throw new NotFoundException('User not found.');
  
    const existingUser = await this.findOne(attrs.email);
  
    if (existingUser && existingUser.email !== user.email)
      throw new BadRequestException('Email is already in use.');
  
    user.firstname = attrs.firstname || user.firstname;
    user.lastname = attrs.lastname || user.lastname;
    user.email = attrs.email || user.email;
    user.phone = attrs.phone || user.phone;
    if (attrs.dateOfBirth) {
      user.dateOfBirth = attrs.dateOfBirth;
    }
        if (attrs.password) {
      user.password = await encryptPassword(attrs.password);
    }
    if (attrs.addressBook) {
      user.addressBook = attrs.addressBook.map(item => ({
        ...item,
        address: item.address || '', // Ensure all required fields are provided
        city: item.city || '',
        postalCode: item.postalCode || '',
        country: item.country || '',
      }));
    }
  
    const updatedUser = await user.save();
  
    return updatedUser;
  }
  

  async adminUpdate(id: string, attrs: Partial<UserDocument>) {
    if (!Types.ObjectId.isValid(id))
      throw new BadRequestException('Invalid user ID.');

    const user = await this.userModel.findById(id);

    if (!user) throw new NotFoundException('User not found.');

    const existingUser = await this.findOne(attrs.email);

    if (existingUser && existingUser.email !== user.email)
      throw new BadRequestException('Email is already in use.');

    user.firstname = attrs.firstname || user.firstname;
    user.lastname = attrs.lastname || user.lastname;
    user.email = attrs.email || user.email;
    user.isAdmin = attrs.isAdmin !== undefined && attrs.isAdmin;

    const updatedUser = await user.save();

    return updatedUser;
  }

  async deleteMany(): Promise<void> {
    await this.userModel.deleteMany({});
  }
}
