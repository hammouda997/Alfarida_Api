import { Expose, Transform } from 'class-transformer';
import { ObjectId } from 'mongoose';

export class UserDto {
  @Expose()
  email: string;

  @Expose()
  @Transform(({ key, obj }) => obj[key])
  _id: ObjectId;

  @Expose()
  firstname: string;

  @Expose()
  lastname: string;

  @Expose()
  gender: string; 

  @Expose()
  dateOfBirth: Date; 

  @Expose()
  address: string; 

  @Expose()
  city: string; 

  @Expose()
  country: string; 

  @Expose()
  postalCode: string;
  @Expose()
  isAdmin: boolean;

  @Expose()
  avatar: string;

  @Expose()
  phone: string;

  @Expose()
  facebook: string;

  @Expose()
  instagram: string;

  @Expose()
  orderHistory: string[];

  @Expose()
  lastLogin: Date;

  @Expose()
  preferredDeliveryTime?: string;

  @Expose()
  isVerified?: boolean;

  @Expose()
  totalReviews?: number;

  @Expose()
  addressBook: any[]; 

  @Expose()
  savedPaymentMethods: string[];

  @Expose()
  averageRating?: number;

  @Expose()
  newsletterSubscription: boolean;

  @Expose()
  accountStatus: string;

  @Expose()
  viewedProducts: string[];

  @Expose()
  accessToken?: string;
}
